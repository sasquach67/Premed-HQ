import { useMemo, useState, type DragEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Archive, ArrowLeft, Atom, BarChart3, BookOpen, Brain, Calculator,
  CheckCircle2, Circle, Dna, Edit3, FlaskConical, FolderOpen, Leaf, Link2, Mail, Microscope,
  MoreHorizontal, NotebookText, PenLine, Plus, Search, Stethoscope, Target,
  ListChecks,
  Trash2, Upload, Users, type LucideIcon,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { uid } from '@/lib/id'
import { cn } from '@/lib/utils'
import type {
  AcademicTagColor, ClassAssignment,
  ClassCenterClass, ClassCenterData, ClassContact, ClassContactRole,
  ClassFileResource, ClassFileType, ClassNote, ClassNoteType, ClassTopic,
  ClassWeakArea, PracticeExam, PracticeExamDifficulty, PracticeQuestion,
  PracticeQuestionType, TopicConfidence, TopicStatus, WeakAreaSource,
} from '@/lib/types'
import { aiPracticeService, type GeneratePracticeExamRequest } from '@/services/aiPracticeService'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const COLORS: AcademicTagColor[] = ['blue', 'green', 'purple', 'orange', 'yellow', 'red', 'pink', 'gray', 'brown']
const CLASS_ICONS: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: 'book', label: 'Book', Icon: BookOpen },
  { id: 'dna', label: 'Biology', Icon: Dna },
  { id: 'brain', label: 'Psych', Icon: Brain },
  { id: 'atom', label: 'Science', Icon: Atom },
  { id: 'flask', label: 'Chemistry', Icon: FlaskConical },
  { id: 'stethoscope', label: 'Health', Icon: Stethoscope },
  { id: 'microscope', label: 'Lab', Icon: Microscope },
  { id: 'chart', label: 'Stats', Icon: BarChart3 },
  { id: 'pen', label: 'Writing', Icon: PenLine },
  { id: 'leaf', label: 'Life', Icon: Leaf },
  { id: 'calculator', label: 'Math', Icon: Calculator },
]
const ICON_ALIASES: Record<string, string> = {
  '\u{1F4D8}': 'book',
  '\u{1F9EC}': 'dna',
  '\u{1F9E0}': 'brain',
  '\u{2697}\u{FE0F}': 'flask',
  '\u{1FA7A}': 'stethoscope',
  '\u{1F52C}': 'microscope',
  '\u{1F9EA}': 'flask',
  '\u{1F4CA}': 'chart',
  '\u{270D}\u{FE0F}': 'pen',
  '\u{1F331}': 'leaf',
}
const TOPIC_STATUSES: TopicStatus[] = ['not-started', 'seen', 'notes-made', 'reviewing', 'weak', 'ready']
const NOTE_TYPES: ClassNoteType[] = ['lecture', 'reading', 'lab', 'study-guide', 'exam-review', 'question-log', 'other']
const FILE_TYPES: ClassFileType[] = ['syllabus', 'lecture-slides', 'reading', 'study-guide', 'rubric', 'past-exam', 'lab-handout', 'link', 'other']
const CONTACT_ROLES: ClassContactRole[] = ['professor', 'TA', 'advisor', 'study-partner', 'tutor', 'peer', 'other']
const PRACTICE_DIFFICULTIES: PracticeExamDifficulty[] = ['easy', 'medium', 'hard', 'mixed']
const PRACTICE_QUESTION_TYPES: PracticeQuestionType[] = ['multiple-choice', 'short-answer', 'free-response']

const COLOR_STYLES: Record<AcademicTagColor, string> = {
  gray: 'from-slate-400/18 via-slate-200/18 to-slate-500/12 text-slate-700 dark:text-slate-200',
  brown: 'from-stone-500/20 via-amber-200/18 to-stone-400/14 text-stone-800 dark:text-stone-100',
  orange: 'from-orange-400/22 via-amber-200/18 to-orange-500/12 text-orange-800 dark:text-orange-100',
  yellow: 'from-yellow-300/24 via-amber-100/20 to-yellow-500/12 text-yellow-800 dark:text-yellow-100',
  green: 'from-emerald-400/22 via-lime-100/16 to-green-500/12 text-emerald-800 dark:text-emerald-100',
  blue: 'from-sky-400/22 via-blue-100/16 to-blue-500/12 text-sky-800 dark:text-sky-100',
  purple: 'from-violet-400/22 via-purple-100/16 to-violet-500/12 text-violet-800 dark:text-violet-100',
  pink: 'from-pink-400/22 via-rose-100/16 to-pink-500/12 text-pink-800 dark:text-pink-100',
  red: 'from-red-400/22 via-rose-100/16 to-red-500/12 text-red-800 dark:text-red-100',
}

const PILL_STYLES: Record<AcademicTagColor, string> = {
  gray: 'bg-slate-500/12 text-slate-700 dark:text-slate-200',
  brown: 'bg-stone-500/12 text-stone-700 dark:text-stone-200',
  orange: 'bg-orange-500/12 text-orange-700 dark:text-orange-200',
  yellow: 'bg-yellow-500/18 text-yellow-800 dark:text-yellow-100',
  green: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-200',
  blue: 'bg-sky-500/12 text-sky-700 dark:text-sky-200',
  purple: 'bg-violet-500/12 text-violet-700 dark:text-violet-200',
  pink: 'bg-pink-500/12 text-pink-700 dark:text-pink-200',
  red: 'bg-red-500/12 text-red-700 dark:text-red-200',
}

type ClassFormState = Omit<ClassCenterClass, 'id' | 'createdAt' | 'updatedAt' | 'order'>

function emptyClassForm(semester = 'Fall 2026'): ClassFormState {
  return {
    courseCode: '',
    courseTitle: '',
    nickname: '',
    semester,
    instructor: '',
    meetingDays: '',
    meetingTime: '',
    location: '',
    color: 'blue',
    icon: 'book',
    background: '',
    status: 'active',
    currentTopicId: '',
    syllabusUrl: '',
    canvasUrl: '',
    driveFolderUrl: '',
    goodNotesUrl: '',
    ankiDeckName: '',
    notesDocUrl: '',
  }
}

function classToForm(row: ClassCenterClass): ClassFormState {
  return {
    courseCode: row.courseCode,
    courseTitle: row.courseTitle,
    nickname: row.nickname ?? '',
    semester: row.semester,
    instructor: row.instructor ?? '',
    meetingDays: row.meetingDays ?? '',
    meetingTime: row.meetingTime ?? '',
    location: row.location ?? '',
    color: row.color,
    icon: normalizeClassIcon(row.icon),
    background: row.background ?? '',
    status: row.status,
    currentTopicId: row.currentTopicId ?? '',
    syllabusUrl: row.syllabusUrl ?? '',
    canvasUrl: row.canvasUrl ?? '',
    driveFolderUrl: row.driveFolderUrl ?? '',
    goodNotesUrl: row.goodNotesUrl ?? '',
    ankiDeckName: row.ankiDeckName ?? '',
    notesDocUrl: row.notesDocUrl ?? '',
  }
}

function normalizeClassIcon(icon?: string) {
  const id = ICON_ALIASES[icon ?? ''] ?? icon ?? 'book'
  return CLASS_ICONS.some((item) => item.id === id) ? id : 'book'
}

function ClassIcon({ icon, className }: { icon?: string; className?: string }) {
  const item = CLASS_ICONS.find((entry) => entry.id === normalizeClassIcon(icon)) ?? CLASS_ICONS[0]
  const Icon = item.Icon
  return (
    <span className={cn('grid shrink-0 place-items-center', className)}>
      <Icon className="size-[18px]" aria-hidden="true" />
    </span>
  )
}

function reorderClasses(draft: ClassCenterData, orderedVisibleIds: string[]) {
  const visible = new Set(orderedVisibleIds)
  const byId = new Map(draft.classes.map((row) => [row.id, row]))
  const orderedVisible = orderedVisibleIds.map((id) => byId.get(id)).filter(Boolean) as ClassCenterClass[]
  const current = [...draft.classes].sort((a, b) => a.order - b.order)
  const firstVisibleIndex = current.findIndex((row) => visible.has(row.id))
  if (firstVisibleIndex < 0) return
  const before = current.slice(0, firstVisibleIndex).filter((row) => !visible.has(row.id))
  const after = current.slice(firstVisibleIndex).filter((row) => !visible.has(row.id))
  ;[...before, ...orderedVisible, ...after].forEach((row, index) => {
    row.order = index
    row.updatedAt = Date.now()
  })
}

export function ClassCenter({ archiveOnly = false }: { archiveOnly?: boolean }) {
  const params = useParams()
  const navigate = useNavigate()
  const data = useStore((s) => s.academics.classCenter)
  const update = useStore((s) => s.update)
  const classId = params.classId
  const activeClass = data.classes.find((row) => row.id === classId)

  function mutate(fn: (draft: ClassCenterData) => void) {
    update((draft) => fn(draft.academics.classCenter))
  }

  if (classId) {
    if (!activeClass) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Archive className="size-8 text-muted-foreground" />
            <div>
              <h2 className="font-display text-2xl font-bold">Class not found</h2>
              <p className="mt-1 text-sm text-muted-foreground">It may have been archived or deleted.</p>
            </div>
            <Button asChild><Link to="/academics">Back to Class Center</Link></Button>
          </CardContent>
        </Card>
      )
    }
    return <ClassWorkspace row={activeClass} data={data} mutate={mutate} onBack={() => navigate('/academics')} />
  }

  return <ClassCenterDashboard data={data} mutate={mutate} archiveOnly={archiveOnly} />
}

function ClassCenterDashboard({
  data, mutate, archiveOnly,
}: {
  data: ClassCenterData
  mutate: (fn: (draft: ClassCenterData) => void) => void
  archiveOnly: boolean
}) {
  const [semester, setSemester] = useState(archiveOnly ? 'Archived' : 'Fall 2026')
  const [query, setQuery] = useState('')
  const [editor, setEditor] = useState<{ open: boolean; classId?: string; form: ClassFormState }>({
    open: false,
    form: emptyClassForm(),
  })
  const [draggedClassId, setDraggedClassId] = useState<string | null>(null)
  const [dragOverClassId, setDragOverClassId] = useState<string | null>(null)
  const semesters = useMemo(() => {
    const list = Array.from(new Set(data.classes.map((row) => row.semester))).filter(Boolean)
    return ['Fall 2026', 'Spring 2027', ...list.filter((item) => !['Fall 2026', 'Spring 2027'].includes(item)), 'All active', 'Archived']
  }, [data.classes])
  const filtered = data.classes
    .filter((row) => {
      if (archiveOnly || semester === 'Archived') return row.status === 'archived'
      if (semester === 'All active') return row.status === 'active'
      return row.status === 'active' && row.semester === semester
    })
    .filter((row) => `${row.courseCode} ${row.courseTitle} ${row.nickname ?? ''} ${row.instructor ?? ''}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.order - b.order)
  const activeClasses = data.classes.filter((row) => row.status === 'active')

  function saveClass() {
    const now = Date.now()
    const form = editor.form
    if (!form.courseCode.trim() && !form.courseTitle.trim()) return
    mutate((draft) => {
      if (editor.classId) {
        const row = draft.classes.find((item) => item.id === editor.classId)
        if (row) Object.assign(row, form, { updatedAt: now })
      } else {
        draft.classes.push({
          ...form,
          id: uid(),
          courseCode: form.courseCode.trim() || 'NEW 101',
          courseTitle: form.courseTitle.trim() || 'Untitled class',
          createdAt: now,
          updatedAt: now,
          order: draft.classes.length,
        })
      }
    })
    setEditor({ open: false, form: emptyClassForm(semester === 'Archived' || semester === 'All active' ? 'Fall 2026' : semester) })
  }

  function moveClass(targetId: string) {
    if (!draggedClassId || draggedClassId === targetId) return
    const visibleIds = filtered.map((row) => row.id)
    const from = visibleIds.indexOf(draggedClassId)
    const to = visibleIds.indexOf(targetId)
    if (from < 0 || to < 0) return
    const nextVisibleIds = [...visibleIds]
    const [moved] = nextVisibleIds.splice(from, 1)
    nextVisibleIds.splice(to, 0, moved)
    mutate((draft) => reorderClasses(draft, nextVisibleIds))
  }

  return (
    <div className="space-y-5">
      {!archiveOnly && (
        <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card/78 p-3 shadow-sm lg:flex-row lg:items-center">
          <div className="flex gap-1 overflow-x-auto rounded-full bg-muted/55 p-1">
            {semesters.map((item) => (
              <button
                key={item}
                onClick={() => setSemester(item)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-2 text-sm font-extrabold transition',
                  semester === item ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item === 'All active' ? 'All' : item}
              </button>
            ))}
          </div>
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="rounded-full pl-9" placeholder="Find a class, note, topic..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full"><Plus className="size-4" /> New class</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditor({ open: true, form: emptyClassForm(semester === 'Archived' || semester === 'All active' ? 'Fall 2026' : semester) })}>Start blank</DropdownMenuItem>
              <DropdownMenuItem><Upload className="size-4" /> Import / add material</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((row) => (
          <ClassCard
            key={row.id}
            row={row}
            data={data}
            dragging={draggedClassId === row.id}
            dragOver={dragOverClassId === row.id && draggedClassId !== row.id}
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = 'move'
              event.dataTransfer.setData('text/plain', row.id)
              setDraggedClassId(row.id)
            }}
            onDragOver={(event) => {
              if (!draggedClassId || draggedClassId === row.id) return
              event.preventDefault()
              event.dataTransfer.dropEffect = 'move'
              setDragOverClassId(row.id)
            }}
            onDragLeave={() => setDragOverClassId((current) => current === row.id ? null : current)}
            onDrop={(event) => {
              event.preventDefault()
              moveClass(row.id)
              setDraggedClassId(null)
              setDragOverClassId(null)
            }}
            onDragEnd={() => {
              setDraggedClassId(null)
              setDragOverClassId(null)
            }}
            onEdit={() => setEditor({ open: true, classId: row.id, form: classToForm(row) })}
            onDelete={() => {
              if (!window.confirm(`Delete ${row.courseCode || row.courseTitle}?`)) return
              mutate((draft) => {
                draft.classes = draft.classes.filter((item) => item.id !== row.id)
                draft.topics = draft.topics.filter((item) => item.classId !== row.id)
                draft.notes = draft.notes.filter((item) => item.classId !== row.id)
                draft.assignments = draft.assignments.filter((item) => item.classId !== row.id)
                draft.files = draft.files.filter((item) => item.classId !== row.id)
                draft.contacts = draft.contacts.filter((item) => item.classId !== row.id)
                draft.weakAreas = draft.weakAreas.filter((item) => item.classId !== row.id)
              })
            }}
            onArchive={() => mutate((draft) => {
              const item = draft.classes.find((c) => c.id === row.id)
              if (item) {
                item.status = item.status === 'archived' ? 'active' : 'archived'
                item.updatedAt = Date.now()
              }
            })}
          />
        ))}
        {!archiveOnly && (
          <button
            onClick={() => setEditor({ open: true, form: emptyClassForm(semester === 'Archived' || semester === 'All active' ? 'Fall 2026' : semester) })}
            className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/45 p-6 text-center transition hover:border-primary/50 hover:bg-primary/5"
          >
            <Plus className="mb-2 size-6 text-muted-foreground" />
            <span className="font-display text-lg font-bold">Add class from your course plan</span>
            <span className="mt-1 text-sm font-semibold text-muted-foreground">or start blank</span>
          </button>
        )}
        {!filtered.length && (
          <Card className="md:col-span-2 xl:col-span-3">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <BookOpen className="size-8 text-muted-foreground" />
              <div>
                <p className="font-display text-xl font-bold">No classes here yet</p>
                <p className="text-sm text-muted-foreground">Create a class or switch semesters to see the workspace grid.</p>
              </div>
              <Button onClick={() => setEditor({ open: true, form: emptyClassForm() })}><Plus className="size-4" /> New Class</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {!archiveOnly && <AcrossClassesStrip data={data} classes={activeClasses} />}

      <ClassEditorDialog
        open={editor.open}
        title={editor.classId ? 'Edit class' : 'Create class'}
        form={editor.form}
        onOpenChange={(open) => setEditor((prev) => ({ ...prev, open }))}
        onChange={(patch) => setEditor((prev) => ({ ...prev, form: { ...prev.form, ...patch } }))}
        onSave={saveClass}
      />
    </div>
  )
}

function ClassCard({
  row, data, dragging, dragOver, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd, onEdit, onArchive, onDelete,
}: {
  row: ClassCenterClass
  data: ClassCenterData
  dragging: boolean
  dragOver: boolean
  onDragStart: (event: DragEvent<HTMLElement>) => void
  onDragOver: (event: DragEvent<HTMLElement>) => void
  onDragLeave: () => void
  onDrop: (event: DragEvent<HTMLElement>) => void
  onDragEnd: () => void
  onEdit: () => void
  onArchive: () => void
  onDelete: () => void
}) {
  const stats = classStats(row.id, data)
  const topic = data.topics.find((item) => item.id === row.currentTopicId)
  const nextText = stats.nextDeadline?.title
    ? `${stats.nextDeadline.title}${stats.nextDeadline.dueDate ? ` · ${daysUntil(stats.nextDeadline.dueDate)}` : ''}`
    : topic?.title ?? 'Choose a topic'
  const compactMeta = [row.instructor || 'Instructor TBD', row.semester, compactMeeting(row)].filter(Boolean).join(' · ')
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={cn(
        'group relative cursor-grab overflow-hidden transition active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-lg',
        dragging && 'scale-[0.98] opacity-55',
        dragOver && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
    >
      <span className={cn('absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b', COLOR_STYLES[row.color])} aria-hidden="true" />
      <CardContent className="space-y-3 p-4 pl-5">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/academics/classes/${row.id}`} className="flex min-w-0 items-start gap-3">
            <ClassIcon icon={row.icon} className="size-10 rounded-2xl bg-muted text-muted-foreground" />
            <span className="min-w-0">
              <span className="block font-display text-xl font-bold leading-tight text-foreground group-hover:text-primary">{row.courseCode || row.nickname}</span>
              <span className="line-clamp-1 text-sm font-semibold text-muted-foreground">{row.courseTitle || row.nickname}</span>
            </span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Class actions"><MoreHorizontal className="size-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{row.courseCode || 'Class'}</DropdownMenuLabel>
              <DropdownMenuItem onClick={onEdit}><Edit3 className="size-4" /> Edit details</DropdownMenuItem>
              <DropdownMenuItem asChild><Link to={`/academics/classes/${row.id}`}><Link2 className="size-4" /> Links & syllabus</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive}><Archive className="size-4" /> {row.status === 'archived' ? 'Restore' : 'Archive'}</DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive"><Trash2 className="size-4" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="line-clamp-1 font-bold">{compactMeta || 'Details not set'}</p>
          <p className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 text-xs font-extrabold text-foreground">
            <span className="shrink-0 uppercase text-primary">Up next</span>
            <span className="min-w-0 truncate text-muted-foreground">{nextText}</span>
          </p>
        </div>
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${stats.revision}%` }} />
          </div>
          <p className="mt-1 text-right text-[11px] font-bold text-muted-foreground">{stats.revision}% revised</p>
        </div>
        <div className="flex flex-wrap gap-1.5 text-xs font-bold text-muted-foreground">
          {stats.weakCount > 0 && <span className="rounded-full bg-destructive/12 px-2 py-0.5 text-destructive">{stats.weakCount} weak</span>}
          {stats.notesCount > 0 && <span className="rounded-full bg-muted px-2 py-0.5">{stats.notesCount} notes</span>}
          {stats.filesCount > 0 && <span className="rounded-full bg-muted px-2 py-0.5">{stats.filesCount} files</span>}
          {!stats.weakCount && !stats.notesCount && !stats.filesCount && <span className="rounded-full bg-muted px-2 py-0.5">Ready to fill</span>}
        </div>
      </CardContent>
    </Card>
  )
}

function AcrossClassesStrip({ data, classes }: { data: ClassCenterData; classes: ClassCenterClass[] }) {
  const activeIds = new Set(classes.map((row) => row.id))
  const upcoming = data.assignments
    .filter((item) => activeIds.has(item.classId) && item.status !== 'submitted' && item.status !== 'graded' && item.dueDate)
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))
    .slice(0, 5)
  const revision = data.topics
    .filter((topic) => activeIds.has(topic.classId) && ['weak', 'reviewing', 'seen'].includes(topic.status))
    .slice(0, 5)
  const weak = data.weakAreas.filter((item) => activeIds.has(item.classId) && item.status !== 'resolved').sort((a, b) => b.severity - a.severity).slice(0, 5)
  return (
    <Card>
      <CardContent className="grid gap-6 p-4 lg:grid-cols-[1fr_1.2fr_auto]">
        <div>
          <h3 className="font-display text-lg font-bold">Across your classes</h3>
          <p className="mt-3 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Due next</p>
          <div className="mt-2 space-y-1.5">
            {upcoming.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-sm">
                <span className="size-2 rounded-full bg-primary" />
                <span className="min-w-0 flex-1 truncate font-bold">{classLabel(item.classId, data)} · {item.title}</span>
                <span className="text-xs font-extrabold text-destructive">{item.dueDate ? daysUntil(item.dueDate) : ''}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Review queue · weakest first</p>
          <div className="mt-2 grid gap-1.5">
            {[...weak.map((item) => ({ id: item.id, label: item.label, classId: item.classId, status: item.status })), ...revision.map((item) => ({ id: item.id, label: item.title, classId: item.classId, status: item.status }))].slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-sm">
                <span className="min-w-0 flex-1 truncate font-bold">{item.label}</span>
                <Badge variant={String(item.status).includes('weak') || item.status === 'active' ? 'danger' : 'warning'}>{String(item.status).replace(/-/g, ' ')}</Badge>
                <Link to={`/academics/classes/${item.classId}`} className="text-xs font-extrabold text-primary">Review →</Link>
              </div>
            ))}
          </div>
        </div>
        <Button asChild variant="link" className="self-start justify-self-end"><Link to="/academics?tab=assignments">Full assignments view →</Link></Button>
      </CardContent>
    </Card>
  )
}

function ClassWorkspace({
  row, data, mutate, onBack,
}: {
  row: ClassCenterClass
  data: ClassCenterData
  mutate: (fn: (draft: ClassCenterData) => void) => void
  onBack: () => void
}) {
  const navigate = useNavigate()
  const [classEditorOpen, setClassEditorOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('today')
  const [form, setForm] = useState<ClassFormState>(classToForm(row))
  const stats = classStats(row.id, data)
  const topic = data.topics.find((item) => item.id === row.currentTopicId)
  const noteCount = data.notes.filter((note) => note.classId === row.id).length
  const assignmentCount = data.assignments.filter((assignment) => assignment.classId === row.id && assignment.status !== 'graded' && assignment.status !== 'submitted').length

  function saveClass() {
    mutate((draft) => {
      const item = draft.classes.find((classRow) => classRow.id === row.id)
      if (item) Object.assign(item, form, { updatedAt: Date.now() })
    })
    setClassEditorOpen(false)
  }

  return (
    <div className="space-y-5">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card/84 shadow-sm">
          {row.background && (
            <>
              <img src={row.background} alt="" className="absolute inset-0 size-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-card/92 via-card/86 to-card/72" />
            </>
          )}
          <div className="relative flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back to Class Center"><ArrowLeft className="size-4" /></Button>
              <ClassIcon icon={row.icon} className={cn('size-11 rounded-2xl bg-gradient-to-br', COLOR_STYLES[row.color])} />
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-extrabold leading-tight">{row.courseCode} <span className="text-muted-foreground">{row.courseTitle}</span></h2>
                <p className="truncate text-sm font-bold text-muted-foreground">{row.instructor || 'Instructor TBD'} · {compactMeeting(row) || 'Meeting details TBD'} · {row.semester}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Now: {topic?.title ?? 'Topic TBD'}</Badge>
              {stats.nextDeadline && <Badge variant="danger">{stats.nextDeadline.title} · {stats.nextDeadline.dueDate ? daysUntil(stats.nextDeadline.dueDate) : 'soon'}</Badge>}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-full"><Plus className="size-4" /> Add</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => addNote(row.id, mutate)}><NotebookText className="size-4" /> Note</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addTopic(row.id, mutate)}><Target className="size-4" /> Topic</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addWeakArea(row.id, mutate)}><Brain className="size-4" /> Weak area</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addFile(row.id, mutate)}><FolderOpen className="size-4" /> Resource</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addContact(row.id, mutate)}><Users className="size-4" /> Contact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full" aria-label="Class menu"><MoreHorizontal className="size-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setClassEditorOpen(true)}><Edit3 className="size-4" /> Edit details</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    mutate((draft) => {
                      const item = draft.classes.find((classRow) => classRow.id === row.id)
                      if (item) item.status = item.status === 'archived' ? 'active' : 'archived'
                    })
                  }}><Archive className="size-4" /> {row.status === 'archived' ? 'Restore' : 'Archive'}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>
        <div className="mt-4 grid gap-5 lg:grid-cols-[225px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-3xl border border-border bg-card/82 p-3 pt-4 shadow-sm lg:mt-1">
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              <TabsList className="flex h-auto min-w-max flex-row gap-2 rounded-none bg-transparent p-0 lg:min-w-0 lg:flex-col">
                <ClassRailTab value="today" icon={BookOpen} label="Today" />
                <ClassRailTab value="study" icon={Brain} label="Study Center" />
                <ClassRailTab value="notes" icon={NotebookText} label="Notes" count={noteCount} />
              </TabsList>
              <ClassRailLink
                icon={ListChecks}
                label="Assignments"
                count={assignmentCount}
                onClick={() => navigate('/academics?tab=assignments')}
              />
              <TabsList className="flex h-auto min-w-max flex-row gap-2 rounded-none bg-transparent p-0 lg:min-w-0 lg:flex-col">
                <ClassRailTab value="kit" icon={FolderOpen} label="Course kit" />
              </TabsList>
            </div>
            <div className="mt-3 hidden border-t border-border/70 px-2 pt-3 text-xs font-bold text-muted-foreground lg:flex lg:items-center lg:gap-2">
              <img src="/art/mascot.gif" alt="" className="size-8 object-contain [image-rendering:pixelated]" />
              <span>{assignmentCount || noteCount ? `${assignmentCount || noteCount} class item${(assignmentCount || noteCount) === 1 ? '' : 's'} active` : 'Class workspace'}</span>
            </div>
          </aside>
          <div className="min-w-0 space-y-5">
            <TabsContent value="today" className="mt-0">
              <OverviewTab
                row={row}
                data={data}
                mutate={mutate}
                openAssignments={() => navigate('/academics?tab=assignments')}
                openNotes={() => setActiveTab('notes')}
              />
            </TabsContent>
            <TabsContent value="study" className="mt-0"><StudyCenterTab row={row} data={data} mutate={mutate} /></TabsContent>
            <TabsContent value="notes" className="mt-0"><NotesTab row={row} data={data} mutate={mutate} /></TabsContent>
            <TabsContent value="kit" className="mt-0"><CourseKitTab row={row} data={data} mutate={mutate} /></TabsContent>
          </div>
        </div>
      </Tabs>

      <ClassEditorDialog
        open={classEditorOpen}
        title="Edit class"
        form={form}
        onOpenChange={setClassEditorOpen}
        onChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
        onSave={saveClass}
      />
    </div>
  )
}

function ClassRailTab({ value, icon: Icon, label, count }: { value: string; icon: LucideIcon; label: string; count?: number }) {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        'group min-h-12 min-w-[150px] justify-start gap-2.5 rounded-xl border border-transparent border-l-4 border-l-transparent bg-transparent px-3.5 py-3 text-sm font-extrabold text-muted-foreground shadow-none transition',
        'data-[state=active]:border-primary/20 data-[state=active]:border-l-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none',
        'hover:bg-muted/45 hover:text-foreground lg:w-full'
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
      {typeof count === 'number' && count > 0 && (
        <span className="rounded-full bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground group-data-[state=active]:bg-primary/15 group-data-[state=active]:text-primary">{count}</span>
      )}
    </TabsTrigger>
  )
}

function ClassRailLink({
  icon: Icon, label, count, onClick,
}: {
  icon: LucideIcon
  label: string
  count?: number
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex min-h-12 min-w-[150px] items-center justify-start gap-2.5 rounded-xl border border-transparent border-l-4 border-l-transparent bg-transparent px-3.5 py-3 text-sm font-extrabold text-muted-foreground transition hover:bg-muted/45 hover:text-foreground lg:w-full"
    >
      <Icon className="size-4" />
      <span>{label}</span>
      {typeof count === 'number' && count > 0 && (
        <span className="ml-auto rounded-full bg-destructive/15 px-1.5 py-0.5 text-[11px] text-destructive">{count}</span>
      )}
    </button>
  )
}

function OverviewTab({
  row, data, mutate, openAssignments, openNotes,
}: ClassTabProps & { openAssignments: () => void; openNotes: () => void }) {
  const stats = classStats(row.id, data)
  const topics = data.topics.filter((item) => item.classId === row.id).sort((a, b) => a.order - b.order)
  const upcoming = data.assignments
    .filter((item) => item.classId === row.id && item.dueDate && item.status !== 'submitted' && item.status !== 'graded')
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))
    .slice(0, 4)
  const latestNote = data.notes.filter((note) => note.classId === row.id).sort((a, b) => b.updatedAt - a.updatedAt)[0]
  const weakTopic = topics.find((topic) => topic.status === 'weak') ?? topics.find((topic) => topic.status === 'reviewing')
  const actionRows = [
    weakTopic ? { label: `Review weak topic: ${weakTopic.title}`, meta: '15 min', onClick: undefined } : undefined,
    stats.nextDeadline ? { label: `Start ${stats.nextDeadline.title}`, meta: stats.nextDeadline.dueDate ? daysUntil(stats.nextDeadline.dueDate) : 'Open', onClick: openAssignments } : undefined,
  ].filter(Boolean) as { label: string; meta: string; onClick?: () => void }[]
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_.88fr]">
      <div className="space-y-5">
        <Card className="border-leaf/30 bg-leaf/8">
          <CardContent className="space-y-2 p-4">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <img src="/art/mascot.gif" alt="" className="size-8 object-contain [image-rendering:pixelated]" />
              Do this next
            </h3>
            {(actionRows.length ? actionRows : [{ label: 'Pick one topic and make notes for it', meta: 'Open', onClick: undefined }]).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="flex w-full items-center justify-between rounded-xl bg-card/70 px-3 py-2 text-left text-sm font-extrabold transition hover:bg-card disabled:cursor-default disabled:hover:bg-card/70"
                disabled={!item.onClick}
              >
                <span>{item.label}</span>
                <span className="text-primary">{item.meta} →</span>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Topics · {topics.filter((topic) => normalizedTopicStatus(topic.status) === 'ready').length} of {topics.length} ready</CardTitle>
            <Button size="sm" variant="outline" onClick={() => addTopic(row.id, mutate)}><Plus className="size-4" /> Topic</Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {topics.map((topic) => (
              <TopicRow key={topic.id} topic={topic} current={topic.id === row.currentTopicId} data={data} mutate={mutate} />
            ))}
            {!topics.length && <p className="text-sm text-muted-foreground">Add lecture topics as the semester unfolds.</p>}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-5">
        <Card>
          <CardHeader><CardTitle>Deadlines</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {upcoming.map((item) => (
              <button key={item.id} type="button" onClick={openAssignments} className="flex w-full items-center justify-between gap-3 rounded-xl bg-muted/45 p-3 text-left transition hover:bg-muted">
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{statusLabel(item.type)}</p>
                  {item.type === 'exam' && weakCoveredTopics(item, data).length > 0 && (
                    <p className="mt-1 text-xs font-extrabold text-destructive">
                      Weak covered: {weakCoveredTopics(item, data).map((topic) => topic.title).join(', ')}
                    </p>
                  )}
                </div>
                <span className="text-xs font-extrabold text-destructive">{item.dueDate ? daysUntil(item.dueDate) : 'no date'}</span>
              </button>
            ))}
            {!upcoming.length && <p className="text-sm text-muted-foreground">No class deadlines yet.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Latest note</CardTitle>
            <button type="button" onClick={openNotes} className="text-xs font-extrabold text-primary">All notes →</button>
          </CardHeader>
          <CardContent className="space-y-2">
            {latestNote ? (
              <div className="rounded-xl bg-muted/45 p-3">
                <p className="font-bold">{latestNote.title}</p>
                <p className="text-sm text-muted-foreground">{statusLabel(latestNote.type)} · {latestNote.date || 'No date'}</p>
              </div>
            ) : <p className="text-sm text-muted-foreground">No notes yet.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quick links</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {[
                ['Syllabus', row.syllabusUrl],
                ['Canvas', row.canvasUrl],
                ['Anki deck', row.ankiDeckName],
                ['Drive', row.driveFolderUrl],
              ].filter(([, value]) => Boolean(value)).map(([label, value]) => (
                <a key={label} href={value && value.startsWith('http') ? value : undefined} className="rounded-full bg-muted px-3 py-1.5 text-sm font-extrabold text-foreground hover:bg-secondary">
                  {label}
                </a>
              ))}
              {!row.syllabusUrl && !row.canvasUrl && !row.ankiDeckName && !row.driveFolderUrl && (
                <button type="button" className="rounded-full bg-muted px-3 py-1.5 text-sm font-extrabold text-muted-foreground">Add in Course kit</button>
              )}
            </div>
            <p className="text-sm font-bold text-muted-foreground">{row.instructor || 'Professor'} — {data.contacts.find((c) => c.classId === row.id)?.officeHours || 'office hours TBD'} {data.contacts.find((c) => c.classId === row.id)?.email && <a className="ml-2 text-primary" href={`mailto:${data.contacts.find((c) => c.classId === row.id)?.email}`}>email ↗</a>}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function NotesTab({ row, data, mutate }: ClassTabProps) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  const topics = data.topics.filter((topic) => topic.classId === row.id).sort((a, b) => a.order - b.order)
  const notes = data.notes
    .filter((note) => note.classId === row.id)
    .filter((note) => type === 'all' || note.type === type)
    .filter((note) => topicFilter === 'all' || note.topicIds.includes(topicFilter))
    .filter((note) => `${note.title} ${note.content} ${note.unit ?? ''}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.updatedAt - a.updatedAt)
  const [selectedId, setSelectedId] = useState(notes[0]?.id ?? '')
  const selected = data.notes.find((note) => note.id === (selectedId || notes[0]?.id))
  return (
    <div className="grid gap-5 lg:grid-cols-[310px_1fr]">
      <Card>
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between">
            <CardTitle>Class notes</CardTitle>
            <Button size="sm" onClick={() => addNote(row.id, mutate)}><Plus className="size-4" /> New note</Button>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search notes..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">All types</option>
                {NOTE_TYPES.map((item) => <option key={item} value={item}>{statusLabel(item)}</option>)}
              </select>
              <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm" value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
                <option value="all">All topics</option>
                {topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedId(note.id)}
              className={cn('w-full rounded-xl p-3 text-left transition hover:bg-muted', selected?.id === note.id && 'bg-primary/10 text-primary')}
            >
              <p className="font-bold">{note.title}</p>
              <p className="text-xs font-medium text-muted-foreground">{statusLabel(note.type)} · {note.date || 'No date'}</p>
              <TopicChipList ids={note.topicIds} data={data} />
            </button>
          ))}
          {!notes.length && <p className="text-sm text-muted-foreground">No notes match this view.</p>}
        </CardContent>
      </Card>
      <Card>
        {selected ? (
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <Input value={selected.title} onChange={(e) => patchNote(selected.id, { title: e.target.value }, mutate)} className="font-display text-lg font-bold" />
              <Badge variant={selected.syncStatus === 'synced' ? 'success' : selected.syncStatus === 'error' ? 'danger' : selected.externalDocUrl ? 'secondary' : 'warning'}>
                {selected.externalDocUrl ? 'Linked doc' : selected.syncStatus === 'synced' ? 'Synced' : selected.syncStatus === 'error' ? 'Sync issue' : 'Local note'}
              </Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <select className="h-9 rounded-md border border-input bg-card px-3 text-sm" value={selected.type} onChange={(e) => patchNote(selected.id, { type: e.target.value as ClassNoteType }, mutate)}>
                {NOTE_TYPES.map((item) => <option key={item} value={item}>{statusLabel(item)}</option>)}
              </select>
              <Input type="date" value={selected.date ?? ''} onChange={(e) => patchNote(selected.id, { date: e.target.value }, mutate)} />
              <Input placeholder="Unit" value={selected.unit ?? ''} onChange={(e) => patchNote(selected.id, { unit: e.target.value }, mutate)} />
            </div>
            <TopicPicker
              label="Linked topics"
              topics={topics}
              value={selected.topicIds}
              onChange={(topicIds) => patchNote(selected.id, { topicIds }, mutate)}
            />
            <Textarea className="min-h-[420px]" value={selected.content} onChange={(e) => patchNote(selected.id, { content: e.target.value }, mutate)} placeholder="Type lecture notes, question logs, study guides, or exam review notes here..." />
            <details className="rounded-xl border border-border bg-muted/25 px-3 py-2">
              <summary className="cursor-pointer text-xs font-extrabold text-muted-foreground">More note options</summary>
              <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto] md:items-center">
                <Input placeholder="Google Doc or external note link" value={selected.externalDocUrl ?? ''} onChange={(e) => patchNote(selected.id, { externalDocUrl: e.target.value, syncStatus: e.target.value ? 'sync-ready' : 'local-only' }, mutate)} />
                {selected.externalDocUrl && (
                  <Button asChild variant="outline" size="sm"><a href={selected.externalDocUrl} target="_blank" rel="noreferrer">Open doc</a></Button>
                )}
              </div>
            </details>
          </CardContent>
        ) : (
          <CardContent className="py-12 text-center text-sm text-muted-foreground">Create a note to open the editor.</CardContent>
        )}
      </Card>
    </div>
  )
}

function CourseKitTab({ row, data, mutate }: ClassTabProps) {
  const files = data.files.filter((item) => item.classId === row.id).sort((a, b) => a.order - b.order)
  const contacts = data.contacts.filter((item) => item.classId === row.id).sort((a, b) => a.order - b.order)
  const links = [
    ['Syllabus', row.syllabusUrl],
    ['Canvas', row.canvasUrl],
    ['Anki deck', row.ankiDeckName],
    ['GoodNotes', row.goodNotesUrl],
    ['Drive folder', row.driveFolderUrl],
  ]
  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Links & files</CardTitle>
          <Button size="sm" variant="outline" onClick={() => addFile(row.id, mutate)}><Plus className="size-4" /> Resource</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2 md:grid-cols-2">
            {links.map(([label, value]) => (
              <a
                key={label}
                href={value && value.startsWith('http') ? value : undefined}
                className={cn(
                  'flex items-center justify-between rounded-xl border px-3 py-2 text-sm font-bold transition',
                  value ? 'border-border bg-muted/45 text-foreground hover:bg-muted' : 'border-dashed border-border/80 text-muted-foreground'
                )}
              >
                <span>{label}</span>
                <span className="text-xs">{value ? 'Linked' : 'Add in edit'}</span>
              </a>
            ))}
          </div>
          <div className="space-y-2 border-t border-border pt-4">
            {files.map((file) => (
              <div key={file.id} className="grid gap-2 rounded-xl bg-muted/35 p-2 md:grid-cols-[1fr_130px_1.2fr_auto] md:items-center">
                <InlineInput value={file.title} onChange={(value) => patchFile(file.id, { title: value }, mutate)} />
                <TinySelect value={file.type} options={FILE_TYPES} onChange={(value) => patchFile(file.id, { type: value as ClassFileType }, mutate)} />
                <Input placeholder="URL or file reference" value={file.url ?? ''} onChange={(e) => patchFile(file.id, { url: e.target.value }, mutate)} />
                <DeleteButton onClick={() => removeById('files', file.id, mutate)} />
              </div>
            ))}
            {!files.length && <p className="text-sm font-semibold text-muted-foreground">No files yet.</p>}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>People</CardTitle>
          <Button size="sm" variant="outline" onClick={() => addContact(row.id, mutate)}><Plus className="size-4" /> Person</Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {contacts.map((contact) => (
            <div key={contact.id} className="grid gap-2 rounded-xl bg-muted/35 p-2 lg:grid-cols-[1fr_120px_auto] lg:items-center">
              <InlineInput value={contact.name} onChange={(value) => patchContact(contact.id, { name: value }, mutate)} />
              <TinySelect value={contact.role} options={CONTACT_ROLES} onChange={(value) => patchContact(contact.id, { role: value as ClassContactRole }, mutate)} />
              <div className="flex justify-end gap-1">
                {contact.email && (
                  <Button asChild variant="ghost" size="icon"><a href={`mailto:${contact.email}`} aria-label="Email contact"><Mail className="size-4" /></a></Button>
                )}
                <DeleteButton onClick={() => removeById('contacts', contact.id, mutate)} />
              </div>
              <Input className="lg:col-span-3" placeholder="Email, office hours, or notes" value={[contact.email, contact.officeHours].filter(Boolean).join(' · ')} onChange={(e) => {
                const [email, ...rest] = e.target.value.split(' · ')
                patchContact(contact.id, { email, officeHours: rest.join(' · ') }, mutate)
              }} />
            </div>
          ))}
          {!contacts.length && <p className="text-sm font-semibold text-muted-foreground">Add your professor, TA, or study group.</p>}
        </CardContent>
      </Card>
    </div>
  )
}

function StudyCenterTab({ row, data, mutate }: ClassTabProps) {
  const [generatorOpen, setGeneratorOpen] = useState(false)
  const [activeExamId, setActiveExamId] = useState('')
  const topics = data.topics.filter((topic) => topic.classId === row.id).sort((a, b) => a.order - b.order)
  const exams = data.practiceExams.filter((exam) => exam.classId === row.id).sort((a, b) => b.updatedAt - a.updatedAt)
  const activeExam = data.practiceExams.find((exam) => exam.id === activeExamId)
  const revisionQueue = topics
    .map((topic) => ({ topic, readiness: topicReadiness(topic, data), practice: topicPracticeStats(topic.id, data) }))
    .sort((a, b) => a.readiness - b.readiness)
    .slice(0, 5)
  const nextExam = data.assignments
    .filter((item) => item.classId === row.id && item.type === 'exam' && item.dueDate && item.status !== 'graded')
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))[0]
  const coveredTopics = nextExam ? topics.filter((topic) => (nextExam.coveredTopicIds?.length ? nextExam.coveredTopicIds : nextExam.linkedTopicIds).includes(topic.id)) : topics
  const readyCount = coveredTopics.filter((topic) => topicReadiness(topic, data) >= 75).length

  return (
    <div className="space-y-5">
      {activeExam && (
        <PracticeExamRunner exam={activeExam} data={data} mutate={mutate} onClose={() => setActiveExamId('')} />
      )}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setGeneratorOpen(true)}><Plus className="size-4" /> Practice exam</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><MoreHorizontal className="size-4" /> More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem><NotebookText className="size-4" /> Generate from notes</DropdownMenuItem>
              <DropdownMenuItem><Brain className="size-4" /> Explain weak topic</DropdownMenuItem>
              <DropdownMenuItem><Target className="size-4" /> Build study plan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="min-w-[220px] space-y-1">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase text-muted-foreground">
            <span>{nextExam ? `${nextExam.title} readiness` : 'Exam readiness'}</span>
            <span className="text-destructive">{readyCount}/{coveredTopics.length} ready</span>
          </div>
          <ProgressLine value={coveredTopics.length ? Math.round((readyCount / coveredTopics.length) * 100) : 0} />
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.25fr_.85fr]">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Topic intelligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="hidden grid-cols-[1fr_120px_140px_140px_140px_92px] gap-3 px-3 py-2 text-xs font-extrabold uppercase text-muted-foreground lg:grid">
              <span>Topic</span>
              <span>Status</span>
              <span>Confidence</span>
              <span>Practice</span>
              <span>Readiness</span>
              <span className="text-right">Action</span>
            </div>
            {topics.map((topic) => (
              <TopicMatrixRow key={topic.id} topic={topic} data={data} mutate={mutate} />
            ))}
            {!topics.length && <p className="text-sm text-muted-foreground">Add topics to start building a revision queue.</p>}
          </CardContent>
        </Card>
        <div className="space-y-5">
          <Card>
            <CardHeader><CardTitle>Revision queue</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {revisionQueue.map(({ topic, readiness, practice }) => (
                <div key={topic.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted/45 p-3">
                  <div>
                    <p className="font-bold">{topic.title}</p>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {practice.total ? `${practice.correct}/${practice.total} practice correct` : 'Not tested'} · {activeWeakAreasForTopic(topic.id, data).length} weak
                    </p>
                  </div>
                  <Badge variant={readiness >= 75 ? 'success' : readiness >= 45 ? 'warning' : 'danger'}>{readiness}% ready</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Recent practice</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {exams.slice(0, 4).map((exam) => (
                <button key={exam.id} type="button" onClick={() => setActiveExamId(exam.id)} className="flex w-full items-center justify-between rounded-xl bg-muted/45 p-3 text-left hover:bg-muted">
                  <span className="font-bold">{exam.title}</span>
                  <span className="text-xs font-extrabold text-muted-foreground">{exam.status === 'submitted' || exam.status === 'reviewed' ? `${exam.score ?? 0}/${exam.totalAutoGradable ?? exam.questionCount}` : statusLabel(exam.status)}</span>
                </button>
              ))}
              {!exams.length && <p className="text-sm text-muted-foreground">No practice attempts yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
      <PracticeExamGenerator
        open={generatorOpen}
        row={row}
        data={data}
        onOpenChange={setGeneratorOpen}
        onGenerated={(exam, questions) => {
          mutate((draft) => {
            draft.practiceExams.unshift(exam)
            draft.practiceQuestions.unshift(...questions)
          })
          setActiveExamId(exam.id)
        }}
      />
    </div>
  )
}

function TopicMatrixRow({ topic, data, mutate }: { topic: ClassTopic; data: ClassCenterData; mutate: ClassTabProps['mutate'] }) {
  const practice = topicPracticeStats(topic.id, data)
  const readiness = topicReadiness(topic, data)
  const weakAreas = activeWeakAreasForTopic(topic.id, data)
  return (
    <div className={cn(
      'grid gap-3 rounded-xl px-3 py-3 text-sm lg:grid-cols-[1fr_120px_140px_140px_140px_92px] lg:items-center',
      weakAreas.length ? 'border border-destructive/25 bg-destructive/8' : 'bg-card/55'
    )}>
      <div className="min-w-0">
        <p className="truncate font-bold">{topic.title}</p>
        <p className="text-xs font-semibold text-muted-foreground">{topic.unit || 'No unit'}{weakAreas.length ? ` · ${weakAreas.length} active weak` : ''}</p>
      </div>
      <TinySelect value={topic.status} options={TOPIC_STATUSES} onChange={(value) => mutate((draft) => {
        const item = draft.topics.find((row) => row.id === topic.id)
        if (item) Object.assign(item, { status: value as TopicStatus, updatedAt: Date.now() })
      })} />
      <InlineGauge value={Math.round((topic.confidence / 3) * 100)} meta={confidenceLabel(topic.confidence)} />
      <InlineGauge value={practice.percent ?? 0} meta={practice.total ? `${practice.correct}/${practice.total}` : 'Not tested'} muted={!practice.total} />
      <InlineGauge value={readiness} meta={`${readiness}%`} />
      <div className="flex justify-start lg:justify-end">
        <Button size="sm" variant={weakAreas.length ? 'default' : 'ghost'} onClick={() => addWeakArea(topic.classId, mutate, { topicId: topic.id, label: topic.title })}>
          {weakAreas.length ? 'Review' : 'Log weak'}
        </Button>
      </div>
    </div>
  )
}

function PracticeExamGenerator({
  open, row, data, onOpenChange, onGenerated,
}: {
  open: boolean
  row: ClassCenterClass
  data: ClassCenterData
  onOpenChange: (open: boolean) => void
  onGenerated: (exam: PracticeExam, questions: PracticeQuestion[]) => void
}) {
  const topics = data.topics.filter((topic) => topic.classId === row.id).sort((a, b) => a.order - b.order)
  const notes = data.notes.filter((note) => note.classId === row.id)
  const files = data.files.filter((file) => file.classId === row.id)
  const [topicIds, setTopicIds] = useState<string[]>(topics.slice(0, 3).map((topic) => topic.id))
  const [sourceNoteIds, setSourceNoteIds] = useState<string[]>([])
  const [sourceFileIds, setSourceFileIds] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<PracticeExamDifficulty>('medium')
  const [questionCount, setQuestionCount] = useState(6)
  const [questionTypes, setQuestionTypes] = useState<PracticeQuestionType[]>(['multiple-choice'])
  const [generating, setGenerating] = useState(false)

  async function generate() {
    setGenerating(true)
    const request: GeneratePracticeExamRequest = {
      classId: row.id,
      topicIds,
      sourceNoteIds,
      sourceFileIds,
      difficulty,
      questionCount,
      questionTypes,
    }
    const response = await aiPracticeService.generatePracticeExam(request, { topics, notes, files })
    setGenerating(false)
    onGenerated(response.exam, response.questions)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate practice exam</DialogTitle>
          <DialogDescription>Local placeholder generator for now. It uses selected topics and saved class material, then can be replaced by a backend endpoint later.</DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <TopicPicker label="Topics to test" topics={topics} value={topicIds} onChange={setTopicIds} />
          <TopicPicker
            label="Source notes"
            topics={notes.map((note) => ({ id: note.id, title: note.title, classId: row.id, status: 'seen', confidence: 2, sourceNoteIds: [], order: note.order }))}
            value={sourceNoteIds}
            onChange={setSourceNoteIds}
          />
          <TopicPicker
            label="Source files"
            topics={files.map((file) => ({ id: file.id, title: file.title, classId: row.id, status: 'seen', confidence: 2, sourceNoteIds: [], order: file.order }))}
            value={sourceFileIds}
            onChange={setSourceFileIds}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Difficulty"><TinySelect value={difficulty} options={PRACTICE_DIFFICULTIES} onChange={(value) => setDifficulty(value as PracticeExamDifficulty)} /></Field>
            <Field label="Questions"><Input type="number" min={1} max={40} value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} /></Field>
            <Field label="Question types">
              <div className="flex flex-wrap gap-1.5">
                {PRACTICE_QUESTION_TYPES.map((type) => (
                  <ToggleChip key={type} selected={questionTypes.includes(type)} onClick={() => setQuestionTypes((prev) => toggleValue(prev, type))}>{statusLabel(type)}</ToggleChip>
                ))}
              </div>
            </Field>
          </div>
          {generating && (
            <div className="rounded-2xl bg-primary/10 p-4 text-sm font-bold text-primary">
              Building a balanced local practice set from your topics...
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={generate} disabled={generating || !topicIds.length || !questionTypes.length}>{generating ? 'Generating...' : 'Create exam'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function PracticeExamRunner({
  exam, data, mutate, onClose,
}: {
  exam: PracticeExam
  data: ClassCenterData
  mutate: ClassTabProps['mutate']
  onClose: () => void
}) {
  const questions = data.practiceQuestions.filter((question) => question.examId === exam.id).sort((a, b) => a.order - b.order)
  const [index, setIndex] = useState(0)
  const question = questions[index]
  const submitted = exam.status === 'submitted' || exam.status === 'reviewed'
  const correct = questions.filter((item) => item.isCorrect).length
  const answered = questions.filter((item) => item.userAnswer || item.selfGrade).length

  function patchQuestion(questionId: string, patch: Partial<PracticeQuestion>) {
    mutate((draft) => {
      const item = draft.practiceQuestions.find((row) => row.id === questionId)
      if (item) Object.assign(item, patch, { updatedAt: Date.now() })
      const examRow = draft.practiceExams.find((row) => row.id === exam.id)
      if (examRow && examRow.status === 'draft') {
        examRow.status = 'in-progress'
        examRow.startedAt = Date.now()
      }
    })
  }

  function submit() {
    mutate((draft) => {
      const examQuestions = draft.practiceQuestions.filter((item) => item.examId === exam.id)
      for (const item of examQuestions) {
        if (item.type === 'multiple-choice') item.isCorrect = item.userAnswer === item.correctAnswer
      }
      const autoGradable = examQuestions.filter((item) => item.type === 'multiple-choice')
      const item = draft.practiceExams.find((row) => row.id === exam.id)
      if (item) {
        item.status = 'submitted'
        item.submittedAt = Date.now()
        item.totalAutoGradable = autoGradable.length
        item.score = autoGradable.filter((row) => row.isCorrect).length
        item.updatedAt = Date.now()
      }
    })
  }

  if (!question) return null

  return (
    <Card className="border-primary/35 bg-primary/5">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>{exam.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{submitted ? `Review · ${correct}/${questions.length} marked correct` : `${answered}/${questions.length} answered`}</p>
        </div>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProgressLine value={Math.round(((index + 1) / questions.length) * 100)} />
        <div className="rounded-2xl bg-card/80 p-4">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary">Question {index + 1} / {questions.length}</Badge>
            <button type="button" className="text-xs font-extrabold text-primary" onClick={() => patchQuestion(question.id, { flagged: !question.flagged })}>{question.flagged ? 'Flagged' : 'Flag'}</button>
          </div>
          <p className="mt-3 font-bold">{question.prompt}</p>
          <TopicChipList ids={question.topicIds} data={data} />
          {question.type === 'multiple-choice' ? (
            <div className="mt-3 space-y-2">
              {(question.choices ?? []).map((choice) => (
                <button
                  key={choice}
                  type="button"
                  disabled={submitted}
                  onClick={() => patchQuestion(question.id, { userAnswer: choice })}
                  className={cn(
                    'w-full rounded-xl border border-border p-3 text-left text-sm font-bold transition hover:bg-muted',
                    question.userAnswer === choice && 'border-primary bg-primary/10',
                    submitted && choice === question.correctAnswer && 'border-leaf bg-leaf/15',
                    submitted && question.userAnswer === choice && choice !== question.correctAnswer && 'border-destructive bg-destructive/10'
                  )}
                >
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            <Textarea
              className="mt-3 min-h-[120px]"
              value={question.userAnswer ?? ''}
              disabled={submitted}
              onChange={(event) => patchQuestion(question.id, { userAnswer: event.target.value })}
              placeholder="Write your answer..."
            />
          )}
          {submitted && (
            <div className="mt-4 space-y-3 rounded-xl bg-muted/45 p-3">
              <p className="text-sm font-bold">{question.explanation}</p>
              {question.type !== 'multiple-choice' && (
                <div className="flex flex-wrap gap-2">
                  {(['correct', 'partial', 'missed'] as const).map((grade) => (
                    <Button key={grade} size="sm" variant={question.selfGrade === grade ? 'default' : 'outline'} onClick={() => patchQuestion(question.id, { selfGrade: grade, isCorrect: grade === 'correct' })}>
                      {statusLabel(grade)}
                    </Button>
                  ))}
                </div>
              )}
              {!question.isCorrect && (
                <Button size="sm" variant="outline" onClick={() => addWeakAreaFromQuestion(question, data, mutate)}>Log weak area</Button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>Previous</Button>
          <div className="flex gap-2">
            {!submitted && <Button variant="outline" onClick={submit}>Submit for review</Button>}
            <Button onClick={() => setIndex(Math.min(questions.length - 1, index + 1))} disabled={index === questions.length - 1}>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ClassEditorDialog({
  open, title, form, onOpenChange, onChange, onSave,
}: {
  open: boolean
  title: string
  form: ClassFormState
  onOpenChange: (open: boolean) => void
  onChange: (patch: Partial<ClassFormState>) => void
  onSave: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <section className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Basics</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Course code"><Input value={form.courseCode} onChange={(e) => onChange({ courseCode: e.target.value })} placeholder="BIOL 103" /></Field>
              <Field label="Course title"><Input value={form.courseTitle} onChange={(e) => onChange({ courseTitle: e.target.value })} placeholder="How Cells Function" /></Field>
              <Field label="Instructor"><Input value={form.instructor ?? ''} onChange={(e) => onChange({ instructor: e.target.value })} /></Field>
              <Field label="Semester"><Input value={form.semester} onChange={(e) => onChange({ semester: e.target.value })} placeholder="Fall 2026" /></Field>
              <Field label="Meeting days"><Input value={form.meetingDays ?? ''} onChange={(e) => onChange({ meetingDays: e.target.value })} placeholder="MWF" /></Field>
              <Field label="Meeting time"><Input value={form.meetingTime ?? ''} onChange={(e) => onChange({ meetingTime: e.target.value })} placeholder="10:10 AM-11:00 AM" /></Field>
              <Field label="Location"><Input value={form.location ?? ''} onChange={(e) => onChange({ location: e.target.value })} /></Field>
              <Field label="Nickname"><Input value={form.nickname ?? ''} onChange={(e) => onChange({ nickname: e.target.value })} placeholder="Optional" /></Field>
            </div>
          </section>
          <section className="space-y-3 border-t border-border pt-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Look</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Icon">
                <div className="flex flex-wrap gap-1.5">
                  {CLASS_ICONS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      title={label}
                      aria-label={label}
                      onClick={() => onChange({ icon: id })}
                      className={cn(
                        'grid size-9 place-items-center rounded-xl border text-muted-foreground transition hover:bg-muted hover:text-foreground',
                        normalizeClassIcon(form.icon) === id ? 'border-primary bg-primary/12 text-primary' : 'border-border bg-card'
                      )}
                    >
                      <Icon className="size-4" />
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Color">
                <div className="flex flex-wrap gap-1.5">
                  {COLORS.map((color) => (
                    <button type="button" key={color} onClick={() => onChange({ color })} className={cn('rounded-full px-2.5 py-1 text-xs font-bold capitalize', PILL_STYLES[color], form.color === color && 'ring-2 ring-primary')}>
                      {color}
                    </button>
                  ))}
                </div>
              </Field>
              <BannerField value={form.background ?? ''} onChange={(background) => onChange({ background })} />
              <Field label="Status">
                <select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm" value={form.status} onChange={(e) => onChange({ status: e.target.value as ClassCenterClass['status'] })}>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </Field>
            </div>
          </section>
          <details className="rounded-2xl border border-border bg-muted/25 p-3">
            <summary className="cursor-pointer text-sm font-extrabold">Links</summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Syllabus"><Input value={form.syllabusUrl ?? ''} onChange={(e) => onChange({ syllabusUrl: e.target.value })} placeholder="Paste URL" /></Field>
              <Field label="Canvas"><Input value={form.canvasUrl ?? ''} onChange={(e) => onChange({ canvasUrl: e.target.value })} placeholder="Paste URL" /></Field>
              <Field label="Drive folder"><Input value={form.driveFolderUrl ?? ''} onChange={(e) => onChange({ driveFolderUrl: e.target.value })} placeholder="Paste URL" /></Field>
              <Field label="GoodNotes"><Input value={form.goodNotesUrl ?? ''} onChange={(e) => onChange({ goodNotesUrl: e.target.value })} placeholder="Paste URL" /></Field>
              <Field label="Anki deck"><Input value={form.ankiDeckName ?? ''} onChange={(e) => onChange({ ankiDeckName: e.target.value })} placeholder="Deck name or link" /></Field>
              <Field label="Notes doc"><Input value={form.notesDocUrl ?? ''} onChange={(e) => onChange({ notesDocUrl: e.target.value })} placeholder="Paste URL" /></Field>
            </div>
          </details>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save class</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type ClassTabProps = {
  row: ClassCenterClass
  data: ClassCenterData
  mutate: (fn: (draft: ClassCenterData) => void) => void
}

function addTopic(classId: string, mutate: ClassTabProps['mutate']) {
  const now = Date.now()
  mutate((draft) => {
    const order = draft.topics.filter((topic) => topic.classId === classId).length
    draft.topics.push({
      id: uid(),
      classId,
      title: 'New topic',
      unit: '',
      status: 'not-started',
      confidence: 3,
      sourceNoteIds: [],
      linkedNoteIds: [],
      linkedAssignmentIds: [],
      linkedFileIds: [],
      createdAt: now,
      updatedAt: now,
      lastReviewedAt: undefined,
      nextReviewAt: undefined,
      order,
    })
    const row = draft.classes.find((item) => item.id === classId)
    if (row) row.updatedAt = now
  })
}

function addWeakArea(classId: string, mutate: ClassTabProps['mutate'], preset: Partial<ClassWeakArea> = {}) {
  const now = Date.now()
  mutate((draft) => {
    draft.weakAreas.unshift({
      id: uid(),
      classId,
      topicId: preset.topicId,
      label: preset.label || 'New weak area',
      source: (preset.source as WeakAreaSource) || 'manual',
      reason: preset.reason || 'conceptual',
      severity: preset.severity || 2,
      notes: preset.notes || '',
      relatedNoteId: preset.relatedNoteId,
      relatedAssignmentId: preset.relatedAssignmentId,
      relatedPracticeQuestionId: preset.relatedPracticeQuestionId,
      createdAt: now,
      status: preset.status || 'active',
      order: draft.weakAreas.length,
    })
  })
}

function addNote(classId: string, mutate: ClassTabProps['mutate']) {
  const now = Date.now()
  mutate((draft) => {
    draft.notes.unshift({
      id: uid(),
      classId,
      title: 'Untitled note',
      type: 'lecture',
      date: new Date().toISOString().slice(0, 10),
      unit: '',
      topicIds: [],
      content: '',
      externalDocUrl: '',
      googleDocId: '',
      syncStatus: 'local-only',
      linkedFileIds: [],
      createdAt: now,
      updatedAt: now,
      order: draft.notes.length,
    })
  })
}

function addFile(classId: string, mutate: ClassTabProps['mutate']) {
  const now = Date.now()
  mutate((draft) => {
    draft.files.unshift({
      id: uid(),
      classId,
      title: 'New resource',
      type: 'link',
      url: '',
      fileName: '',
      mimeType: '',
      notes: '',
      linkedTopicIds: [],
      createdAt: now,
      updatedAt: now,
      order: draft.files.length,
    })
  })
}

function addContact(classId: string, mutate: ClassTabProps['mutate']) {
  const now = Date.now()
  mutate((draft) => {
    draft.contacts.unshift({
      id: uid(),
      classId,
      name: 'New contact',
      role: 'professor',
      email: '',
      officeHours: '',
      location: '',
      nickname: '',
      notes: '',
      createdAt: now,
      updatedAt: now,
      order: draft.contacts.length,
    })
  })
}

function patchNote(id: string, patch: Partial<ClassNote>, mutate: ClassTabProps['mutate']) {
  mutate((draft) => {
    const item = draft.notes.find((note) => note.id === id)
    if (item) Object.assign(item, patch, { updatedAt: Date.now() })
  })
}

function patchFile(id: string, patch: Partial<ClassFileResource>, mutate: ClassTabProps['mutate']) {
  mutate((draft) => {
    const item = draft.files.find((file) => file.id === id)
    if (item) Object.assign(item, patch, { updatedAt: Date.now() })
  })
}

function patchContact(id: string, patch: Partial<ClassContact>, mutate: ClassTabProps['mutate']) {
  mutate((draft) => {
    const item = draft.contacts.find((contact) => contact.id === id)
    if (item) Object.assign(item, patch, { updatedAt: Date.now() })
  })
}

function removeById(key: 'files' | 'contacts', id: string, mutate: ClassTabProps['mutate']) {
  mutate((draft) => {
    draft[key] = draft[key].filter((item) => item.id !== id) as never
  })
}

function TopicRow({ topic, current, data, mutate }: { topic: ClassTopic; current: boolean; data: ClassCenterData; mutate: ClassTabProps['mutate'] }) {
  const readiness = topicReadiness(topic, data)
  const weakCount = activeWeakAreasForTopic(topic.id, data).length
  const StatusIcon = normalizedTopicStatus(topic.status) === 'ready' ? CheckCircle2 : Circle
  return (
    <div className={cn(
      'grid gap-3 rounded-xl border border-border bg-card/60 p-3 text-sm md:grid-cols-[1.4fr_90px_130px_130px_auto] md:items-center',
      current && 'border-primary/35 bg-primary/8'
    )}>
      <div className="flex min-w-0 items-center gap-2">
        <StatusIcon className={cn('size-4 shrink-0', normalizedTopicStatus(topic.status) === 'ready' ? 'text-leaf' : current ? 'text-primary' : 'text-muted-foreground')} />
        <div className="min-w-0 flex-1">
          <InlineInput value={topic.title} onChange={(value) => mutate((draft) => {
            const item = draft.topics.find((row) => row.id === topic.id)
            if (item) Object.assign(item, { title: value, updatedAt: Date.now() })
          })} />
          <div className="mt-1 flex flex-wrap gap-1">
            {current && <Badge variant="secondary">Current</Badge>}
            {weakCount > 0 && <Badge variant="danger">{weakCount} weak</Badge>}
            <TopicReferenceBadge label="Notes" count={topicLinkedNotes(topic.id, data).length} />
            <TopicReferenceBadge label="Assignments" count={topicLinkedAssignments(topic.id, data).length} />
            <TopicReferenceBadge label="Files" count={topicLinkedFiles(topic.id, data).length} />
          </div>
        </div>
      </div>
      <InlineInput value={topic.unit ?? ''} placeholder="Unit" onChange={(value) => mutate((draft) => {
        const item = draft.topics.find((row) => row.id === topic.id)
        if (item) Object.assign(item, { unit: value, updatedAt: Date.now() })
      })} />
      <TinySelect value={topic.status} options={TOPIC_STATUSES} onChange={(value) => mutate((draft) => {
        const item = draft.topics.find((row) => row.id === topic.id)
        if (item) Object.assign(item, { status: value as TopicStatus, updatedAt: Date.now() })
      })} />
      <InlineGauge value={readiness} meta={`${readiness}% ready`} />
      <Button size="sm" variant={weakCount ? 'default' : 'outline'} onClick={() => addWeakArea(topic.classId, mutate, { topicId: topic.id, label: topic.title })}>{weakCount ? 'Review' : 'Log weak'}</Button>
    </div>
  )
}

function classStats(classId: string, data: ClassCenterData) {
  const topics = data.topics.filter((item) => item.classId === classId)
  const masteredWeight = topics.reduce((sum, topic) => {
    const value = topicStatusWeight(topic.status)
    return sum + value
  }, 0)
  const upcoming = data.assignments
    .filter((item) => item.classId === classId && item.status !== 'submitted' && item.status !== 'graded' && item.dueDate)
    .sort((a, b) => String(a.dueDate).localeCompare(String(b.dueDate)))
  return {
    revision: topics.length ? Math.round((masteredWeight / topics.length) * 100) : 0,
    weakCount: data.weakAreas.filter((item) => item.classId === classId && item.status !== 'resolved').length,
    notesCount: data.notes.filter((item) => item.classId === classId).length,
    filesCount: data.files.filter((item) => item.classId === classId).length,
    nextDeadline: upcoming[0],
  }
}

function normalizedTopicStatus(status: TopicStatus) {
  return status === 'mastered' ? 'ready' : status
}

function topicStatusWeight(status: TopicStatus) {
  const normalized = normalizedTopicStatus(status)
  if (normalized === 'ready') return 1
  if (normalized === 'reviewing' || status === 'cards-made') return 0.72
  if (normalized === 'notes-made') return 0.58
  if (normalized === 'seen') return 0.34
  if (normalized === 'weak') return 0.18
  return 0
}

function confidenceLabel(value: TopicConfidence) {
  if (value === 3) return 'Strong'
  if (value === 2) return 'Okay'
  return 'Weak'
}

function activeWeakAreasForTopic(topicId: string, data: ClassCenterData) {
  return data.weakAreas.filter((area) => area.topicId === topicId && area.status !== 'resolved')
}

function topicPracticeStats(topicId: string, data: ClassCenterData) {
  const questions = data.practiceQuestions.filter((question) => question.topicIds.includes(topicId) && typeof question.isCorrect === 'boolean')
  const correct = questions.filter((question) => question.isCorrect).length
  return {
    total: questions.length,
    correct,
    percent: questions.length ? Math.round((correct / questions.length) * 100) : null,
  }
}

function topicReadiness(topic: ClassTopic, data: ClassCenterData) {
  const practice = topicPracticeStats(topic.id, data)
  const weakAreas = activeWeakAreasForTopic(topic.id, data)
  const confidenceScore = Math.round((topic.confidence / 3) * 100)
  const practiceScore = practice.percent ?? 35
  const weakPenalty = Math.min(100, weakAreas.reduce((sum, area) => sum + area.severity * 18, 0))
  // Readiness formula for Phase 2: confidence 40%, practice 40%, active weak-area penalty up to 20%.
  return Math.max(0, Math.min(100, Math.round(confidenceScore * 0.4 + practiceScore * 0.4 + (100 - weakPenalty) * 0.2)))
}

function topicLinkedNotes(topicId: string, data: ClassCenterData) {
  return data.notes.filter((note) => note.topicIds.includes(topicId))
}

function topicLinkedAssignments(topicId: string, data: ClassCenterData) {
  return data.assignments.filter((assignment) => assignment.linkedTopicIds.includes(topicId) || (assignment.coveredTopicIds ?? []).includes(topicId))
}

function topicLinkedFiles(topicId: string, data: ClassCenterData) {
  return data.files.filter((file) => file.linkedTopicIds.includes(topicId))
}

function weakCoveredTopics(assignment: ClassAssignment, data: ClassCenterData) {
  const ids = assignment.coveredTopicIds?.length ? assignment.coveredTopicIds : assignment.linkedTopicIds
  return data.topics.filter((topic) => ids.includes(topic.id) && activeWeakAreasForTopic(topic.id, data).length)
}

function addWeakAreaFromQuestion(question: PracticeQuestion, data: ClassCenterData, mutate: ClassTabProps['mutate']) {
  const topic = data.topics.find((item) => question.topicIds.includes(item.id))
  addWeakArea(question.classId, mutate, {
    topicId: topic?.id,
    label: topic?.title ?? 'Practice miss',
    source: 'practice-exam',
    reason: question.weakReason || 'conceptual',
    severity: 2,
    relatedPracticeQuestionId: question.id,
    notes: question.prompt,
  })
}

function classLabel(classId: string, data: ClassCenterData) {
  const row = data.classes.find((item) => item.id === classId)
  return row?.courseCode || row?.courseTitle || 'Class'
}

function compactMeeting(row: ClassCenterClass) {
  return [row.meetingDays, row.meetingTime, row.location].filter(Boolean).join(' · ')
}

function daysUntil(date: string) {
  if (!date) return 'no date'
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const target = new Date(`${date}T00:00:00`)
  const days = Math.ceil((target.getTime() - start.getTime()) / 86400000)
  if (Number.isNaN(days)) return 'date TBD'
  if (days < 0) return `${Math.abs(days)}d overdue`
  if (days === 0) return 'today'
  if (days === 1) return 'tomorrow'
  return `${days}d`
}

function statusLabel(value: string) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1.5 text-sm font-bold">
      <span>{label}</span>
      {children}
    </label>
  )
}

function TopicPicker({
  label, topics, value, onChange, compact = false,
}: {
  label: string
  topics: Pick<ClassTopic, 'id' | 'title' | 'unit'>[]
  value: string[]
  onChange: (value: string[]) => void
  compact?: boolean
}) {
  return (
    <div className={cn('space-y-2', compact && 'min-w-[180px]')}>
      <p className="text-xs font-extrabold uppercase text-muted-foreground">{label}</p>
      <div className="flex max-h-36 flex-wrap gap-1 overflow-y-auto rounded-xl border border-border bg-card/60 p-2">
        {topics.map((topic) => (
          <ToggleChip key={topic.id} selected={value.includes(topic.id)} onClick={() => onChange(toggleValue(value, topic.id))}>
            {topic.title}
          </ToggleChip>
        ))}
        {!topics.length && <span className="text-xs font-semibold text-muted-foreground">No options yet</span>}
      </div>
    </div>
  )
}

function TopicChipList({ ids, data }: { ids: string[]; data: ClassCenterData }) {
  const topics = ids.map((id) => data.topics.find((topic) => topic.id === id)).filter(Boolean) as ClassTopic[]
  if (!topics.length) return null
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {topics.slice(0, 4).map((topic) => (
        <span key={topic.id} className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-extrabold text-primary">{topic.title}</span>
      ))}
      {topics.length > 4 && <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-extrabold text-muted-foreground">+{topics.length - 4}</span>}
    </div>
  )
}

function ToggleChip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-2.5 py-1 text-xs font-extrabold transition',
        selected ? 'border-primary bg-primary/14 text-primary' : 'border-border bg-card text-muted-foreground hover:bg-muted'
      )}
    >
      {children}
    </button>
  )
}

function InlineGauge({ value, meta, muted }: { value: number; meta: string; muted?: boolean }) {
  return (
    <div className="space-y-1">
      <ProgressLine value={value} muted={muted} />
      <p className={cn('text-xs font-extrabold', muted ? 'text-muted-foreground' : 'text-foreground')}>{meta}</p>
    </div>
  )
}

function ProgressLine({ value, muted }: { value: number; muted?: boolean }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-muted">
      <div className={cn('h-full rounded-full transition-all', muted ? 'bg-muted-foreground/30' : 'bg-primary')} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

function TopicReferenceBadge({ label, count }: { label: string; count: number }) {
  if (!count) return null
  return <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">{count} {label}</span>
}

function toggleValue<T>(items: T[], item: T) {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item]
}

function BannerField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  function handleFile(file?: File) {
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2 md:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold">Background / banner</span>
        {value && (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange('')}>
            Clear
          </Button>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <Input
          value={value.startsWith('data:image/') ? 'Attached image' : value}
          onChange={(e) => onChange(e.target.value === 'Attached image' ? value : e.target.value)}
          placeholder="Paste an image URL..."
        />
        <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-bold shadow-sm transition hover:bg-muted">
          <Upload className="size-4" />
          Choose image
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      </div>
      {value && (
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          <img src={value} alt="Class banner preview" className="h-28 w-full object-cover" />
        </div>
      )}
    </div>
  )
}

function InlineInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <input
      className="w-full rounded-md bg-transparent px-1.5 py-1 text-sm font-semibold outline-none transition hover:bg-muted/45 focus:bg-card focus:ring-2 focus:ring-ring/35"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

function TinySelect({ value, options, onChange }: { value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <select className="h-8 max-w-full rounded-full border border-border bg-card px-2 text-xs font-bold outline-none focus:ring-2 focus:ring-ring/40" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((item) => <option key={item} value={item}>{statusLabel(item)}</option>)}
    </select>
  )
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} aria-label="Delete">
      <Trash2 className="size-4 text-muted-foreground" />
    </Button>
  )
}
