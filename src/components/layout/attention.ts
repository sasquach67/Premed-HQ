import type { AppData, TaskItem } from '@/lib/types'

export type AttentionSource = 'deadline' | 'data-health' | 'system'
export type AttentionPriority = 'blocking' | 'important' | 'informational'

export interface AttentionItem {
  id: string
  source: AttentionSource
  priority: AttentionPriority
  title: string
  why: string
  route: string
  actionLabel: string
  date?: string
  daysLeft?: number
}

export type AttentionFeed = (data: AppData) => AttentionItem[]

function dayStart(value: Date) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

function deadlineItem(task: TaskItem, today: Date): AttentionItem | null {
  if (task.archived || task.progress === 'Finished' || !task.deadline) return null
  const deadline = dayStart(new Date(`${task.deadline}T00:00:00`))
  const daysLeft = Math.round((deadline.getTime() - today.getTime()) / 86_400_000)
  if (daysLeft > 10) return null
  const priority: AttentionPriority = daysLeft < 0 ? 'blocking' : daysLeft <= 2 ? 'important' : 'informational'
  const why = daysLeft < 0
    ? `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) === 1 ? '' : 's'}`
    : daysLeft === 0 ? 'Due today' : `Due in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`
  return { id: `deadline:${task.id}`, source: 'deadline', priority, title: task.title, why, route: '/timeline', actionLabel: 'Open task', date: task.deadline, daysLeft }
}

export const deadlinesFeed: AttentionFeed = (data) => {
  const today = dayStart(new Date())
  return data.tasks
    .map((task) => deadlineItem(task, today))
    .filter((item): item is AttentionItem => Boolean(item))
    .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0))
}

/** Extension seam for L6: data-health and system feeds plug in here. */
export function buildAttention(data: AppData, extraFeeds: AttentionFeed[] = []): AttentionItem[] {
  const now = Date.now()
  return [deadlinesFeed, ...extraFeeds]
    .flatMap((feed) => feed(data))
    .filter((item) => (data.settings.attentionSnoozedUntil[item.id] ?? 0) <= now)
}

export function attentionStatus(items: AttentionItem[], backupEnabled: boolean) {
  const blocking = items.filter((item) => item.priority === 'blocking').length
  const important = items.filter((item) => item.priority === 'important').length
  if (blocking) return { label: `${blocking} overdue`, tone: 'alert' as const }
  if (important) return { label: `${important} due soon`, tone: 'due' as const }
  if (!backupEnabled) return { label: 'Backup off', tone: 'system' as const }
  return { label: 'All clear', tone: 'clear' as const }
}
