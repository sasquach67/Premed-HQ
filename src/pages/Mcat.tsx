import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, ReferenceLine,
} from 'recharts'
import {
  CalendarRange, Target, Plus, Trash2, BookOpen, ClipboardList, AlertCircle, FolderOpen, Filter, Play,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import { bestMcat } from '@/lib/selectors'
import { daysUntil, pickDaily } from '@/lib/date'
import { uid } from '@/lib/id'
import { MCAT_QOTD } from '@/data/mcatQotd'
import { PageHeader } from '@/components/common/PageHeader'
import { McatSessionSetupDialog } from '@/components/mcat/McatSessionSetupDialog'
import { Collapsible } from '@/components/common/Collapsible'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { EmptyState } from '@/components/common/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function Mcat() {
  const route = ROUTE_MAP.mcat
  const mcat = useStore((s) => s.mcat)
  const update = useStore((s) => s.update)
  const days = daysUntil(mcat.targetDate)
  const best = bestMcat(mcat)
  const goal = mcat.goalScore ?? 515
  const qotd = pickDaily(MCAT_QOTD, 13) ?? MCAT_QOTD[0]

  const chartData = useMemo(
    () => mcat.attempts.filter((a) => a.total).map((a, i) => ({ name: a.source || `#${i + 1}`, score: a.total })),
    [mcat.attempts]
  )
  const phases = useMemo(() => {
    const map = new Map<string, typeof mcat.schedule>()
    for (const it of mcat.schedule) { const arr = map.get(it.phase) ?? []; arr.push(it); map.set(it.phase, arr) }
    return [...map.entries()]
  }, [mcat.schedule])

  return (
    <div>
      <PageHeader title={route.label} />

      {/* slim meta strip (replaces the 4 big squares) — editable date/goal + live countdown */}
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm card-soft">
        <span className="flex items-center gap-1.5"><CalendarRange className="size-4 text-primary" /> Sit date
          <Input type="date" defaultValue={mcat.targetDate} onBlur={(e) => update((d) => { d.mcat.targetDate = e.target.value })} className="h-7 w-36" />
        </span>
        <span className="font-bold text-primary">{days != null ? `${days} days out` : '—'}</span>
        <span className="flex items-center gap-1.5">Goal
          <Input type="number" min={472} max={528} defaultValue={goal} onBlur={(e) => update((d) => { d.mcat.goalScore = Number(e.target.value) || 515 })} className="h-7 w-20" />
        </span>
        <span className="text-muted-foreground">Best so far <b className="text-foreground">{best ?? '—'}</b></span>
      </div>

      <McatCommandCenter qotd={qotd} />

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule"><CalendarRange className="size-4" /> Schedule</TabsTrigger>
          <TabsTrigger value="scores"><Target className="size-4" /> Score Tracker</TabsTrigger>
          <TabsTrigger value="errors"><AlertCircle className="size-4" /> Error Log</TabsTrigger>
          <TabsTrigger value="resources"><FolderOpen className="size-4" /> Resources</TabsTrigger>
        </TabsList>

        {/* Schedule */}
        <TabsContent value="schedule" className="space-y-3">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => update((d) => { d.mcat.schedule.push({ id: uid(), phase: 'Content Review', focus: '', done: false, order: d.mcat.schedule.length }) })}>
              <Plus className="size-4" /> Add task
            </Button>
          </div>
          {phases.map(([phase, items]) => {
            const done = items.filter((i) => i.done).length
            const icon = phase === 'Content Review' ? BookOpen : phase === 'Practice' ? ClipboardList : Target
            const Icon = icon
            return (
              <Collapsible key={phase} defaultOpen title={<span className="flex items-center gap-2"><Icon className="size-4 text-primary" /> {phase}</span>} badge={<span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">{done}/{items.length}</span>}>
                <ul className="space-y-1">
                  {items.map((it) => (
                    <li key={it.id} className="group flex items-center gap-2.5 py-1">
                      <Checkbox checked={it.done} onCheckedChange={(v) => update((d) => { const x = d.mcat.schedule.find((s) => s.id === it.id); if (x) x.done = Boolean(v) })} />
                      <input
                        defaultValue={it.focus}
                        onBlur={(e) => update((d) => { const x = d.mcat.schedule.find((s) => s.id === it.id); if (x) x.focus = e.target.value })}
                        className={`flex-1 bg-transparent text-sm outline-none ${it.done ? 'text-muted-foreground line-through' : ''}`}
                      />
                      <button onClick={() => update((d) => { d.mcat.schedule = d.mcat.schedule.filter((s) => s.id !== it.id) })} className="text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"><Trash2 className="size-3.5" /></button>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            )
          })}
        </TabsContent>

        {/* Score tracker */}
        <TabsContent value="scores" className="space-y-4">
          {chartData.length > 1 && (
            <Card>
              <CardHeader><CardTitle>Score trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                    <YAxis domain={[472, 528]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                    <RTooltip />
                    <ReferenceLine y={goal} stroke="var(--cat-mcat)" strokeDasharray="4 4" label={{ value: `goal ${goal}`, fontSize: 10, fill: 'var(--cat-mcat)' }} />
                    <Line type="monotone" dataKey="score" stroke="var(--cat-mcat)" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => update((d) => { d.mcat.attempts.push({ id: uid(), kind: 'aamc-fl', source: '', order: d.mcat.attempts.length }) })}><Plus className="size-4" /> Add score</Button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border bg-card card-soft">
            <table className="w-full min-w-[680px] text-sm">
              <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                {['Source', 'Type', 'Date', 'Total', 'C/P', 'CARS', 'B/B', 'P/S', ''].map((h) => <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>)}
              </tr></thead>
              <tbody>
                {mcat.attempts.length === 0 && <tr><td colSpan={9} className="px-3 py-6 text-center text-muted-foreground">No scores logged yet. Add AAMC FLs and practice exams to track your trend.</td></tr>}
                {mcat.attempts.map((a) => (
                  <tr key={a.id} className="border-b border-border/70 last:border-0">
                    <td className="px-3 py-1.5"><input defaultValue={a.source} placeholder="AAMC FL1" onBlur={(e) => update((d) => { const x = d.mcat.attempts.find((s) => s.id === a.id); if (x) x.source = e.target.value })} className="w-28 bg-transparent outline-none" /></td>
                    <td className="px-3 py-1.5">
                      <select defaultValue={a.kind} onChange={(e) => update((d) => { const x = d.mcat.attempts.find((s) => s.id === a.id); if (x) x.kind = e.target.value as typeof a.kind })} className="bg-transparent text-sm outline-none">
                        <option value="official">official</option><option value="aamc-fl">AAMC FL</option><option value="practice">practice</option>
                      </select>
                    </td>
                    <td className="px-3 py-1.5"><input type="date" defaultValue={a.date} onBlur={(e) => update((d) => { const x = d.mcat.attempts.find((s) => s.id === a.id); if (x) x.date = e.target.value })} className="bg-transparent outline-none" /></td>
                    {(['total', 'cp', 'cars', 'bb', 'ps'] as const).map((k) => (
                      <td key={k} className="px-3 py-1.5"><input type="number" defaultValue={a[k] ?? ''} onBlur={(e) => update((d) => { const x = d.mcat.attempts.find((s) => s.id === a.id); if (x) x[k] = Number(e.target.value) || undefined })} className="w-14 bg-transparent text-right outline-none" /></td>
                    ))}
                    <td className="px-2 text-right"><button onClick={() => update((d) => { d.mcat.attempts = d.mcat.attempts.filter((s) => s.id !== a.id) })} className="text-muted-foreground hover:text-destructive"><Trash2 className="size-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Error log */}
        <TabsContent value="errors"><ErrorLog /></TabsContent>

        <TabsContent value="resources">
          <ResourceGrid pillar="mcat" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function McatCommandCenter({ qotd }: { qotd: (typeof MCAT_QOTD)[number] }) {
  const mcat = useStore((s) => s.mcat)
  const schedule = mcat.schedule
  const done = schedule.filter((s) => s.done).length
  const openMisses = mcat.errorLog.filter((e) => !e.resolved).length
  const phase = schedule.find((s) => !s.done)?.phase ?? 'Foundation'
  const nextItems = schedule.filter((s) => !s.done).slice(0, 3)

  return (
    <div className="mb-5 grid gap-4 xl:grid-cols-[1.05fr_.95fr]">
      <Card className="overflow-hidden border-primary/25 bg-gradient-to-br from-primary/10 via-card to-leaf/10">
        <CardContent className="grid gap-4 p-4 md:grid-cols-[minmax(0,1fr)_13rem]">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-primary">{phase} phase</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold">Start a focused MCAT block</h2>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">Ninety minutes, one timer, missed questions captured straight into the review bank.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <McatSessionSetupDialog
                triggerClassName="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-leaf/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[0.98]"
                trigger={<><Play className="size-4 fill-current" /> Start session</>}
              />
              <Button asChild variant="outline"><Link to="/mcat?tab=errors">Review misses</Link></Button>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="rounded-2xl bg-card/80 p-3 ring-1 ring-border/70">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Plan</p>
              <p className="mt-1 text-xl font-extrabold">{done}/{schedule.length || 1}</p>
            </div>
            <div className="rounded-2xl bg-card/80 p-3 ring-1 ring-border/70">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Missed bank</p>
              <p className="mt-1 text-xl font-extrabold">{openMisses}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Today’s MCAT workspace</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-2xl bg-muted/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-extrabold uppercase tracking-wide text-primary">QOTD · {qotd.section}</p>
              <span className="text-xs font-bold text-muted-foreground">waiting</span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm font-semibold">{qotd.question}</p>
          </div>
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Next study items</p>
            <div className="space-y-1.5">
              {nextItems.length === 0 && <p className="text-sm text-muted-foreground">No planned MCAT items yet.</p>}
              {nextItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-2 rounded-xl bg-muted/35 px-3 py-2">
                  <span className="min-w-0 truncate text-sm font-bold">{item.focus || item.phase}</span>
                  <span className="shrink-0 text-xs font-bold text-muted-foreground">{item.phase}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ERR_SECTIONS = ['Bio/Biochem', 'Chem/Phys', 'Psych/Soc', 'CARS']
const SECTION_TONE: Record<string, string> = {
  'Bio/Biochem': 'var(--cat-clinical)', 'Chem/Phys': 'var(--cat-gpa)',
  'Psych/Soc': 'var(--cat-activities)', CARS: 'var(--cat-research)',
}

/** Error log = structured, filterable cards per missed question (F4) — not a
 *  table of textboxes. Filter by section, quick-add, resolve, delete. */
function ErrorLog() {
  const errorLog = useStore((s) => s.mcat.errorLog)
  const update = useStore((s) => s.update)
  const [filter, setFilter] = useState<string>('All')
  const [hideResolved, setHideResolved] = useState(false)

  const patch = (id: string, p: Partial<(typeof errorLog)[number]>) =>
    update((d) => { const x = d.mcat.errorLog.find((e) => e.id === id); if (x) Object.assign(x, p) })

  const shown = errorLog.filter((e) =>
    (filter === 'All' || e.section === filter) && (!hideResolved || !e.resolved)
  )
  const counts = useMemo(() => {
    const m: Record<string, number> = {}
    for (const e of errorLog) m[e.section] = (m[e.section] ?? 0) + 1
    return m
  }, [errorLog])

  function add() {
    update((d) => d.mcat.errorLog.unshift({
      id: uid(), section: filter === 'All' ? 'Bio/Biochem' : filter,
      topic: '', whyMissed: '', fix: '', source: '', resolved: false, order: 0,
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="mr-0.5 size-4 text-muted-foreground" />
          {['All', ...ERR_SECTIONS].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
                filter === s ? 'border-transparent bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-muted'
              )}
            >
              {s}{s !== 'All' && counts[s] ? ` · ${counts[s]}` : ''}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
            <Checkbox checked={hideResolved} onCheckedChange={(v) => setHideResolved(Boolean(v))} /> Hide resolved
          </label>
          <Button size="sm" onClick={add}><Plus className="size-4" /> Log a miss</Button>
        </div>
      </div>

      {shown.length === 0 ? (
        <EmptyState icon={AlertCircle} title="No misses logged here" hint="Log every question you miss — section, topic, why you missed it, and the fix. Reviewing this log is the highest-yield habit in MCAT prep." action={<Button size="sm" onClick={add}><Plus className="size-4" /> Log a miss</Button>} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {shown.map((er) => (
            <div key={er.id} className={cn('rounded-xl border border-border bg-card p-3.5 card-soft', er.resolved && 'opacity-60')}>
              <div className="mb-2 flex items-center gap-2">
                <select
                  value={er.section}
                  onChange={(e) => patch(er.id, { section: e.target.value })}
                  className="rounded-full px-2 py-0.5 text-xs font-bold text-primary-foreground outline-none"
                  style={{ background: SECTION_TONE[er.section] ?? 'var(--primary)' }}
                >
                  {ERR_SECTIONS.map((s) => <option key={s} value={s} className="bg-card text-foreground">{s}</option>)}
                </select>
                <Input defaultValue={er.topic} placeholder="Topic (e.g. amino acid pKa)" onBlur={(e) => patch(er.id, { topic: e.target.value })} className="h-7 flex-1 border-0 px-1 text-sm font-bold shadow-none focus-visible:ring-0" />
                <label className="flex cursor-pointer items-center gap-1 text-[10px] font-semibold uppercase text-muted-foreground">
                  <Checkbox checked={er.resolved} onCheckedChange={(v) => patch(er.id, { resolved: Boolean(v) })} /> Got it
                </label>
                <button onClick={() => update((d) => { d.mcat.errorLog = d.mcat.errorLog.filter((e) => e.id !== er.id) })} className="rounded-md p-1 text-muted-foreground hover:text-destructive"><Trash2 className="size-3.5" /></button>
              </div>
              <div className="space-y-2">
                <Field label="Why I missed it"><Textarea defaultValue={er.whyMissed} onBlur={(e) => patch(er.id, { whyMissed: e.target.value })} placeholder="Misread? Content gap? Timing?" className="min-h-14 text-sm" /></Field>
                <Field label="The fix"><Textarea defaultValue={er.fix} onBlur={(e) => patch(er.id, { fix: e.target.value })} placeholder="The rule/strategy to remember next time" className="min-h-14 text-sm" /></Field>
                <Input defaultValue={er.source} onBlur={(e) => patch(er.id, { source: e.target.value })} placeholder="Source (AAMC FL2 · UWorld …)" className="h-7 text-xs" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}
