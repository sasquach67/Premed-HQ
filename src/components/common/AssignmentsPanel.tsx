import { useMemo, useState } from 'react'
import { Plus, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '@/store/store'
import type { TaskItem } from '@/lib/types'
import { uid } from '@/lib/id'
import { TrackerTable, type ColumnDef } from './TrackerTable'
import { EmptyState } from './EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TASK_TYPES = ['Assignment', 'Exam', 'Quiz', 'Lab', 'Reading', 'Application', 'Meeting', 'Advising', 'Personal', 'Other']
const TASK_COLUMNS: ColumnDef[] = [
  { key: 'course', header: 'Course', type: 'text', width: '110px', placeholder: 'Course' },
  { key: 'title', header: 'Description', type: 'text', placeholder: 'What’s due' },
  { key: 'type', header: 'Type', type: 'select', width: '120px', options: TASK_TYPES },
  { key: 'deadline', header: 'Deadline', type: 'date', width: '150px' },
  { key: 'progress', header: 'Progress', type: 'select', width: '130px', options: ['Not started', 'Working on', 'Finished'] },
  { key: 'notes', header: 'Notes', type: 'longtext', placeholder: 'Notes…' },
  { key: 'fileUrl', header: 'File', type: 'link', width: '110px' },
]

export function addTask(course?: string) {
  useStore.getState().addItem('tasks', {
    id: uid(), title: '', course, type: 'Assignment', progress: 'Not started',
    kanban: 'todo', archived: false, milestone: false, order: 0,
  } as TaskItem)
}

/** The assignment tracker + a calendar synced to it (Notion model).
 *  Used as Academics' main dashboard and Timeline's Assignments tab. */
export function AssignmentsPanel() {
  const tasks = useStore((s) => s.tasks)
  const active = tasks.filter((t) => !t.archived && !t.milestone)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Active assignments</h3>
        <Button size="sm" variant="outline" onClick={() => addTask()}><Plus className="size-4" /> Add task</Button>
      </div>
      <TrackerTable
        collection="tasks"
        rows={active}
        columns={TASK_COLUMNS}
        checkKey="archived"
        empty={<EmptyState icon={CalendarDays} title="No active assignments" hint="Add anything with a deadline. Check it off to clear it from the table; its date shows on the calendar below." action={<Button size="sm" onClick={() => addTask()}><Plus className="size-4" /> Add task</Button>} />}
      />
      <Card>
        <CardHeader><CardTitle>Calendar — synced to the table</CardTitle></CardHeader>
        <CardContent><MonthCalendar tasks={active} /></CardContent>
      </Card>
    </div>
  )
}

/** Month calendar that places task deadlines on their day. */
export function MonthCalendar({ tasks }: { tasks: TaskItem[] }) {
  const [cursor, setCursor] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1) })
  const year = cursor.getFullYear()
  const month = cursor.getMonth()

  const byDay = useMemo(() => {
    const map = new Map<string, TaskItem[]>()
    for (const t of tasks) {
      if (!t.deadline) continue
      const key = new Date(t.deadline).toDateString()
      const arr = map.get(key) ?? []; arr.push(t); map.set(key, arr)
    }
    return map
  }, [tasks])

  const first = new Date(year, month, 1)
  const startPad = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]
  const today = new Date().toDateString()

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-display text-lg font-semibold">{cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</span>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="size-8" onClick={() => setCursor(new Date(year, month - 1, 1))}><ChevronLeft className="size-4" /></Button>
          <Button size="icon" variant="ghost" className="size-8" onClick={() => setCursor(new Date(year, month + 1, 1))}><ChevronRight className="size-4" /></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-muted-foreground">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          const items = date ? byDay.get(date.toDateString()) ?? [] : []
          const isToday = date?.toDateString() === today
          return (
            <div key={i} className={cn('min-h-16 rounded-lg border p-1 text-left', date ? 'border-border bg-card' : 'border-transparent', isToday && 'ring-2 ring-primary/40')}>
              {date && <div className={cn('mb-0.5 text-[11px] font-semibold', isToday ? 'text-primary' : 'text-muted-foreground')}>{date.getDate()}</div>}
              <div className="space-y-0.5">
                {items.slice(0, 3).map((t) => (
                  <div key={t.id} className="truncate rounded bg-secondary px-1 py-0.5 text-[10px] font-medium text-secondary-foreground" title={t.title}>{t.title || 'Untitled'}</div>
                ))}
                {items.length > 3 && <div className="text-[10px] text-muted-foreground">+{items.length - 3}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
