import { AnimatePresence, m, Reorder, useReducedMotion } from 'motion/react'
import {
  CalendarDays,
  Check,
  Copy,
  Ellipsis,
  GripVertical,
  Star,
  Tag,
  Trash2,
} from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/common/useToast'
import { MascotNote } from '@/components/common/MascotNote'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import { daysUntil, fmtRelative } from '@/lib/date'
import { uid } from '@/lib/id'
import { MOTION_TRANSITION } from '@/lib/motion'
import { overviewTasks, type OverviewTaskTab } from '@/lib/overview'
import type { CollectionRecord, TaskItem } from '@/lib/types'
import { useStore } from '@/store/store'
import { cn } from '@/lib/utils'

const TABS: Array<{ value: OverviewTaskTab; label: string }> = [
  { value: 'now', label: 'Now' },
  { value: 'soon', label: 'Soon' },
  { value: 'done', label: 'Done' },
]
const CATEGORIES = ['Personal', 'Application', 'Advising', 'MCAT', 'Academics', 'Clinical', 'Letters', 'Essays']

export function OverviewTasks() {
  const tasks = useStore((state) => state.tasks)
  const addItem = useStore((state) => state.addItem)
  const update = useStore((state) => state.update)
  const logActivity = useStore((state) => state.logActivity)
  const [tab, setTab] = useState<OverviewTaskTab>('now')
  const [quickTitle, setQuickTitle] = useState('')
  const reduceMotion = useReducedMotion()

  const counts = useMemo(() => ({
    now: overviewTasks(tasks, 'now').length,
    soon: overviewTasks(tasks, 'soon').length,
    done: overviewTasks(tasks, 'done').length,
  }), [tasks])
  const visible = useMemo(() => overviewTasks(tasks, tab), [tab, tasks])
  const important = visible.filter((task) => task.important)
  const everythingElse = visible.filter((task) => !task.important)
  const overdue = visible.filter((task) => {
    const days = daysUntil(task.deadline)
    return days != null && days < 0 && task.progress !== 'Finished'
  }).length

  function quickAdd(event: FormEvent) {
    event.preventDefault()
    const title = quickTitle.trim()
    if (!title) return
    addItem('tasks', {
      id: uid(),
      title,
      type: 'Personal',
      progress: 'Not started',
      kanban: 'todo',
      archived: false,
      milestone: false,
      horizon: tab === 'soon' ? 'soon' : 'now',
      important: false,
      order: visible.length,
    })
    logActivity('timeline', `Added task: ${title}`)
    setQuickTitle('')
    if (tab === 'done') setTab('now')
  }

  function applyOrder(next: CollectionRecord<TaskItem>[]) {
    update((draft) => {
      const rank = new Map(next.map((task, index) => [task.id, index]))
      for (const task of draft.tasks) {
        const order = rank.get(task.id)
        if (order != null) task.order = order
      }
    })
  }

  return (
    <Card className="h-full min-h-[34rem]" role="region" aria-labelledby="overview-tasks-heading">
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div>
          <CardTitle id="overview-tasks-heading" className="text-lg">Tasks</CardTitle>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            {important.length} important{overdue ? ` · ${overdue} overdue` : ''}
          </p>
        </div>
        <Button asChild size="sm" variant="outline"><Link to="/timeline">Timeline</Link></Button>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-5rem)] flex-col">
        <Tabs value={tab} onValueChange={(value) => setTab(value as OverviewTaskTab)}>
          <TabsList className="grid w-full grid-cols-3">
            {TABS.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
                <Badge variant="muted" className="px-1.5 py-0 text-[10px]">{counts[item.value]}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative mt-4 min-h-0 flex-1">
          <AnimatePresence initial={false} mode="popLayout">
            <m.div
              key={tab}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
              className="w-full"
            >
              {!visible.length ? (
                <MascotNote
                  variant="empty-state"
                  priority={20}
                  title={tab === 'done' ? 'Nothing completed yet' : `Nothing in ${tab}`}
                  actions={tab === 'done'
                    ? <Button asChild size="sm"><Link to="/timeline">Open Timeline</Link></Button>
                    : <Button type="button" size="sm" onClick={() => document.getElementById('overview-quick-task')?.focus()}>Add a task</Button>}
                  className="min-h-56 items-center"
                >
                  {tab === 'done' ? 'Finish a task and it will collect here.' : 'Add a title below or move work here from Timeline.'}
                </MascotNote>
              ) : (
                <Reorder.Group axis="y" values={visible} onReorder={applyOrder} className="space-y-3">
                  <TaskGroup label="Important" tasks={important} tab={tab} reduceMotion={Boolean(reduceMotion)} />
                  <TaskGroup label={important.length ? 'Everything else' : undefined} tasks={everythingElse} tab={tab} reduceMotion={Boolean(reduceMotion)} />
                </Reorder.Group>
              )}
            </m.div>
          </AnimatePresence>
        </div>

        {tab !== 'done' && (
          <form onSubmit={quickAdd} className="mt-4 flex items-center gap-2 border-t border-dashed border-border pt-3">
            <Input
              id="overview-quick-task"
              value={quickTitle}
              onChange={(event) => setQuickTitle(event.target.value)}
              placeholder="Quick add — type and hit enter…"
              aria-label="Quick-add a general task"
              className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
            />
            <Button type="submit" size="sm" variant="ghost" disabled={!quickTitle.trim()}>Add</Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

function TaskGroup({
  label,
  tasks,
  tab,
  reduceMotion,
}: {
  label?: string
  tasks: CollectionRecord<TaskItem>[]
  tab: OverviewTaskTab
  reduceMotion: boolean
}) {
  if (!tasks.length) return null
  return (
    <section aria-label={label}>
      {label && (
        <div className="mb-1 flex items-center gap-2 px-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
          {label === 'Important' && <Star className="size-3.5 fill-warning text-warning" />}
          <span>{label}</span>
          <span className="h-px flex-1 bg-border" />
        </div>
      )}
      {tasks.slice(0, 7).map((task) => (
        <TaskRow key={task.id} task={task} tab={tab} reduceMotion={reduceMotion} />
      ))}
      {tasks.length > 7 && (
        <Link to="/timeline" className="mt-2 block px-2 text-xs font-bold text-primary">
          +{tasks.length - 7} more →
        </Link>
      )}
    </section>
  )
}

function TaskRow({
  task,
  tab,
  reduceMotion,
}: {
  task: CollectionRecord<TaskItem>
  tab: OverviewTaskTab
  reduceMotion: boolean
}) {
  const navigate = useNavigate()
  const toast = useToast()
  const patchItem = useStore((state) => state.patchItem)
  const addItem = useStore((state) => state.addItem)
  const softDeleteItems = useStore((state) => state.softDeleteItems)
  const undoRecovery = useStore((state) => state.undoRecovery)
  const logActivity = useStore((state) => state.logActivity)
  const days = daysUntil(task.deadline)

  function complete() {
    const previous = { progress: task.progress, kanban: task.kanban, archived: task.archived }
    patchItem('tasks', task.id, { progress: 'Finished', kanban: 'done', archived: false })
    logActivity('timeline', `Finished: ${task.title}`)
    toast({
      title: 'Task completed',
      description: task.title,
      tone: 'success',
      onUndo: () => patchItem('tasks', task.id, previous),
    })
  }

  function reopen() {
    patchItem('tasks', task.id, { progress: 'Not started', kanban: 'todo', archived: false })
    logActivity('timeline', `Reopened: ${task.title}`)
  }

  function duplicate() {
    addItem('tasks', {
      ...task,
      id: uid(),
      title: `${task.title} copy`,
      progress: 'Not started',
      kanban: 'todo',
      archived: false,
      order: task.order + 1,
    })
  }

  function remove() {
    const recoveryId = softDeleteItems('tasks', [task.id], `Deleted ${task.title}`)
    toast({
      title: 'Task moved to Trash',
      description: task.title,
      onUndo: recoveryId ? () => undoRecovery(recoveryId) : undefined,
    })
  }

  function setCategory(category: string) {
    patchItem('tasks', task.id, { type: category })
  }

  const row = (
    <Reorder.Item
      value={task}
      layout={reduceMotion ? undefined : 'position'}
      transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
      className={cn(
        'group mb-1 flex min-w-0 items-center gap-2 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-border hover:bg-muted/45',
        task.important && 'border-l-warning bg-warning/5 border-l-2',
      )}
    >
      <button type="button" className="cursor-grab touch-none rounded-md p-1 text-muted-foreground active:cursor-grabbing" aria-label={`Reorder ${task.title}`}>
        <GripVertical className="size-4" />
      </button>
      <Checkbox
        checked={task.progress === 'Finished'}
        onCheckedChange={(checked) => checked ? complete() : reopen()}
        aria-label={task.progress === 'Finished' ? `${task.title} completed` : `Complete ${task.title}`}
      />
      <Link to="/timeline" className="min-w-0 flex-1">
        <span className={cn('block truncate text-sm font-bold', task.progress === 'Finished' && 'text-muted-foreground line-through')}>{task.title}</span>
      </Link>
      <button type="button" onClick={() => navigate('/timeline')} aria-label={`Edit category for ${task.title}`} className="hidden sm:block">
        <Badge variant="muted" className="max-w-24 truncate">{task.type}</Badge>
      </button>
      {task.deadline && (
        <button type="button" onClick={() => navigate('/timeline')} aria-label={`Edit due date for ${task.title}`}>
          <Badge variant={days != null && days < 0 ? 'danger' : days != null && days <= 3 ? 'warning' : 'muted'}>
            {fmtRelative(task.deadline)}
          </Badge>
        </button>
      )}
      <Toggle
        pressed={Boolean(task.important)}
        onPressedChange={(pressed) => patchItem('tasks', task.id, { important: pressed })}
        size="sm"
        aria-label={task.important ? `Remove important from ${task.title}` : `Mark ${task.title} important`}
      >
        <Star className={cn('size-4', task.important && 'fill-warning text-warning')} />
      </Toggle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" size="icon" className="size-8" variant="ghost" aria-label={`More actions for ${task.title}`}>
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => patchItem('tasks', task.id, { important: !task.important })}><Star />{task.important ? 'Remove important' : 'Mark important'}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/timeline')}><CalendarDays />Set due date</DropdownMenuItem>
          <DropdownMenuItem onClick={() => patchItem('tasks', task.id, { horizon: tab === 'soon' ? 'now' : 'soon' })}>
            <Check />Move to {tab === 'soon' ? 'Now' : 'Soon'}
          </DropdownMenuItem>
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          {CATEGORIES.slice(0, 4).map((category) => <DropdownMenuItem key={category} onClick={() => setCategory(category)}><Tag />{category}</DropdownMenuItem>)}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={duplicate}><Copy />Duplicate</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={remove}><Trash2 />Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Reorder.Item>
  )

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{row}</ContextMenuTrigger>
      <ContextMenuContent className="min-w-52">
        <ContextMenuCheckboxItem checked={Boolean(task.important)} onCheckedChange={(checked) => patchItem('tasks', task.id, { important: checked === true })}>
          Mark important
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger><Tag />Tag</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {CATEGORIES.map((category) => <ContextMenuItem key={category} onSelect={() => setCategory(category)}>{category}</ContextMenuItem>)}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem onSelect={() => navigate('/timeline')}><CalendarDays />Set due date</ContextMenuItem>
        <ContextMenuItem onSelect={() => patchItem('tasks', task.id, { horizon: tab === 'soon' ? 'now' : 'soon' })}>
          <Check />Move to {tab === 'soon' ? 'Now' : 'Soon'}
        </ContextMenuItem>
        <ContextMenuItem onSelect={duplicate}><Copy />Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive" onSelect={remove}><Trash2 />Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
