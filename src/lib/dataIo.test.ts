/* Tests for backup import validation — the gate between a user's file
   and the store. A bad file must be rejected loudly, never merged. */
import { describe, expect, it } from 'vitest'
import { validateAppData, looksLikeAppData } from '@/lib/dataIo'
import { createSeedData } from '@/data/seed'

describe('validateAppData', () => {
  it('accepts a real snapshot (seed data)', () => {
    expect(validateAppData(createSeedData())).toEqual([])
  })

  it('rejects non-objects', () => {
    expect(validateAppData(null)).toHaveLength(1)
    expect(validateAppData('hi')).toHaveLength(1)
    expect(validateAppData([1, 2])).toHaveLength(1)
  })

  it('rejects data missing the core sections', () => {
    const problems = validateAppData({ random: true })
    expect(problems.join(' ')).toContain('courses')
    expect(problems.join(' ')).toContain('profile')
    expect(problems.join(' ')).toContain('settings')
  })

  it('rejects collections of the wrong shape', () => {
    const data = { ...createSeedData(), tasks: 'oops' } as unknown
    expect(validateAppData(data).join(' ')).toContain('"tasks"')
  })

  it('rejects collection rows without a string id', () => {
    const seed = createSeedData()
    const data = { ...seed, courses: [...seed.courses, { title: 'no id' }] } as unknown
    const problems = validateAppData(data)
    expect(problems.join(' ')).toContain('"courses"')
  })

  it('rejects malformed nested mcat.attempts', () => {
    const seed = createSeedData()
    const data = { ...seed, mcat: { ...seed.mcat, attempts: {} } } as unknown
    expect(validateAppData(data).join(' ')).toContain('mcat.attempts')
  })

  it('tolerates missing optional sections (old backups)', () => {
    const seed = createSeedData() as unknown as Record<string, unknown>
    delete seed.academics
    delete seed.orgs
    expect(validateAppData(seed)).toEqual([])
  })

  it('looksLikeAppData mirrors the validator', () => {
    expect(looksLikeAppData(createSeedData())).toBe(true)
    expect(looksLikeAppData({})).toBe(false)
  })
})
