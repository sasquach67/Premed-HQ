/* ============================================================
   store.ts — single source of truth.
   zustand + immer + persist:
     • persist middleware = INSTANT localStorage autosave on every edit
     • immer = ergonomic nested updates
   The Google Drive backup module subscribes to this store.
   ============================================================ */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type {
  AcademicCourseOption, AcademicTagColor, AcademicTypeOption,
  AppData, CollectionKey, ActivityEvent, RequirementItem,
} from '@/lib/types'
import { createSeedData } from '@/data/seed'
import { uid } from '@/lib/id'

export const STORAGE_KEY = 'premed_hq_v1'
const SEED_VERSION = 1

type AnyRow = { id: string; order: number }

interface Actions {
  /** generic escape hatch — mutate the whole tree with immer semantics */
  update: (mutator: (draft: AppData) => void) => void

  // generic collection CRUD (Notion-like inline editing)
  addItem: <K extends CollectionKey>(key: K, item: AppData[K][number]) => void
  patchItem: <K extends CollectionKey>(key: K, id: string, patch: Partial<AppData[K][number]>) => void
  removeItem: (key: CollectionKey, id: string) => void
  /** drag-reorder: move `fromId` to occupy `toId`'s slot */
  reorderItems: (key: CollectionKey, fromId: string, toId: string) => void
  setCollection: <K extends CollectionKey>(key: K, items: AppData[K]) => void

  setNote: (id: string, value: string) => void
  touchRoute: (routeId: string) => void
  logActivity: (pillar: string, label: string) => void

  replaceAll: (data: AppData) => void
  resetToSeed: () => void
}

export type Store = AppData & Actions

/** keys that hold the persisted data (functions are never serialized) */
const DATA_KEYS: (keyof AppData)[] = [
  'profile', 'goals', 'courses', 'requirements', 'experiences', 'tasks',
  'academics', 'letters', 'stories', 'secondaries', 'interviewQs', 'mcat', 'schools',
  'resources', 'tips', 'focusTargets', 'quarterlyGoals', 'advisingQs',
  'notePages', 'orgs', 'notes', 'settings', 'meta',
]

const TAG_COLORS: AcademicTagColor[] = ['blue', 'green', 'purple', 'orange', 'yellow', 'red', 'pink', 'gray']

function slug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'tag'
}

function courseOptionId(label: string) {
  return `course-${slug(label)}`
}

function typeOptionId(label: string) {
  return `type-${slug(label)}`
}

function normalizeLabel(value: string) {
  return value.trim().toLowerCase()
}

function classCenterDefaults() {
  return createSeedData().academics.classCenter
}

export function migrateAcademicTags(data: AppData): AppData {
  data.academics ??= { courseOptions: [], assignmentTypeOptions: [], classCenter: classCenterDefaults() }
  data.academics.courseOptions ??= []
  data.academics.assignmentTypeOptions ??= []
  data.academics.classCenter ??= classCenterDefaults()
  data.academics.classCenter.classes ??= []
  data.academics.classCenter.topics ??= []
  data.academics.classCenter.notes ??= []
  data.academics.classCenter.assignments ??= []
  data.academics.classCenter.files ??= []
  data.academics.classCenter.contacts ??= []
  data.academics.classCenter.weakAreas ??= []
  data.academics.classCenter.practiceExams ??= []
  data.academics.classCenter.practiceQuestions ??= []

  const now = Date.now()
  for (const topic of data.academics.classCenter.topics) {
    const oldConfidence = Number(topic.confidence)
    topic.confidence = (oldConfidence >= 4 ? 3 : oldConfidence <= 1 ? 1 : 2) as never
    if (topic.status === 'mastered') topic.status = 'ready'
    topic.sourceNoteIds ??= []
    topic.linkedNoteIds ??= [...new Set([...(topic.linkedNoteIds ?? []), ...(topic.sourceNoteIds ?? [])])]
    topic.linkedAssignmentIds ??= []
    topic.linkedFileIds ??= []
    topic.createdAt ??= now
    topic.updatedAt ??= now
  }
  for (const note of data.academics.classCenter.notes) {
    note.topicIds ??= []
    note.linkedFileIds ??= []
    note.syncStatus ??= 'local-only'
  }
  for (const assignment of data.academics.classCenter.assignments) {
    assignment.linkedTopicIds ??= []
    assignment.coveredTopicIds ??= assignment.type === 'exam' ? assignment.linkedTopicIds : []
    assignment.linkedFileIds ??= []
  }
  for (const file of data.academics.classCenter.files) file.linkedTopicIds ??= []
  for (const weakArea of data.academics.classCenter.weakAreas) {
    const oldSeverity = Number(weakArea.severity)
    weakArea.severity = (oldSeverity >= 4 ? 3 : oldSeverity <= 1 ? 1 : 2) as never
  }

  const courseOptions = data.academics.courseOptions as AcademicCourseOption[]
  const typeOptions = data.academics.assignmentTypeOptions as AcademicTypeOption[]

  const courseByName = new Map(courseOptions.map((option) => [normalizeLabel(option.name), option]))
  const typeByName = new Map(typeOptions.map((option) => [normalizeLabel(option.name), option]))

  const ensureCourse = (name: string, title?: string): AcademicCourseOption => {
    const trimmed = name.trim()
    const key = normalizeLabel(trimmed)
    const existing = courseByName.get(key)
    if (existing) return existing
    const option: AcademicCourseOption = {
      id: courseOptionId(trimmed),
      name: trimmed,
      title,
      color: TAG_COLORS[courseOptions.length % TAG_COLORS.length],
      archived: false,
    }
    courseOptions.push(option)
    courseByName.set(key, option)
    return option
  }

  const ensureType = (name: string): AcademicTypeOption => {
    const trimmed = name.trim()
    const key = normalizeLabel(trimmed)
    const existing = typeByName.get(key)
    if (existing) return existing
    const option: AcademicTypeOption = {
      id: typeOptionId(trimmed),
      name: trimmed,
      color: TAG_COLORS[(typeOptions.length + 2) % TAG_COLORS.length],
      archived: false,
    }
    typeOptions.push(option)
    typeByName.set(key, option)
    return option
  }

  for (const course of data.courses ?? []) {
    const label = course.code || course.title
    if (label) ensureCourse(label, course.title)
  }

  for (const task of data.tasks ?? []) {
    if (task.course && !task.courseId) task.courseId = ensureCourse(task.course).id
    if (task.type && !task.typeId) task.typeId = ensureType(task.type).id
  }

  return data
}

export function migrateOrgReflections(data: AppData): AppData {
  data.orgs ??= []
  const today = new Date().toISOString().slice(0, 10)

  for (const org of data.orgs) {
    const legacy = typeof org.reflection === 'string' ? org.reflection.trim() : ''
    org.reflections ??= []
    if (legacy && org.reflections.length === 0) {
      org.reflections.push({
        id: uid(),
        date: today,
        title: 'Imported note',
        body: legacy,
      })
    }
  }

  return data
}

const REQUIREMENT_SOURCE_BY_GROUP: Record<string, Pick<RequirementItem, 'sourceType' | 'sourceLabel' | 'sourceUrl' | 'lastVerified' | 'verificationStatus'>> = {
  'Incoming AP / transfer credit': {
    sourceType: 'user-note',
    sourceLabel: 'Andy AP/transfer credit note',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
  'IDEAs in Action — First-Year Foundations': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — IDEAs in Action',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/ideas-in-action/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'IDEAs in Action — Focus Capacities': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — IDEAs in Action',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/ideas-in-action/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'IDEAs in Action — Reflection & Integration': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — IDEAs in Action',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/ideas-in-action/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'IDEAs in Action — Additional (Fall 2025+)': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — IDEAs in Action',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/ideas-in-action/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'Neuroscience B.S. — Core': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — Neuroscience B.S.',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'Neuroscience B.S. — Additional Requirements (C or better)': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — Neuroscience B.S.',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'Pre-Med additions (UNC HPA)': {
    sourceType: 'premed-advice',
    sourceLabel: 'UNC HPA / premed planning note',
    sourceUrl: 'https://hpa.unc.edu/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
  'University graduation rules': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog',
    sourceUrl: 'https://catalog.unc.edu/policies-procedures/degree-requirements/',
    lastVerified: '2026-06-27',
    verificationStatus: 'verified',
  },
  'Satisfied by incoming credit': {
    sourceType: 'user-note',
    sourceLabel: 'Andy AP/transfer credit note',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
  'Major — Core': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — Neuroscience B.S.',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
  'Major — Additional Requirements (C or better)': {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog — Neuroscience B.S.',
    sourceUrl: 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
  'Med Prerequisites (UNC HPA)': {
    sourceType: 'premed-advice',
    sourceLabel: 'UNC HPA / premed planning note',
    sourceUrl: 'https://hpa.unc.edu/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
  Graduation: {
    sourceType: 'official',
    sourceLabel: 'UNC Catalog',
    sourceUrl: 'https://catalog.unc.edu/policies-procedures/degree-requirements/',
    lastVerified: '2026-06-27',
    verificationStatus: 'needs-verification',
  },
}

export function migrateRequirementMetadata(data: AppData): AppData {
  const migrationNote = 'Migration note: Carolina Compass-style “Organismal” labels are treated only as optional planner/course tags, not a standalone Neuroscience B.S. requirement.'
  data.requirements = (data.requirements ?? [])
    .filter((requirement) => {
      const standaloneOrganismal = /organismal/i.test(requirement.group) || /^organismal$/i.test(requirement.label.trim())
      if (!standaloneOrganismal) return true
      data.notes['tar-heel-organismal-migration'] = migrationNote
      return false
    })
    .map((requirement) => {
      const fallback = REQUIREMENT_SOURCE_BY_GROUP[requirement.group] ?? {
        sourceType: 'planner-inspired' as const,
        sourceLabel: 'Planner note',
        lastVerified: '2026-06-27',
        verificationStatus: 'needs-verification' as const,
      }
      const uncertain = /Knowledge Electives|Math\/Methods\/Stats|Options:|prioritized|Select two/i.test(requirement.label)
      return {
        ...fallback,
        ...requirement,
        verificationStatus: requirement.verificationStatus ?? (uncertain ? 'needs-verification' : fallback.verificationStatus),
      }
    })
  return data
}

function nextOrder(arr: AnyRow[]): number {
  return arr.reduce((m, x) => Math.max(m, x.order ?? 0), -1) + 1
}

export const useStore = create<Store>()(
  persist(
    immer((set) => ({
      ...createSeedData(),

      update: (mutator) => set((s) => { mutator(s as unknown as AppData) }),

      addItem: (key, item) =>
        set((s) => {
          const arr = s[key] as unknown as AnyRow[]
          const row = item as unknown as AnyRow
          if (row.order == null) row.order = nextOrder(arr)
          arr.push(row)
        }),

      patchItem: (key, id, patch) =>
        set((s) => {
          const arr = s[key] as unknown as AnyRow[]
          const row = arr.find((r) => r.id === id)
          if (row) Object.assign(row, patch)
        }),

      removeItem: (key, id) =>
        set((s) => {
          const arr = s[key] as unknown as AnyRow[]
          const i = arr.findIndex((r) => r.id === id)
          if (i >= 0) arr.splice(i, 1)
        }),

      reorderItems: (key, fromId, toId) =>
        set((s) => {
          const arr = s[key] as unknown as AnyRow[]
          const from = arr.findIndex((r) => r.id === fromId)
          const to = arr.findIndex((r) => r.id === toId)
          if (from < 0 || to < 0 || from === to) return
          const [moved] = arr.splice(from, 1)
          arr.splice(to, 0, moved)
          arr.forEach((r, i) => (r.order = i))
        }),

      setCollection: (key, items) =>
        set((s) => {
          ;(s as unknown as Record<string, unknown>)[key] = items
        }),

      setNote: (id, value) =>
        set((s) => {
          s.notes[id] = value
        }),

      touchRoute: (routeId) =>
        set((s) => {
          s.meta.lastOpenedAt = Date.now()
          const r = s.meta.recentRoutes.filter((x) => x !== routeId)
          r.unshift(routeId)
          s.meta.recentRoutes = r.slice(0, 6)
        }),

      logActivity: (pillar, label) =>
        set((s) => {
          const ev: ActivityEvent = { id: uid(), at: Date.now(), pillar, label }
          s.meta.activity.unshift(ev)
          s.meta.activity = s.meta.activity.slice(0, 30)
        }),

      replaceAll: (data) => set(() => ({ ...migrateOrgReflections(migrateRequirementMetadata(migrateAcademicTags({ ...createSeedData(), ...data } as AppData))) })),

      resetToSeed: () => set(() => ({ ...createSeedData() })),
    })),
    {
      name: STORAGE_KEY,
      version: SEED_VERSION,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(DATA_KEYS.map((k) => [k, state[k]])) as unknown as Store,
      // shallow-merge seed defaults under persisted data so new fields appear after updates
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AppData>
        const merged = {
          ...current,
          ...p,
          academics: {
            courseOptions: p.academics?.courseOptions ?? current.academics.courseOptions,
            assignmentTypeOptions: p.academics?.assignmentTypeOptions ?? current.academics.assignmentTypeOptions,
            classCenter: p.academics?.classCenter ?? current.academics.classCenter,
          },
          settings: {
            ...current.settings,
            ...p.settings,
            backup: { ...current.settings.backup, ...p.settings?.backup },
            calendar: { ...current.settings.calendar, ...p.settings?.calendar },
          },
          mcat: { ...current.mcat, ...p.mcat },
          meta: { ...current.meta, ...p.meta },
          notes: { ...current.notes, ...p.notes },
          profile: { ...current.profile, ...p.profile },
          goals: { ...current.goals, ...p.goals },
        }
        return migrateOrgReflections(migrateRequirementMetadata(migrateAcademicTags(merged as AppData))) as unknown as Store
      },
    }
  )
)

/** Non-reactive snapshot of just the data (for export / backup). */
export function snapshotData(): AppData {
  const s = useStore.getState()
  return Object.fromEntries(DATA_KEYS.map((k) => [k, s[k]])) as unknown as AppData
}
