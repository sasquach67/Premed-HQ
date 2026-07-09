import { useMemo, useState } from 'react'
import {
  Archive, Check, CalendarDays, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Plus, Search, Trash2, X,
} from 'lucide-react'
import { useStore } from '@/store/store'
import type {
  AcademicCourseOption, AcademicTagColor, AcademicTypeOption, TaskItem,
} from '@/lib/types'
import { uid } from '@/lib/id'
import { daysUntil } from '@/lib/date'
import { TrackerTable, type ColumnDef } from './TrackerTable'
import { EmptyState } from './EmptyState'
import { InfoTip } from './InfoTip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const PROGRESS_DOTS = {
  'Not started': 'bg-destructive',
  'Working on': 'bg-warning',
  Finished: 'bg-success',
}

const TAG_COLORS: AcademicTagColor[] = ['gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red']

const TAG_COLOR_CLASS: Record<AcademicTagColor, string> = {
  gray: 'border-stone-300/70 bg-stone-100 text-stone-700 dark:border-stone-600/70 dark:bg-stone-800/80 dark:text-stone-200',
  brown: 'border-amber-700/20 bg-amber-100 text-amber-900 dark:border-amber-500/30 dark:bg-amber-900/35 dark:text-amber-100',
  orange: 'border-orange-400/35 bg-orange-100 text-orange-800 dark:border-orange-400/35 dark:bg-orange-950/45 dark:text-orange-100',
  yellow: 'border-yellow-400/40 bg-yellow-100 text-yellow-900 dark:border-yellow-300/30 dark:bg-yellow-950/40 dark:text-yellow-100',
  green: 'border-emerald-400/35 bg-emerald-100 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-950/45 dark:text-emerald-100',
  blue: 'border-sky-400/35 bg-sky-100 text-sky-800 dark:border-sky-400/30 dark:bg-sky-950/45 dark:text-sky-100',
  purple: 'border-violet-400/35 bg-violet-100 text-violet-800 dark:border-violet-400/30 dark:bg-violet-950/45 dark:text-violet-100',
  pink: 'border-pink-400/35 bg-pink-100 text-pink-800 dark:border-pink-400/30 dark:bg-pink-950/45 dark:text-pink-100',
  red: 'border-red-400/35 bg-red-100 text-red-800 dark:border-red-400/30 dark:bg-red-950/45 dark:text-red-100',
}

type TagOption = AcademicCourseOption | AcademicTypeOption
type TagKind = 'course' | 'type'

function slug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'tag'
}

function nextTagColor(count: number): AcademicTagColor {
  return TAG_COLORS[count % TAG_COLORS.length]
}

function normalize(value?: string) {
  return (value ?? '').trim().toLowerCase()
}

function optionLabel(option?: TagOption | null) {
  return option?.name?.trim() || ''
}

function compactCourseLabel(label: string) {
  return label.match(/^[A-Z]{2,6}\s*\d{3}[A-Z]?/i)?.[0].toUpperCase() ?? label
}

function titleCaseLabel(label: string) {
  return label.replace(/\S+/g, (word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
}

function typeId(name: string) {
  return `type-${slug(name)}`
}

function courseId(name: string) {
  return `course-${slug(name)}`
}

function daysLeftLabel(iso?: string) {
  const n = daysUntil(iso)
  if (n == null) return { label: 'No date', tone: 'muted' as const }
  if (n === 0) return { label: 'Today', tone: 'urgent' as const }
  if (n === 1) return { label: 'Tomorrow', tone: 'soon' as const }
  if (n < 0) return { label: `${Math.abs(n)} days late`, tone: 'late' as const }
  return { label: `${n} days`, tone: 'normal' as const }
}

function assignmentColumns({
  courseOptions, typeOptions, usedCourseIds, usedTypeIds,
}: {
  courseOptions: AcademicCourseOption[]
  typeOptions: AcademicTypeOption[]
  usedCourseIds: Set<string>
  usedTypeIds: Set<string>
}): ColumnDef[] {
  return [
  {
    key: 'courseId',
    header: 'Course',
    type: 'custom',
    width: '115px',
    render: ({ row }) => {
      const task = row as TaskItem
      return <AcademicTagSelect kind="course" task={task} options={courseOptions} usedIds={usedCourseIds} />
    },
  },
  { key: 'title', header: 'Assignment', type: 'text', width: '220px', placeholder: 'What’s due', wrap: true },
  {
    key: 'typeId',
    header: 'Type',
    type: 'custom',
    width: '140px',
    render: ({ row }) => {
      const task = row as TaskItem
      return <AcademicTagSelect kind="type" task={task} options={typeOptions} usedIds={usedTypeIds} />
    },
  },
  { key: 'deadline', header: 'Deadline', type: 'date', width: '140px' },
  {
    key: 'dueIn',
    header: 'Days left',
    type: 'read',
    width: '110px',
    read: (row) => {
      const due = daysLeftLabel((row as TaskItem).deadline)
      return (
        <span className={cn(
          'inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-extrabold',
          due.tone === 'late' && 'bg-destructive/12 text-destructive',
          due.tone === 'urgent' && 'bg-warning/20 text-warning-foreground',
          due.tone === 'soon' && 'bg-primary/12 text-primary',
          due.tone === 'normal' && 'bg-muted text-foreground/75',
          due.tone === 'muted' && 'text-muted-foreground'
        )}>{due.label}</span>
      )
    },
  },
  { key: 'progress', header: 'Progress', type: 'select', width: '95px', options: ['Not started', 'Working on', 'Finished'], optionDots: PROGRESS_DOTS, selectDisplay: 'dot' },
  { key: 'notes', header: 'Description', type: 'longtext', width: '260px', placeholder: 'Notes…', wrap: true },
  { key: 'fileUrl', header: 'File', type: 'link', width: '110px' },
  ]
}

export function addTask(course?: string) {
  useStore.getState().addItem('tasks', {
    id: uid(), title: '', course, type: 'assignment', typeId: typeId('assignment'), progress: 'Not started',
    kanban: 'todo', archived: false, milestone: false, order: 0,
  } as TaskItem)
}

/** The assignment tracker + a calendar synced to it (Notion model).
 *  Used as Academics' main dashboard and Timeline's Assignments tab. */
export function AssignmentsPanel() {
  const tasks = useStore((s) => s.tasks)
  const academics = useStore((s) => s.academics)
  const active = tasks.filter((t) => !t.archived && !t.milestone)
  const usedCourseIds = useMemo(() => new Set(tasks.map((task) => task.courseId).filter(Boolean) as string[]), [tasks])
  const usedTypeIds = useMemo(() => new Set(tasks.map((task) => task.typeId).filter(Boolean) as string[]), [tasks])
  const courseOptions = academics.courseOptions.filter((option) => !option.archived || usedCourseIds.has(option.id))
  const typeOptions = academics.assignmentTypeOptions.filter((option) => !option.archived || usedTypeIds.has(option.id))
  const columns = useMemo(
    () => assignmentColumns({ courseOptions, typeOptions, usedCourseIds, usedTypeIds }),
    [courseOptions, typeOptions, usedCourseIds, usedTypeIds]
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Active assignments</h3>
        <Button size="sm" variant="outline" onClick={() => addTask()}><Plus className="size-4" /> Add task</Button>
      </div>
      <TrackerTable
        collection="tasks"
        rows={active}
        columns={columns}
        checkKey="archived"
        empty={<EmptyState icon={CalendarDays} title="No active assignments" hint="Add anything with a deadline. Check it off to clear it from the table; its date shows on the calendar below." action={<Button size="sm" onClick={() => addTask()}><Plus className="size-4" /> Add task</Button>} />}
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Calendar view
            <InfoTip label="Synced to the table: assignment deadlines appear automatically on their due dates." />
          </CardTitle>
        </CardHeader>
        <CardContent><MonthCalendar tasks={active} /></CardContent>
      </Card>
    </div>
  )
}

function AcademicTagSelect({
  kind, task, options, usedIds,
}: {
  kind: TagKind
  task: TaskItem
  options: TagOption[]
  usedIds: Set<string>
}) {
  const update = useStore((s) => s.update)
  const patchItem = useStore((s) => s.patchItem)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const selectedId = kind === 'course' ? task.courseId : task.typeId
  const legacy = kind === 'course' ? task.course : task.type
  const selected = options.find((option) => option.id === selectedId)
    ?? options.find((option) => normalize(option.name) === normalize(legacy))
  const filtered = options.filter((option) => !option.archived && option.name.toLowerCase().includes(query.trim().toLowerCase()))
  const exactMatch = options.some((option) => normalize(option.name) === normalize(query))
  const canCreate = query.trim().length > 0 && !exactMatch

  function selectOption(option: TagOption | null) {
    if (kind === 'course') {
      patchItem('tasks', task.id, {
        courseId: option?.id ?? '',
        course: option ? option.name : '',
      } as Partial<TaskItem>)
    } else {
      patchItem('tasks', task.id, {
        typeId: option?.id ?? '',
        type: option ? option.name : '',
      } as Partial<TaskItem>)
    }
    setOpen(false)
    setQuery('')
  }

  function createOption() {
    const name = query.trim()
    if (!name) return
    let created: TagOption | null = null
    update((draft) => {
      if (kind === 'course') {
        created = {
          id: uniqueOptionId(draft.academics.courseOptions, courseId(name)),
          name,
          color: nextTagColor(draft.academics.courseOptions.length),
          archived: false,
        }
        draft.academics.courseOptions.push(created as AcademicCourseOption)
      } else {
        created = {
          id: uniqueOptionId(draft.academics.assignmentTypeOptions, typeId(name)),
          name,
          color: nextTagColor(draft.academics.assignmentTypeOptions.length + 2),
          archived: false,
        }
        draft.academics.assignmentTypeOptions.push(created as AcademicTypeOption)
      }
    })
    if (created) selectOption(created)
  }

  function renameOption(option: TagOption, name: string) {
    const next = name.trim()
    if (!next) return
    update((draft) => {
      const list = kind === 'course' ? draft.academics.courseOptions : draft.academics.assignmentTypeOptions
      const found = list.find((item) => item.id === option.id)
      if (!found) return
      found.name = next
      for (const row of draft.tasks) {
        if (kind === 'course' && row.courseId === option.id) row.course = next
        if (kind === 'type' && row.typeId === option.id) row.type = next
      }
    })
  }

  function recolorOption(option: TagOption, color: AcademicTagColor) {
    update((draft) => {
      const list = kind === 'course' ? draft.academics.courseOptions : draft.academics.assignmentTypeOptions
      const found = list.find((item) => item.id === option.id)
      if (found) found.color = color
    })
  }

  function removeOption(option: TagOption) {
    update((draft) => {
      const list = kind === 'course' ? draft.academics.courseOptions : draft.academics.assignmentTypeOptions
      const index = list.findIndex((item) => item.id === option.id)
      if (index < 0) return
      if (usedIds.has(option.id)) list[index].archived = true
      else list.splice(index, 1)
    })
    if (selected?.id === option.id && !usedIds.has(option.id)) selectOption(null)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[activeIndex]) selectOption(filtered[activeIndex])
      else if (canCreate) createOption()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={(next) => { setOpen(next); if (!next) { setEditingId(null); setQuery('') } }}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex max-w-full items-center gap-1.5 rounded-full px-1 py-0.5 text-left transition hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35"
          aria-label={`${kind === 'course' ? 'Course' : 'Assignment type'} selector`}
        >
          <TagPill option={selected} fallback={legacy} placeholder={kind === 'course' ? 'Select course' : 'Select type'} kind={kind} />
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(22rem,calc(100vw-2rem))] p-2" align="start">
        <div className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            onKeyDown={onKeyDown}
            placeholder={`Search or create ${kind === 'course' ? 'course' : 'type'}...`}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        {selected && (
          <button
            type="button"
            onClick={() => selectOption(null)}
            className="mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" /> Clear current value
          </button>
        )}
        <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
          {filtered.map((option, index) => (
            <OptionRow
              key={option.id}
              option={option}
              selected={selected?.id === option.id}
              active={index === activeIndex}
              used={usedIds.has(option.id)}
              editing={editingId === option.id}
              kind={kind}
              onSelect={() => selectOption(option)}
              onEdit={() => setEditingId(editingId === option.id ? null : option.id)}
              onRename={(name) => renameOption(option, name)}
              onColor={(color) => recolorOption(option, color)}
              onRemove={() => removeOption(option)}
            />
          ))}
          {canCreate && (
            <button
              type="button"
              onClick={createOption}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-bold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35"
            >
              <Plus className="size-4" /> Create "{query.trim()}"
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function uniqueOptionId(options: { id: string }[], base: string) {
  let id = base
  let i = 2
  while (options.some((option) => option.id === id)) {
    id = `${base}-${i}`
    i += 1
  }
  return id
}

function TagPill({ option, fallback, placeholder, kind = 'type' }: { option?: TagOption | null; fallback?: string; placeholder: string; kind?: TagKind }) {
  const fullLabel = optionLabel(option) || fallback || ''
  const compact = kind === 'course'
  const label = compact ? compactCourseLabel(fullLabel) : titleCaseLabel(fullLabel)
  if (!label) {
    return <span className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs font-bold text-muted-foreground">{placeholder}</span>
  }
  const course = option && 'icon' in option ? option as AcademicCourseOption : null
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-extrabold leading-none',
      compact ? 'max-w-[6.75rem]' : 'max-w-[10rem]',
      option ? TAG_COLOR_CLASS[option.color] : TAG_COLOR_CLASS.gray
    )}
      title={fullLabel}
    >
      {course?.icon && <span aria-hidden="true">{course.icon}</span>}
      <span className="truncate">{label}</span>
    </span>
  )
}

function OptionRow({
  option, selected, active, used, editing, kind, onSelect, onEdit, onRename, onColor, onRemove,
}: {
  option: TagOption
  selected: boolean
  active: boolean
  used: boolean
  editing: boolean
  kind: TagKind
  onSelect: () => void
  onEdit: () => void
  onRename: (name: string) => void
  onColor: (color: AcademicTagColor) => void
  onRemove: () => void
}) {
  const [draft, setDraft] = useState(option.name)

  return (
    <div className={cn('rounded-lg border border-transparent p-1 transition', active && 'bg-muted/60', editing && 'border-border bg-card')}>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-1 py-1.5 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35"
        >
          <TagPill option={option} placeholder="Option" kind={kind} />
          {kind === 'course' && 'title' in option && option.title && <span className="min-w-0 truncate text-xs text-muted-foreground">{option.title}</span>}
          {selected && <Check className="ml-auto size-4 shrink-0 text-primary" />}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label={`Edit ${option.name}`}
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
      {editing && (
        <div className="space-y-2 px-1 pb-1 pt-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => onRename(draft)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onRename(draft)
              }
            }}
            className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring/35"
            aria-label={`Rename ${option.name}`}
          />
          <div className="flex flex-wrap gap-1">
            {TAG_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onColor(color)}
                className={cn('h-6 rounded-full border px-2 text-[10px] font-bold capitalize transition hover:scale-[1.03]', TAG_COLOR_CLASS[color], option.color === color && 'ring-2 ring-ring/45')}
              >
                {color}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          >
            {used ? <Archive className="size-3.5" /> : <Trash2 className="size-3.5" />}
            {used ? 'Archive option' : 'Delete option'}
          </button>
        </div>
      )}
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
