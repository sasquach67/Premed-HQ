import { type ReactNode, useState } from 'react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2, ExternalLink, StickyNote } from 'lucide-react'
import type { CollectionKey } from '@/lib/types'
import { useStore } from '@/store/store'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

export type CellType = 'text' | 'number' | 'date' | 'select' | 'longtext' | 'link' | 'toggle'

export interface ColumnDef {
  key: string
  header: string
  type: CellType
  width?: string
  options?: string[]
  /** for 'toggle': [offLabel, onLabel] */
  toggleLabels?: [string, string]
  /** for 'longtext': show an AMCAS-style character counter against this limit */
  maxLength?: number
  align?: 'left' | 'right'
  placeholder?: string
}

/** TrackerTable accepts any row with an id; cells read fields by key name. */
type Row = { id: string }
function field(row: Row, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}

interface TrackerTableProps {
  collection: CollectionKey
  rows: Row[]
  columns: ColumnDef[]
  /** boolean field that drives the check-off control (left of each row) */
  checkKey?: string
  reorder?: boolean
  /** custom right-aligned actions per row */
  rowActions?: (row: Row) => ReactNode
  onDelete?: (id: string) => void
  empty?: ReactNode
}

/** The detailed editable TABLE behind every pillar tracker.
 *  Inline edit · check-off · drag-reorder · delete (Notion-like). */
export function TrackerTable({
  collection, rows, columns, checkKey, reorder = true, rowActions, onDelete, empty,
}: TrackerTableProps) {
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const reorderItems = useStore((s) => s.reorderItems)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (over && active.id !== over.id) reorderItems(collection, String(active.id), String(over.id))
  }

  if (!rows.length && empty) return <>{empty}</>

  const ids = rows.map((r) => r.id)

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="overflow-x-auto rounded-xl border border-border bg-card card-soft">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            {reorder && <th className="w-8" />}
            {checkKey && <th className="w-10 px-2 py-2.5" />}
            {columns.map((c) => (
              <th key={c.key} className={cn('px-3 py-2.5 font-semibold', c.align === 'right' && 'text-right')} style={{ width: c.width }}>
                {c.header}
              </th>
            ))}
            <th className="w-16 px-2 py-2.5" />
          </tr>
          </thead>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <tbody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  columns={columns}
                  checkKey={checkKey}
                  reorder={reorder}
                  rowActions={rowActions}
                  onChange={(k, v) => patchItem(collection, row.id, { [k]: v })}
                  onDelete={() => (onDelete ? onDelete(row.id) : removeItem(collection, row.id))}
                />
              ))}
            </tbody>
          </SortableContext>
        </table>
      </div>
    </DndContext>
  )
}

function TableRow({
  row, columns, checkKey, reorder, rowActions, onChange, onDelete,
}: {
  row: Row
  columns: ColumnDef[]
  checkKey?: string
  reorder: boolean
  rowActions?: (row: Row) => ReactNode
  onChange: (key: string, value: unknown) => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id })
  const checked = checkKey ? Boolean(field(row, checkKey)) : false

  return (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('border-b border-border/70 last:border-0 hover:bg-muted/40', isDragging && 'opacity-60', checked && 'opacity-55')}
    >
      {reorder && (
        <td className="px-1 text-muted-foreground">
          <button {...attributes} {...listeners} className="cursor-grab p-1 hover:text-foreground active:cursor-grabbing" aria-label="Drag to reorder">
            <GripVertical className="size-4" />
          </button>
        </td>
      )}
      {checkKey && (
        <td className="px-2">
          <Checkbox checked={checked} onCheckedChange={(v) => onChange(checkKey, Boolean(v))} />
        </td>
      )}
      {columns.map((c) => (
        <td key={c.key} className={cn('px-3 py-1.5 align-middle', c.align === 'right' && 'text-right')}>
          <Cell column={c} value={field(row, c.key)} checked={checked} onChange={(v) => onChange(c.key, v)} />
        </td>
      ))}
      <td className="px-2 text-right">
        <div className="flex items-center justify-end gap-1">
          {rowActions?.(row)}
          <button onClick={onDelete} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-destructive" aria-label="Delete row">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function Cell({
  column, value, checked, onChange,
}: { column: ColumnDef; value: unknown; checked: boolean; onChange: (v: unknown) => void }) {
  const base = 'w-full bg-transparent text-sm outline-none focus:ring-0 placeholder:text-muted-foreground/70'

  if (column.type === 'toggle') {
    const on = Boolean(value)
    const [off, onL] = column.toggleLabels ?? ['Off', 'On']
    return (
      <button
        onClick={() => onChange(!on)}
        className={cn(
          'rounded-full px-2 py-0.5 text-xs font-bold transition-colors',
          on ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        )}
      >
        {on ? onL : off}
      </button>
    )
  }

  if (column.type === 'select') {
    return (
      <select
        value={String(value ?? '')}
        onChange={(e) => onChange(e.target.value)}
        className={cn(base, 'cursor-pointer rounded-md py-1 -ml-1 hover:bg-muted')}
      >
        {(column.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  }

  if (column.type === 'longtext') {
    return <LongText column={column} value={String(value ?? '')} onChange={onChange} />
  }

  if (column.type === 'link') {
    const url = String(value ?? '')
    return (
      <div className="flex items-center gap-1">
        <input
          defaultValue={url}
          placeholder={column.placeholder || 'Paste URL…'}
          onBlur={(e) => onChange(e.target.value)}
          className={cn(base, 'min-w-[6rem]')}
        />
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="shrink-0 text-primary hover:text-primary/80">
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    )
  }

  return (
    <input
      type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'}
      defaultValue={value == null ? '' : String(value)}
      placeholder={column.placeholder}
      onBlur={(e) => onChange(column.type === 'number' ? Number(e.target.value) || 0 : e.target.value)}
      className={cn(base, column.align === 'right' && 'text-right', checked && 'line-through')}
    />
  )
}

/** Long-text editor in a popover, with a live AMCAS character counter when a limit is set. */
function LongText({ column, value, onChange }: { column: ColumnDef; value: string; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(value)
  const max = column.maxLength
  const over = max != null && text.length > max
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex max-w-[18rem] items-center gap-1.5 truncate rounded-md px-1.5 py-1 -ml-1.5 text-left hover:bg-muted">
          <StickyNote className="size-3.5 shrink-0 text-muted-foreground" />
          <span className={cn('truncate', !value && 'text-muted-foreground/70')}>{value || column.placeholder || 'Add notes…'}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Textarea
          autoFocus
          value={text}
          placeholder={column.placeholder}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => onChange(text)}
          className="min-h-32"
        />
        {max != null && (
          <div className={cn('mt-1 text-right text-[11px] font-semibold', over ? 'text-destructive' : 'text-muted-foreground')}>
            {text.length.toLocaleString()} / {max.toLocaleString()} chars{over ? ' · over AMCAS limit' : ''}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
