import type { Organization, Person } from '@/lib/types'

export function normalizeEntityName(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ')
}

function nameMatches(query: string, candidate: string): boolean {
  const normalizedQuery = normalizeEntityName(query)
  const normalizedCandidate = normalizeEntityName(candidate)
  if (!normalizedQuery || !normalizedCandidate) return false
  return normalizedCandidate.includes(normalizedQuery) || normalizedQuery.includes(normalizedCandidate)
}

export function findPersonMatches(name: string, persons: Person[]): Person[] {
  return persons.filter((person) => !person.archived && !person.deletedAt && nameMatches(name, person.name))
}

export function findOrganizationMatches(name: string, organizations: Organization[]): Organization[] {
  return organizations.filter((organization) =>
    !organization.archived && !organization.deletedAt && nameMatches(name, organization.name)
  )
}
