import { useMemo, useState } from 'react'
import { Plus, Calculator, ListChecks, FolderOpen, FlaskConical, CalendarDays } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import { gpaStats, fmtGpa, GRADE_POINTS } from '@/lib/selectors'
import type { Course, LetterGrade } from '@/lib/types'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { Ring } from '@/components/common/Ring'
import { TrackerTable, type ColumnDef } from '@/components/common/TrackerTable'
import { Collapsible } from '@/components/common/Collapsible'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { AssignmentsPanel } from '@/components/common/AssignmentsPanel'
import { NotesDB } from '@/components/common/NotesDB'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const GRADES: LetterGrade[] = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'P', 'IP']
const COURSE_COLUMNS: ColumnDef[] = [
  { key: 'code', header: 'Course', type: 'text', width: '120px', placeholder: 'CHEM 241' },
  { key: 'title', header: 'Title', type: 'text', placeholder: 'Course title' },
  { key: 'credits', header: 'Cr', type: 'number', width: '60px', align: 'right' },
  { key: 'grade', header: 'Grade', type: 'select', width: '80px', options: GRADES as string[] },
  { key: 'bcpm', header: 'AMCAS', type: 'toggle', width: '76px', toggleLabels: ['AO', 'BCPM'] },
  { key: 'status', header: 'Status', type: 'select', width: '120px', options: ['planned', 'in-progress', 'completed'] },
]

export function Academics() {
  const courses = useStore((s) => s.courses)
  const addItem = useStore((s) => s.addItem)
  const route = ROUTE_MAP.academics

  const gpa = useMemo(() => gpaStats(courses), [courses])

  // Terms in plan order (incoming credit last for display? keep first).
  const terms = useMemo(() => {
    const seen: string[] = []
    for (const c of courses) if (!seen.includes(c.term)) seen.push(c.term)
    return seen
  }, [courses])

  function addCourse(term: string) {
    addItem('courses', {
      id: uid(), term, code: '', title: '', credits: 3, grade: '', bcpm: false,
      status: 'planned', inResidence: true, satisfies: [], order: 0,
    } as Course)
  }

  return (
    <div>
      <PageHeader title={route.label} />

      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments"><CalendarDays className="size-4" /> Assignments</TabsTrigger>
          <TabsTrigger value="planner"><Calculator className="size-4" /> Planner & GPA</TabsTrigger>
          <TabsTrigger value="tracker"><ListChecks className="size-4" /> Tar Heel Tracker</TabsTrigger>
          <TabsTrigger value="resources"><FolderOpen className="size-4" /> Resources & Notes</TabsTrigger>
        </TabsList>

        {/* ---- Assignments + Calendar (main dashboard) ---- */}
        <TabsContent value="assignments"><AssignmentsPanel /></TabsContent>

        {/* ---- Planner & GPA ---- */}
        <TabsContent value="planner" className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>AMCAS GPA</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap items-center justify-around gap-4">
                <Ring value={(gpa.cum / 4) * 100} color="var(--cat-gpa)" label="Cumulative" sublabel={fmtGpa(gpa.cum)} size={104} />
                <Ring value={(gpa.science / 4) * 100} color="var(--cat-research)" label="Science (BCPM)" sublabel={fmtGpa(gpa.science)} size={104} />
                <Ring value={(gpa.ao / 4) * 100} color="var(--cat-shadow)" label="All Other (AO)" sublabel={fmtGpa(gpa.ao)} size={104} />
                <div className="text-sm text-muted-foreground">
                  <p><b className="text-foreground">{gpa.credits}</b> graded credits</p>
                  <p><b className="text-foreground">{gpa.scienceCredits}</b> BCPM · <b className="text-foreground">{gpa.aoCredits}</b> AO</p>
                  <p className="mt-1 text-xs">No grade replacement · repeats averaged</p>
                </div>
              </CardContent>
            </Card>
            <WhatIf baseline={courses} />
          </div>

          {terms.map((term) => {
            const rows = courses.filter((c) => c.term === term)
            const credits = rows.reduce((m, c) => m + (c.credits || 0), 0)
            // Transfer/AP credit is long and rarely edited → tuck it behind a toggle (C3)
            const isTransfer = /transfer|ap credit/i.test(term)
            if (isTransfer) {
              return (
                <Collapsible
                  key={term}
                  title={term}
                  badge={<span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">{rows.length} courses · {credits} cr</span>}
                >
                  <TrackerTable collection="courses" rows={rows} columns={COURSE_COLUMNS} />
                </Collapsible>
              )
            }
            return (
              <div key={term} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">{term} <span className="ml-1 font-normal text-muted-foreground">· {credits} cr</span></h3>
                  <Button size="sm" variant="outline" onClick={() => addCourse(term)}><Plus className="size-4" /> Add course</Button>
                </div>
                <TrackerTable collection="courses" rows={rows} columns={COURSE_COLUMNS} />
              </div>
            )
          })}
          <Button variant="outline" onClick={() => addCourse('New term')}><Plus className="size-4" /> Add a term</Button>
        </TabsContent>

        {/* ---- Tar Heel Tracker ---- */}
        <TabsContent value="tracker">
          <TarHeelTracker />
        </TabsContent>

        {/* ---- Resources & Notes ---- */}
        <TabsContent value="resources" className="space-y-6">
          <ResourceGrid pillar="academics" />
          <NotesDB pillar="academics" title="Notes (study techniques, syllabi, brain dumps)" />
        </TabsContent>
      </Tabs>
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
            <select
              value={r.grade}
              onChange={(e) => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, grade: e.target.value as LetterGrade } : x))}
              className="h-8 rounded-md border border-input bg-card px-1 text-sm"
            >
              {Object.keys(GRADE_POINTS).map((g) => <option key={g}>{g}</option>)}
            </select>
            <button
              onClick={() => setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, bcpm: !x.bcpm } : x))}
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${r.bcpm ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >{r.bcpm ? 'BCPM' : 'AO'}</button>
            <button onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} className="ml-auto text-xs text-muted-foreground hover:text-destructive">✕</button>
          </div>
        ))}
        {rows.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-2 text-center">
            <div><p className="font-display text-xl font-bold text-primary">{fmtGpa(projected.cum)}</p><p className="text-xs text-muted-foreground">proj. cumulative</p></div>
            <div><p className="font-display text-xl font-bold" style={{ color: 'var(--cat-research)' }}>{fmtGpa(projected.science)}</p><p className="text-xs text-muted-foreground">proj. science</p></div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TarHeelTracker() {
  const requirements = useStore((s) => s.requirements)
  const patchItem = useStore((s) => s.patchItem)

  const groups = useMemo(() => {
    const map = new Map<string, typeof requirements>()
    for (const r of requirements) {
      const arr = map.get(r.group) ?? []
      arr.push(r)
      map.set(r.group, arr)
    }
    return [...map.entries()]
  }, [requirements])

  return (
    <div className="space-y-3">
      {groups.map(([group, items]) => {
        const done = items.filter((i) => i.done).length
        return (
          <Collapsible
            key={group}
            defaultOpen={done < items.length}
            title={group}
            badge={<span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">{done}/{items.length}</span>}
          >
            <ul className="space-y-1">
              {items.map((it) => (
                <li key={it.id} className="flex items-start gap-2.5 py-1">
                  <Checkbox checked={it.done} onCheckedChange={(v) => patchItem('requirements', it.id, { done: Boolean(v) })} className="mt-0.5" />
                  <div>
                    <p className={`text-sm font-medium ${it.done ? 'text-muted-foreground line-through' : ''}`}>{it.label}</p>
                    {it.note && <p className="text-xs text-muted-foreground">{it.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </Collapsible>
        )
      })}
    </div>
  )
}
