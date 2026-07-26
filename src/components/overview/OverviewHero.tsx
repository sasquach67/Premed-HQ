import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { NumberFlow } from '@/components/motion'
import { useHeroScheduleSource } from '@/components/common/HeroDailySchedule'
import { MascotNote } from '@/components/common/MascotNote'
import { Button } from '@/components/ui/button'
import { formatClock, formatEventTimeRange, normalizeTimedEvents } from '@/lib/schedule'
import { homeBanner, type VisualTheme } from '@/lib/themeAssets'
import { useStore } from '@/store/store'
import { cn } from '@/lib/utils'

function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'there'
}

function secondsLeft(ms: number) {
  return Math.max(0, Math.floor(ms / 1000))
}

function hms(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function shortDuration(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 60000))
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  if (!hours) return `${minutes}m`
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`
}

export function OverviewHero() {
  const visualTheme = useStore((state) => state.settings.visualTheme)
  const name = useStore((state) => state.profile.name)
  const schedule = useHeroScheduleSource()
  const now = useNow()
  const dateLine = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <section
      aria-labelledby="overview-heading"
      className="relative min-h-[16rem] overflow-hidden rounded-3xl border border-border bg-card shadow-lg md:min-h-[17rem]"
    >
      <ThemedHomeImage key={visualTheme} visualTheme={visualTheme} />
      <div className="absolute inset-0 bg-slate-950/52 dark:bg-slate-950/64" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/52 to-slate-950/26" />
      <div className="relative grid min-h-[16rem] gap-5 p-5 text-white md:min-h-[17rem] md:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(23rem,.9fr)] lg:items-center">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/72">
            {dateLine} · <span className="tabular-nums">{formatClock(now, '12h')}</span>
          </p>
          <h1
            id="overview-heading"
            className="mt-1 text-balance font-display text-[clamp(2rem,3.2vw,2.75rem)] font-extrabold leading-none"
          >
            Good to see you again, {firstName(name)}!
          </h1>
          <HeroLiveStatus schedule={schedule} now={now} />
        </div>
        <TodaySchedulePanel schedule={schedule} now={now} />
      </div>
    </section>
  )
}

function HeroLiveStatus({ schedule, now }: { schedule: ReturnType<typeof useHeroScheduleSource>; now: Date }) {
  const analysis = useMemo(() => normalizeTimedEvents(schedule.events, now), [schedule.events, now])
  const previous = analysis.timedEvents.filter((event) => event.endDate <= now).at(-1)
  const dayEnd = useMemo(() => {
    const date = new Date(now)
    date.setHours(23, 59, 59, 999)
    return date
  }, [now])

  let eyebrow = 'Free window'
  let title = previous ? 'Open focus time' : 'Open block'
  let detail = 'until midnight'
  let remaining = secondsLeft(dayEnd.getTime() - now.getTime())
  let progress = 0

  if (analysis.current) {
    const left = analysis.current.endDate.getTime() - now.getTime()
    const duration = Math.max(1, analysis.current.endDate.getTime() - analysis.current.startDate.getTime())
    eyebrow = 'Happening now'
    title = analysis.current.title
    remaining = secondsLeft(left)
    progress = Math.min(100, Math.max(0, ((now.getTime() - analysis.current.startDate.getTime()) / duration) * 100))
    detail = `Ends ${formatClock(analysis.current.endDate, schedule.calendar.timeFormat)}`
  } else if (analysis.next) {
    const until = analysis.next.startDate.getTime() - now.getTime()
    eyebrow = previous ? 'Free window' : 'Next up'
    title = analysis.next.title
    remaining = secondsLeft(until)
    progress = previous ? 100 : 0
    detail = previous
      ? `${shortDuration(until)} until start`
      : `Starts ${formatClock(analysis.next.startDate, schedule.calendar.timeFormat)}`
  }

  return (
    <div className="mt-4 w-full max-w-[28rem] rounded-3xl border border-white/14 bg-slate-950/48 px-5 py-4 text-left shadow-lg shadow-black/15 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary/90">{eyebrow}</p>
          <p className="mt-1 truncate text-sm font-extrabold text-white">{title}</p>
        </div>
        <Badge className="border-white/10 bg-white/8 text-white/72">{detail}</Badge>
      </div>
      <NumberFlow
        value={remaining}
        format={hms}
        className="mt-3 font-display text-[clamp(2.5rem,5vw,3.75rem)] font-extrabold leading-none text-white"
      />
      <span className="sr-only">Countdown updates continuously.</span>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/16">
        <div
          className="h-full rounded-full bg-primary shadow-[0_0_18px_rgba(116,192,252,.32)] transition-[width] duration-200"
          style={{ width: `${progress || 14}%` }}
        />
      </div>
    </div>
  )
}

function TodaySchedulePanel({ schedule, now }: { schedule: ReturnType<typeof useHeroScheduleSource>; now: Date }) {
  const analysis = useMemo(() => normalizeTimedEvents(schedule.events, now), [schedule.events, now])
  const visible = analysis.timedEvents.slice(0, 4)
  const dayStart = useMemo(() => {
    const date = new Date(now)
    date.setHours(6, 0, 0, 0)
    return date
  }, [now])
  const dayEnd = useMemo(() => {
    const date = new Date(now)
    date.setHours(23, 0, 0, 0)
    return date
  }, [now])
  const span = Math.max(1, dayEnd.getTime() - dayStart.getTime())
  const timelinePercent = (date: Date) => Math.min(98, Math.max(2, ((date.getTime() - dayStart.getTime()) / span) * 100))

  return (
    <div className="relative rounded-3xl border border-white/14 bg-slate-950/58 p-4 shadow-xl backdrop-blur-md">
      {!schedule.connected && !!visible.length && (
        <button
          type="button"
          onClick={() => { void schedule.connect(new Date()) }}
          disabled={!schedule.configured || schedule.status === 'connecting'}
          className="absolute right-6 top-4 z-20 rounded-full border border-white/10 bg-slate-950/62 px-3 py-1 text-[11px] font-extrabold text-primary shadow-sm backdrop-blur transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-45"
        >
          Connect
        </button>
      )}
      <div className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 shadow-inner shadow-black/10">
        {!visible.length && (
          <MascotNote
            variant="empty-state"
            priority={10}
            title="No timed events today"
            actions={!schedule.connected
              ? schedule.configured ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => { void schedule.connect(new Date()) }}
                  disabled={!schedule.configured || schedule.status === 'connecting'}
                >
                  Connect calendar
                </Button>
              ) : <Button asChild size="sm"><Link to="/settings">Set up calendar</Link></Button>
              : <Button type="button" size="sm" onClick={() => document.getElementById('overview-tasks-heading')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Review today’s tasks</Button>}
            className="border-white/20 text-white"
          >
            <span className="text-white/75">
              {schedule.connected ? 'Your calendar is clear—use this window for the next important task.' : 'Connect your calendar to place today’s real schedule here.'}
            </span>
          </MascotNote>
        )}
        {!!visible.length && (
          <>
            <div className="relative h-8" role="img" aria-label="Today’s schedule timeline">
              <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/55" />
              <div
                className="absolute top-1/2 z-20 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary"
                style={{ left: `${timelinePercent(now)}%` }}
              />
              {visible.map((event) => {
                const active = analysis.current?.id === event.id
                const past = event.endDate <= now
                const start = timelinePercent(event.startDate)
                const end = timelinePercent(event.endDate)
                return (
                  <div key={event.id}>
                    <div
                      className={cn('absolute top-1/2 z-10 h-1.5 -translate-y-1/2 rounded-full', active ? 'bg-primary' : past ? 'bg-white/20' : 'bg-leaf/70')}
                      style={{ left: `${start}%`, width: `${Math.max(2.5, end - start)}%` }}
                    />
                    <div
                      className="absolute top-1/2 z-20 h-4 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90"
                      style={{ left: `${start}%` }}
                    />
                  </div>
                )
              })}
            </div>
            <div className="mt-2 space-y-1.5">
              {visible.slice(0, 3).map((event) => {
                const active = analysis.current?.id === event.id
                const past = event.endDate <= now
                return (
                  <div key={event.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)_4.5rem] items-center gap-2 text-xs">
                    <span className="tabular-nums font-bold text-white/55">{formatClock(event.startDate, schedule.calendar.timeFormat).replace(/:00/g, '')}</span>
                    <span className={cn('truncate font-extrabold', active ? 'text-primary' : past ? 'text-white/45 line-through' : 'text-white/86')}>{event.title}</span>
                    <span className={cn('truncate text-right text-[11px] font-bold tabular-nums', active ? 'text-primary' : 'text-white/55')}>
                      {active
                        ? hms(secondsLeft(event.endDate.getTime() - now.getTime())).replace(/^0:/, '')
                        : formatEventTimeRange(event, schedule.calendar.timeFormat).split('-')[1]?.trim()}
                    </span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ThemedHomeImage({ visualTheme }: { visualTheme: VisualTheme }) {
  const sources = visualTheme === 'doraemon'
    ? [homeBanner('doraemon'), homeBanner('ghibli')]
    : [homeBanner('ghibli')]
  const [index, setIndex] = useState(0)

  return (
    <img
      src={sources[index]}
      alt=""
      draggable={false}
      onError={() => setIndex((current) => Math.min(current + 1, sources.length - 1))}
      className="absolute inset-0 size-full object-cover"
    />
  )
}
