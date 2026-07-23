import { describe, expect, it } from 'vitest'
import { findOrganizationMatches, findPersonMatches } from '@/lib/entityMatching'
import type { Organization, Person } from '@/lib/types'

const envelope = {
  createdAt: 1,
  updatedAt: 1,
  archived: false,
  order: 0,
  source: { type: 'manual' as const },
}

describe('canonical entity matching', () => {
  const persons: Person[] = [
    { ...envelope, id: 'p1', name: 'Dr. Sarah Kwon' },
    { ...envelope, id: 'p2', name: 'Marcus Lee' },
    { ...envelope, id: 'p3', name: 'Archived Person', archived: true },
  ]
  const organizations: Organization[] = [
    { ...envelope, id: 'o1', name: 'UNC Hospitals' },
    { ...envelope, id: 'o2', name: 'Orange County EMS' },
  ]

  it('matches people by normalized exact or included name', () => {
    expect(findPersonMatches('  SARAH   KWON ', persons).map((person) => person.id)).toEqual(['p1'])
    expect(findPersonMatches('Dr. Sarah Kwon, MD', persons).map((person) => person.id)).toEqual(['p1'])
  })

  it('matches organizations case-insensitively by inclusion', () => {
    expect(findOrganizationMatches('unc hospitals chapel hill', organizations).map((organization) => organization.id)).toEqual(['o1'])
    expect(findOrganizationMatches('county ems', organizations).map((organization) => organization.id)).toEqual(['o2'])
  })

  it('returns no matches for blank input and never mutates the collections', () => {
    const before = JSON.stringify(persons)
    expect(findPersonMatches('   ', persons)).toEqual([])
    expect(JSON.stringify(persons)).toBe(before)
  })
})
