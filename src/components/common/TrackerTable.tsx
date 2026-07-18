import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  AlignLeft, CalendarDays, CheckSquare2, ExternalLink, GripVertical, Hash, Link2,
  ListFilter, StickyNote, ToggleLeft, Trash2, Type,
} from 'lucide-react'
import type { CollectionKey } from '@/lib/types'
import { useStore } from '@/store/store'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select, SelectContent, SelectItem, SelectTrigger,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export type CellType = 'text' | 'number' | 'date' | 'select' | 'longtext' | 'link' | 'toggle' | 'read' | 'custom'

export type TrackerRow = { id: string }

export interface ColumnDef {
  key: string
  header: string
  type: CellType
  width?: string
  options?: string[]
  optionDots?: Record<string, string>
  selectDisplay?: 'label' | 'dot'
  allowEmpty?: boolean
  /** for 'toggle': [offLabel, onLabel] */
  toggleLabels?: [string, string]
  /** for 'longtext': show an AMCAS-style character counter against this limit */
  maxLength?: number
  align?: 'left' | 'right'
  placeholder?: string
  wrap?: boolean
  read?: (row: Row) => ReactNode
  render?: (ctx: { row: Row; value: unknown; checked: boolean; onChange: (v: unknown) => void }) => ReactNode
}

/** TrackerTable accepts any row with an id; cells read fields by key name. */
type Row = TrackerRow
function field(row: Row, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}

const CELL_TYPE_ICON: Record<CellType, LucideIcon> = {
  text: Type,
  number: Hash,
  date: CalendarDays,
  select: ListFilter,
  longtext: AlignLeft,
  link: Link2,
  toggle: ToggleLeft,
  read: Hash,
  custom: ListFilter,
}

function columnWidthPx(width?: string) {
  const match = /^(\d+)px$/.exec(width ?? '')
  return match ? Number(match[1]) : 160
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
  const minWidth = columns.reduce((sum, column) => sum + columnWidthPx(column.width), 80 + (reorder ? 32 : 0) + (checkKey ? 40 : 0))

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card/70 shadow-sm">
        <table className="w-full border-collapse text-sm" style={{ minWidth }}>
          <thead>
          <tr className="border-b border-border/80 bg-card/45 text-left text-[12px] font-extrabold text-foreground/75">
            {reorder && (
              <th className="w-8 px-1 py-3">
                <GripVertical className="size-3.5 opacity-45" aria-hidden="true" />
              </th>
            )}
            {checkKey && (
              <th className="w-10 px-2 py-3">
                <CheckSquare2 className="size-3.5 opacity-60" aria-hidden="true" />
              </th>
            )}
            {columns.map((c) => (
              <th key={c.key} className={cn('px-3 py-3', c.align === 'right' && 'text-right')} style={{ width: c.width }}>
                <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap', c.align === 'right' && 'justify-end')}>
                  {(() => {
                    const Icon = CELL_TYPE_ICON[c.type]
                    return <Icon className="size-3.5 opacity-65" aria-hidden="true" />
                  })()}
                  {c.header}
                </span>
              </th>
            ))}
            <th className="w-16 px-2 py-3" />
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
      className={cn('group min-h-14 border-b border-border/70 last:border-0 hover:bg-muted/35', isDragging && 'opacity-60', checked && 'opacity-55')}
    >
      {reorder && (
        <td className="px-1 text-muted-foreground">
          <button {...attributes} {...listeners} className="grid size-7 cursor-grab place-items-center rounded-md opacity-55 transition hover:bg-muted hover:text-foreground hover:opacity-100 active:cursor-grabbing" aria-label="Drag to reorder">
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
        <td key={c.key} className={cn('px-3 py-3 align-top', c.align === 'right' && 'text-right')}>
          <Cell row={row} column={c} value={field(row, c.key)} checked={checked} onChange={(v) => onChange(c.key, v)} />
        </td>
      ))}
      <td className="px-2 text-right">
        <div className="flex items-center justify-end gap-1">
          {rowActions?.(row)}
          <button onClick={onDelete} className="grid size-7 place-items-center rounded-md text-muted-foreground opacity-45 transition hover:bg-muted hover:text-destructive hover:opacity-100 group-hover:opacity-100" aria-label="Delete row">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function Cell({
  row, column, value, checked, onChange,
}: { row: Row; column: ColumnDef; value: unknown; checked: boolean; onChange: (v: unknown) => void }) {
  const base = 'w-full rounded-md bg-transparent px-1.5 py-1 text-sm outline-none transition-colors hover:bg-muted/45 focus:bg-card focus:ring-2 focus:ring-ring/35 placeholder:text-muted-foreground/70'

  if (column.render) {
    return <>{column.render({ row, value, checked, onChange })}</>
  }

  if (column.type === 'read') {
    return (
      <div className={cn('px-1.5 py-1 text-sm font-bold text-muted-foreground', column.align === 'right' && 'text-right')}>
        {column.read?.(row)}
      </div>
    )
  }

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
    const emptyValue = '__empty__'
    const selected = String(value ?? '') || emptyValue
    const selectedDot = selected !== emptyValue ? column.optionDots?.[selected] : undefined
    const dotOnly = column.selectDisplay === 'dot' && Boolean(selectedDot)
    return (
      <Select value={selected} onValueChange={(next) => onChange(next === emptyValue ? '' : next)}>
        <SelectTrigger
          className={cn(
            'h-auto min-h-8 max-w-full rounded-full border-border/70 bg-transparent px-2.5 py-1 text-left text-sm font-semibold shadow-none hover:bg-muted/45 focus:ring-2 focus:ring-ring/35',
            dotOnly && 'w-fit min-w-12 justify-center px-2',
            !value && 'text-muted-foreground'
          )}
        >
          {dotOnly ? (
            <span className="flex items-center gap-1">
              <span className={cn('size-2.5 shrink-0 rounded-full', selectedDot)} aria-hidden="true" />
              <span className="sr-only">{selected}</span>
            </span>
          ) : (
            <span className="flex min-w-0 items-center gap-2 overflow-hidden">
              {selectedDot && <span className={cn('size-2 shrink-0 rounded-full', selectedDot)} aria-hidden="true" />}
              <span className="min-w-0 truncate">
                {selected === emptyValue ? column.placeholder || 'Select…' : selected}
              </span>
            </span>
          )}
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-border bg-card/95 font-display shadow-xl backdrop-blur-md">
          {column.allowEmpty && <SelectItem value={emptyValue}>{column.placeholder || 'Select…'}</SelectItem>}
          {(column.options ?? []).map((o) => (
            <SelectItem key={o} value={o}>
              <span className="flex items-center gap-2">
                {column.optionDots?.[o] && <span className={cn('size-2 shrink-0 rounded-full', column.optionDots[o])} aria-hidden="true" />}
                <span>{o}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
          <a href={url} target="_blank" rel="noopener noreferrer" className="grid size-7 shrink-0 place-items-center rounded-md text-primary transition hover:bg-secondary hover:text-primary/80">
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    )
  }

  if (column.wrap && column.type === 'text') {
    return (
      <AutoGrowTextarea
        value={value == null ? '' : String(value)}
        placeholder={column.placeholder}
        checked={checked}
        onChange={(next) => onChange(next)}
      />
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

function AutoGrowTextarea({
  value, placeholder, checked, onChange,
}: { value: string; placeholder?: string; checked: boolean; onChange: (v: string) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState(value)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${Math.max(36, el.scrollHeight)}px`
  }, [draft])

  return (
    <textarea
      ref={ref}
      rows={1}
      value={draft}
      placeholder={placeholder}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => onChange(draft)}
      className={cn(
        'w-full resize-none overflow-hidden rounded-md bg-transparent px-1.5 py-1 text-sm leading-snug outline-none transition-colors hover:bg-muted/45 focus:bg-card focus:ring-2 focus:ring-ring/35 placeholder:text-muted-foreground/70',
        checked && 'line-through'
      )}
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
        <button className={cn(
          'flex items-start gap-1.5 rounded-md px-1.5 py-1 -ml-1.5 text-left transition-colors hover:bg-muted/55',
          column.wrap ? 'max-w-[22rem] whitespace-normal break-words leading-snug' : 'max-w-[18rem] truncate'
        )}>
          <StickyNote className="size-3.5 shrink-0 text-muted-foreground" />
          <span className={cn(column.wrap ? 'whitespace-normal break-words' : 'truncate', !value && 'text-muted-foreground/70')}>{value || column.placeholder || 'Add notes…'}</span>
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
