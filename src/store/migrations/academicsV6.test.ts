import { describe, expect, it } from 'vitest'
import { createSeedData } from '@/data/seed'
import { migrateAcademicsV6 } from '@/store/migrations/academicsV6'

describe('Academics v6 migration', () => {
  it('is additive, idempotent, and does not infer importance', () => {
    const data = structuredClone(createSeedData())
    const before = structuredClone(data.academics.classCenter.assignments)

    migrateAcademicsV6(data)
    migrateAcademicsV6(data)

    expect(data.academics.classCenter.assignments).toEqual(before)
    expect(data.academics.classCenter.assignments.every((item) => !Object.hasOwn(item, 'important'))).toBe(true)
  })
})
