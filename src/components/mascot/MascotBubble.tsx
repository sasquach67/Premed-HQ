import { useMemo, useState } from 'react'
import { Shuffle, X, Pencil, Plus, Trash2 } from 'lucide-react'
import { Ram, type RamMood } from './Ram'
import type { TipEntry } from '@/lib/types'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { pickDaily } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const MOODS: RamMood[] = ['happy', 'wink', 'cheer']

/** The ram in a speech bubble: serves one tip a day, shuffles on demand,
 *  can be dismissed, and its tip pool is editable. Decorative + human. */
export function MascotBubble({
  tips, ramSize = 84, side = 'left', floating = false, stacked = false,
}: { tips: TipEntry[]; ramSize?: number; side?: 'left' | 'right'; floating?: boolean; stacked?: boolean }) {
  const dailyIndex = useMemo(() => {
    if (!tips.length) return 0
    const picked = pickDaily(tips, 7)
    return Math.max(0, tips.findIndex((t) => t.id === picked?.id))
  }, [tips])

  const [index, setIndex] = useState(dailyIndex)
  const [mood, setMood] = useState<RamMood>('happy')
  const [open, setOpen] = useState(true)

  const tip = tips[index % Math.max(1, tips.length)]

  function shuffle() {
    if (tips.length < 2) return
    let n = index
    while (n === index) n = Math.floor(Math.random() * tips.length)
    setIndex(n)
    setMood(MOODS[Math.floor(Math.random() * MOODS.length)])
  }

  if (!tip) return null

  return (
    <div
      className={cn(
        stacked ? 'flex flex-col items-stretch gap-2' : 'flex items-start gap-2',
        !stacked && side === 'right' && 'flex-row-reverse',
        stacked && 'flex-col-reverse'
      )}
    >
      {open && (
        <div
          className={cn(
            'relative animate-pop-in rounded-2xl border border-border bg-card px-3.5 py-2.5 text-sm card-soft',
            stacked ? 'w-full' : 'max-w-[15rem]',
            floating && 'shadow-lg'
          )}
        >
          <p className="leading-snug text-foreground">{tip.text}</p>
          <div className="mt-1.5 flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {tip.source ?? 'tip'}
            </span>
            <div className="flex items-center gap-0.5">
              <button onClick={shuffle} title="Another tip" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <Shuffle className="size-3.5" />
              </button>
              <TipEditor>
                <button title="Edit tip pool" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Pencil className="size-3.5" />
                </button>
              </TipEditor>
              <button onClick={() => setOpen(false)} title="Dismiss" className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="size-3.5" />
              </button>
            </div>
          </div>
          {/* side tail points back to the mascot, like a conventional speech bubble */}
          {!stacked && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-7 size-3 rotate-45 bg-card',
                side === 'left'
                  ? '-right-1.5 border-r border-t border-border'
                  : '-left-1.5 border-b border-l border-border'
              )}
            />
          )}
        </div>
      )}
      <button onClick={() => (open ? shuffle() : setOpen(true))} className={cn('shrink-0 animate-float', stacked && 'self-start')} title="Hi! Click me">
        <Ram size={ramSize} mood={mood} />
      </button>
    </div>
  )
}

/** Edit the tip pool the ram draws from. */
function TipEditor({ children }: { children: React.ReactNode }) {
  const tips = useStore((s) => s.tips)
  const addItem = useStore((s) => s.addItem)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const [draft, setDraft] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>The ram’s tip pool</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a tip the ram can say…"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && draft.trim()) {
                addItem('tips', { id: uid(), text: draft.trim(), source: 'you', tag: 'andy' })
                setDraft('')
              }
            }}
          />
          <Button
            onClick={() => {
              if (!draft.trim()) return
              addItem('tips', { id: uid(), text: draft.trim(), source: 'you', tag: 'andy' })
              setDraft('')
            }}
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
          {tips.map((t) => (
            <div key={t.id} className="group flex items-start gap-2 rounded-lg border border-border bg-card px-2.5 py-2">
              <input
                className="flex-1 bg-transparent text-sm outline-none"
                defaultValue={t.text}
                onBlur={(e) => patchItem('tips', t.id, { text: e.target.value })}
              />
              <button
                onClick={() => removeItem('tips', t.id)}
                className="rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
