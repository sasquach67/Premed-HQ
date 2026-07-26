import {
  Clock3,
  FileUp,
  Lightbulb,
  Plus,
  RotateCcw,
  Stethoscope,
  Target,
} from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CenterPeek, type RecordOpenMode } from '@/components/common/CenterPeek'
import { McatSessionSetupDialog } from '@/components/mcat/McatSessionSetupDialog'
import { AnimatedFileUpload, NumberFlow } from '@/components/motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { fmtTimeAgo } from '@/lib/date'
import { uid } from '@/lib/id'
import { bestMcat, gpaStats, hourTotals, percent } from '@/lib/selectors'
import type { Goals } from '@/lib/types'
import { latestExperienceLabel } from '@/lib/overview'
import { useStore } from '@/store/store'

export function QuickAccess() {
  const mcat = useStore((state) => state.mcat)
  const classCenter = useStore((state) => state.academics.classCenter)
  const experiences = useStore((state) => state.experiences)
  const [now] = useState(Date.now)
  const dueTopics = classCenter.topics.filter((topic) => topic.nextReviewAt != null && topic.nextReviewAt <= now).length
  const nextMcat = mcat.schedule.find((item) => !item.done)
  const lastHours = latestExperienceLabel(experiences)

  return (
    <Card className="h-full" role="region" aria-labelledby="quick-access-heading">
      <CardHeader><CardTitle id="quick-access-heading">Quick access</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {nextMcat && (
          <McatSessionSetupDialog
            triggerClassName="group flex w-full items-center gap-3 rounded-xl border border-border bg-muted/35 px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-muted/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            trigger={(
              <>
                <span className="grid size-9 place-items-center rounded-xl bg-[var(--cat-mcat)] text-white"><Clock3 className="size-4" /></span>
                <span className="min-w-0"><span className="block text-sm font-extrabold">Start MCAT block</span><span className="block truncate text-xs text-muted-foreground">{nextMcat.focus}</span></span>
              </>
            )}
          />
        )}
        {dueTopics > 0 && (
          <QuickLink to="/academics?mode=daily&tab=class-center" icon={RotateCcw} color="var(--cat-research)" title="Review session" detail={`${dueTopics} topics due`} />
        )}
        <button
          type="button"
          onClick={() => document.getElementById('quick-capture')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="group flex w-full items-center gap-3 rounded-xl border border-border bg-muted/35 px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-muted/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"><FileUp className="size-4" /></span>
          <span><span className="block text-sm font-extrabold">Drop into Atlas</span><span className="block text-xs text-muted-foreground">File, link, or note</span></span>
        </button>
        <QuickLink to="/clinical" icon={Stethoscope} color="var(--cat-clinical)" title="Log hours" detail={lastHours ? `Last: ${lastHours}` : 'Add your first shift'} />
      </CardContent>
    </Card>
  )
}

function QuickLink({ to, icon: Icon, color, title, detail }: { to: string; icon: typeof Target; color: string; title: string; detail: string }) {
  return (
    <Link to={to} className="group flex items-center gap-3 rounded-xl border border-border bg-muted/35 px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-muted/65">
      <span className="grid size-9 place-items-center rounded-xl text-white" style={{ background: color }}><Icon className="size-4" /></span>
      <span className="min-w-0"><span className="block text-sm font-extrabold">{title}</span><span className="block truncate text-xs text-muted-foreground">{detail}</span></span>
    </Link>
  )
}

function currentForTarget(target: keyof Goals, goals: Goals) {
  const state = useStore.getState()
  const hours = hourTotals(state.experiences)
  if (target === 'gpaTarget') return gpaStats(state.courses).cum
  if (target === 'mcatTarget') return bestMcat(state.mcat) ?? 0
  if (target === 'clinical') return hours.clinical
  if (target === 'volunteering') return hours.volunteering
  if (target === 'shadowing') return hours.shadowing
  if (target === 'research') return hours.research
  if (target === 'activities') return hours.leadership
  return goals[target]
}

export function QuarterlyGoalsPanel() {
  const goals = useStore((state) => state.goals)
  const quarterlyGoals = useStore((state) => state.quarterlyGoals)
  const patchItem = useStore((state) => state.patchItem)
  const [editorOpen, setEditorOpen] = useState(false)
  const [mode, setMode] = useState<RecordOpenMode>('peek')

  return (
    <>
      <Card className="h-full" role="region" aria-labelledby="quarterly-goals-heading">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle id="quarterly-goals-heading">Quarterly goals</CardTitle>
          <Button size="sm" variant="ghost" onClick={() => setEditorOpen(true)}>Edit targets</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {!quarterlyGoals.length && <p className="text-sm text-muted-foreground">Set a quarterly push to connect today’s work to a standing target.</p>}
          {quarterlyGoals.slice(0, 4).map((goal) => {
            const target = goal.standingTarget
            const targetValue = target ? goals[target] : 0
            const current = target ? currentForTarget(target, goals) : 0
            const progress = target && targetValue ? percent(current, targetValue) : goal.done ? 100 : 0
            return (
              <div key={goal.id} className="rounded-xl border border-border bg-muted/35 p-3">
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={goal.done}
                    onCheckedChange={(checked) => patchItem('quarterlyGoals', goal.id, { done: Boolean(checked) })}
                    aria-label={goal.done ? `${goal.text} completed` : `Complete ${goal.text}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold leading-snug">{goal.text}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></span>
                      <span className="text-xs font-extrabold tabular-nums text-primary">{Math.round(progress)}%</span>
                    </div>
                    {target && <p className="mt-1 text-[11px] font-semibold text-muted-foreground">Toward standing {target.replace('Target', '')} target</p>}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
      <CenterPeek open={editorOpen} mode={mode} label="Standing domain targets" onOpenChange={setEditorOpen} onModeChange={setMode}>
        <GoalTargetEditor />
      </CenterPeek>
    </>
  )
}

function GoalTargetEditor() {
  const goals = useStore((state) => state.goals)
  const update = useStore((state) => state.update)
  const labels: Array<{ key: keyof Goals; label: string; unit: string }> = [
    { key: 'gpaTarget', label: 'GPA', unit: 'GPA' },
    { key: 'mcatTarget', label: 'MCAT', unit: 'score' },
    { key: 'clinical', label: 'Clinical', unit: 'hours' },
    { key: 'volunteering', label: 'Volunteering', unit: 'hours' },
    { key: 'shadowing', label: 'Shadowing', unit: 'hours' },
  ]
  return (
    <div className="mx-auto max-w-2xl space-y-5 p-5 md:p-7">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Standing targets</h2>
        <p className="mt-1 text-sm text-muted-foreground">These long-horizon targets feed the Overview domain rows and quarterly-goal links.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {labels.map((item) => (
          <label key={item.key} className="rounded-2xl border border-border bg-card p-4 text-sm font-bold shadow-sm">
            {item.label}
            <span className="mt-1 block text-xs font-semibold text-muted-foreground">{item.unit}</span>
            <Input
              type="number"
              min={0}
              step={item.key === 'gpaTarget' ? 0.01 : 1}
              value={goals[item.key]}
              onChange={(event) => update((draft) => { draft.goals[item.key] = Number(event.target.value) || 0 })}
              className="mt-3"
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export function ActivityAndCapture() {
  const activity = useStore((state) => state.meta.activity).slice(0, 4)
  const captures = useStore((state) => state.captures)
  const addItem = useStore((state) => state.addItem)
  const logActivity = useStore((state) => state.logActivity)
  const [value, setValue] = useState('')

  const unsorted = useMemo(() => captures.filter((capture) => !capture.triagedAt).length, [captures])

  function addCapture(content: string, file?: File) {
    const trimmed = content.trim()
    if (!trimmed && !file) return
    const isUrl = /^https?:\/\/\S+$/i.test(trimmed)
    const now = Date.now()
    addItem('captures', {
      id: uid(),
      kind: isUrl || file ? 'source' : 'idea',
      content: trimmed || file?.name || 'Untitled source',
      url: isUrl ? trimmed : undefined,
      fileName: file?.name,
      mimeType: file?.type,
      fileSize: file?.size,
      createdAt: now,
      updatedAt: now,
      origin: 'overview',
      order: captures.length,
    })
    logActivity('atlas', `Captured ${isUrl || file ? 'source' : 'idea'}: ${trimmed || file?.name}`)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!value.trim()) return
    addCapture(value)
    setValue('')
  }

  return (
    <Card id="quick-capture" className="h-full scroll-mt-24" role="region" aria-labelledby="activity-capture-heading">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle id="activity-capture-heading">Recent activity + capture</CardTitle>
        <Button asChild size="sm" variant="ghost"><Link to="/atlas"><NumberFlow value={unsorted} /> unsorted</Link></Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          {!activity.length && <p className="text-sm text-muted-foreground">No recent edits yet.</p>}
          {activity.map((entry) => (
            <div key={entry.id} className="flex items-center gap-2 rounded-lg px-1 py-1.5 text-xs">
              <span className="size-2 rounded-full bg-primary" />
              <span className="min-w-0 flex-1 truncate font-bold">{entry.label}</span>
              <span className="shrink-0 text-muted-foreground">{fmtTimeAgo(entry.at)}</span>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="overview-capture" className="flex items-center gap-2 text-sm font-extrabold"><Lightbulb className="size-4 text-primary" />Quick Capture</label>
            <Badge variant="muted">idea or source</Badge>
          </div>
          <Textarea id="overview-capture" value={value} onChange={(event) => setValue(event.target.value)} rows={2} placeholder="Type a thought or paste a URL…" />
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <AnimatedFileUpload
              multiple
              onFiles={(files) => files.forEach((file) => addCapture('', file))}
              label="Drop a file or screenshot"
              description="Stored locally as a source reference."
              className="min-h-20 px-3 py-2"
            />
            <Button type="submit" disabled={!value.trim()} className="sm:self-stretch"><Plus className="size-4" />Capture</Button>
          </div>
          <div className="rounded-xl border border-dashed border-border px-3 py-2 text-[11px] font-semibold text-muted-foreground">
            Connections will appear here after Atlas integration is enabled.
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
