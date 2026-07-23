import { useMemo, useState } from 'react'

export interface ListGroup<T> {
  id: string
  label: string
  items: T[]
}

export function useListPipeline<T extends { id: string }>({
  items,
  filter,
  compare,
  group,
}: {
  items: T[]
  filter?: (item: T) => boolean
  compare?: (a: T, b: T) => number
  group?: (item: T) => { id: string; label: string }
}) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())

  const processed = useMemo(() => {
    const filtered = filter ? items.filter(filter) : [...items]
    if (compare) filtered.sort(compare)
    if (!group) return [{ id: 'all', label: '', items: filtered }]
    const groups = new Map<string, ListGroup<T>>()
    for (const item of filtered) {
      const key = group(item)
      const existing = groups.get(key.id)
      if (existing) existing.items.push(item)
      else groups.set(key.id, { ...key, items: [item] })
    }
    return [...groups.values()]
  }, [compare, filter, group, items])

  function toggleSelection(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return {
    groups: processed,
    selectedIds,
    isSelected: (id: string) => selectedIds.has(id),
    toggleSelection,
    clearSelection: () => setSelectedIds(new Set()),
  }
}
