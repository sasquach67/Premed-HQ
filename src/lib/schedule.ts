import type { CalendarSettings, NormalizedScheduleEvent } from '@/lib/types'

export type TimelineEventState = 'past' | 'current' | 'next' | 'future'

export interface TimedScheduleEvent extends NormalizedScheduleEvent {
  startDate: Date
  endDate: Date
}

export interface ScheduleAnalysis {
  timedEvents: TimedScheduleEvent[]
  allDayEvents: NormalizedScheduleEvent[]
  current: TimedScheduleEvent | null
  next: TimedScheduleEvent | null
  status: 'current' | 'upcoming' | 'free' | 'done' | 'empty'
}

export interface TimelineRange {
  startMinute: number
  endMinute: number
}

const DEFAULT_DURATION_MS = 50 * 60 * 1000

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function localIsoFor(date: Date, hour: number, minute = 0) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute).toISOString()
}

export function createMockDailyEvents(date = new Date()): NormalizedScheduleEvent[] {
  return [
    {
      id: 'mock-1',
      title: 'CHEM 101 Lecture',
      start: localIsoFor(date, 9),
      end: localIsoFor(date, 9, 50),
      location: 'Genome Sciences 100',
      calendarId: 'mock',
      color: 'var(--cat-gpa)',
      status: 'confirmed',
    },
    {
      id: 'mock-2',
      title: 'Neuroscience Seminar',
      start: localIsoFor(date, 11),
      end: localIsoFor(date, 12, 15),
      calendarId: 'mock',
      color: 'var(--cat-research)',
      status: 'confirmed',
    },
    {
      id: 'mock-3',
      title: 'Clinical Shift',
      start: localIsoFor(date, 15),
      end: localIsoFor(date, 19),
      location: 'UNC Medical Center',
      calendarId: 'mock',
      color: 'var(--cat-clinical)',
      status: 'confirmed',
    },
  ]
}

export function isSameLocalDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

export function startOfLocalDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
}

export function endOfLocalDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}

export function minuteOfDay(date: Date) {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60
}

export function parseClock(value: string | undefined, fallback: number) {
  if (!value) return fallback
  const [h, m = '0'] = value.split(':')
  const hour = Number(h)
  const minute = Number(m)
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return fallback
  return Math.max(0, Math.min(24 * 60, hour * 60 + minute))
}

export function normalizeTimedEvents(events: NormalizedScheduleEvent[], now = new Date()): ScheduleAnalysis {
  const timedEvents: TimedScheduleEvent[] = []
  const allDayEvents: NormalizedScheduleEvent[] = []

  for (const event of events) {
    if (!event || event.status === 'cancelled') continue
    if (event.allDay) {
      const start = new Date(event.start)
      if (!Number.isNaN(start.valueOf()) && isSameLocalDay(start, now)) allDayEvents.push(event)
      continue
    }

    const startDate = new Date(event.start)
    if (Number.isNaN(startDate.valueOf())) continue
    let endDate = event.end ? new Date(event.end) : new Date(startDate.getTime() + DEFAULT_DURATION_MS)
    if (Number.isNaN(endDate.valueOf())) endDate = new Date(startDate.getTime() + DEFAULT_DURATION_MS)
    if (endDate <= startDate) endDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000)

    const touchesToday = isSameLocalDay(startDate, now) || isSameLocalDay(endDate, now) || (startDate < startOfLocalDay(now) && endDate > endOfLocalDay(now))
    if (touchesToday) timedEvents.push({ ...event, startDate, endDate })
  }

  timedEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

  const current = timedEvents.find((event) => event.startDate <= now && now < event.endDate) ?? null
  const next = timedEvents.find((event) => event.startDate > now) ?? null
  const status = current ? 'current' : next ? (next.startDate.getTime() - now.getTime() > 5 * 60 * 1000 ? 'free' : 'upcoming') : timedEvents.length ? 'done' : 'empty'

  return { timedEvents, allDayEvents, current, next, status }
}

export function resolveTimelineRange(events: TimedScheduleEvent[], settings: Pick<CalendarSettings, 'timelineStart' | 'timelineEnd'>): TimelineRange {
  let startMinute = parseClock(settings.timelineStart, 6 * 60)
  let endMinute = parseClock(settings.timelineEnd, 23 * 60)
  if (endMinute <= startMinute) endMinute = startMinute + 17 * 60

  for (const event of events) {
    const eventStart = minuteOfDay(event.startDate)
    const eventEnd = event.endDate.getDate() !== event.startDate.getDate()
      ? 24 * 60
      : minuteOfDay(event.endDate)
    startMinute = Math.min(startMinute, Math.floor(eventStart / 30) * 30)
    endMinute = Math.max(endMinute, Math.ceil(eventEnd / 30) * 30)
  }

  return {
    startMinute: Math.max(0, startMinute),
    endMinute: Math.min(24 * 60, Math.max(startMinute + 60, endMinute)),
  }
}

export function timelinePercent(minute: number, range: TimelineRange) {
  return Math.max(0, Math.min(100, ((minute - range.startMinute) / (range.endMinute - range.startMinute)) * 100))
}

export function eventState(event: TimedScheduleEvent, now: Date, nextId?: string): TimelineEventState {
  if (event.startDate <= now && now < event.endDate) return 'current'
  if (event.id === nextId) return 'next'
  if (event.endDate <= now) return 'past'
  return 'future'
}

export function eventProgress(event: TimedScheduleEvent, now: Date) {
  const total = event.endDate.getTime() - event.startDate.getTime()
  if (total <= 0) return 0
  return Math.max(0, Math.min(100, ((now.getTime() - event.startDate.getTime()) / total) * 100))
}

export function formatEventTimeRange(event: TimedScheduleEvent | NormalizedScheduleEvent, format: CalendarSettings['timeFormat'] = '12h') {
  if (event.allDay) return 'All day'
  const opts: Intl.DateTimeFormatOptions = format === '24h'
    ? { hour: '2-digit', minute: '2-digit', hour12: false }
    : { hour: 'numeric', minute: '2-digit' }
  const start = new Date(event.start)
  const end = event.end ? new Date(event.end) : null
  if (Number.isNaN(start.valueOf())) return ''
  if (!end || Number.isNaN(end.valueOf())) return start.toLocaleTimeString(undefined, opts)
  return `${start.toLocaleTimeString(undefined, opts)}-${end.toLocaleTimeString(undefined, opts)}`
}

export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  if (hours > 0) return `${hours} hr ${minutes} min`
  if (minutes > 0) return `${minutes} min ${pad(seconds)} sec`
  return `${seconds} sec`
}

export function formatClock(date: Date, format: CalendarSettings['timeFormat'] = '12h') {
  return date.toLocaleTimeString(undefined, format === '24h'
    ? { hour: '2-digit', minute: '2-digit', hour12: false }
    : { hour: 'numeric', minute: '2-digit' })
}
