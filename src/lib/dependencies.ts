import type { AppData, CollectionKey } from '@/lib/types'

export interface DependencyReference {
  collection: string
  id: string
  label: string
  relationship: string
}

export interface DependencyImpact {
  recordId: string
  recordLabel: string
  dependents: DependencyReference[]
}

type Identified = { id: string; [key: string]: unknown }

export function recordLabel(record: Record<string, unknown>) {
  return String(
    record.name
    ?? record.title
    ?? record.recommender
    ?? record.code
    ?? record.text
    ?? record.label
    ?? 'Untitled record'
  )
}

function add(
  impacts: Map<string, DependencyImpact>,
  sourceId: string | undefined,
  dependent: DependencyReference,
) {
  if (!sourceId) return
  impacts.get(sourceId)?.dependents.push(dependent)
}

export function dependencyImpacts(
  data: AppData,
  collection: CollectionKey,
  ids: string[],
): DependencyImpact[] {
  const wanted = new Set(ids)
  const rows = (data[collection] as unknown as Identified[]).filter((row) => wanted.has(row.id))
  const impacts = new Map(rows.map((row) => [
    row.id,
    { recordId: row.id, recordLabel: recordLabel(row), dependents: [] },
  ]))

  if (collection === 'organizations') {
    for (const person of data.persons) {
      add(impacts, person.organizationId, {
        collection: 'persons', id: person.id, label: person.name, relationship: 'Person organization',
      })
    }
    for (const experience of data.experiences) {
      add(impacts, experience.organizationId, {
        collection: 'experiences', id: experience.id,
        label: experience.org || experience.role || 'Experience', relationship: 'Experience organization',
      })
    }
  }

  if (collection === 'persons') {
    for (const experience of data.experiences) {
      add(impacts, experience.supervisorId, {
        collection: 'experiences', id: experience.id,
        label: experience.org || experience.role || 'Experience', relationship: 'Experience supervisor',
      })
    }
    for (const letter of data.letters) {
      add(impacts, letter.recommenderId, {
        collection: 'letters', id: letter.id, label: letter.recommender || 'Letter',
        relationship: 'Letter recommender',
      })
    }
    for (const org of data.orgs) {
      add(impacts, org.verifierId, {
        collection: 'orgs', id: org.id, label: org.name || 'Organization',
        relationship: 'Organization verifier',
      })
    }
    for (const contact of data.academics.classCenter.contacts) {
      add(impacts, contact.personId, {
        collection: 'class contacts', id: contact.id, label: contact.name || 'Class contact',
        relationship: 'Class contact',
      })
    }
  }

  if (collection === 'experiences') {
    for (const story of data.stories) {
      add(impacts, story.relatedExperienceId, {
        collection: 'stories', id: story.id, label: story.title || story.prompt || 'Story',
        relationship: 'Related experience',
      })
    }
  }

  if (collection === 'orgs') {
    for (const note of data.notePages) {
      add(impacts, note.orgId, {
        collection: 'notePages', id: note.id, label: note.title || 'Initiative',
        relationship: 'Linked organization',
      })
    }
  }

  return [...impacts.values()]
}

export function reassignDependencies(
  data: AppData,
  collection: CollectionKey,
  sourceIds: string[],
  replacementId: string,
) {
  const wanted = new Set(sourceIds)
  if (collection === 'organizations') {
    for (const person of data.persons) {
      if (person.organizationId && wanted.has(person.organizationId)) person.organizationId = replacementId
    }
    for (const experience of data.experiences) {
      if (experience.organizationId && wanted.has(experience.organizationId)) experience.organizationId = replacementId
    }
  }
  if (collection === 'persons') {
    for (const experience of data.experiences) {
      if (experience.supervisorId && wanted.has(experience.supervisorId)) experience.supervisorId = replacementId
    }
    for (const letter of data.letters) {
      if (letter.recommenderId && wanted.has(letter.recommenderId)) letter.recommenderId = replacementId
    }
    for (const org of data.orgs) {
      if (org.verifierId && wanted.has(org.verifierId)) org.verifierId = replacementId
    }
    for (const contact of data.academics.classCenter.contacts) {
      if (contact.personId && wanted.has(contact.personId)) contact.personId = replacementId
    }
  }
  if (collection === 'experiences') {
    for (const story of data.stories) {
      if (story.relatedExperienceId && wanted.has(story.relatedExperienceId)) story.relatedExperienceId = replacementId
    }
  }
  if (collection === 'orgs') {
    for (const note of data.notePages) {
      if (note.orgId && wanted.has(note.orgId)) note.orgId = replacementId
    }
  }
}
