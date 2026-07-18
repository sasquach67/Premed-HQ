import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain, CalendarClock, CheckCircle2,
  GraduationCap, Lightbulb, Microscope, Play, Plus, Sparkles,
  Stethoscope, Target, Trophy,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { gpaStats, fmtGpa, hourTotals, bestMcat, percent, upcomingAlerts } from '@/lib/selectors'
import { daysUntil, fmtRelative, pickDaily, fmtTimeAgo } from '@/lib/date'
import { formatClock, formatEventTimeRange, normalizeTimedEvents } from '@/lib/schedule'
import { MCAT_QOTD } from '@/data/mcatQotd'
import { PREPCAT_CONTENT_COUNTS } from '@/data/prepcatContent'
import { uid } from '@/lib/id'
import { homeBanner, type VisualTheme } from '@/lib/themeAssets'
import type { TaskItem, TaskProgress, TaskType, TipEntry } from '@/lib/types'
import { Ram } from '@/components/mascot/Ram'
import { McatSessionSetupDialog } from '@/components/mcat/McatSessionSetupDialog'
import { SegmentedBar } from '@/components/common/SegmentedBar'
import { InfoTip } from '@/components/common/InfoTip'
import { useHeroScheduleSource } from '@/components/common/HeroDailySchedule'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const ROADMAP = [
  { id: 'foundation', label: 'Foundation', date: 'Fall 2026', route: 'academics', detail: 'Start UNC strong, protect GPA, build study systems.' },
  { id: 'chem', label: 'Chem sequence', date: '2027-2028', route: 'academics', detail: 'CHEM 241/L → 261 → 262/L.' },
  { id: 'biochem', label: 'Biochem', date: 'Fall 2028', route: 'academics', detail: 'CHEM 430 is the last MCAT content domino.' },
  { id: 'mcat', label: 'MCAT', date: 'Jan-Apr 2029', route: 'mcat', detail: 'Study winter to spring, sit with score buffer.' },
  { id: 'prep', label: 'Application prep', date: 'Spring 2029', route: 'essays', detail: 'LORs, PS, activities, school list.' },
  { id: 'primary', label: 'Primary submit', date: 'May-Jun 2029', route: 'timeline', detail: 'Submit early for rolling admissions.' },
  { id: 'interviews', label: 'Secondaries + interviews', date: 'Summer-Winter 2029', route: 'timeline', detail: 'Fast secondaries, prepared interviews.' },
  { id: 'matriculate', label: 'Matriculate', date: 'Fall 2030', route: 'profile', detail: 'No forced gap year on the default plan.' },
]

const OVERVIEW_GUIDE_TIPS: TipEntry[] = [
  {
    id: 'overview-tip-mcat-library',
    text: `MCAT Content has the motherload: ${PREPCAT_CONTENT_COUNTS.guide} guides, ${PREPCAT_CONTENT_COUNTS['hack-sheet']} cheat sheets, pathways, and drills.`,
    source: 'MCAT guide',
    tag: 'andy',
    pillar: 'mcat',
  },
  {
    id: 'overview-tip-mistake-map',
    text: 'Drop missed-question screenshots into Mistakes, then let the review queue point you back to weak topics.',
    source: 'MCAT guide',
    tag: 'andy',
    pillar: 'mcat',
  },
  {
    id: 'overview-tip-class-center',
    text: 'Class Center is for daily execution: notes, topics, weak areas, and what to study next.',
    source: 'Ultimate Guide',
    tag: 'andy',
    pillar: 'academics',
  },
  {
    id: 'overview-tip-roadmap',
    text: 'The roadmap is the big picture; Today and Class Center are where the next move actually happens.',
    source: 'Ultimate Guide',
    tag: 'andy',
  },
  {
    id: 'overview-tip-school-list',
    text: 'Use the school list for fit signals early, not just stats right before applications.',
    source: 'Application guide',
    tag: 'andy',
    pillar: 'schools',
  },
  {
    id: 'overview-tip-assignments',
    text: 'Linked assignments can feed deadlines, revision, and the weekly plan.',
    source: 'Class Center',
    tag: 'andy',
    pillar: 'academics',
  },
]

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}

function hms(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function shortDuration(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 60000))
  const h = Math.floor(total / 60)
  const m = total % 60
  if (h <= 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || 'Andy'
}

export function Home() {
  const s = useStore()
  const gpa = useMemo(() => gpaStats(s.courses), [s.courses])
  const hours = useMemo(() => hourTotals(s.experiences), [s.experiences])
  const best = bestMcat(s.mcat)
  const qotd = pickDaily(MCAT_QOTD, 13) ?? MCAT_QOTD[0]
  const alerts = upcomingAlerts(s.tasks, { horizon: 14 }).slice(0, 5)

  return (
    <div className="space-y-5">
      <Hero />
      <div className="grid gap-5 xl:grid-cols-[minmax(24rem,1fr)_minmax(20rem,.72fr)]">
        <TaskWorkspace />
        <AtAGlance gpa={gpa} hours={hours} best={best} />
      </div>
      <McatOverviewCard qotd={qotd} />
      <PremedRoadmap />
      <UpcomingPanel alerts={alerts} />
      <LowerWidgets qotd={qotd} />
    </div>
  )
}

function Hero() {
  const tips = useStore((s) => s.tips)
  const visualTheme = useStore((s) => s.settings.visualTheme)
  const name = useStore((s) => s.profile.name)
  const schedule = useHeroScheduleSource()
  const now = useNow(1000)
  const heroTips = useMemo(() => {
    const byId = new Map<string, TipEntry>()
    ;[...tips, ...OVERVIEW_GUIDE_TIPS].forEach((tip) => byId.set(tip.id, tip))
    return [...byId.values()]
  }, [tips])
  const nudge = pickDaily(heroTips, 5)
  const dateLine = now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <section className="relative min-h-[21rem] overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:min-h-[23rem]">
      <ThemedHomeImage visualTheme={visualTheme} />
      <div className="absolute inset-0 bg-slate-950/50 dark:bg-slate-950/62" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/86 via-slate-950/50 to-slate-950/28" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(255,255,255,.08),transparent_34%),linear-gradient(to_top,rgba(2,6,23,.5),transparent_58%)]" />
      <div className="relative grid min-h-[21rem] gap-7 p-6 text-white md:min-h-[23rem] md:p-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(25rem,.96fr)] lg:items-center">
        <div className="min-w-0 space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/72">
            {dateLine} · <span className="tabular-nums">{formatClock(now, '12h')}</span>
          </p>
          <h1 className="max-w-full text-balance font-display text-[clamp(2rem,2.55vw,2.55rem)] font-extrabold leading-[0.98] lg:whitespace-nowrap">
            Good to see you again, {firstName(name)}!
          </h1>
          <HeroLiveStatus schedule={schedule} now={now} />
          {nudge && <HeroMascotNudge tip={nudge} />}
        </div>
        <TodaySchedulePanel schedule={schedule} now={now} />
      </div>
    </section>
  )
}

function HeroMascotNudge({ tip }: { tip: TipEntry }) {
  return (
    <div className="hidden max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/34 px-3 py-2 shadow-sm backdrop-blur-sm sm:inline-flex">
      <Ram size={38} className="pointer-events-none shrink-0 drop-shadow-md" />
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold leading-snug text-white/68">{tip.text}</p>
        <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white/42">{tip.source}</p>
      </div>
    </div>
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
  let timer = hms(dayEnd.getTime() - now.getTime())
  let progress = 0

  if (analysis.current) {
    const left = analysis.current.endDate.getTime() - now.getTime()
    const duration = Math.max(1, analysis.current.endDate.getTime() - analysis.current.startDate.getTime())
    const elapsed = now.getTime() - analysis.current.startDate.getTime()
    eyebrow = 'Happening now'
    title = analysis.current.title
    timer = hms(left)
    progress = Math.min(100, Math.max(0, (elapsed / duration) * 100))
    detail = `Ends ${formatClock(analysis.current.endDate, schedule.calendar.timeFormat)}`
  } else if (analysis.next) {
    const until = analysis.next.startDate.getTime() - now.getTime()
    const isFreeWindow = Boolean(previous)
    eyebrow = isFreeWindow ? 'Free window' : 'Next up'
    title = analysis.next.title
    timer = hms(until)
    progress = isFreeWindow ? 100 : 0
    detail = isFreeWindow
      ? `${shortDuration(until)} until start`
      : `Starts ${formatClock(analysis.next.startDate, schedule.calendar.timeFormat)}`
  } else {
    const windowStart = previous?.endDate ?? new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    const totalWindow = Math.max(1, dayEnd.getTime() - windowStart.getTime())
    const elapsedWindow = Math.max(0, now.getTime() - windowStart.getTime())
    progress = Math.min(100, Math.max(8, (elapsedWindow / totalWindow) * 100))
  }

  return (
    <div className="w-full max-w-[28rem] rounded-3xl border border-white/14 bg-slate-950/48 px-5 py-4 text-left shadow-lg shadow-black/15 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary/90">{eyebrow}</p>
          <p className="mt-1 truncate text-sm font-extrabold text-white">{title}</p>
        </div>
        <p className="shrink-0 text-xs font-bold text-white/62">{detail}</p>
      </div>
      {timer ? (
        <div className="mt-3">
          <p className="font-display text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-none text-white tabular-nums">
            {timer}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/16">
            <div
              className="h-full rounded-full bg-primary shadow-[0_0_18px_rgba(116,192,252,.32)] transition-[width] duration-500"
              style={{ width: `${timer && progress ? progress : 14}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm font-semibold text-white/68">{detail}</p>
      )}
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
      {!schedule.connected && (
        <button
          onClick={() => { void schedule.connect(new Date()) }}
          disabled={!schedule.configured || schedule.status === 'connecting'}
          className="absolute right-4 top-3 z-20 rounded-full border border-white/10 bg-slate-950/62 px-2.5 py-1 text-[11px] font-extrabold text-primary/90 shadow-sm backdrop-blur transition hover:bg-white/8 disabled:opacity-45"
        >
          Connect
        </button>
      )}
      <div className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 shadow-inner shadow-black/10">
        {visible.length === 0 && <p className="py-3 text-sm font-semibold text-white/65">No timed events today.</p>}
        {visible.length > 0 && (
          <div className="relative h-9" role="img" aria-label="Today’s schedule timeline">
            <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-white/55" />
            <div
              className="absolute top-1/2 z-20 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary"
              style={{ left: `${timelinePercent(now)}%` }}
              aria-label="Current time"
            />
            {visible.map((event) => {
              const active = analysis.current?.id === event.id
              const past = event.endDate <= now
              const start = timelinePercent(event.startDate)
              const end = timelinePercent(event.endDate)
              return (
                <div key={event.id}>
                  <div
                    className={cn(
                      'absolute top-1/2 z-10 h-1.5 -translate-y-1/2 rounded-full',
                      active ? 'bg-primary' : past ? 'bg-white/20' : 'bg-leaf/70'
                    )}
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
        )}
        {visible.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {visible.slice(0, 3).map((event) => {
              const active = analysis.current?.id === event.id
              const past = event.endDate <= now
              const left = Math.max(0, event.endDate.getTime() - now.getTime())
              return (
                <div key={event.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)_4.5rem] items-center gap-2 text-xs">
                  <span className="tabular-nums font-bold text-white/55">{formatClock(event.startDate, schedule.calendar.timeFormat).replace(/:00/g, '')}</span>
                  <span className={cn('min-w-0 truncate font-extrabold', active ? 'text-primary' : past ? 'text-white/45 line-through' : 'text-white/86')}>
                    {event.title}
                  </span>
                  <span className={cn('truncate text-right text-[11px] font-bold tabular-nums', active ? 'text-primary' : 'text-white/55')}>
                    {active ? `${hms(left).replace(/^0:/, '')}` : formatEventTimeRange(event, schedule.calendar.timeFormat).split('-')[1]?.trim() ?? ''}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function ThemedHomeImage({ visualTheme }: { visualTheme: VisualTheme }) {
  const sources = visualTheme === 'doraemon'
    ? [homeBanner('doraemon'), homeBanner('ghibli')]
    : [homeBanner('ghibli')]
  const [idx, setIdx] = useState(0)

  useEffect(() => setIdx(0), [visualTheme])

  return (
    <img
      src={sources[idx]}
      alt=""
      draggable={false}
      onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
      className="absolute inset-0 size-full object-cover"
    />
  )
}

function TaskWorkspace() {
  const mode = useStore((s) => s.settings.overviewTaskMode)
  const tasks = useStore((s) => s.tasks)
  const focusTargets = useStore((s) => s.focusTargets)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const addItem = useStore((s) => s.addItem)
  const update = useStore((s) => s.update)
  const logActivity = useStore((s) => s.logActivity)
  const [open, setOpen] = useState(false)
  const [quickTitle, setQuickTitle] = useState('')

  const active = tasks
    .filter((t) => !t.archived && t.progress !== 'Finished' && !t.milestone)
    .sort((a, b) => (daysUntil(a.deadline) ?? 999) - (daysUntil(b.deadline) ?? 999))
  const shown = (mode === 'today' ? active.filter((t) => {
    const d = daysUntil(t.deadline)
    return d != null && d <= 7
  }) : active).slice(0, 5)
  const pinned = focusTargets.filter((f) => !f.done).slice(0, 3)
  const dueSoon = active.filter((t) => {
    const d = daysUntil(t.deadline)
    return d != null && d <= 7
  }).length

  function quickAdd(e: FormEvent) {
    e.preventDefault()
    const title = quickTitle.trim()
    if (!title) return
    addItem('tasks', {
      id: uid(), title, type: 'Personal', progress: 'Not started',
      kanban: 'todo', archived: false, milestone: false, order: 0,
    })
    logActivity('timeline', `Added task: ${title}`)
    setQuickTitle('')
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="flex-row items-center justify-between gap-3 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle2 className="size-5 text-primary" /> Tasks
          <span className="text-xs font-semibold text-muted-foreground">· {shown.length} shown, {dueSoon} due soon</span>
          <InfoTip label="Tasks are dated workflow items. Pinned focus targets stay at the top for the day." />
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setOpen(true)}><Plus className="size-4" /> Add</Button>
          <Button asChild size="sm" variant="outline"><Link to="/timeline">Timeline</Link></Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-muted/55 p-1">
          {(['today', 'all'] as const).map((m) => (
            <button
              key={m}
              onClick={() => update((d) => { d.settings.overviewTaskMode = m })}
              className={cn('flex-1 rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition', mode === m ? 'bg-card shadow-sm' : 'text-muted-foreground hover:text-foreground')}
            >
              {m === 'today' ? 'Today' : 'All active'}
            </button>
          ))}
        </div>

        {pinned.length > 0 && (
          <section className="space-y-1">
            {pinned.map((f) => (
              <div key={f.id} className="group flex items-center gap-2 rounded-xl bg-secondary/45 px-2 py-2">
                <Checkbox checked={f.done} onCheckedChange={(v) => patchItem('focusTargets', f.id, { done: Boolean(v) })} />
                <span className="min-w-0 flex-1 truncate text-sm font-bold">{f.text}</span>
                <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">Pinned</span>
                <button onClick={() => removeItem('focusTargets', f.id)} className="rounded p-1 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100" aria-label="Remove focus target">×</button>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-1">
          {shown.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border py-6 text-center text-sm text-muted-foreground">Nothing urgent here. Add a task or switch to all active.</p>
          ) : shown.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onFinish={() => { patchItem('tasks', t.id, { progress: 'Finished', archived: true }); logActivity('timeline', `Finished: ${t.title}`) }}
            />
          ))}
        </section>

        <form onSubmit={quickAdd} className="flex items-center gap-2 border-t border-dashed border-border pt-3">
          <Input
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="Quick add — type and hit enter..."
            className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
          />
          <Button type="submit" size="sm" variant="ghost" disabled={!quickTitle.trim()}>Add</Button>
        </form>
      </CardContent>
      <AddTaskDialog open={open} onOpenChange={setOpen} />
    </Card>
  )
}

function McatOverviewCard({ qotd }: { qotd: (typeof MCAT_QOTD)[number] }) {
  const mcat = useStore((s) => s.mcat)
  const misses = mcat.errorLog.filter((e) => !e.resolved).length
  const schedule = mcat.schedule
  const done = schedule.filter((s) => s.done).length
  const phase = schedule.find((s) => !s.done)?.phase ?? 'Foundation'
  const firstOpenIndex = schedule.findIndex((s) => !s.done)
  const activeIndex = firstOpenIndex === -1 ? Math.max(0, schedule.length - 1) : firstOpenIndex
  const planProgress = schedule.length ? Math.round((done / schedule.length) * 100) : 0

  return (
    <Card className="overflow-hidden border-primary/25 bg-gradient-to-r from-card via-primary/8 to-leaf/10">
      <CardContent className="space-y-4 p-4">
        <div className="grid gap-4 xl:grid-cols-[minmax(17rem,.7fr)_minmax(19rem,.95fr)_minmax(18rem,.9fr)] xl:items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Brain className="size-5 text-primary" />
              <h2 className="font-display text-2xl font-extrabold">MCAT</h2>
            </div>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-primary">{phase} phase</p>
            <p className="mt-2 max-w-sm text-sm font-semibold text-muted-foreground">
              Launch a timed block, then move through the ultimate study plan one clean week at a time.
            </p>
          </div>

          <McatSessionSetupDialog
            triggerClassName="group flex min-h-24 items-center justify-between rounded-3xl border border-leaf/35 bg-leaf/12 px-5 py-4 text-left text-leaf transition hover:-translate-y-0.5 hover:bg-leaf/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            trigger={(
              <>
                <span>
                  <span className="flex items-center gap-2 text-lg font-extrabold"><Play className="size-5 fill-current" /> Start session</span>
                  <span className="mt-1 block text-sm font-semibold text-muted-foreground">choose goal, length, and focus</span>
                </span>
                <span className="text-xl font-extrabold transition-transform group-hover:translate-x-0.5">→</span>
              </>
            )}
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[.8fr_.8fr_1.1fr]">
            <div className="rounded-2xl bg-card/70 p-3 ring-1 ring-border/60">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">QOTD</p>
              <p className="mt-1 text-sm font-bold">1 waiting</p>
              <p className="text-xs font-semibold text-muted-foreground">{qotd.section}</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-3 ring-1 ring-border/60">
              <p className="text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">Missed Qs</p>
              <p className="mt-1 text-sm font-bold">{misses} review</p>
              <Link to="/mcat" className="text-xs font-bold text-primary">open bank</Link>
            </div>
            <div className="rounded-2xl bg-card/70 p-3 ring-1 ring-border/60 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold">Plan progress</span>
                <span className="text-xs font-bold text-primary">{planProgress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <span className="block h-full rounded-full bg-primary" style={{ width: `${planProgress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/65 bg-card/58 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-primary/12 text-primary"><Target className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold">Ultimate MCAT study plan</p>
              <p className="text-xs font-semibold text-muted-foreground">
                Week {Math.min(schedule.length || 1, activeIndex + 1)} of {schedule.length || 1} · {phase}
              </p>
            </div>
            <Button asChild size="sm" variant="outline"><Link to="/mcat">Roadmap</Link></Button>
          </div>

          <div className="mt-4 overflow-x-auto pb-1">
            <ol className="grid min-w-[58rem] grid-cols-8 gap-3">
              {schedule.map((item, index) => {
                const state = item.done ? 'done' : index === activeIndex ? 'current' : 'future'
                return (
                  <li key={item.id} className="relative">
                    {index > 0 && (
                      <span
                        className={cn(
                          'absolute left-[-0.75rem] top-4 h-0.5 w-3 bg-border',
                          (state === 'done' || state === 'current') && 'bg-primary/65'
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <Link to="/mcat" className="block rounded-2xl p-2 transition hover:bg-muted/50">
                      <span
                        className={cn(
                          'grid size-8 place-items-center rounded-full border-2 bg-card text-xs font-extrabold',
                          state === 'done' && 'border-success bg-success text-success-foreground',
                          state === 'current' && 'border-primary bg-primary text-primary-foreground shadow-[0_0_0_5px_color-mix(in_srgb,var(--primary)_18%,transparent)]',
                          state === 'future' && 'border-border text-muted-foreground'
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="mt-2 block text-xs font-extrabold uppercase tracking-wide text-primary">{item.phase}</span>
                      <span className="mt-1 block min-h-8 text-xs font-semibold leading-snug text-foreground">{item.focus}</span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Quick resources</span>
          {['UWorld', 'Anki', 'Notes'].map((label) => (
            <Link key={label} to="/mcat" className="rounded-full bg-card/70 px-3 py-1.5 text-xs font-extrabold text-primary ring-1 ring-border/60 hover:bg-muted">
              {label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TaskRow({ task, onFinish }: { task: TaskItem; onFinish: () => void }) {
  const d = daysUntil(task.deadline)
  return (
    <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted/50">
      <Checkbox checked={false} onCheckedChange={onFinish} />
      <Link to="/timeline" className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold">{task.title}</span>
        <span className="text-xs text-muted-foreground">{task.course || task.type}</span>
      </Link>
      {task.deadline && <span className={cn('shrink-0 text-xs font-bold', d != null && d <= 2 ? 'text-destructive' : 'text-muted-foreground')}>{fmtRelative(task.deadline)}</span>}
    </div>
  )
}

function AddTaskDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const addItem = useStore((s) => s.addItem)
  const logActivity = useStore((s) => s.logActivity)
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [type, setType] = useState<TaskType>('Personal')
  const [progress, setProgress] = useState<TaskProgress>('Not started')
  const [notes, setNotes] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addItem('tasks', {
      id: uid(), title: title.trim(), type, deadline: deadline || undefined,
      progress, kanban: progress === 'Working on' ? 'doing' : 'todo', notes,
      archived: false, milestone: false, order: 0,
    })
    logActivity('timeline', `Added task: ${title.trim()}`)
    setTitle(''); setDeadline(''); setType('Personal'); setProgress('Not started'); setNotes('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
          <DialogDescription>Creates a Timeline task and shows it here when active.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm font-bold">Task name<Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus /></label>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block text-sm font-bold">Date<Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label>
            <label className="block text-sm font-bold">Category
              <select value={type} onChange={(e) => setType(e.target.value as TaskType)} className="mt-1 h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
                {(['Assignment', 'Exam', 'Application', 'Meeting', 'Advising', 'Personal', 'Other'] as TaskType[]).map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <label className="block text-sm font-bold">Status
              <select value={progress} onChange={(e) => setProgress(e.target.value as TaskProgress)} className="mt-1 h-10 w-full rounded-md border border-input bg-card px-3 text-sm">
                {(['Not started', 'Working on', 'Finished'] as TaskProgress[]).map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
          </div>
          <label className="block text-sm font-bold">Notes<Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} /></label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function UpcomingPanel({ alerts }: { alerts: ReturnType<typeof upcomingAlerts> }) {
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><CalendarClock className="size-5 text-primary" /> Soon</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {alerts.length === 0 && <p className="text-sm text-muted-foreground">No dated tasks inside the next two weeks.</p>}
        {alerts.map((a) => (
          <Link key={a.id} to="/timeline" className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 hover:bg-muted/50">
            <span className={cn('size-2.5 rounded-full', a.severity === 'urgent' ? 'bg-destructive' : a.severity === 'soon' ? 'bg-warning' : 'bg-primary')} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{a.label}</span>
              <span className="text-xs text-muted-foreground">{a.sub}</span>
            </span>
            <span className="text-xs font-bold text-muted-foreground">{fmtRelative(a.date)}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function AtAGlance({ gpa, hours, best }: { gpa: ReturnType<typeof gpaStats>; hours: ReturnType<typeof hourTotals>; best: number | null }) {
  const s = useStore()
  const assignmentsDue = s.tasks.filter((t) => !t.archived && t.progress !== 'Finished' && !t.milestone && daysUntil(t.deadline) != null && (daysUntil(t.deadline) ?? 99) <= 7).length
  const rows = [
    { label: 'cGPA', value: fmtGpa(gpa.cum), route: '/academics', icon: GraduationCap },
    { label: 'sGPA', value: fmtGpa(gpa.science), route: '/academics', icon: Microscope },
    { label: 'Clinical', value: `${Math.round(hours.clinical)}/${s.goals.clinical}h`, pct: percent(hours.clinical, s.goals.clinical), route: '/clinical', icon: Stethoscope },
    { label: 'Service', value: `${Math.round(hours.volunteering)}/${s.goals.volunteering}h`, pct: percent(hours.volunteering, s.goals.volunteering), route: '/volunteering', icon: Target },
    { label: 'Shadowing', value: `${Math.round(hours.shadowing)}/${s.goals.shadowing}h`, pct: percent(hours.shadowing, s.goals.shadowing), route: '/shadowing', icon: Target },
    { label: 'Due soon', value: String(assignmentsDue), route: '/timeline', icon: CalendarClock },
    { label: 'MCAT', value: best ? String(best) : fmtRelative(s.mcat.targetDate), route: '/mcat', icon: Brain },
  ]
  const segments = [
    { name: 'GPA', value: gpa.cum / 4, color: 'var(--cat-gpa)', detail: fmtGpa(gpa.cum) },
    { name: 'Clinical', value: percent(hours.clinical, s.goals.clinical) / 100, color: 'var(--cat-clinical)', detail: `${Math.round(hours.clinical)}h` },
    { name: 'Service', value: percent(hours.volunteering, s.goals.volunteering) / 100, color: 'var(--cat-volunteer)', detail: `${Math.round(hours.volunteering)}h` },
    { name: 'Shadow', value: percent(hours.shadowing, s.goals.shadowing) / 100, color: 'var(--cat-shadow)', detail: `${Math.round(hours.shadowing)}h` },
  ]

  return (
    <Card>
      <CardHeader><CardTitle>At a glance</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <SegmentedBar segments={segments} />
        <div className="grid grid-cols-2 sm:grid-cols-3">
          {rows.map((r) => {
            const Icon = r.icon
            return (
              <Link
                key={r.label}
                to={r.route}
                className="group min-h-[4.25rem] border-t border-border/70 px-2.5 py-2.5 transition-colors hover:bg-muted/35 first:border-t-0 sm:[&:nth-child(-n+3)]:border-t-0"
              >
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  <span className="grid size-7 place-items-center rounded-full bg-secondary/70 text-primary transition-colors group-hover:bg-secondary">
                    <Icon className="size-3.5" />
                  </span>
                  {r.label}
                </span>
                <span className="mt-1 block pl-9 text-sm font-extrabold">{r.value}</span>
                {'pct' in r && <span className="mt-2 ml-9 block h-1.5 overflow-hidden rounded-full bg-muted"><i className="block h-full rounded-full bg-primary" style={{ width: `${Math.min(100, r.pct ?? 0)}%` }} /></span>}
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function PremedRoadmap() {
  const now = new Date()
  const currentIndex = now.getFullYear() < 2027 ? 0 : now.getFullYear() < 2029 ? 2 : now.getFullYear() === 2029 ? 5 : 7
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><Target className="size-5 text-primary" /> Premed roadmap</CardTitle>
        <Button asChild variant="outline" size="sm"><Link to="/timeline">Full timeline</Link></Button>
      </CardHeader>
      <CardContent>
        <ol className="roadmap-timeline">
          {ROADMAP.map((m, i) => {
            const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'future'
            return (
              <li key={m.id} className={cn('roadmap-node', state)}>
                <Link to={`/${m.route}`} className="block rounded-xl p-2 hover:bg-muted/50">
                  <span className="roadmap-dot" />
                  <span className="block text-sm font-extrabold">{m.label}</span>
                  <span className="block text-xs font-bold text-primary">{m.date}</span>
                  <span className="block text-xs text-muted-foreground">{m.detail}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </CardContent>
    </Card>
  )
}

function LowerWidgets({ qotd }: { qotd: (typeof MCAT_QOTD)[number] }) {
  const activity = useStore((s) => s.meta.activity).slice(0, 5)
  const goals = useStore((s) => s.quarterlyGoals)
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Brain className="size-4 text-primary" /> MCAT QOTD</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-semibold">{qotd.question}</p>
          <div className="grid gap-2">
            {qotd.choices.map((choice, idx) => {
              const isCorrect = idx === qotd.answer
              const picked = selected === idx
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setSelected(idx)}
                  className={cn(
                    'rounded-xl border border-border bg-muted/35 px-3 py-2 text-left font-semibold transition-colors hover:bg-muted/65',
                    answered && isCorrect && 'border-success/70 bg-success/15 text-success',
                    answered && picked && !isCorrect && 'border-destructive/70 bg-destructive/15 text-destructive'
                  )}
                >
                  <span className="mr-2 text-xs font-extrabold text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>{choice}
                </button>
              )
            })}
          </div>
          {answered && (
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs font-extrabold uppercase tracking-wide text-primary">{selected === qotd.answer ? 'Correct' : 'Review'}</p>
              <p className="mt-1 text-muted-foreground">{qotd.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> Quarterly goals</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {goals.slice(0, 3).map((g) => <div key={g.id} className="rounded-xl bg-muted/40 px-3 py-2 text-sm font-medium">{g.text}</div>)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="size-4 text-primary" /> Recent activity</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {activity.length === 0 && <p className="text-sm text-muted-foreground">No recent edits yet.</p>}
          {activity.map((a) => <div key={a.id} className="flex items-center justify-between gap-2 text-sm"><span className="truncate">{a.label}</span><span className="shrink-0 text-xs text-muted-foreground">{fmtTimeAgo(a.at)}</span></div>)}
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="size-4 text-primary" /> Ideas capture</CardTitle></CardHeader>
        <CardContent><IdeasCapture /></CardContent>
      </Card>
    </div>
  )
}

function IdeasCapture() {
  const note = useStore((s) => s.notes['home-ideas'] ?? '')
  const update = useStore((s) => s.update)
  return (
    <Textarea
      value={note}
      onChange={(e) => update((d) => { d.notes['home-ideas'] = e.target.value })}
      placeholder="Quick idea, link, or reminder..."
      rows={3}
    />
  )
}
