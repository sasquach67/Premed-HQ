/* Build an "Add to Google Calendar" template link from a task.
   A practical stand-in for full calendar sync — one click drops the
   deadline into the user's real Google Calendar. */
export function googleCalendarUrl(opts: {
  title: string
  date?: string
  details?: string
}): string {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  const params = new URLSearchParams()
  params.set('text', opts.title)
  if (opts.details) params.set('details', opts.details)
  if (opts.date) {
    const d = new Date(opts.date)
    if (!Number.isNaN(d.getTime())) {
      const ymd = (x: Date) => x.toISOString().slice(0, 10).replace(/-/g, '')
      const next = new Date(d.getTime() + 86_400_000)
      params.set('dates', `${ymd(d)}/${ymd(next)}`) // all-day
    }
  }
  return `${base}&${params.toString()}`
}
