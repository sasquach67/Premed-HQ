import { useMemo } from 'react'
import { uid } from '@/lib/id'
import type { ListViewState, SavedListView } from '@/lib/types'
import { useStore } from '@/store/store'

const DEFAULT_STATE: ListViewState = {
  filters: {},
  visibleColumns: [],
  density: 'comfortable',
}
const EMPTY_SAVED_VIEWS: SavedListView[] = []

export function useSavedViews(listId: string, initial?: Partial<ListViewState>) {
  const stored = useStore((state) => state.settings.listPreferences[listId])
  const savedViews = useStore((state) => state.settings.savedViews[listId] ?? EMPTY_SAVED_VIEWS)
  const activeId = useStore((state) => state.settings.activeSavedViewIds[listId])
  const update = useStore((state) => state.update)
  const state = useMemo(
    () => ({ ...DEFAULT_STATE, ...initial, ...stored, filters: stored?.filters ?? initial?.filters ?? {} }),
    [initial, stored],
  )

  function setState(next: ListViewState) {
    update((draft) => {
      draft.settings.listPreferences[listId] = next
      draft.settings.activeSavedViewIds[listId] = undefined
    })
  }

  function save(name: string) {
    const now = Date.now()
    const view = { id: uid(), listId, name, createdAt: now, updatedAt: now, state }
    update((draft) => {
      draft.settings.savedViews[listId] ??= []
      draft.settings.savedViews[listId].push(view)
      draft.settings.activeSavedViewIds[listId] = view.id
    })
  }

  function restore(id: string) {
    const view = savedViews.find((candidate) => candidate.id === id)
    if (!view) return
    update((draft) => {
      draft.settings.listPreferences[listId] = view.state
      draft.settings.activeSavedViewIds[listId] = id
    })
  }

  function remove(id: string) {
    update((draft) => {
      draft.settings.savedViews[listId] = (draft.settings.savedViews[listId] ?? []).filter((view) => view.id !== id)
      if (draft.settings.activeSavedViewIds[listId] === id) draft.settings.activeSavedViewIds[listId] = undefined
    })
  }

  return { state, setState, savedViews, activeId, save, restore, remove }
}
