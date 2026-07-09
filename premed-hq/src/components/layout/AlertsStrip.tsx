import { Link } from 'react-router-dom'
import { AlertTriangle, CalendarClock, CalendarPlus, BookOpenCheck, Users, X } from 'lucide-react'
import { useStore } from '@/store/store'
import { upcomingAlerts, type Alert } from '@/lib/selectors'
import { googleCalendarUrl } from '@/lib/calendar'
import { fmtRelative } from '@/lib/date'
import { cn } from '@/lib/utils'

const KIND_ICON = { exam: BookOpenCheck, meeting: Users, milestone: CalendarClock, task: CalendarClock }

/** A slim band of the most pressing deadlines, pinned at the top of every page.
 *  Each alert offers a one-click "Add to Google Calendar". */
export function AlertsStrip() {
  const tasks = useStore((s) => s.tasks)
  const dismissedAlertKey = useStore((s) => s.settings.dismissedAlertKey)
  const update = useStore((s) => s.update)
  const alerts = upcomingAlerts(tasks).slice(0, 4)
  const alertKey = alerts.map((a) => `${a.id}:${a.date}`).join('|')
  if (!alerts.length || dismissedAlertKey === alertKey) return null

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-[color-mix(in_srgb,var(--warning)_8%,var(--card))] px-4 py-2 md:px-6">
      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[color-mix(in_srgb,var(--warning)_55%,var(--foreground))]">
        <AlertTriangle className="size-3.5" /> Due soon
      </span>
      {alerts.map((a) => (
        <AlertChip key={a.id} a={a} />
      ))}
      <Link to="/timeline" className="ml-auto text-xs font-semibold text-primary hover:underline">
        View all →
      </Link>
      <button
        onClick={() => update((d) => { d.settings.dismissedAlertKey = alertKey })}
        className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss due soon alerts"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}

function AlertChip({ a }: { a: Alert }) {
  const Icon = KIND_ICON[a.kind] ?? CalendarClock
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs font-medium',
        a.severity === 'urgent' ? 'border-destructive/40 text-destructive' : 'border-border'
      )}
    >
      <Icon className="size-3.5 shrink-0" />
      <Link to="/timeline" className="max-w-[12rem] truncate hover:underline">{a.label}</Link>
      <span className={cn('font-bold', a.severity === 'urgent' ? 'text-destructive' : 'text-muted-foreground')}>
        {fmtRelative(a.date)}
      </span>
      <a
        href={googleCalendarUrl({ title: a.label, date: a.date, details: a.sub })}
        target="_blank"
        rel="noopener noreferrer"
        title="Add to Google Calendar"
        className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-primary"
      >
        <CalendarPlus className="size-3.5" />
      </a>
    </span>
  )
}
