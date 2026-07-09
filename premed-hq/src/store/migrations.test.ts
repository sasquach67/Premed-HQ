/* Tests for the data-migration functions that run on every load/import.
   These are the functions most likely to corrupt user data if broken. */
import { describe, expect, it } from 'vitest'
import { migrateAcademicTags, migrateOrgReflections, migrateRequirementMetadata } from '@/store/store'
import { createSeedData } from '@/data/seed'
import type { AppData, ClassTopic, ClassWeakArea, Org, RequirementItem, TaskItem } from '@/lib/types'

function freshData(): AppData {
  return createSeedData()
}

describe('migrateAcademicTags', () => {
  it('recreates missing academics containers on legacy data', () => {
    const data = freshData()
    // simulate a pre-classCenter backup (no academics, no sources to backfill from)
    delete (data as Partial<AppData>).academics
    data.courses = []
    data.tasks = []
    const out = migrateAcademicTags(data)
    expect(out.academics.courseOptions).toEqual([])
    expect(out.academics.classCenter.classes).toBeDefined()
    expect(out.academics.classCenter.practiceExams).toEqual([])
  })

  it('clamps legacy 1-5 topic confidence to the 1-3 scale', () => {
    const data = freshData()
    data.academics.classCenter.topics = [
      { id: 'a', confidence: 5, status: 'mastered' },
      { id: 'b', confidence: 1, status: 'seen' },
      { id: 'c', confidence: 2, status: 'weak' },
    ] as unknown as ClassTopic[]
    const out = migrateAcademicTags(data)
    const [a, b, c] = out.academics.classCenter.topics
    expect(a.confidence).toBe(3)
    expect(a.status).toBe('ready') // 'mastered' renamed
    expect(b.confidence).toBe(1)
    expect(c.confidence).toBe(2)
    // link arrays are backfilled so UI code can push without guards
    expect(a.linkedNoteIds).toEqual([])
    expect(a.linkedAssignmentIds).toEqual([])
  })

  it('clamps legacy weak-area severity the same way', () => {
    const data = freshData()
    data.academics.classCenter.weakAreas = [
      { id: 'w1', severity: 4 },
      { id: 'w2', severity: 0 },
    ] as unknown as ClassWeakArea[]
    const out = migrateAcademicTags(data)
    expect(out.academics.classCenter.weakAreas[0].severity).toBe(3)
    expect(out.academics.classCenter.weakAreas[1].severity).toBe(1)
  })

  it('backfills courseId/typeId on legacy string-tagged tasks, reusing options case-insensitively', () => {
    const data = freshData()
    data.academics.courseOptions = []
    data.academics.assignmentTypeOptions = []
    data.courses = []
    data.tasks = [
      { id: 't1', title: 'PS 1', course: 'CHEM 101', type: 'Homework', progress: 'Not started', kanban: 'todo', archived: false, order: 0 },
      { id: 't2', title: 'PS 2', course: 'chem 101', type: 'homework', progress: 'Not started', kanban: 'todo', archived: false, order: 1 },
    ] as unknown as TaskItem[]
    const out = migrateAcademicTags(data)
    expect(out.tasks[0].courseId).toBeDefined()
    // same course, different casing → same option (no duplicates)
    expect(out.tasks[1].courseId).toBe(out.tasks[0].courseId)
    expect(out.academics.courseOptions).toHaveLength(1)
    expect(out.academics.assignmentTypeOptions).toHaveLength(1)
  })

  it('is idempotent — running twice changes nothing', () => {
    const once = migrateAcademicTags(freshData())
    const twice = migrateAcademicTags(JSON.parse(JSON.stringify(once)) as AppData)
    expect(JSON.stringify(twice.academics)).toBe(JSON.stringify(once.academics))
  })
})

describe('migrateRequirementMetadata', () => {
  function req(partial: Partial<RequirementItem>): RequirementItem {
    return {
      id: 'r1',
      group: 'Major — Core',
      label: 'NSCI 175',
      done: false,
      order: 0,
      ...partial,
    } as RequirementItem
  }

  it('removes standalone Organismal requirements and leaves a migration note', () => {
    const data = freshData()
    data.requirements = [
      req({ id: 'r1', group: 'Organismal', label: 'Organismal' }),
      req({ id: 'r2', label: 'BIOL 101' }),
    ]
    const out = migrateRequirementMetadata(data)
    expect(out.requirements.map((r) => r.id)).toEqual(['r2'])
    expect(out.notes['tar-heel-organismal-migration']).toContain('Organismal')
  })

  it('attaches source metadata by group and flags uncertain labels', () => {
    const data = freshData()
    data.requirements = [
      req({ id: 'r1', group: 'University graduation rules', label: '120 credit hours' }),
      req({ id: 'r2', group: 'Major — Core', label: 'Options: pick from Knowledge Electives' }),
    ]
    const out = migrateRequirementMetadata(data)
    expect(out.requirements[0].sourceType).toBe('official')
    expect(out.requirements[0].verificationStatus).toBe('verified')
    expect(out.requirements[1].verificationStatus).toBe('needs-verification')
  })

  it('never downgrades an explicit verificationStatus', () => {
    const data = freshData()
    data.requirements = [req({ verificationStatus: 'verified', label: 'Options: something uncertain' })]
    const out = migrateRequirementMetadata(data)
    expect(out.requirements[0].verificationStatus).toBe('verified')
  })
})

describe('migrateOrgReflections', () => {
  function org(partial: Partial<Org>): Org {
    return {
      id: 'org-1',
      name: 'Carolina EMS',
      type: 'Volunteer org',
      role: 'EMT-B Crew',
      status: 'member',
      reflection: '',
      reflections: [],
      opportunities: '',
      meetingInfo: '',
      link: '',
      order: 0,
      ...partial,
    }
  }

  it('converts a legacy reflection string into one journal entry', () => {
    const data = freshData()
    data.orgs = [org({ reflection: 'First ride-along moment.' })]
    const out = migrateOrgReflections(data)
    expect(out.orgs[0].reflections).toHaveLength(1)
    expect(out.orgs[0].reflections[0].title).toBe('Imported note')
    expect(out.orgs[0].reflections[0].body).toBe('First ride-along moment.')
    expect(out.orgs[0].reflections[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('does not create an entry for an empty legacy reflection', () => {
    const data = freshData()
    data.orgs = [org({ reflection: '   ' })]
    const out = migrateOrgReflections(data)
    expect(out.orgs[0].reflections).toEqual([])
  })

  it('is idempotent after the first conversion', () => {
    const data = freshData()
    data.orgs = [org({ reflection: 'Do not duplicate me.' })]
    const once = migrateOrgReflections(data)
    const twice = migrateOrgReflections(JSON.parse(JSON.stringify(once)) as AppData)
    expect(twice.orgs[0].reflections).toHaveLength(1)
    expect(twice.orgs[0].reflections).toEqual(once.orgs[0].reflections)
  })
})
