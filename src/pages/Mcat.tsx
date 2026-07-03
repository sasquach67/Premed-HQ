import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip, ReferenceLine,
} from 'recharts'
import {
  CalendarRange, Target, Plus, Trash2, BookOpen, ClipboardList, AlertCircle, FolderOpen,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import { bestMcat } from '@/lib/selectors'
import { daysUntil } from '@/lib/date'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { Collapsible } from '@/components/common/Collapsible'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export function Mcat() {
  const route = ROUTE_MAP.mcat
  const mcat = useStore((s) => s.mcat)
  const update = useStore((s) => s.update)
  const days = daysUntil(mcat.targetDate)
  const best = bestMcat(mcat)
  const goal = mcat.goalScore ?? 515

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
        <TabsContent value="errors" className="space-y-3">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => update((d) => { d.mcat.errorLog.push({ id: uid(), section: 'Bio/Biochem', topic: '', whyMissed: '', fix: '', resolved: false, order: d.mcat.errorLog.length }) })}><Plus className="size-4" /> Add miss</Button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border bg-card card-soft">
            <table className="w-full min-w-[680px] text-sm">
              <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                {['✓', 'Section', 'Topic', 'Why missed', 'The fix', ''].map((h) => <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>)}
              </tr></thead>
              <tbody>
                {mcat.errorLog.length === 0 && <tr><td colSpan={6} className="px-3 py-6 text-center text-muted-foreground">Log every question you miss + why. This is the highest-yield habit in MCAT prep.</td></tr>}
                {mcat.errorLog.map((er) => (
                  <tr key={er.id} className={`border-b border-border/70 last:border-0 ${er.resolved ? 'opacity-55' : ''}`}>
                    <td className="px-3 py-1.5"><Checkbox checked={er.resolved} onCheckedChange={(v) => update((d) => { const x = d.mcat.errorLog.find((s) => s.id === er.id); if (x) x.resolved = Boolean(v) })} /></td>
                    <td className="px-3 py-1.5">
                      <select defaultValue={er.section} onChange={(e) => update((d) => { const x = d.mcat.errorLog.find((s) => s.id === er.id); if (x) x.section = e.target.value })} className="bg-transparent text-sm outline-none">
                        {['Bio/Biochem', 'Chem/Phys', 'Psych/Soc', 'CARS'].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    {(['topic', 'whyMissed', 'fix'] as const).map((k) => (
                      <td key={k} className="px-3 py-1.5"><input defaultValue={er[k]} onBlur={(e) => update((d) => { const x = d.mcat.errorLog.find((s) => s.id === er.id); if (x) x[k] = e.target.value })} className="w-full min-w-[8rem] bg-transparent outline-none" /></td>
                    ))}
                    <td className="px-2 text-right"><button onClick={() => update((d) => { d.mcat.errorLog = d.mcat.errorLog.filter((s) => s.id !== er.id) })} className="text-muted-foreground hover:text-destructive"><Trash2 className="size-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <ResourceGrid pillar="mcat" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
