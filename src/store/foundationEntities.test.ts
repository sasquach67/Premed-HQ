import { beforeEach, describe, expect, it } from 'vitest'
import { createSeedData } from '@/data/seed'
import type { Organization, Person } from '@/lib/types'
import { useStore } from '@/store/store'

const envelope = {
  createdAt: 1,
  updatedAt: 1,
  archived: false,
  source: { type: 'manual' as const },
}

describe('foundation entity collections', () => {
  beforeEach(() => useStore.getState().resetToSeed())

  it('seeds canonical Person and Organization collections', () => {
    const data = createSeedData()
    expect(data.persons).toEqual([])
    expect(data.organizations).toEqual([])
  })

  it('supports generic CRUD and ordering for both collections', () => {
    const first: Organization = {
      ...envelope,
      id: 'org-1',
      name: 'First Clinic',
      order: 0,
    }
    const second: Organization = {
      ...envelope,
      id: 'org-2',
      name: 'Second Clinic',
      order: 1,
    }
    const person: Person = {
      ...envelope,
      id: 'person-1',
      name: 'Dr. Rivera',
      organizationId: first.id,
      order: 0,
    }

    const store = useStore.getState()
    store.addItem('organizations', first)
    store.addItem('organizations', second)
    store.addItem('persons', person)
    store.patchItem('persons', person.id, { title: 'Medical director' })
    store.reorderItems('organizations', second.id, first.id)
    store.removeItem('organizations', first.id)

    const updated = useStore.getState()
    expect(updated.persons[0]).toMatchObject({
      id: person.id,
      organizationId: first.id,
      title: 'Medical director',
    })
    expect(updated.organizations.map((organization) => organization.id)).toEqual([second.id])
    expect(updated.organizations[0].order).toBe(0)
  })
})
