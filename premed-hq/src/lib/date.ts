/* Date helpers — countdowns, friendly formats, and a deterministic
   "pick one per day" used by the mascot tip / quote of the day. */

const DAY = 86_400_000

export function startOfDay(d: Date | number = new Date()): number {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

/** Whole days from today until an ISO date (negative = overdue). */
export function daysUntil(iso?: string): number | null {
  if (!iso) return null
  const t = startOfDay(new Date(iso))
  return Math.round((t - startOfDay()) / DAY)
}

export function fmtDate(iso?: string, opts?: Intl.DateTimeFormatOptions): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, opts ?? { month: 'short', day: 'numeric', year: 'numeric' })
}

export function fmtRelative(iso?: string): string {
  const n = daysUntil(iso)
  if (n === null) return ''
  if (n === 0) return 'Today'
  if (n === 1) return 'Tomorrow'
  if (n === -1) return 'Yesterday'
  if (n < 0) return `${Math.abs(n)}d overdue`
  return `${n}d left`
}

export function fmtTimeAgo(epoch: number): string {
  const s = Math.floor((Date.now() - epoch) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(epoch).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/** Integer "day number" — stable for a given calendar day. */
export function dayNumber(d: Date = new Date()): number {
  return Math.floor(startOfDay(d) / DAY)
}

/** Deterministically pick one item from a list based on the date,
 *  so the mascot tip / quote is stable all day and rotates daily. */
export function pickDaily<T>(items: T[], salt = 0): T | undefined {
  if (!items.length) return undefined
  const idx = (dayNumber() + salt) % items.length
  return items[idx]
}

export function timeGreeting(d: Date = new Date()): string {
  const h = d.getHours()
  if (h < 5) return 'Good night'
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
