import { describe, expect, it, vi } from 'vitest'
import { createSeedData } from '@/data/seed'
import { buildAttention } from './attention'

describe('attention deadlines feed', () => {
  it('counts overdue and imminent work while leaving extension feeds pluggable', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-23T12:00:00'))
    const data = createSeedData()
    data.tasks = [
      { id: 'overdue', title: 'Overdue', type: 'Task', deadline: '2026-07-22', progress: 'Not started', kanban: 'todo', archived: false, order: 0 },
      { id: 'soon', title: 'Soon', type: 'Task', deadline: '2026-07-25', progress: 'Not started', kanban: 'todo', archived: false, order: 1 },
    ]
    const extra = () => [{ id: 'system:test', source: 'system' as const, priority: 'informational' as const, title: 'System', why: 'Test feed', route: '/settings', actionLabel: 'Open' }]
    const items = buildAttention(data, [extra])
    expect(items.map((item) => item.priority)).toEqual(['blocking', 'important', 'informational'])
    vi.useRealTimers()
  })
})
