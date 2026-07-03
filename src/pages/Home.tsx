import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Brain, CalendarClock, CheckCircle2,
  GraduationCap, Lightbulb, Microscope, Plus, Sparkles,
  Stethoscope, Target, Trophy,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { gpaStats, fmtGpa, hourTotals, bestMcat, percent, upcomingAlerts } from '@/lib/selectors'
import { timeGreeting, daysUntil, fmtRelative, pickDaily, fmtTimeAgo } from '@/lib/date'
import { MCAT_QOTD } from '@/data/mcatQotd'
import { uid } from '@/lib/id'
import { homeBanner, type VisualTheme } from '@/lib/themeAssets'
import type { TaskItem, TaskProgress, TaskType } from '@/lib/types'
import { MascotBubble } from '@/components/mascot/MascotBubble'
import { SegmentedBar } from '@/components/common/SegmentedBar'
import { InfoTip } from '@/components/common/InfoTip'
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

const HERO_ACTIONS = [
  { label: 'Academics', route: '/academics', icon: GraduationCap, primary: true },
  { label: 'MCAT', route: '/mcat', icon: Brain },
  { label: 'Timeline', route: '/timeline', icon: CalendarClock },
  { label: 'Clinical', route: '/clinical', icon: Stethoscope },
  { label: 'Research', route: '/research', icon: Microscope },
]

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
      <TaskWorkspace />
      <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <UpcomingPanel alerts={alerts} />
        <AtAGlance gpa={gpa} hours={hours} best={best} />
      </div>
      <PremedRoadmap />
      <LowerWidgets qotd={qotd} />
    </div>
  )
}

function Hero() {
  const profile = useStore((s) => s.profile)
  const tips = useStore((s) => s.tips)
  const visualTheme = useStore((s) => s.settings.visualTheme)
  const line = profile.startTerm === 'Fall 2026'
    ? 'Today is for enrollment readiness, clean systems, and one steady next move.'
    : 'Pick the next honest action and keep the long arc visible.'

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border card-soft">
      <ThemedHomeImage visualTheme={visualTheme} />
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/88 to-card/30" />
      <div className="relative grid min-h-[21rem] gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_25rem]">
        <div className="flex max-w-2xl flex-col justify-center">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{timeGreeting()}, {profile.name}</h1>
          <p className="mt-2 max-w-xl text-sm font-semibold text-muted-foreground">{line}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {HERO_ACTIONS.map(({ label, route, icon: Icon, primary }) => (
              <Button
                key={route}
                asChild
                size="sm"
                variant={primary ? 'default' : 'outline'}
                className={cn(!primary && 'bg-card/80')}
              >
                <Link to={route}>
                  <Icon className="size-3.5" />
                  {label}
                  {primary && <ArrowRight className="size-3.5" />}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="relative min-h-[13rem] lg:min-h-full">
          <div className="absolute bottom-0 right-0 w-full max-w-[25rem]">
            <div className="hero-mascot-ground rounded-t-[2rem] border border-border/70 bg-card/45 p-3 pb-0 backdrop-blur-sm">
              <MascotBubble tips={tips} ramSize={118} side="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
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
  const update = useStore((s) => s.update)
  const logActivity = useStore((s) => s.logActivity)
  const [open, setOpen] = useState(false)

  const active = tasks
    .filter((t) => !t.archived && t.progress !== 'Finished' && !t.milestone)
    .sort((a, b) => (daysUntil(a.deadline) ?? 999) - (daysUntil(b.deadline) ?? 999))
  const shown = (mode === 'today' ? active.filter((t) => {
    const d = daysUntil(t.deadline)
    return d != null && d <= 7
  }) : active).slice(0, 7)
  const pinned = focusTargets.filter((f) => !f.done).slice(0, 3)

  return (
    <Card className="border-primary/20">
      <CardHeader className="flex-row flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2 text-xl"><CheckCircle2 className="size-5 text-primary" /> Today / Tasks</CardTitle>
          <InfoTip label="Tasks are dated workflow items. Today’s Focus is a short pinned list for the day, kept inside this workspace." />
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-muted p-1">
            {(['today', 'all'] as const).map((m) => (
              <button
                key={m}
                onClick={() => update((d) => { d.settings.overviewTaskMode = m })}
                className={cn('rounded-md px-3 py-1 text-xs font-bold capitalize', mode === m ? 'bg-card shadow-sm' : 'text-muted-foreground')}
              >
                {m === 'today' ? 'Today' : 'All active'}
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => setOpen(true)}><Plus className="size-4" /> Add task</Button>
          <Button asChild size="sm" variant="outline"><Link to="/timeline">Timeline</Link></Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
        <section className="rounded-2xl border border-border bg-muted/25 p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold">Pinned for today</h3>
            <span className="text-xs text-muted-foreground">{pinned.length}/3</span>
          </div>
          <div className="space-y-1.5">
            {pinned.length === 0 && <p className="py-2 text-sm text-muted-foreground">No focus targets pinned.</p>}
            {pinned.map((f) => (
              <div key={f.id} className="group flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-card/70">
                <Checkbox checked={f.done} onCheckedChange={(v) => patchItem('focusTargets', f.id, { done: Boolean(v) })} />
                <span className="flex-1 text-sm font-medium">{f.text}</span>
                <button onClick={() => removeItem('focusTargets', f.id)} className="rounded p-1 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100" aria-label="Remove focus target">×</button>
              </div>
            ))}
          </div>
        </section>
        <section className="space-y-1">
          {shown.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border py-6 text-center text-sm text-muted-foreground">Nothing urgent here. Add a task or switch to all active.</p>
          )}
          {shown.map((t) => (
            <TaskRow
              key={t.id}
              task={t}
              onFinish={() => { patchItem('tasks', t.id, { progress: 'Finished', archived: true }); logActivity('timeline', `Finished: ${t.title}`) }}
            />
          ))}
        </section>
      </CardContent>
      <AddTaskDialog open={open} onOpenChange={setOpen} />
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {rows.map((r) => {
            const Icon = r.icon
            return (
              <Link key={r.label} to={r.route} className="rounded-xl border border-border bg-card px-3 py-2 hover:bg-muted/50">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"><Icon className="size-3.5" /> {r.label}</span>
                <span className="mt-1 block text-sm font-extrabold">{r.value}</span>
                {'pct' in r && <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted"><i className="block h-full rounded-full bg-primary" style={{ width: `${Math.min(100, r.pct ?? 0)}%` }} /></span>}
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
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Brain className="size-4 text-primary" /> MCAT QOTD</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="font-semibold">{qotd.question}</p>
          <details className="rounded-xl bg-muted/50 p-3">
            <summary className="cursor-pointer text-xs font-bold text-primary">Reveal answer</summary>
            <p className="mt-2 text-muted-foreground">{qotd.explanation}</p>
          </details>
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
