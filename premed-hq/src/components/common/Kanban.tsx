import { type ReactNode } from 'react'
import {
  DndContext, PointerSensor, useSensor, useSensors, useDraggable, useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core'
import { cn } from '@/lib/utils'

export interface KanbanItem {
  id: string
  title: string
  subtitle?: string
  badge?: ReactNode
  column: string
}
export interface KanbanColumnDef {
  id: string
  title: string
  accent?: string
}

/** Reusable To-Do / In-Progress / Done board with drag between columns. */
export function Kanban({
  columns, items, onMove, footer,
}: {
  columns: KanbanColumnDef[]
  items: KanbanItem[]
  onMove: (id: string, column: string) => void
  footer?: (columnId: string) => ReactNode
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (over) onMove(String(active.id), String(over.id))
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="grid gap-3 md:grid-cols-3">
        {columns.map((col) => (
          <Column key={col.id} col={col} count={items.filter((i) => i.column === col.id).length} footer={footer}>
            {items.filter((i) => i.column === col.id).map((i) => <Card key={i.id} item={i} />)}
          </Column>
        ))}
      </div>
    </DndContext>
  )
}

function Column({
  col, count, children, footer,
}: { col: KanbanColumnDef; count: number; children: ReactNode; footer?: (id: string) => ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id })
  return (
    <div className="flex min-h-48 flex-col rounded-xl border border-border bg-muted/40 p-2.5">
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="size-2.5 rounded-full" style={{ background: col.accent ?? 'var(--primary)' }} />
        <span className="text-sm font-bold">{col.title}</span>
        <span className="text-xs text-muted-foreground">{count}</span>
      </div>
      <div ref={setNodeRef} className={cn('flex-1 space-y-2 rounded-lg p-1 transition-colors', isOver && 'bg-secondary/60 ring-2 ring-primary/30')}>
        {children}
      </div>
      {footer && <div className="px-1 pt-2">{footer(col.id)}</div>}
    </div>
  )
}

function Card({ item }: { item: KanbanItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}
      className={cn(
        'cursor-grab rounded-lg border border-border bg-card p-2.5 text-sm card-soft active:cursor-grabbing',
        isDragging && 'opacity-50 shadow-lg'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium leading-snug">{item.title}</span>
        {item.badge}
      </div>
      {item.subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>}
    </div>
  )
}
