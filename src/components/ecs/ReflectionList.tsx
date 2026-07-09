import { ArrowLeft, Plus } from 'lucide-react'
import type { OrgReflection } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ReflectionList({
  reflections, activeId, onOpen, onBack, onNew, onPatch,
}: {
  reflections: OrgReflection[]
  activeId: string | null
  onOpen: (id: string) => void
  onBack: () => void
  onNew: () => void
  onPatch: (id: string, patch: Partial<OrgReflection>) => void
}) {
  const active = reflections.find((reflection) => reflection.id === activeId)

  if (active) {
    return (
      <div className="space-y-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2"><ArrowLeft className="size-4" /> Back to reflections</Button>
        <Input value={active.title} onChange={(event) => onPatch(active.id, { title: event.target.value })} placeholder="Reflection title" />
        <Input type="date" value={active.date} onChange={(event) => onPatch(active.id, { date: event.target.value })} />
        <Textarea
          value={active.body}
          onChange={(event) => onPatch(active.id, { body: event.target.value })}
          placeholder="What happened, what changed, and what would be worth remembering later?"
          className="min-h-56"
        />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {reflections.length === 0 && (
        <p className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-sm font-semibold text-muted-foreground">
          No reflections yet. Capture the moment while it is still fresh.
        </p>
      )}
      {reflections.map((reflection) => (
        <button
          key={reflection.id}
          type="button"
          onClick={() => onOpen(reflection.id)}
          className="w-full rounded-xl border border-border bg-card p-4 text-left transition hover:border-primary/40 hover:bg-muted/25"
        >
          <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{reflection.date}</p>
          <h3 className="mt-1 font-display text-lg font-extrabold">{reflection.title || 'Untitled reflection'}</h3>
          <p
            className="mt-1 overflow-hidden text-sm text-muted-foreground"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {reflection.body || 'Open to write this reflection.'}
          </p>
        </button>
      ))}
      <button
        type="button"
        onClick={onNew}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 p-3 text-sm font-extrabold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
      >
        <Plus className="size-4" /> New reflection
      </button>
    </div>
  )
}

