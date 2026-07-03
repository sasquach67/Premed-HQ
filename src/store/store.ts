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
import type { AppData, CollectionKey, ActivityEvent } from '@/lib/types'
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
  'letters', 'stories', 'secondaries', 'interviewQs', 'mcat', 'schools',
  'resources', 'tips', 'focusTargets', 'quarterlyGoals', 'advisingQs',
  'notePages', 'orgs', 'notes', 'settings', 'meta',
]

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

      replaceAll: (data) => set(() => ({ ...data })),

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
        return {
          ...current,
          ...p,
          settings: { ...current.settings, ...p.settings, backup: { ...current.settings.backup, ...p.settings?.backup } },
          mcat: { ...current.mcat, ...p.mcat },
          meta: { ...current.meta, ...p.meta },
          notes: { ...current.notes, ...p.notes },
          profile: { ...current.profile, ...p.profile },
          goals: { ...current.goals, ...p.goals },
        }
      },
    }
  )
)

/** Non-reactive snapshot of just the data (for export / backup). */
export function snapshotData(): AppData {
  const s = useStore.getState()
  return Object.fromEntries(DATA_KEYS.map((k) => [k, s[k]])) as unknown as AppData
}
