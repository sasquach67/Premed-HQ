import { describe, expect, it } from 'vitest'
import { createSeedData } from '@/data/seed'
import {
  migrateAcademicsV5,
  normalizePersonEmail,
  normalizePersonName,
  resolveAcademicContactMigration,
} from '@/store/migrations/academicsV5'

describe('Academics v5 migration', () => {
  it('normalizes and links duplicate contact identities idempotently', () => {
    const data = structuredClone(createSeedData())
    const original = data.academics.classCenter.contacts[0]
    original.email = 'ott@example.com'
    data.academics.classCenter.contacts.push({
      ...original,
      id: 'contact-duplicate',
      name: '  PROF.   OTT ',
      email: 'OTT@EXAMPLE.COM ',
      order: 1,
    })

    migrateAcademicsV5(data, 100)
    const once = JSON.stringify(data)
    migrateAcademicsV5(data, 200)

    expect(normalizePersonName(' Prof.   Ott ')).toBe('prof. ott')
    expect(normalizePersonEmail(' OTT@Example.com ')).toBe('ott@example.com')
    expect(data.persons).toHaveLength(1)
    expect(data.academics.classCenter.contacts.every((contact) => contact.personId === data.persons[0].id)).toBe(true)
    expect(JSON.stringify(data)).toBe(once)
  })

  it('requires review for the same name with a different email', () => {
    const data = structuredClone(createSeedData())
    data.persons.push({
      id: 'existing-prof',
      name: 'Prof. Ott',
      email: 'first@example.com',
      createdAt: 100,
      updatedAt: 100,
      archived: false,
      order: 0,
    })
    const contact = data.academics.classCenter.contacts[0]
    contact.email = 'second@example.com'

    migrateAcademicsV5(data, 100)
    const pending = data.academics.migrationJournal.find((entry) => entry.kind === 'contact-conflict')

    expect(contact.personId).toBeUndefined()
    expect(pending).toMatchObject({
      status: 'pending',
      legacyContactId: contact.id,
      candidatePersonIds: ['existing-prof'],
    })
    expect(pending?.legacyContact).toMatchObject({ email: 'second@example.com' })

    resolveAcademicContactMigration(data, pending!.id, { type: 'create-person' }, 200)
    expect(contact.personId).toBeTruthy()
    expect(contact.personId).not.toBe('existing-prof')
    expect(pending?.status).toBe('resolved')
    expect(data.persons).toHaveLength(2)
  })

  it('adds append-only review history in signed-out mode', () => {
    const data = structuredClone(createSeedData())
    data.profile.email = ''
    delete (data.academics.classCenter as Partial<typeof data.academics.classCenter>).reviewEvents
    expect(() => migrateAcademicsV5(data)).not.toThrow()
    expect(data.academics.classCenter.reviewEvents).toEqual([])
  })
})
