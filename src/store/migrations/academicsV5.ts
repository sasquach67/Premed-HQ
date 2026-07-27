import type {
  AcademicMigrationJournalEntry,
  AppData,
  ClassContact,
  Person,
} from '@/lib/types'

type ContactResolution =
  | { type: 'link-person'; personId: string }
  | { type: 'create-person' }

function compact(value: unknown) {
  return String(value ?? '').trim().replace(/\s+/g, ' ')
}

export function normalizePersonName(value: unknown) {
  return compact(value).toLocaleLowerCase()
}

export function normalizePersonEmail(value: unknown) {
  return compact(value).toLocaleLowerCase()
}

function personFromContact(contact: ClassContact, order: number, now: number): Person {
  return {
    id: `person-from-contact-${contact.id}`,
    name: compact(contact.name) || 'Unnamed contact',
    email: compact(contact.email) || undefined,
    role: contact.role,
    notes: compact(contact.notes) || undefined,
    tags: ['academics-contact'],
    createdAt: contact.createdAt || now,
    updatedAt: contact.updatedAt || now,
    archived: false,
    order,
    source: { type: 'manual' },
  }
}

function addConflict(
  journal: AcademicMigrationJournalEntry[],
  contact: ClassContact,
  candidates: Person[],
  now: number,
) {
  const id = `academics-v5:contact-conflict:${contact.id}`
  if (journal.some((entry) => entry.id === id)) return
  journal.push({
    id,
    kind: 'contact-conflict',
    status: 'pending',
    reason: `${compact(contact.name) || 'This contact'} matches an existing Person by name, but the email differs. Choose the correct canonical Person or keep both people.`,
    legacyContactId: contact.id,
    legacyContact: { ...contact },
    candidatePersonIds: candidates.map((person) => person.id),
    createdAt: now,
  })
}

function linkContact(contact: ClassContact, person: Person, now: number) {
  contact.personId = person.id
  if (!person.email && compact(contact.email)) person.email = compact(contact.email)
  if (!person.role && contact.role) person.role = contact.role
  person.updatedAt = Math.max(person.updatedAt || 0, contact.updatedAt || now)
}

/** Assigns every legacy class contact one canonical Person identity while
 * retaining the original ClassContact and journal snapshots losslessly. */
export function migrateAcademicsV5(data: AppData, now = Date.now()): AppData {
  data.persons ??= []
  data.academics.migrationJournal ??= []
  data.academics.classCenter.reviewEvents ??= []
  data.academics.classCenter.contacts ??= []

  for (const contact of data.academics.classCenter.contacts) {
    if (contact.personId && data.persons.some((person) => person.id === contact.personId)) continue

    const name = normalizePersonName(contact.name)
    const email = normalizePersonEmail(contact.email)
    const sameName = data.persons.filter((person) => normalizePersonName(person.name) === name)
    const exact = sameName.filter((person) => normalizePersonEmail(person.email) === email)

    if (exact.length === 1) {
      linkContact(contact, exact[0], now)
      continue
    }

    const compatibleMissingEmail = sameName.filter((person) => {
      const personEmail = normalizePersonEmail(person.email)
      return !personEmail || !email
    })
    const conflicting = sameName.filter((person) => {
      const personEmail = normalizePersonEmail(person.email)
      return Boolean(personEmail && email && personEmail !== email)
    })

    if (exact.length > 1 || conflicting.length > 0 || compatibleMissingEmail.length > 1) {
      addConflict(data.academics.migrationJournal, contact, sameName, now)
      continue
    }
    if (compatibleMissingEmail.length === 1) {
      linkContact(contact, compatibleMissingEmail[0], now)
      continue
    }

    const created = personFromContact(contact, data.persons.length, now)
    const existing = data.persons.find((person) => person.id === created.id)
    if (!existing) data.persons.push(created)
    linkContact(contact, existing ?? created, now)
  }
  return data
}

export function resolveAcademicContactMigration(
  data: AppData,
  entryId: string,
  resolution: ContactResolution,
  now = Date.now(),
) {
  const entry = data.academics.migrationJournal.find((item) =>
    item.id === entryId && item.kind === 'contact-conflict' && item.status === 'pending'
  )
  if (!entry?.legacyContactId) return data
  const contact = data.academics.classCenter.contacts.find((item) => item.id === entry.legacyContactId)
  if (!contact) return data

  let person = resolution.type === 'link-person'
    ? data.persons.find((item) => item.id === resolution.personId)
    : undefined
  if (resolution.type === 'create-person') {
    const snapshot = (entry.legacyContact ?? contact) as unknown as ClassContact
    const created = personFromContact(snapshot, data.persons.length, now)
    let id = created.id
    let suffix = 1
    while (data.persons.some((item) => item.id === id)) id = `${created.id}-${suffix++}`
    person = { ...created, id }
    data.persons.push(person)
  }
  if (!person) return data

  linkContact(contact, person, now)
  entry.status = 'resolved'
  entry.resolvedAt = now
  entry.reason = `Linked ${compact(contact.name) || 'contact'} to canonical Person ${person.name}. The original contact snapshot remains in the journal.`
  return data
}
