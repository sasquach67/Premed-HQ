import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Pause, Play, Plus, Square, X } from 'lucide-react'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { homeBanner } from '@/lib/themeAssets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { FocusModeLayout } from '@/components/common/FocusModeLayout'

const DEFAULT_SESSION_MINUTES = 90

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function formatTimer(seconds: number) {
  const safe = Math.max(0, seconds)
  const mins = Math.floor(safe / 60)
  const secs = safe % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

export function McatFocusSession() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const update = useStore((s) => s.update)
  const visualTheme = useStore((s) => s.settings.visualTheme)
  const sessionNote = useStore((s) => s.notes['mcat-session-note'] ?? '')
  const reducedMotion = useReducedMotion()
  const sessionSection = params.get('section') || params.get('topic') || 'CARS'
  const paramGoal = params.get('goal')
  const sessionMinutes = Math.max(10, Math.min(240, Number(params.get('minutes')) || DEFAULT_SESSION_MINUTES))
  const sessionSeconds = sessionMinutes * 60
  const breakSeconds = Math.min(45 * 60, Math.max(5 * 60, Math.floor(sessionSeconds / 2)))
  const defaultGoal = `Finish a focused ${sessionSection} block, log every miss, and review the pattern after.`
  const [sessionGoal, setSessionGoal] = useState(paramGoal || defaultGoal)
  const [remaining, setRemaining] = useState(sessionSeconds)
  const [running, setRunning] = useState(true)
  const [missOpen, setMissOpen] = useState(false)

  useEffect(() => {
    setSessionGoal(paramGoal || defaultGoal)
  }, [defaultGoal, paramGoal])

  useEffect(() => {
    setRemaining(sessionSeconds)
    setRunning(true)
  }, [sessionSeconds])

  useEffect(() => {
    if (!running || remaining <= 0) return undefined
    const id = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [remaining, running])

  useEffect(() => {
    if (remaining === 0) setRunning(false)
  }, [remaining])

  const elapsed = sessionSeconds - remaining
  const breakLabel = elapsed >= breakSeconds ? 'break available' : `break at ${formatTimer(breakSeconds)}`
  const progress = useMemo(() => ((sessionSeconds - remaining) / sessionSeconds) * 100, [remaining, sessionSeconds])

  return (
    <FocusModeLayout
      exitTo="/mcat"
      exitLabel="Back to plan"
      className="bg-background text-foreground"
      background={(
        <>
          <img src={homeBanner(visualTheme)} alt="" className={cn('absolute inset-0 size-full object-cover', !reducedMotion && 'scale-105')} />
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background/90" />
        </>
      )}
      headerEnd={(
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-semibold backdrop-blur">MCAT · {sessionSection}</span>
            <span className="rounded-full border border-leaf/55 bg-leaf/20 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur">Session 2 of 3 today</span>
          </div>
      )}
    >

        <section className="grid flex-1 place-items-center py-12 text-center">
          <div>
            <p className="font-display text-3xl font-semibold leading-tight tabular-nums">
              {formatTimer(remaining)}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">of {sessionMinutes} min · {breakLabel}</p>
            <div className="mx-auto mt-6 h-2 w-72 max-w-full overflow-hidden rounded-full bg-muted">
              <span className="block h-full rounded-full bg-leaf transition-[width] duration-1000 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={() => setRunning((value) => !value)}>
                {running ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
                {running ? 'Pause' : 'Resume'}
              </Button>
              <Button size="lg" variant="outline" onClick={() => setMissOpen(true)}>
                <Plus className="size-4" /> Log missed Q
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/mcat')}>
                <Square className="size-4" /> End session
              </Button>
            </div>
          </div>
        </section>

        <footer className="grid gap-4 md:grid-cols-[minmax(0,1fr)_28rem] md:items-end">
          <div className="max-w-sm rounded-xl border border-border bg-card/80 px-4 py-3 text-sm backdrop-blur">
            Every miss goes straight into the review bank. Clean reps beat frantic reps.
          </div>
          <div className="rounded-xl border border-border bg-card/80 p-4 backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">During this block</h2>
              <button onClick={() => setMissOpen(true)} className="text-xs font-semibold text-primary">+ Missed Q</button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <SessionMetric value={formatTimer(remaining)} label="left" />
              <SessionMetric value={formatTimer(sessionSeconds - remaining)} label="elapsed" />
              <SessionMetric value={String(Math.max(0, Math.ceil((breakSeconds - elapsed) / 60)))} label="min to break" />
            </div>
            <div className="mt-3 rounded-xl bg-muted/50 px-3 py-2 text-sm">
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="session-goal">Session goal</label>
              <Textarea
                id="session-goal"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                rows={3}
                className="mt-1 border-border bg-transparent px-0 text-sm font-semibold leading-snug text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-ring"
              />
            </div>
            <Textarea
              value={sessionNote}
              onChange={(e) => update((d) => { d.notes['mcat-session-note'] = e.target.value })}
              placeholder="Scratchpad: passage set, strategy reminder, or what to review after this block..."
              rows={4}
              className="mt-3 border-border bg-muted/50 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
            />
          </div>
        </footer>
      <MissedQuestionDialog
        open={missOpen}
        onOpenChange={setMissOpen}
        onSave={(miss) => update((d) => {
          d.mcat.errorLog.unshift({
            id: uid(),
            date: new Date().toISOString().slice(0, 10),
            section: sessionSection,
            source: miss.source,
            topic: miss.topic,
            whyMissed: miss.reason,
            fix: miss.note,
            resolved: false,
            order: 0,
          })
        })}
      />
    </FocusModeLayout>
  )
}

function SessionMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-muted/50 px-2 py-2">
      <span className="block text-sm font-semibold tabular-nums">{value}</span>
      <span className="mt-1 block text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  )
}

function MissedQuestionDialog({
  open, onOpenChange, onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (miss: { source: string; topic: string; note: string; reason: string }) => void
}) {
  const [source, setSource] = useState('UWorld')
  const [topic, setTopic] = useState('')
  const [note, setNote] = useState('')
  const [reason, setReason] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    onSave({ source, topic, note, reason })
    setTopic('')
    setNote('')
    setReason('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><X className="size-4 text-destructive" /> Log missed question</DialogTitle>
          <DialogDescription>Add a quick review item. It will appear in the MCAT Error Log.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <label className="block text-sm font-semibold">Source<Input value={source} onChange={(e) => setSource(e.target.value)} placeholder="UWorld, AAMC FL..." /></label>
          <label className="block text-sm font-semibold">Topic<Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="CARS inference, amino acids..." /></label>
          <label className="block text-sm font-semibold">Reason missed<Textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} placeholder="Misread the stem, narrowed wrong, content gap..." /></label>
          <label className="block text-sm font-semibold">Fix / note<Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="The rule or habit for next time..." /></label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={!topic.trim() && !reason.trim()}>Save miss</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
