import { useMemo, useState } from 'react'
import { Plus, FileText, Trash2, Clock } from 'lucide-react'
import { useStore } from '@/store/store'
import type { NotePage } from '@/lib/types'
import { uid } from '@/lib/id'
import { fmtTimeAgo } from '@/lib/date'
import { SidePeek } from './SidePeek'
import { EmptyState } from './EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

/** Notion-style notes: a small database of pages; click a card → opens a
 *  side-peek to read/edit. Replaces always-open scratchpad textboxes. */
export function NotesDB({ pillar, title = 'Notes' }: { pillar: string; title?: string }) {
  const notePages = useStore((s) => s.notePages)
  const addItem = useStore((s) => s.addItem)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const [openId, setOpenId] = useState<string | null>(null)

  const pages = useMemo(
    () => notePages.filter((n) => n.pillar === pillar).sort((a, b) => b.updatedAt - a.updatedAt),
    [notePages, pillar]
  )
  const active = pages.find((p) => p.id === openId) ?? null

  function add() {
    const page: NotePage = { id: uid(), title: '', body: '', pillar, updatedAt: Date.now(), order: 0 }
    addItem('notePages', page)
    setOpenId(page.id)
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold"><FileText className="size-4 text-primary" /> {title}</h3>
        <Button size="sm" variant="outline" onClick={add}><Plus className="size-4" /> New note</Button>
      </div>

      {pages.length === 0 ? (
        <EmptyState icon={FileText} title="No notes yet" hint="Create a note page — it opens in a side panel to write, like Notion. Good for study techniques, syllabi links, brain dumps." action={<Button size="sm" onClick={add}><Plus className="size-4" /> New note</Button>} />
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpenId(p.id)}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-3 text-left card-soft transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <span className="truncate text-sm font-bold">{p.title || 'Untitled note'}</span>
              <span className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.body || 'Empty — click to write.'}</span>
              <span className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="size-3" /> {fmtTimeAgo(p.updatedAt)}</span>
              <span
                onClick={(e) => { e.stopPropagation(); removeItem('notePages', p.id) }}
                className="absolute right-1.5 top-1.5 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </span>
            </button>
          ))}
        </div>
      )}

      <SidePeek
        open={!!active}
        onOpenChange={(v) => !v && setOpenId(null)}
        title={
          <Input
            value={active?.title ?? ''}
            placeholder="Note title…"
            onChange={(e) => active && patchItem('notePages', active.id, { title: e.target.value, updatedAt: Date.now() })}
            className="h-8 border-0 px-0 text-lg font-bold shadow-none focus-visible:ring-0"
          />
        }
      >
        {active && (
          <Textarea
            autoFocus
            value={active.body}
            placeholder="Start writing… (everything autosaves)"
            onChange={(e) => patchItem('notePages', active.id, { body: e.target.value, updatedAt: Date.now() })}
            className="min-h-[60vh] resize-none border-0 px-0 text-sm shadow-none focus-visible:ring-0"
          />
        )}
      </SidePeek>
    </div>
  )
}
