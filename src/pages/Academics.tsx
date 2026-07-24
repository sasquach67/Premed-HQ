import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  Archive,
  AlertTriangle, Calculator, CalendarDays, CheckCircle2, ChevronDown,
  Clock, FlaskConical, GraduationCap, Library, ListChecks, MoreHorizontal, Plus,
  Search, ShieldCheck, Sparkles, Trash2, X,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import { gpaStats, fmtGpa, GRADE_POINTS } from '@/lib/selectors'
import type { Course, LetterGrade, RequirementItem } from '@/lib/types'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { TrackerTable, type ColumnDef } from '@/components/common/TrackerTable'
import { RecordOpenWorkspace } from '@/components/common/RecordOpenWorkspace'
import { ObjectInspector } from '@/components/common/ObjectInspector'
import type { RecordOpenMode } from '@/components/common/CenterPeek'
import { Collapsible } from '@/components/common/Collapsible'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { AssignmentsPanel } from '@/components/common/AssignmentsPanel'
import { NotesDB } from '@/components/common/NotesDB'
import { ClassCenter } from '@/components/academics/ClassCenter'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ModeSwitch } from '@/components/common/ModeSwitch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/common/useToast'
import { instantCrossfade, sharedAxis } from '@/lib/motion'

const GRADES: LetterGrade[] = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'P', 'IP']
const COURSE_COLUMNS: ColumnDef[] = [
  { key: 'code', header: 'Course', type: 'text', width: '120px', placeholder: 'CHEM 241', validate: (value) => String(value ?? '').trim() ? undefined : 'Course code is required.' },
  { key: 'title', header: 'Title', type: 'text', placeholder: 'Course title' },
  { key: 'credits', header: 'Cr', type: 'number', width: '60px', align: 'right' },
  { key: 'grade', header: 'Grade', type: 'select', width: '80px', options: GRADES as string[] },
  { key: 'bcpm', header: 'AMCAS', type: 'toggle', width: '76px', toggleLabels: ['AO', 'BCPM'] },
  { key: 'status', header: 'Status', type: 'select', width: '120px', options: ['planned', 'in-progress', 'completed'] },
]

export function Academics() {
  const reduceMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const { classId } = useParams()
  const courses = useStore((s) => s.courses)
  const addItem = useStore((s) => s.addItem)
  const undoRecovery = useStore((s) => s.undoRecovery)
  const storedMode = useStore((s) => s.settings.academicsMode)
  const update = useStore((s) => s.update)
  const route = ROUTE_MAP.academics
  const toast = useToast()

  const gpa = useMemo(() => gpaStats(courses), [courses])

  // Terms in plan order (incoming credit last for display? keep first).
  const terms = useMemo(() => {
    const seen: string[] = []
    for (const c of courses) if (!seen.includes(c.term)) seen.push(c.term)
    return seen
  }, [courses])

  function addCourse(term: string) {
    const id = uid()
    addItem('courses', {
      id, term, code: '', title: '', credits: 3, grade: '', bcpm: false,
      status: 'planned', inResidence: true, satisfies: [], order: 0,
    } as Course)
    const recoveryId = useStore.getState().meta.recoveryStack[0]?.id
    toast({
      title: 'Course created',
      description: `Added to ${term}.`,
      onOpen: () => setSearchParams({ mode: 'planning', tab: 'planner' }),
      onUndo: recoveryId ? () => undoRecovery(recoveryId) : undefined,
    })
  }

  const mode = searchParams.get('mode') === 'planning' || searchParams.get('mode') === 'daily'
    ? searchParams.get('mode') as 'daily' | 'planning'
    : storedMode ?? 'daily'
  const tabsByMode = {
    daily: ['class-center', 'assignments'],
    planning: ['planner', 'tracker', 'archive'],
  } as const
  const requestedTab = searchParams.get('tab')
  const activeTab = tabsByMode[mode].includes(requestedTab as never) ? requestedTab! : tabsByMode[mode][0]
  const firstEditableTerm = terms.find((term) => !/transfer|ap credit/i.test(term))

  useEffect(() => {
    if (storedMode === mode) return
    update((draft) => { draft.settings.academicsMode = mode })
  }, [mode, storedMode, update])

  if (classId) {
    return <ClassCenter />
  }

  function changeMode(nextMode: 'daily' | 'planning') {
    setSearchParams({ mode: nextMode, tab: tabsByMode[nextMode][0] })
  }

  return (
    <div>
      <PageHeader title={route.label} />
      <div className="mb-4">
        <ModeSwitch
          value={mode}
          options={[{ id: 'daily', label: 'Daily' }, { id: 'planning', label: 'Planning' }]}
          onChange={changeMode}
          label="Academics mode"
        />
      </div>

      <AnimatePresence mode="wait" initial={false} custom={mode === 'planning' ? 1 : -1}>
        <m.div
          key={mode}
          custom={mode === 'planning' ? 1 : -1}
          variants={reduceMotion ? instantCrossfade : sharedAxis}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Tabs
            value={activeTab}
            onValueChange={(tab) => setSearchParams({ mode, tab })}
          >
            <TabsList>
              {mode === 'daily' ? (
                <>
                  <TabsTrigger value="class-center"><GraduationCap className="size-4" /> Class Center</TabsTrigger>
                  <TabsTrigger value="assignments"><CalendarDays className="size-4" /> Assignments</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="planner"><Calculator className="size-4" /> Planner & GPA</TabsTrigger>
                  <TabsTrigger value="tracker"><ListChecks className="size-4" /> Tar Heel Tracker</TabsTrigger>
                  <TabsTrigger value="archive"><Archive className="size-4" /> Archive</TabsTrigger>
                </>
              )}
            </TabsList>

        {/* ---- Class Center (daily academic workflow) ---- */}
        <TabsContent value="class-center"><ClassCenter /></TabsContent>

        {/* ---- Assignments + Calendar (main dashboard) ---- */}
        <TabsContent value="assignments"><AssignmentsPanel /></TabsContent>

        {/* ---- Planner & GPA ---- */}
        <TabsContent value="planner" className="space-y-6">
          <SharedPlanNote
            title="Planner & GPA is the course ledger"
            detail="Edit course names, credits, grades, BCPM status, and term placement here. Tar Heel Tracker uses this same course list to audit UNC, major, and premed requirements."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>AMCAS GPA</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
                  <AcademicStat label="Cumulative" value={fmtGpa(gpa.cum)} />
                  <AcademicStat label="Science (BCPM)" value={fmtGpa(gpa.science)} />
                  <AcademicStat label="All other (AO)" value={fmtGpa(gpa.ao)} />
                  <AcademicStat label="Graded credits" value={String(gpa.credits)} detail={`${gpa.scienceCredits} BCPM · ${gpa.aoCredits} AO`} />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">No grade replacement · repeats averaged</p>
              </CardContent>
            </Card>
            <WhatIf baseline={courses} />
          </div>

          {terms.map((term) => {
            const rows = courses.filter((c) => c.term === term)
            const credits = rows.reduce((m, c) => m + (c.credits || 0), 0)
            return (
              <Collapsible
                key={term}
                title={term}
                defaultOpen={term === firstEditableTerm}
                badge={<span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{rows.length} courses · {credits} cr</span>}
              >
                <div className="mb-2 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => addCourse(term)}><Plus className="size-4" /> Add course</Button>
                </div>
                <TrackerTable collection="courses" rows={rows} columns={COURSE_COLUMNS} listId={`academics.${activeTab}.${term}`} />
              </Collapsible>
            )
          })}
          <Button variant="outline" onClick={() => addCourse('New term')}><Plus className="size-4" /> Add a term</Button>
        </TabsContent>

        {/* ---- Tar Heel Tracker ---- */}
        <TabsContent value="tracker" className="space-y-4">
          <SharedPlanNote
            title="Tar Heel Tracker is the requirement audit"
            detail="This view does not maintain a second plan. Moving or adding courses here updates the same course list used by Planner & GPA."
          />
          <TarHeelTracker />
        </TabsContent>

        {/* ---- Archive ---- */}
        <TabsContent value="archive" className="space-y-6">
          <ClassCenter archiveOnly />
          <ResourceGrid pillar="academics" />
          <NotesDB pillar="academics" title="Notes (study techniques, syllabi, brain dumps)" />
        </TabsContent>
          </Tabs>
        </m.div>
      </AnimatePresence>
    </div>
  )
}

function AcademicStat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="min-w-0 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-foreground">{value}</p>
      {detail && <p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p>}
    </div>
  )
}

/** What-if simulator: project GPA after hypothetical grades. */
function WhatIf({ baseline }: { baseline: Course[] }) {
  const [rows, setRows] = useState<{ id: string; credits: number; grade: LetterGrade; bcpm: boolean }[]>([])

  const projected = useMemo(() => {
    const hypo: Course[] = rows.map((r) => ({
      id: r.id, term: 'What-if', code: '', title: '', credits: r.credits, grade: r.grade,
      bcpm: r.bcpm, status: 'completed', inResidence: true, satisfies: [], order: 0,
    }))
    return gpaStats([...baseline, ...hypo])
  }, [rows, baseline])

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2"><FlaskConical className="size-4 text-primary" /> What-if</CardTitle>
        <Button size="sm" variant="ghost" onClick={() => setRows((r) => [...r, { id: uid(), credits: 3, grade: 'A', bcpm: true }])}>
          <Plus className="size-4" /> Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {rows.length === 0 && <p className="text-xs text-muted-foreground">Add hypothetical future grades to see your projected GPA.</p>}
        {rows.map((r) => (
          <div key={r.id} className="flex items-center gap-1.5">
            <input
              type="number" value={r.credits} min={0}
              onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, credits: Number(e.target.value) || 0 } : x))}
              className="h-8 w-14 rounded-md border border-input bg-card px-2 text-sm"
            />
            <InlineSelect value={r.grade} options={Object.keys(GRADE_POINTS)} onChange={(grade) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, grade: grade as LetterGrade } : x))} className="h-8 w-20" />
            <button
              onClick={() => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, bcpm: !x.bcpm } : x))}
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.bcpm ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >{r.bcpm ? 'BCPM' : 'AO'}</button>
            <button onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} className="ml-auto text-xs text-muted-foreground hover:text-destructive">✕</button>
          </div>
        ))}
        {rows.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-2 text-center">
            <div><p className="font-display text-lg font-semibold text-primary">{fmtGpa(projected.cum)}</p><p className="text-xs text-muted-foreground">proj. cumulative</p></div>
            <div><p className="font-display text-lg font-semibold" style={{ color: 'var(--cat-research)' }}>{fmtGpa(projected.science)}</p><p className="text-xs text-muted-foreground">proj. science</p></div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function SharedPlanNote({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-primary/18 bg-primary/6 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="font-display text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs font-semibold leading-relaxed text-muted-foreground">{detail}</p>
      </div>
      <span className="shrink-0 rounded-full bg-card px-3 py-1 text-xs font-semibold text-primary shadow-sm">One shared plan</span>
    </div>
  )
}

const TERM_PLAN = [
  { year: 'Freshman', terms: ['Fall 2026', 'Spring 2027', 'Summer 2027'] },
  { year: 'Sophomore', terms: ['Fall 2027', 'Spring 2028', 'Summer 2028'] },
  { year: 'Junior', terms: ['Fall 2028', 'Spring 2029', 'Summer 2029'] },
  { year: 'Senior', terms: ['Fall 2029', 'Spring 2030', 'Summer 2030'] },
]

const PROGRAMS = [
  { id: 'neuroscience-bs', label: 'Neuroscience B.S.', modeled: true },
  { id: 'psychology-bs', label: 'Psychology B.S.', modeled: false },
  { id: 'biology-bs', label: 'Biology B.S.', modeled: false },
  { id: 'chemistry-bs', label: 'Chemistry B.S.', modeled: false },
]

const PREMED_TAGS: Record<string, string> = {
  BIOL: 'biology',
  CHEM: 'chemistry',
  PHYS: 'physics',
  PSYC: 'psych/soc',
  SOCI: 'psych/soc',
  ENGL: 'writing',
  MATH: 'math/stat',
  STOR: 'math/stat',
}

type RequirementStatus = 'completed' | 'in-progress' | 'planned' | 'missing' | 'needs-verification'

function courseCode(code: string) {
  return code.trim().toUpperCase()
}

function requirementMatch(req: RequirementItem, courses: Course[]) {
  const codes = new Set((req.satisfiedBy ?? []).map(courseCode))
  return courses.filter((course) => codes.has(courseCode(course.code)))
}

function requiredCount(req: RequirementItem) {
  if (/select two/i.test(req.label)) return 2
  if (/\bor\b/i.test(req.label)) return 1
  return Math.max(1, req.satisfiedBy?.length ?? 1)
}

function requirementStatus(req: RequirementItem, courses: Course[]): RequirementStatus {
  if (req.verificationStatus === 'needs-verification' && !req.done) return 'needs-verification'
  if (req.done) return 'completed'
  const matches = requirementMatch(req, courses)
  if (!matches.length) return 'missing'
  const required = requiredCount(req)
  const completed = matches.filter((course) => course.status === 'completed').length
  const inProgress = matches.filter((course) => course.status === 'in-progress').length
  const planned = matches.filter((course) => course.status === 'planned').length
  if (/6 cr/i.test(req.label)) {
    const completedCredits = matches.filter((course) => course.status === 'completed').reduce((sum, course) => sum + course.credits, 0)
    const plannedCredits = matches.reduce((sum, course) => sum + course.credits, 0)
    if (completedCredits >= 6) return 'completed'
    if (completedCredits + inProgress > 0) return 'in-progress'
    if (plannedCredits >= 6 || planned > 0) return 'planned'
  }
  if (completed >= required) return 'completed'
  if (completed + inProgress >= required) return 'in-progress'
  if (completed + inProgress + planned >= required) return 'planned'
  return 'missing'
}

function statusTone(status: RequirementStatus) {
  if (status === 'completed') return 'text-success'
  if (status === 'in-progress') return 'text-primary'
  if (status === 'planned') return 'text-warning-foreground'
  if (status === 'needs-verification') return 'text-warning-foreground'
  return 'text-muted-foreground'
}

function statusLabel(status: RequirementStatus) {
  if (status === 'in-progress') return 'in progress'
  if (status === 'needs-verification') return 'needs verification'
  return status
}

function termCredits(courses: Course[]) {
  return courses.reduce((sum, course) => sum + (course.credits || 0), 0)
}

function progressPercent(done: number, total: number) {
  return total ? Math.round((done / total) * 100) : 0
}

function sourceMeta(reqs: RequirementItem[]) {
  const first = reqs[0]
  return {
    sourceType: first?.sourceType ?? 'planner-inspired',
    sourceLabel: first?.sourceLabel ?? 'Planner note',
    sourceUrl: first?.sourceUrl,
    verificationStatus: reqs.some((req) => req.verificationStatus === 'needs-verification') ? 'needs-verification' : first?.verificationStatus ?? 'needs-verification',
  }
}

function SourceBadge({ reqs }: { reqs: RequirementItem[] }) {
  const meta = sourceMeta(reqs)
  const official = meta.sourceType === 'official'
  const premed = meta.sourceType === 'premed-advice'
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
      official ? 'border-primary/30 bg-primary/10 text-primary' : premed ? 'border-purple-400/30 bg-purple-500/10 text-purple-700 dark:text-purple-200' : 'border-warning/35 bg-warning/15 text-warning-foreground'
    )}>
      {official ? <ShieldCheck className="size-3" /> : premed ? <Sparkles className="size-3" /> : <AlertTriangle className="size-3" />}
      {meta.sourceLabel}{meta.verificationStatus === 'needs-verification' ? ' · needs verification' : ''}
    </span>
  )
}

function isGenEdRequirement(req: RequirementItem) {
  return req.group.startsWith('IDEAs')
    || /first-year|focus|reflection|integration|lfit|campus life|american democracy|disciplinary distribution|gen ed/i.test(`${req.group} ${req.label}`)
}

function isMajorRequirement(req: RequirementItem) {
  return req.group.startsWith('Neuroscience') || /^Major/i.test(req.group)
}

function isPremedRequirement(req: RequirementItem) {
  return req.group.startsWith('Pre-Med') || /premed|pre-med|med prerequisite|UNC HPA/i.test(req.group)
}

function TarHeelTracker() {
  const courses = useStore((s) => s.courses)
  const requirements = useStore((s) => s.requirements)
  const addItem = useStore((s) => s.addItem)
  const patchItem = useStore((s) => s.patchItem)
  const [catalogYear, setCatalogYear] = useState('2026-2027')
  const [majorQuery, setMajorQuery] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('neuroscience-bs')
  const [libraryOpen, setLibraryOpen] = useState(true)
  const [courseQuery, setCourseQuery] = useState('')
  const [termFilter, setTermFilter] = useState('Any term')
  const [requiredOnly, setRequiredOnly] = useState(false)
  const [remainingOnly, setRemainingOnly] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState('Fall 2026')
  const [courseDetail, setCourseDetail] = useState<Course | null>(null)
  const [apOpen, setApOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)
  const [courseOpenMode, setCourseOpenMode] = useState<RecordOpenMode>('peek')
  const [toast, setToast] = useState('')

  const visibleRequirements = requirements.filter((req) => !/organismal/i.test(req.group) && !/^organismal$/i.test(req.label.trim()))
  const grouped = useMemo(() => {
    const map = new Map<string, RequirementItem[]>()
    for (const req of visibleRequirements) {
      const arr = map.get(req.group) ?? []
      arr.push(req)
      map.set(req.group, arr)
    }
    return [...map.entries()]
  }, [visibleRequirements])

  const reqStatus = useMemo(() => new Map(visibleRequirements.map((req) => [req.id, requirementStatus(req, courses)])), [visibleRequirements, courses])
  const genEdReqs = visibleRequirements.filter(isGenEdRequirement)
  const majorReqs = visibleRequirements.filter(isMajorRequirement)
  const premedReqs = visibleRequirements.filter(isPremedRequirement)
  const officialReqs = visibleRequirements.filter((req) => req.sourceType === 'official')
  const completedOfficial = officialReqs.filter((req) => reqStatus.get(req.id) === 'completed').length
  const completedGenEd = genEdReqs.filter((req) => reqStatus.get(req.id) === 'completed').length
  const completedMajor = majorReqs.filter((req) => reqStatus.get(req.id) === 'completed').length
  const completedPremed = premedReqs.filter((req) => ['completed', 'in-progress', 'planned'].includes(reqStatus.get(req.id) ?? 'missing')).length
  const totalCredits = courses.filter((course) => course.status !== 'planned' || !/unscheduled/i.test(course.term)).reduce((sum, course) => sum + course.credits, 0)
  const completedCredits = courses.filter((course) => course.status === 'completed').reduce((sum, course) => sum + course.credits, 0)

  const warnings = useMemo(() => {
    const out: string[] = []
    const missing = officialReqs.filter((req) => reqStatus.get(req.id) === 'missing').length
    const uncertain = visibleRequirements.filter((req) => req.verificationStatus === 'needs-verification').length
    if (missing) out.push(`${missing} official requirements still missing`)
    if (uncertain) out.push(`${uncertain} rules need source/advisor verification`)
    for (const year of TERM_PLAN) {
      for (const term of year.terms) {
        const credits = termCredits(courses.filter((course) => course.term === term))
        if (credits > 18) out.push(`${term} is overloaded at ${credits} credits`)
        if (credits > 0 && credits < 12 && !/Summer/i.test(term)) out.push(`${term} is below full-time load`)
      }
    }
    const seen = new Map<string, number>()
    for (const course of courses) {
      if (!course.code) continue
      seen.set(courseCode(course.code), (seen.get(courseCode(course.code)) ?? 0) + 1)
    }
    for (const [code, count] of seen) if (count > 1) out.push(`${code} appears ${count} times`)
    return out
  }, [courses, officialReqs, reqStatus, visibleRequirements])

  const requirementCodes = new Set(visibleRequirements.flatMap((req) => req.satisfiedBy ?? []).map(courseCode))
  const libraryCourses = courses
    .filter((course) => {
      const q = courseQuery.trim().toLowerCase()
      const matchesSearch = !q || `${course.code} ${course.title}`.toLowerCase().includes(q)
      const matchesTerm = termFilter === 'Any term' || course.term.includes(termFilter)
      const matchesRequired = !requiredOnly || requirementCodes.has(courseCode(course.code))
      const relatedReqs = visibleRequirements.filter((req) => (req.satisfiedBy ?? []).map(courseCode).includes(courseCode(course.code)))
      const matchesRemaining = !remainingOnly || relatedReqs.some((req) => reqStatus.get(req.id) !== 'completed')
      return matchesSearch && matchesTerm && matchesRequired && matchesRemaining
    })
    .slice(0, 60)

  const modeledProgram = PROGRAMS.find((program) => program.id === selectedMajor)

  function addCourseToTerm(course: Course, term: string) {
    patchItem('courses', course.id, { term, status: course.status === 'completed' ? 'completed' : 'planned' })
    setToast(`${course.code || 'Course'} added to ${term}`)
    setCourseDetail(null)
    window.setTimeout(() => setToast(''), 2600)
  }

  function addCustomCourse(payload: Pick<Course, 'code' | 'title' | 'credits' | 'term' | 'notes'>) {
    addItem('courses', {
      id: uid(),
      code: payload.code,
      title: payload.title || 'Custom course',
      credits: payload.credits,
      term: payload.term,
      grade: '',
      bcpm: false,
      status: 'planned',
      inResidence: true,
      satisfies: ['User-note / advisor review needed'],
      notes: payload.notes,
      order: 0,
    } as Course)
    setToast('Custom course added as user-note; official requirement credit still needs verification.')
    window.setTimeout(() => setToast(''), 3200)
  }

  function clearPlanner() {
    if (!window.confirm('Move planned/in-progress in-residence courses to Unscheduled? Completed and AP/transfer courses stay intact.')) return
    for (const course of courses) {
      if (course.inResidence && course.status !== 'completed') patchItem('courses', course.id, { term: 'Unscheduled' })
    }
  }

  return (
    <div className="relative">
      {toast && <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-xl">{toast}</div>}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/70 p-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary"><GraduationCap className="size-5" /></div>
          <div>
            <h3 className="font-display text-lg font-semibold">Tar Heel Tracker</h3>
            <p className="text-xs text-muted-foreground">Local planner · official requirements are labeled separately from premed advice.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">Total {totalCredits} / 120 credits</span>
          <Button size="sm" variant="outline" onClick={() => setApOpen(true)}><ShieldCheck className="size-4" /> AP Credit</Button>
          <Button size="sm" variant={libraryOpen ? 'default' : 'outline'} onClick={() => setLibraryOpen((open) => !open)}><Library className="size-4" /> Course Library</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="size-8 text-muted-foreground" aria-label="More planner actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Planner actions</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={clearPlanner}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Trash2 className="size-4" /> Clear planner
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className={cn('grid gap-4', libraryOpen ? 'xl:grid-cols-[20rem_minmax(0,1fr)_22rem]' : 'xl:grid-cols-[20rem_minmax(0,1fr)]')}>
        <aside className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-border bg-card/70 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-display text-lg font-semibold">Degree Progress</h4>
            <Button size="icon" variant="ghost" className="size-8 xl:hidden" onClick={() => setLibraryOpen(false)}><X className="size-4" /></Button>
          </div>
          <div className="space-y-3">
            <FieldLabel label="Catalog Year">
              <InlineSelect value={catalogYear} options={['2026-2027', '2025-2026', '2024-2025']} onChange={setCatalogYear} />
              <p className="mt-1 text-xs text-muted-foreground">Major/minor requirements follow the catalog year you entered under.</p>
            </FieldLabel>
            <FieldLabel label="Major">
              <div className="rounded-lg border border-input bg-background p-2">
                <div className="mb-1 flex items-center gap-1.5 rounded-md bg-muted/45 px-2 py-1">
                  <Search className="size-3.5 text-muted-foreground" />
                  <input value={majorQuery} onChange={(e) => setMajorQuery(e.target.value)} placeholder="Search UNC programs..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
                </div>
                <div className="max-h-28 overflow-y-auto">
                  {PROGRAMS.filter((program) => program.label.toLowerCase().includes(majorQuery.toLowerCase())).map((program) => (
                    <button key={program.id} onClick={() => setSelectedMajor(program.id)} className={cn('flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted', selectedMajor === program.id && 'bg-primary/10 text-primary')}>
                      {program.label}
                      {!program.modeled && <span className="text-xs font-semibold text-muted-foreground">future-ready</span>}
                    </button>
                  ))}
                </div>
              </div>
              {!modeledProgram?.modeled && <p className="mt-1 text-xs text-warning-foreground">Only Neuroscience B.S. is modeled. Other programs are UI placeholders until official rules are seeded.</p>}
            </FieldLabel>
            <FieldLabel label="Second Major / Minor">
              <InlineSelect value="None" options={['None']} onChange={() => undefined} />
            </FieldLabel>
          </div>

          <div className="mt-5 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Progress</h5>
            <ProgressMetric label="Credits" value={completedCredits} total={120} />
            <ProgressMetric label="Official UNC reqs" value={completedOfficial} total={officialReqs.length} />
            <ProgressMetric label="Gen Eds" value={completedGenEd} total={genEdReqs.length} />
            <ProgressMetric label="Major" value={completedMajor} total={majorReqs.length} />
            <ProgressMetric label="Premed overlay" value={completedPremed} total={premedReqs.length} />
          </div>

          <div className="mt-5 space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Warnings</h5>
            {warnings.length === 0 ? (
              <div className="flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs font-semibold text-success"><CheckCircle2 className="size-4" /> No major planner issues detected.</div>
            ) : (
              <div className="space-y-1.5">
                {warnings.slice(0, 5).map((warning) => (
                  <div key={warning} className="flex gap-2 rounded-xl bg-warning/15 px-3 py-2 text-xs font-semibold text-warning-foreground"><AlertTriangle className="mt-0.5 size-3.5 shrink-0" /> {warning}</div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 space-y-2">
            {grouped.map(([group, items]) => {
              const done = items.filter((item) => reqStatus.get(item.id) === 'completed').length
              return (
                <details key={group} open={group.startsWith('Neuroscience') || group.startsWith('IDEAs')}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-1 py-2 text-sm font-semibold hover:bg-muted/45">
                    <span className="min-w-0 truncate">{group}</span>
                    <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{done}/{items.length}</span>
                  </summary>
                  <div className="space-y-1 pb-2 pl-1">
                    <SourceBadge reqs={items} />
                    {items.map((item) => <RequirementMini key={item.id} item={item} status={reqStatus.get(item.id) ?? 'missing'} />)}
                  </div>
                </details>
              )
            })}
          </div>
          <div className="mt-5 rounded-xl border border-border bg-muted/35 p-3 text-xs leading-relaxed text-muted-foreground">
            Carolina Compass inspired the planner layout only. Requirement labels come from Premed HQ’s seeded UNC catalog data; uncertain rules are marked needs-verification and should be checked with the UNC catalog or an advisor.
          </div>
        </aside>

        <main className="min-w-0 space-y-4">
          <div className={cn('rounded-xl border p-4', warnings.length ? 'border-warning/35 bg-warning/10' : 'border-success/30 bg-success/10')}>
            <button className="flex w-full items-center justify-between gap-3 text-left">
              <span className="flex items-center gap-2 font-semibold">
                {warnings.length ? <AlertTriangle className="size-5 text-warning-foreground" /> : <CheckCircle2 className="size-5 text-success" />}
                {warnings.length ? `${warnings.length} planning issues need attention` : 'No prerequisite or term conflicts detected'}
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
            {warnings.length > 0 && <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{warnings.map((warning) => <li key={warning}>• {warning}</li>)}</ul>}
          </div>

          {TERM_PLAN.map((year) => {
            const yearCourses = courses.filter((course) => year.terms.includes(course.term))
            return (
              <section key={year.year} className="space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-display text-lg font-semibold">{year.year}</h4>
                  <span className="text-sm font-semibold text-muted-foreground">{termCredits(yearCourses)} credits</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid items-stretch gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {year.terms.map((term) => (
                    <TermCard
                      key={term}
                      term={term}
                      courses={courses.filter((course) => course.term === term)}
                      allTerms={TERM_PLAN.flatMap((plan) => plan.terms)}
                      requirements={visibleRequirements}
                      onOpenLibrary={() => { setSelectedTerm(term); setLibraryOpen(true) }}
                      onMove={(course, nextTerm) => patchItem('courses', course.id, { term: nextTerm })}
                      onRemove={(course) => patchItem('courses', course.id, { term: 'Unscheduled', status: 'planned' })}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </main>

        {libraryOpen && (
          <aside className="max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-border bg-card/85 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="font-display text-lg font-semibold">Course Library</h4>
                <p className="text-xs text-muted-foreground">{libraryCourses.length} courses from the seeded UNC plan</p>
              </div>
              <Button size="icon" variant="ghost" className="size-8" onClick={() => setLibraryOpen(false)}><X className="size-4" /></Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-2 py-1.5">
                <Search className="size-4 text-muted-foreground" />
                <input value={courseQuery} onChange={(e) => setCourseQuery(e.target.value)} placeholder="Search code or title..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InlineSelect value={termFilter} options={['Any term', 'Fall', 'Spring', 'Summer']} onChange={setTermFilter} />
                <InlineSelect value={selectedTerm} options={TERM_PLAN.flatMap((plan) => plan.terms)} onChange={setSelectedTerm} />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold"><input type="checkbox" checked={requiredOnly} onChange={(e) => setRequiredOnly(e.target.checked)} /> Required only</label>
              <label className="flex items-center gap-2 text-xs font-semibold"><input type="checkbox" checked={remainingOnly} onChange={(e) => setRemainingOnly(e.target.checked)} /> Show only remaining requirements</label>
            </div>
            <div className="mt-3 space-y-2">
              <Button size="sm" variant="outline" className="w-full" onClick={() => setCustomOpen(true)}><Plus className="size-4" /> Add custom course</Button>
              {libraryCourses.map((course) => (
                <CourseLibraryCard
                  key={course.id}
                  course={course}
                  requirements={visibleRequirements}
                  onOpen={() => setCourseDetail(course)}
                  onAdd={() => addCourseToTerm(course, selectedTerm)}
                />
              ))}
            </div>
          </aside>
        )}
      </div>

      <RecordOpenWorkspace
        records={libraryCourses.map((course) => ({ id: course.id, label: course.code || 'Course', description: course.title }))}
        activeId={courseDetail?.id ?? null}
        open={Boolean(courseDetail)}
        mode={courseOpenMode}
        parentLabel="Course library"
        onOpenChange={(open) => { if (!open) setCourseDetail(null) }}
        onModeChange={setCourseOpenMode}
        onSelect={(id) => setCourseDetail(courses.find((course) => course.id === id) ?? null)}
        renderRecord={(id) => {
          const course = courses.find((candidate) => candidate.id === id)
          return course ? (
            <CourseInspector
              course={course}
              requirements={visibleRequirements}
              selectedTerm={selectedTerm}
              onTerm={setSelectedTerm}
              onClose={() => setCourseDetail(null)}
              onAdd={(selectedCourse) => addCourseToTerm(selectedCourse, selectedTerm)}
            />
          ) : null
        }}
      />
      <ApCreditDialog open={apOpen} onOpenChange={setApOpen} onAdd={(course) => addItem('courses', course)} />
      <CustomCourseDialog open={customOpen} onOpenChange={setCustomOpen} selectedTerm={selectedTerm} onAdd={addCustomCourse} />
    </div>
  )
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

function ProgressMetric({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = progressPercent(value, total)
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-semibold"><span>{label}</span><span>{value}/{total}</span></div>
      <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} /></div>
    </div>
  )
}

function RequirementMini({ item, status }: { item: RequirementItem; status: RequirementStatus }) {
  return (
    <div className="flex items-start gap-2 rounded-lg px-1 py-1 text-xs">
      {status === 'completed' ? <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" /> : status === 'missing' ? <CircleIcon /> : <Clock className={cn('mt-0.5 size-3.5 shrink-0', statusTone(status))} />}
      <div className="min-w-0">
        <p className={cn('font-semibold leading-snug', status === 'completed' && 'text-muted-foreground line-through')}>{item.label}</p>
        <p className={cn('text-xs font-semibold uppercase tracking-wide', statusTone(status))}>{statusLabel(status)}</p>
      </div>
    </div>
  )
}

function CircleIcon() {
  return <span className="mt-1 size-3.5 shrink-0 rounded-sm border border-muted-foreground/45" aria-hidden="true" />
}

function TermCard({
  term, courses, allTerms, requirements, onOpenLibrary, onMove, onRemove,
}: {
  term: string
  courses: Course[]
  allTerms: string[]
  requirements: RequirementItem[]
  onOpenLibrary: () => void
  onMove: (course: Course, term: string) => void
  onRemove: (course: Course) => void
}) {
  const isFall = /Fall/.test(term)
  const isSpring = /Spring/.test(term)
  const isSummer = /Summer/.test(term)
  const credits = termCredits(courses)
  return (
    <Card className="flex max-h-[38rem] h-full flex-col overflow-hidden">
      <div className={cn(
        'flex items-center justify-between px-4 py-3',
        isFall && 'bg-orange-50 text-orange-950 dark:bg-orange-950/20 dark:text-orange-100',
        isSpring && 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950/20 dark:text-emerald-100',
        isSummer && 'bg-sky-50 text-sky-950 dark:bg-sky-950/20 dark:text-sky-100'
      )}>
        <div>
          <h5 className="font-display text-lg font-semibold">{term.replace(/\s\d{4}/, '')}</h5>
          <p className="text-xs font-semibold opacity-70">{term.match(/\d{4}/)?.[0] ?? ''}</p>
        </div>
        <span className={cn(
          'rounded-full bg-white/60 px-2 py-0.5 text-xs font-semibold dark:bg-background/40',
          credits === 0 ? 'text-muted-foreground' : credits < 12 && !isSummer ? 'text-warning-foreground' : 'text-primary'
        )}>{credits} cr</span>
      </div>
      <CardContent className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {courses.length === 0 ? (
          <button onClick={onOpenLibrary} className="grid min-h-20 w-full place-items-center rounded-xl border border-dashed border-border text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5">
            <span><Plus className="mx-auto mb-1 size-4" /> Plan {term.replace(/\s\d{4}/, '')}</span>
          </button>
        ) : courses.map((course) => (
          <CoursePlanCard key={course.id} course={course} requirements={requirements} allTerms={allTerms} onMove={onMove} onRemove={onRemove} />
        ))}
        {courses.length > 0 && <Button size="sm" variant="ghost" className="w-full" onClick={onOpenLibrary}><Plus className="size-4" /> Add another course</Button>}
      </CardContent>
    </Card>
  )
}

function CoursePlanCard({ course, requirements, allTerms, onMove, onRemove }: { course: Course; requirements: RequirementItem[]; allTerms: string[]; onMove: (course: Course, term: string) => void; onRemove: (course: Course) => void }) {
  const tags = requirementTags(course, requirements)
  const prefix = courseCode(course.code).split(' ')[0]
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3 transition hover:bg-muted/35">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold">{course.code || 'Custom'}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground">{course.title || 'Untitled course'}</p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{course.credits} cr</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        <StatusBadge status={course.status} />
        {PREMED_TAGS[prefix] && <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-700 dark:text-purple-200">{PREMED_TAGS[prefix]}</span>}
        {tags.slice(0, 2).map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{tag}</span>)}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <InlineSelect value={course.term} options={[...allTerms, 'Unscheduled', 'Transfer / AP Credit']} onChange={(term) => onMove(course, term)} className="h-8 min-w-0 flex-1 text-xs" />
        <Button size="icon" variant="ghost" className="size-8" onClick={() => onRemove(course)}><Trash2 className="size-3.5" /></Button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Course['status'] }) {
  return <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', status === 'completed' ? 'bg-success/10 text-success' : status === 'in-progress' ? 'bg-primary/10 text-primary' : 'bg-warning/15 text-warning-foreground')}>{status}</span>
}

function requirementTags(course: Course, requirements: RequirementItem[]) {
  const code = courseCode(course.code)
  return requirements
    .filter((req) => (req.satisfiedBy ?? []).map(courseCode).includes(code))
    .map((req) => req.group.replace('Neuroscience B.S. — ', '').replace('IDEAs in Action — ', '').replace('Pre-Med additions (UNC HPA)', 'Premed'))
}

function CourseLibraryCard({ course, requirements, onOpen, onAdd }: { course: Course; requirements: RequirementItem[]; onOpen: () => void; onAdd: () => void }) {
  const tags = requirementTags(course, requirements)
  return (
    <div className="rounded-xl border border-border bg-background/65 p-3">
      <button onClick={onOpen} className="block w-full text-left">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold">{course.code}</p>
            <p className="line-clamp-2 text-sm text-muted-foreground">{course.title}</p>
          </div>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{course.credits} cr</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">{/Fall/.test(course.term) ? 'Fall' : /Spring/.test(course.term) ? 'Spring' : /Summer/.test(course.term) ? 'Summer' : 'Any term'}</span>
          {tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{tag}</span>)}
        </div>
      </button>
      <Button size="sm" variant="outline" className="mt-2 w-full" onClick={onAdd}><Plus className="size-4" /> Add to selected term</Button>
    </div>
  )
}

function CourseInspector({ course, requirements, selectedTerm, onTerm, onClose, onAdd }: { course: Course; requirements: RequirementItem[]; selectedTerm: string; onTerm: (term: string) => void; onClose: () => void; onAdd: (course: Course) => void }) {
  const tags = requirementTags(course, requirements)
  return (
    <ObjectInspector
      title={`${course.code} · ${course.title}`}
      subtitle={`${course.credits} credits · Course ID ${course.id}`}
      config={{
        overview: {
          emptyLabel: 'No course details.',
          content: (
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">{course.notes || 'No official course description is seeded yet. Use the UNC catalog/course library to verify details before relying on this plan.'}</p>
              <div className="flex flex-wrap gap-1">{tags.length ? tags.map((tag) => <span key={tag} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{tag}</span>) : <span className="text-xs text-muted-foreground">No mapped requirement tags.</span>}</div>
              <label className="block text-sm font-semibold">
                Add to schedule
                <InlineSelect value={selectedTerm} options={TERM_PLAN.flatMap((plan) => plan.terms)} onChange={onTerm} className="mt-1 h-10" />
              </label>
            </div>
          ),
        },
        relations: { emptyLabel: 'No additional relations.' },
        files: { emptyLabel: 'No files attached.' },
        activity: { emptyLabel: 'No course activity yet.' },
        actions: {
          emptyLabel: 'No actions available.',
          content: (
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => onAdd(course)}>Add course</Button>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          ),
        },
        notes: { emptyLabel: 'No additional notes.' },
        dataQuality: { emptyLabel: 'Verify course details in the UNC catalog before relying on this plan.' },
      }}
    />
  )
}

function ApCreditDialog({ open, onOpenChange, onAdd }: { open: boolean; onOpenChange: (open: boolean) => void; onAdd: (course: Course) => void }) {
  const [exam, setExam] = useState('AP Biology')
  const [score, setScore] = useState(5)
  const [credits, setCredits] = useState(3)
  const [mappedCourse, setMappedCourse] = useState('BIOL 101')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AP Credit</DialogTitle>
          <DialogDescription>Mappings are saved as needs-verification unless already present in Andy’s seeded AP/transfer notes.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldInput label="Exam" value={exam} onChange={setExam} />
          <label className="text-sm font-semibold">Score<input type="number" min={1} max={5} value={score} onChange={(e) => setScore(Number(e.target.value) || 0)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2" /></label>
          <FieldInput label="Mapped course" value={mappedCourse} onChange={setMappedCourse} />
          <label className="text-sm font-semibold">Credits<input type="number" min={0} value={credits} onChange={(e) => setCredits(Number(e.target.value) || 0)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2" /></label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => {
            onAdd({ id: uid(), term: 'Transfer / AP Credit', code: mappedCourse, title: `${exam} score ${score}`, credits, grade: '', bcpm: /BIOL|CHEM|PHYS|MATH|STOR/.test(mappedCourse), status: 'completed', inResidence: false, satisfies: ['AP credit mapping needs verification'], notes: 'Added from AP Credit scaffold; verify against UNC credit rules.', order: 0 } as Course)
            onOpenChange(false)
          }}>Add AP credit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function CustomCourseDialog({ open, onOpenChange, selectedTerm, onAdd }: { open: boolean; onOpenChange: (open: boolean) => void; selectedTerm: string; onAdd: (payload: Pick<Course, 'code' | 'title' | 'credits' | 'term' | 'notes'>) => void }) {
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('')
  const [credits, setCredits] = useState(3)
  const [term, setTerm] = useState(selectedTerm)
  const [notes, setNotes] = useState('')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add custom course</DialogTitle>
          <DialogDescription>Custom courses are user/advisor notes and do not automatically satisfy official UNC requirements.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <FieldInput label="Course code" value={code} onChange={setCode} />
          <FieldInput label="Title" value={title} onChange={setTitle} />
          <label className="text-sm font-semibold">Credits<input type="number" min={0} value={credits} onChange={(e) => setCredits(Number(e.target.value) || 0)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2" /></label>
          <label className="text-sm font-semibold">Term<InlineSelect value={term} options={TERM_PLAN.flatMap((plan) => plan.terms)} onChange={setTerm} className="mt-1 h-10" /></label>
          <label className="sm:col-span-2 text-sm font-semibold">Notes<textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 min-h-20 w-full rounded-md border border-input bg-background px-2 py-2" /></label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onAdd({ code, title, credits, term, notes }); onOpenChange(false); setCode(''); setTitle(''); setNotes('') }}>Add course</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function FieldInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="text-sm font-semibold">{label}<input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2" /></label>
}

function InlineSelect({
  value,
  options,
  onChange,
  className,
}: {
  value: string
  options: string[]
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}><SelectValue /></SelectTrigger>
      <SelectContent>{options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
    </Select>
  )
}
