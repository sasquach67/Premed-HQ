import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Pause, Play, Plus, Square, X } from 'lucide-react'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { homeBanner, mascotGif } from '@/lib/themeAssets'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

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
    <main className="relative min-h-svh overflow-hidden bg-slate-950 text-white">
      <img src={homeBanner(visualTheme)} alt="" className={cn('absolute inset-0 size-full object-cover', !reducedMotion && 'scale-105')} />
      <div className="absolute inset-0 bg-slate-950/48" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/72" />

      <div className="relative flex min-h-svh flex-col p-5 sm:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" className="rounded-full border-white/20 bg-slate-950/55 text-white backdrop-blur hover:bg-white hover:text-slate-950">
            <Link to="/mcat">← Back to plan</Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/15 bg-slate-950/58 px-4 py-2 text-sm font-extrabold backdrop-blur">MCAT · {sessionSection}</span>
            <span className="rounded-full border border-leaf/55 bg-leaf/20 px-4 py-2 text-sm font-extrabold text-leaf backdrop-blur">Session 2 of 3 today</span>
          </div>
        </header>

        <section className="grid flex-1 place-items-center py-12 text-center">
          <div>
            <p className="font-display text-[clamp(5rem,14vw,9rem)] font-extrabold leading-none tabular-nums drop-shadow-2xl">
              {formatTimer(remaining)}
            </p>
            <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.32em] text-white/82">of {sessionMinutes} min · {breakLabel}</p>
            <div className="mx-auto mt-6 h-2 w-72 max-w-full overflow-hidden rounded-full bg-white/18">
              <span className="block h-full rounded-full bg-leaf transition-[width] duration-1000 motion-reduce:transition-none" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full bg-white text-slate-950 hover:bg-white/90" onClick={() => setRunning((value) => !value)}>
                {running ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
                {running ? 'Pause' : 'Resume'}
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/25 bg-slate-950/45 text-white backdrop-blur hover:bg-white hover:text-slate-950" onClick={() => setMissOpen(true)}>
                <Plus className="size-4" /> Log missed Q
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/25 bg-slate-950/45 text-white backdrop-blur hover:bg-white hover:text-slate-950" onClick={() => navigate('/mcat')}>
                <Square className="size-4" /> End session
              </Button>
            </div>
          </div>
        </section>

        <footer className="grid gap-4 md:grid-cols-[minmax(0,1fr)_28rem] md:items-end">
          <div className="flex items-end gap-3">
            <img src={mascotGif(visualTheme)} alt="" className="size-16 object-contain" />
            <div className="max-w-sm rounded-2xl border border-white/15 bg-slate-950/55 px-4 py-3 text-sm font-bold shadow-xl backdrop-blur">
              Halfway or not, every miss goes straight into the review bank. Clean reps beat frantic reps.
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-slate-950/58 p-4 shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/78">During this block</h2>
              <button onClick={() => setMissOpen(true)} className="text-xs font-extrabold text-primary">+ Missed Q</button>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <SessionMetric value={formatTimer(remaining)} label="left" />
              <SessionMetric value={formatTimer(sessionSeconds - remaining)} label="elapsed" />
              <SessionMetric value={String(Math.max(0, Math.ceil((breakSeconds - elapsed) / 60)))} label="min to break" />
            </div>
            <div className="mt-3 rounded-2xl bg-white/10 px-3 py-2 text-sm">
              <label className="text-[10px] font-extrabold uppercase tracking-wide text-white/55" htmlFor="session-goal">Session goal</label>
              <Textarea
                id="session-goal"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                rows={3}
                className="mt-1 border-white/10 bg-transparent px-0 text-sm font-bold leading-snug text-white shadow-none placeholder:text-white/45 focus-visible:ring-white/30"
              />
            </div>
            <Textarea
              value={sessionNote}
              onChange={(e) => update((d) => { d.notes['mcat-session-note'] = e.target.value })}
              placeholder="Scratchpad: passage set, strategy reminder, or what to review after this block..."
              rows={4}
              className="mt-3 border-white/15 bg-white/10 text-sm text-white placeholder:text-white/45 focus-visible:ring-white/30"
            />
          </div>
        </footer>
      </div>

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
    </main>
  )
}

function SessionMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/10 px-2 py-2">
      <span className="block text-sm font-extrabold tabular-nums">{value}</span>
      <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-wide text-white/58">{label}</span>
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
          <label className="block text-sm font-bold">Source<Input value={source} onChange={(e) => setSource(e.target.value)} placeholder="UWorld, AAMC FL..." /></label>
          <label className="block text-sm font-bold">Topic<Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="CARS inference, amino acids..." /></label>
          <label className="block text-sm font-bold">Reason missed<Textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} placeholder="Misread the stem, narrowed wrong, content gap..." /></label>
          <label className="block text-sm font-bold">Fix / note<Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="The rule or habit for next time..." /></label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={!topic.trim() && !reason.trim()}>Save miss</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
