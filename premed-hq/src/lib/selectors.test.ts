/* Tests for the AMCAS GPA engine + derived-data selectors.
   These guard the app's core math — run with `npm test`. */
import { describe, expect, it } from 'vitest'
import { gpaStats, hourTotals, percent, upcomingAlerts, bestMcat } from '@/lib/selectors'
import type { Course, ExperienceEntry, McatState, TaskItem } from '@/lib/types'

let seq = 0
function course(partial: Partial<Course>): Course {
  seq += 1
  return {
    id: `c${seq}`,
    term: 'Fall 2026',
    code: 'TEST 101',
    title: 'Test Course',
    credits: 3,
    grade: 'A',
    bcpm: false,
    status: 'completed',
    inResidence: true,
    satisfies: [],
    order: seq,
    ...partial,
  }
}

describe('gpaStats (AMCAS rules)', () => {
  it('returns zeros on empty input', () => {
    const s = gpaStats([])
    expect(s.cum).toBe(0)
    expect(s.credits).toBe(0)
  })

  it('computes cumulative GPA with +/- steps', () => {
    const s = gpaStats([
      course({ grade: 'A', credits: 3 }),   // 4.0
      course({ grade: 'B+', credits: 3 }),  // 3.3
      course({ grade: 'C-', credits: 3 }),  // 1.7
    ])
    expect(s.cum).toBeCloseTo((4 + 3.3 + 1.7) / 3, 5)
    expect(s.credits).toBe(9)
  })

  it('treats A+ as 4.0 (AMCAS caps at 4.0)', () => {
    expect(gpaStats([course({ grade: 'A+' })]).cum).toBe(4)
  })

  it('splits BCPM (science) vs AO buckets', () => {
    const s = gpaStats([
      course({ grade: 'A', bcpm: true, credits: 4 }),
      course({ grade: 'B', bcpm: false, credits: 3 }),
    ])
    expect(s.science).toBe(4)
    expect(s.ao).toBe(3)
    expect(s.scienceCredits).toBe(4)
    expect(s.aoCredits).toBe(3)
  })

  it('averages repeats instead of replacing (no grade replacement)', () => {
    const s = gpaStats([
      course({ code: 'CHEM 101', grade: 'F', credits: 3 }),
      course({ code: 'CHEM 101', grade: 'A', credits: 3 }),
    ])
    expect(s.cum).toBeCloseTo(2.0, 5)
    expect(s.credits).toBe(6)
  })

  it('excludes non-GPA grades (P/NP/IP/blank) and AP/transfer credit', () => {
    const s = gpaStats([
      course({ grade: 'P' }),
      course({ grade: 'NP' }),
      course({ grade: 'IP' }),
      course({ grade: '' }),
      course({ grade: 'A', inResidence: false }), // AP/transfer
      course({ grade: 'B' }),
    ])
    expect(s.credits).toBe(3)
    expect(s.cum).toBe(3)
  })

  it('handles zero-credit rows without NaN', () => {
    const s = gpaStats([course({ grade: 'A', credits: 0 })])
    expect(Number.isNaN(s.cum)).toBe(false)
  })
})

describe('hourTotals', () => {
  it('sums per category and tolerates missing hours', () => {
    const entries = [
      { category: 'clinical', hours: 10 },
      { category: 'clinical', hours: 5 },
      { category: 'research', hours: 0 },
      { category: 'shadowing' }, // hours undefined
    ] as ExperienceEntry[]
    const t = hourTotals(entries)
    expect(t.clinical).toBe(15)
    expect(t.research).toBe(0)
    expect(t.shadowing).toBe(0)
    expect(t.volunteering).toBe(0)
  })
})

describe('percent', () => {
  it('clamps to 0..100 and handles zero goal', () => {
    expect(percent(50, 100)).toBe(50)
    expect(percent(200, 100)).toBe(100)
    expect(percent(-5, 100)).toBe(0)
    expect(percent(10, 0)).toBe(0)
  })
})

describe('bestMcat', () => {
  it('prefers official attempts over practice', () => {
    const mcat = {
      attempts: [
        { kind: 'practice', total: 520 },
        { kind: 'official', total: 512 },
      ],
    } as McatState
    expect(bestMcat(mcat)).toBe(512)
  })

  it('falls back to practice scores, and null when empty', () => {
    expect(bestMcat({ attempts: [{ kind: 'practice', total: 505 }] } as McatState)).toBe(505)
    expect(bestMcat({ attempts: [] } as unknown as McatState)).toBeNull()
  })
})

describe('upcomingAlerts', () => {
  function task(partial: Partial<TaskItem>): TaskItem {
    seq += 1
    return {
      id: `t${seq}`,
      title: 'Task',
      type: 'Homework',
      progress: 'Not started',
      kanban: 'todo',
      archived: false,
      order: seq,
      ...partial,
    } as TaskItem
  }
  const iso = (daysFromNow: number) => {
    const d = new Date()
    d.setDate(d.getDate() + daysFromNow)
    return d.toISOString().slice(0, 10)
  }

  it('skips archived/finished/undated tasks and sorts by urgency', () => {
    const alerts = upcomingAlerts([
      task({ title: 'archived', deadline: iso(1), archived: true }),
      task({ title: 'done', deadline: iso(1), progress: 'Finished' }),
      task({ title: 'undated' }),
      task({ title: 'later', deadline: iso(8) }),
      task({ title: 'soon', deadline: iso(1) }),
    ])
    expect(alerts.map((a) => a.label)).toEqual(['soon', 'later'])
    expect(alerts[0].severity).toBe('urgent')
    expect(alerts[1].severity).toBe('info')
  })

  it('gives exams a tighter 8-day window than the default horizon', () => {
    const alerts = upcomingAlerts([
      task({ title: 'far exam', type: 'Exam', deadline: iso(10) }),
      task({ title: 'near exam', type: 'Exam', deadline: iso(7) }),
    ])
    expect(alerts.map((a) => a.label)).toEqual(['near exam'])
    expect(alerts[0].kind).toBe('exam')
  })
})
