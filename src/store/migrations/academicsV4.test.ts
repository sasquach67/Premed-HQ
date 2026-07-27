import { describe, expect, it } from 'vitest'
import { createSeedData } from '@/data/seed'
import {
  inferAcademicTerm,
  migrateAcademicsV4,
  normalizeAcademicTerm,
  normalizeCourseCodes,
  resolveAcademicMigration,
  syncCurrentTermWorkspaces,
} from '@/store/migrations/academicsV4'
import type { AppData } from '@/lib/types'

function legacyCenter(classes: Record<string, unknown>[], extra: Record<string, unknown[]> = {}) {
  return {
    classes,
    topics: extra.topics ?? [],
    notes: extra.notes ?? [],
    assignments: extra.assignments ?? [],
    files: extra.files ?? [],
    contacts: extra.contacts ?? [],
    weakAreas: extra.weakAreas ?? [],
    practiceExams: extra.practiceExams ?? [],
    practiceQuestions: extra.practiceQuestions ?? [],
  }
}

describe('Academics v4 migration', () => {
  it('documents stable course-code and term normalization', () => {
    expect(normalizeCourseCodes(' chem262 ')).toEqual(['CHEM 262'])
    expect(normalizeCourseCodes('BIOL 220 / 222')).toEqual(['BIOL 220', 'BIOL 222'])
    expect(normalizeCourseCodes('NSCI 175 cross-listed with PSYC 175')).toEqual(['NSCI 175', 'PSYC 175'])
    expect(normalizeAcademicTerm('  Fall   2026 ')).toBe('fall 2026')
  })

  it('links by normalized code+term, migrates materials, and under-calls cards-made', () => {
    const data = createSeedData()
    const biol = data.courses.find((course) => course.code === 'BIOL 103')!
    data.academics.classCenter = legacyCenter(
      [{ id: 'legacy-biol', courseCode: 'biol103', courseTitle: 'Biology', semester: ' Fall 2026 ', color: 'green', icon: 'dna' }],
      {
        topics: [
          { id: 'topic-ready', classId: 'legacy-biol', title: 'Cells', status: 'mastered', confidence: 4, sourceNoteIds: [], order: 0 },
          { id: 'topic-notes', classId: 'legacy-biol', title: 'Genes', status: 'cards-made', confidence: 2, sourceNoteIds: [], order: 1 },
        ],
        files: [{ id: 'file-1', classId: 'legacy-biol', title: 'Slides', fileName: 'slides.pdf', order: 0 }],
      },
    ) as never

    migrateAcademicsV4(data, new Date('2026-10-01').getTime())

    expect(data.academics.classCenter.workspaces.find((workspace) => workspace.courseId === biol.id)).toBeDefined()
    expect(data.academics.classCenter.topics.map((topic) => topic.status)).toEqual(['ready', 'notes-made'])
    expect(data.academics.classCenter.topics.every((topic) => topic.courseId === biol.id && topic.fsrs.due > 0)).toBe(true)
    expect(data.academics.classCenter.files[0]).toMatchObject({ courseId: biol.id, sourceType: 'upload' })
  })

  it('drops a non-current workspace but keeps its Course, material, and journal snapshot', () => {
    const data = createSeedData()
    const chem = data.courses.find((course) => course.code === 'CHEM 262')!
    data.academics.classCenter = legacyCenter(
      [{ id: 'legacy-chem', courseCode: 'CHEM262', courseTitle: 'Organic Chemistry II', semester: 'Spring 2028' }],
      { notes: [{ id: 'note-chem', classId: 'legacy-chem', title: 'Pathways', content: '', topicIds: [], linkedFileIds: [], order: 0 }] },
    ) as never

    migrateAcademicsV4(data, new Date('2026-10-01').getTime())

    expect(data.courses.some((course) => course.id === chem.id)).toBe(true)
    expect(data.academics.classCenter.workspaces.some((workspace) => workspace.courseId === chem.id)).toBe(false)
    expect(data.academics.classCenter.notes.find((note) => note.id === 'note-chem')?.courseId).toBe(chem.id)
    expect(data.academics.migrationJournal.find((entry) => entry.legacyWorkspaceId === 'legacy-chem')).toMatchObject({
      kind: 'workspace-dropped-noncurrent',
      status: 'resolved',
    })
  })

  it('requires review when two legacy workspaces resolve to one Course and keeps both snapshots', () => {
    const data = createSeedData()
    const biol = data.courses.find((course) => course.code === 'BIOL 103')!
    data.academics.classCenter = legacyCenter([
      { id: 'legacy-a', courseCode: 'BIOL103', courseTitle: 'Biology A', semester: 'Fall 2026' },
      { id: 'legacy-b', courseCode: 'BIOL 103', courseTitle: 'Biology B', semester: 'Fall 2026' },
    ]) as never

    migrateAcademicsV4(data, new Date('2026-10-01').getTime())

    const pending = data.academics.migrationJournal.filter((entry) => entry.status === 'pending')
    expect(pending).toHaveLength(2)
    expect(pending.every((entry) => entry.kind === 'workspace-conflict' && entry.legacyWorkspace)).toBe(true)
    expect(data.academics.classCenter.workspaces.some((workspace) => workspace.courseId === biol.id)).toBe(false)

    resolveAcademicMigration(data, pending[0].id, { type: 'link', courseId: biol.id }, new Date('2026-10-01').getTime())
    expect(data.academics.classCenter.workspaces.filter((workspace) => workspace.courseId === biol.id)).toHaveLength(1)
    expect(data.academics.migrationJournal.filter((entry) => entry.legacyWorkspaceId?.startsWith('legacy-')).every((entry) => entry.status === 'resolved')).toBe(true)
  })

  it('infers an unset term but leaves a confirmation review and stays locally usable', () => {
    const data = createSeedData()
    data.profile.startTerm = ''
    data.academics.migrationJournal = []

    syncCurrentTermWorkspaces(data, new Date('2026-07-27T12:00:00-04:00').getTime())

    const confirmation = data.academics.migrationJournal.find((entry) => entry.kind === 'current-term-confirmation')
    expect(inferAcademicTerm(new Date('2026-07-27T12:00:00-04:00'))).toBe('Summer 2026')
    expect(confirmation).toMatchObject({ status: 'pending', inferredTerm: 'Summer 2026' })
    expect(data.courses.length).toBeGreaterThan(0)

    resolveAcademicMigration(data, confirmation!.id, { type: 'confirm-term', term: 'Fall 2026' })
    expect(data.profile.startTerm).toBe('Fall 2026')
    expect(confirmation?.status).toBe('resolved')
  })

  it('is idempotent on already-migrated local data', () => {
    const data = createSeedData()
    const once = JSON.stringify(syncCurrentTermWorkspaces(data))
    const twice = JSON.stringify(syncCurrentTermWorkspaces(data))
    expect(twice).toBe(once)
  })

  it('can migrate an imported backup without authentication state', () => {
    const data = createSeedData() as AppData
    data.profile.email = ''
    data.academics.classCenter = legacyCenter([
      { id: 'signed-out', courseCode: 'PSYC101', courseTitle: 'Psychology', semester: 'Fall 2026' },
    ]) as never
    expect(() => migrateAcademicsV4(data)).not.toThrow()
    expect(data.academics.classCenter.workspaces.length).toBeGreaterThan(0)
  })
})
