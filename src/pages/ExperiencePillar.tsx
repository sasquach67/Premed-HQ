import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, CalendarDays, ChevronDown, Clock, FileText,
  FolderOpen, ListChecks, Mail, Milestone, Plus, Search,
  Stethoscope, Trash2, UserRound, Users,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { ExperienceCategory, ExperienceEntry, Goals, NotePage, StoryEntry } from '@/lib/types'
import { hourTotals, percent } from '@/lib/selectors'
import { uid } from '@/lib/id'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/common/PageHeader'
import { Ring } from '@/components/common/Ring'
import { StatTile } from '@/components/common/StatTile'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { DocEmbed } from '@/components/common/DocEmbed'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type ExperiencePatch = Partial<ExperienceEntry> & Record<string, unknown>
type PillarTab = { id: string; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }

const ROUTE_BY_CATEGORY: Record<ExperienceCategory, string> = {
  clinical: 'clinical',
  volunteering: 'volunteering',
  shadowing: 'shadowing',
  research: 'research',
  leadership: 'ecs',
}

const GOAL_KEY: Record<ExperienceCategory, keyof Goals> = {
  clinical: 'clinical',
  volunteering: 'volunteering',
  shadowing: 'shadowing',
  research: 'research',
  leadership: 'activities',
}

const SKILLS = [
  'Vitals and patient intake',
  'Bedside communication',
  'Patient transport',
  'Chart-ready documentation',
  'Team handoff',
  'Sterile technique',
]

const SHADOW_SPECIALTIES = ['All', 'Primary care', 'Surgery', 'Pediatrics', 'Emergency', 'Specialty']
const SERVICE_THEMES = ['Access', 'Education', 'Food security', 'Community trust', 'Mentorship']
const RESEARCH_STAGES = ['Question', 'Protocol', 'Data', 'Analysis', 'Output']

export function ExperiencePillar({ category }: { category: ExperienceCategory }) {
  const navigate = useNavigate()
  const experiences = useStore((s) => s.experiences)
  const goals = useStore((s) => s.goals)
  const notePages = useStore((s) => s.notePages)
  const addItem = useStore((s) => s.addItem)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const logActivity = useStore((s) => s.logActivity)
  const driveUrl = useStore((s) => s.notes['research-drive'] ?? '')
  const setNote = useStore((s) => s.setNote)

  const routeId = ROUTE_BY_CATEGORY[category]
  const route = ROUTE_MAP[routeId]
  const rows = useMemo(
    () => experiences.filter((entry) => entry.category === category).sort(sortByOrderThenDate),
    [experiences, category]
  )
  const notes = useMemo(
    () => notePages.filter((note) => note.pillar === routeId || note.pillar === `pillar-${routeId}`).sort((a, b) => b.updatedAt - a.updatedAt),
    [notePages, routeId]
  )
  const tabs = useMemo(() => tabsFor(category, rows, notes), [category, rows, notes])
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'main')

  const totals = hourTotals(experiences)
  const goal = goals[GOAL_KEY[category]]
  const totalHours = Math.round(totals[category])
  const pct = category === 'leadership' ? percent(rows.length, goal) : percent(totalHours, goal)

  function addEntry(patch: ExperiencePatch = {}) {
    const entry: ExperienceEntry = {
      id: uid(),
      category,
      org: '',
      role: '',
      startDate: new Date().toISOString().slice(0, 10),
      hours: 0,
      status: 'active',
      description: '',
      mostMeaningful: '',
      supervisor: '',
      tags: [],
      order: rows.length,
      ...patch,
    }
    addItem('experiences', entry)
    logActivity(routeId, `Added a ${route.label.toLowerCase()} entry`)
    return entry
  }

  function patchEntry(id: string, patch: ExperiencePatch) {
    patchItem('experiences', id, patch as Partial<ExperienceEntry>)
  }

  function requestLetter(entry: ExperienceEntry) {
    addItem('letters', {
      id: uid(),
      recommender: entry.supervisor || entry.contact || entry.org || 'New recommender',
      role: `${route.label} contact`,
      relationship: entry.org || entry.role || route.label,
      type: routeId === 'research' ? 'Research PI' : routeId === 'shadowing' ? 'Physician' : 'Other',
      status: 'identified',
      notes: `Linked from ${route.label}: ${entry.org || entry.description || 'experience entry'}`,
      order: 0,
    })
    logActivity('letters', `Started a letter record from ${route.label}`)
    navigate('/letters')
  }

  function draftStory(entry: ExperienceEntry, theme = route.label) {
    const story: StoryEntry = {
      id: uid(),
      prompt: `Draft the story from ${theme}`,
      title: entry.org ? `${entry.org} reflection` : `${route.label} reflection`,
      commentary: entry.mostMeaningful || entry.description || '',
      tags: [routeId, theme.toLowerCase()],
      relatedExperienceId: entry.id,
      order: 0,
    }
    addItem('stories', story)
    logActivity('essays', `Created a story draft from ${route.label}`)
    navigate('/essays')
  }

  function addLabNote() {
    const note: NotePage = {
      id: uid(),
      title: 'New lab note',
      body: '',
      tag: 'lab notebook',
      pillar: routeId,
      updatedAt: Date.now(),
      order: notes.length,
    }
    addItem('notePages', note)
    logActivity(routeId, 'Added a lab notebook entry')
  }

  const shared = { rows, notes, addEntry, patchEntry, removeItem, requestLetter, draftStory, addLabNote }

  return (
    <div>
      <PageHeader
        title={route.label}
        actions={<Button onClick={() => addEntry()}><Plus className="size-4" /> Log entry</Button>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="sm:col-span-1">
          <CardContent className="flex items-center justify-center py-5">
            <Ring
              value={pct}
              size={108}
              color={`var(--cat-${category === 'leadership' ? 'activities' : category})`}
              label="Toward goal"
              sublabel={`${totalHours}/${goal}h`}
            />
          </CardContent>
        </Card>
        <StatTile icon={Clock} label="Total hours" value={String(totalHours)} sub={`across ${rows.length} ${rows.length === 1 ? 'entry' : 'entries'}`} accent={`var(--cat-${category === 'leadership' ? 'activities' : category})`} />
        <StatTile icon={ListChecks} label="Active now" value={String(rows.filter((r) => r.status === 'active').length)} sub="ongoing commitments" />
        <StatTile icon={FolderOpen} label="Goal" value={`${goal}h`} sub="editable in Profile" />
      </div>

      <PillarTabStrip tabs={tabs} value={activeTab} onChange={setActiveTab} />

      <div className="mt-5">
        {category === 'clinical' && (
          activeTab === 'hours'
            ? <HoursAndSitesView {...shared} category={category} label="Clinical" requestLabel="Request a letter" />
            : <SkillsView rows={rows} onPatch={patchEntry} onAdd={addEntry} />
        )}
        {category === 'volunteering' && (
          activeTab === 'orgs'
            ? <HoursAndSitesView {...shared} category={category} label="Volunteering" requestLabel="Request verification" themes={SERVICE_THEMES} />
            : <EventsView rows={rows} onAdd={addEntry} onPatch={patchEntry} onDraftStory={draftStory} />
        )}
        {category === 'shadowing' && (
          activeTab === 'sessions'
            ? <ShadowingSessionsView rows={rows} onAdd={addEntry} onPatch={patchEntry} onRemove={(id) => removeItem('experiences', id)} />
            : <PhysiciansView rows={rows} onPatch={patchEntry} onRequestLetter={requestLetter} />
        )}
        {category === 'research' && (
          activeTab === 'lab'
            ? <LabNotebookView notes={notes} onAdd={addLabNote} />
            : (
              <ResearchProgressView
                rows={rows}
                notes={notes}
                driveUrl={driveUrl}
                onDriveUrl={(url) => setNote('research-drive', url)}
                onAdd={addEntry}
                onPatch={patchEntry}
                onRequestLetter={requestLetter}
              />
            )
        )}
      </div>

      <ResourceGrid pillar={routeId} />
    </div>
  )
}

function tabsFor(category: ExperienceCategory, rows: ExperienceEntry[], notes: NotePage[]): PillarTab[] {
  if (category === 'clinical') {
    return [
      { id: 'hours', label: 'Hours & Sites', icon: Stethoscope, count: rows.length },
      { id: 'skills', label: 'Skills', icon: ListChecks, count: SKILLS.length },
    ]
  }
  if (category === 'volunteering') {
    return [
      { id: 'orgs', label: 'Orgs & Hours', icon: Users, count: rows.length },
      { id: 'events', label: 'Events', icon: CalendarDays, count: rows.filter((r) => r.startDate).length },
    ]
  }
  if (category === 'shadowing') {
    return [
      { id: 'sessions', label: 'Sessions', icon: Clock, count: rows.length },
      { id: 'physicians', label: 'Physicians', icon: UserRound, count: uniqueContacts(rows).length },
    ]
  }
  return [
    { id: 'lab', label: 'Lab Notebook', icon: BookOpen, count: notes.length },
    { id: 'progress', label: 'Progress', icon: Milestone, count: uniqueProjects(rows).length },
  ]
}

function PillarTabStrip({ tabs, value, onChange }: { tabs: PillarTab[]; value: string; onChange: (value: string) => void }) {
  return (
    <div className="border-b border-border">
      <div className="flex max-w-full gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = value === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative inline-flex items-center gap-2 px-3 pb-3 pt-1 text-sm font-extrabold text-muted-foreground transition hover:text-foreground',
                active && 'text-primary'
              )}
            >
              <Icon className="size-4" />
              {tab.label}
              {typeof tab.count === 'number' && <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tab.count}</span>}
              <span className={cn('absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-transparent', active && 'bg-primary')} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function HoursAndSitesView({
  rows, addEntry, patchEntry, removeItem, requestLetter, draftStory, category, label, requestLabel, themes = [],
}: {
  rows: ExperienceEntry[]
  addEntry: (patch?: ExperiencePatch) => ExperienceEntry
  patchEntry: (id: string, patch: ExperiencePatch) => void
  removeItem: (key: 'experiences', id: string) => void
  requestLetter: (entry: ExperienceEntry) => void
  draftStory: (entry: ExperienceEntry, theme?: string) => void
  category: ExperienceCategory
  label: string
  requestLabel: string
  themes?: string[]
}) {
  const sites = useMemo(() => siteSummaries(rows), [rows])
  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]">
        <WeeklyHoursCard rows={rows} />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="size-4 text-primary" /> Sites and roles
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 md:grid-cols-2">
            {sites.length ? sites.map((site) => (
              <div key={site.key} className="rounded-xl border bg-muted/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-bold">{site.org || 'Unnamed site'}</p>
                    <p className="truncate text-xs font-semibold text-muted-foreground">{site.role || 'Role TBD'} · {site.hours}h</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => requestLetter(site.entry)}>{requestLabel}</Button>
                </div>
              </div>
            )) : (
              <EmptyState icon={Users} title={`No ${label.toLowerCase()} sites yet`} hint="Add the first shift below and this area will organize your sites automatically." />
            )}
          </CardContent>
        </Card>
      </div>

      {themes.length > 0 && <ThemeRollup rows={rows} themes={themes} />}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{label} log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.map((row) => (
            <ExpandableEntryRow
              key={row.id}
              entry={row}
              onPatch={(patch) => patchEntry(row.id, patch)}
              onDelete={() => removeItem('experiences', row.id)}
              onDraftStory={() => draftStory(row, category === 'volunteering' ? 'service' : label)}
            />
          ))}
          <InlineAddRow
            label={`Add ${label.toLowerCase()} shift`}
            fields={['Site or org', 'Role', 'Hours']}
            onAdd={(values) => addEntry({ org: values[0], role: values[1], hours: Number(values[2] || 0) })}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function WeeklyHoursCard({ rows }: { rows: ExperienceEntry[] }) {
  const weeks = useMemo(() => buildWeeks(rows), [rows])
  const max = Math.max(1, ...weeks.map((week) => week.hours))
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base"><Clock className="size-4 text-primary" /> Weekly hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-44 items-end gap-2">
          {weeks.map((week) => (
            <div key={week.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end rounded-lg bg-muted/30 p-1">
                <div className="w-full rounded-md bg-primary/80" style={{ height: `${Math.max(6, (week.hours / max) * 100)}%` }} />
              </div>
              <span className="text-[0.68rem] font-bold text-muted-foreground">{week.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ExpandableEntryRow({
  entry, onPatch, onDelete, onDraftStory,
}: {
  entry: ExperienceEntry
  onPatch: (patch: ExperiencePatch) => void
  onDelete: () => void
  onDraftStory: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border bg-card/70">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-3 p-3 text-left">
        <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition', open && 'rotate-180')} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{entry.org || 'Unnamed entry'}</p>
          <p className="truncate text-xs font-semibold text-muted-foreground">{entry.role || 'Role TBD'} · {entry.hours || 0}h · {formatDate(entry.startDate)}</p>
        </div>
        <span className={cn('rounded-full px-2 py-1 text-xs font-bold', entry.status === 'active' ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground')}>
          {entry.status}
        </span>
      </button>
      {open && (
        <div className="grid gap-3 border-t border-border p-3 md:grid-cols-2">
          <Field label="Site / org"><Input value={entry.org} onChange={(event) => onPatch({ org: event.target.value })} /></Field>
          <Field label="Role"><Input value={entry.role} onChange={(event) => onPatch({ role: event.target.value })} /></Field>
          <Field label="Date"><Input type="date" value={entry.startDate ?? ''} onChange={(event) => onPatch({ startDate: event.target.value })} /></Field>
          <Field label="Hours"><Input type="number" value={entry.hours} onChange={(event) => onPatch({ hours: Number(event.target.value || 0) })} /></Field>
          <Field label="Supervisor"><Input value={entry.supervisor ?? ''} onChange={(event) => onPatch({ supervisor: event.target.value })} /></Field>
          <Field label="Theme tags"><Input value={entry.tags.join(', ')} onChange={(event) => onPatch({ tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} /></Field>
          <Field label="What happened?" className="md:col-span-2"><Textarea value={entry.description} onChange={(event) => onPatch({ description: event.target.value })} className="min-h-24" /></Field>
          <Field label="Reflection for essays" className="md:col-span-2"><Textarea value={entry.mostMeaningful ?? ''} onChange={(event) => onPatch({ mostMeaningful: event.target.value })} className="min-h-24" /></Field>
          <div className="flex flex-wrap justify-end gap-2 md:col-span-2">
            <Button variant="outline" onClick={onDraftStory}><FileText className="size-4" /> Draft the story</Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="size-4" /> Delete</Button>
          </div>
        </div>
      )}
    </div>
  )
}

function InlineAddRow({ label, fields, onAdd }: { label: string; fields: string[]; onAdd: (values: string[]) => void }) {
  const [values, setValues] = useState(fields.map(() => ''))
  return (
    <div className="grid gap-2 rounded-xl border border-dashed border-border bg-muted/10 p-3 md:grid-cols-[1fr_1fr_7rem_auto]">
      {fields.map((field, index) => (
        <Input
          key={field}
          value={values[index]}
          onChange={(event) => setValues((current) => current.map((item, i) => i === index ? event.target.value : item))}
          placeholder={field}
          type={field.toLowerCase().includes('hour') ? 'number' : 'text'}
        />
      ))}
      <Button
        onClick={() => {
          onAdd(values)
          setValues(fields.map(() => ''))
        }}
      >
        <Plus className="size-4" /> {label}
      </Button>
    </div>
  )
}

function SkillsView({ rows, onPatch, onAdd }: { rows: ExperienceEntry[]; onPatch: (id: string, patch: ExperiencePatch) => void; onAdd: (patch?: ExperiencePatch) => void }) {
  const observations = (skill: string) => rows.filter((row) => textFor(row).toLowerCase().includes(skill.split(' ')[0].toLowerCase())).length
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base"><ListChecks className="size-4 text-primary" /> Skills closest to competent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {SKILLS.map((skill) => {
          const count = observations(skill)
          const readiness = Math.min(100, count * 28 + rows.length * 6)
          return (
            <div key={skill} className="grid gap-3 rounded-xl border bg-card/70 p-3 md:grid-cols-[1fr_11rem_8rem_auto] md:items-center">
              <div>
                <p className="font-bold">{skill}</p>
                <p className="text-xs font-semibold text-muted-foreground">{count} observed {count === 1 ? 'time' : 'times'}</p>
              </div>
              <div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${readiness}%` }} /></div>
              <span className="text-sm font-bold text-muted-foreground">{readiness >= 70 ? 'competent' : readiness >= 35 ? 'building' : 'needs reps'}</span>
              <Button size="sm" variant="outline" onClick={() => onAdd({ description: `Observed skill: ${skill}`, tags: [skill] })}>Log rep</Button>
            </div>
          )
        })}
        {rows.length > 0 && <Button variant="ghost" size="sm" onClick={() => onPatch(rows[0].id, { tags: [...new Set([...rows[0].tags, 'skills reviewed'])] })}>Mark reviewed</Button>}
      </CardContent>
    </Card>
  )
}

function ShadowingSessionsView({
  rows, onAdd, onPatch, onRemove,
}: {
  rows: ExperienceEntry[]
  onAdd: (patch?: ExperiencePatch) => void
  onPatch: (id: string, patch: ExperiencePatch) => void
  onRemove: (id: string) => void
}) {
  const [filter, setFilter] = useState('All')
  const filtered = rows.filter((row) => filter === 'All' || (row.tags ?? []).includes(filter) || row.role.includes(filter))
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1 rounded-full bg-muted p-1">
          {SHADOW_SPECIALTIES.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={cn('rounded-full px-3 py-1.5 text-xs font-extrabold', filter === item ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}>
              {item}
            </button>
          ))}
        </div>
        <Button onClick={() => onAdd({ role: 'Shadowing session', tags: filter === 'All' ? [] : [filter] })}><Plus className="size-4" /> Add session</Button>
      </div>
      <div className="space-y-2">
        {filtered.length ? filtered.map((row) => (
          <ShadowingRow key={row.id} entry={row} onPatch={(patch) => onPatch(row.id, patch)} onDelete={() => onRemove(row.id)} />
        )) : <EmptyState icon={Search} title="No sessions match this filter" hint="Change the specialty family or add a new session." />}
      </div>
    </div>
  )
}

function ShadowingRow({ entry, onPatch, onDelete }: { entry: ExperienceEntry; onPatch: (patch: ExperiencePatch) => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false)
  const fit = Number((entry as unknown as Record<string, unknown>).careerFit ?? 3)
  return (
    <div className="rounded-xl border bg-card">
      <button type="button" onClick={() => setOpen((value) => !value)} className="grid w-full gap-3 p-3 text-left md:grid-cols-[1fr_8rem_8rem] md:items-center">
        <div>
          <p className="font-bold">{entry.org || 'Physician / clinic'}</p>
          <p className="text-xs font-semibold text-muted-foreground">{entry.role || 'Shadowing'} · {formatDate(entry.startDate)} · {entry.hours || 0}h</p>
        </div>
        <span className="rounded-full bg-muted px-2 py-1 text-center text-xs font-bold">fit {fit}/5</span>
        <span className="text-sm font-bold text-primary">Reflect</span>
      </button>
      {open && (
        <div className="grid gap-3 border-t border-border p-3 md:grid-cols-2">
          <Field label="Specialty / physician"><Input value={entry.org} onChange={(event) => onPatch({ org: event.target.value })} /></Field>
          <Field label="Career fit"><Input type="range" min={1} max={5} value={fit} onChange={(event) => onPatch({ careerFit: Number(event.target.value) })} /></Field>
          <Field label="Reflection" className="md:col-span-2"><Textarea value={entry.mostMeaningful ?? ''} onChange={(event) => onPatch({ mostMeaningful: event.target.value })} className="min-h-28" /></Field>
          <div className="flex justify-end md:col-span-2"><Button variant="ghost" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="size-4" /> Delete</Button></div>
        </div>
      )}
    </div>
  )
}

function PhysiciansView({ rows, onPatch, onRequestLetter }: { rows: ExperienceEntry[]; onPatch: (id: string, patch: ExperiencePatch) => void; onRequestLetter: (entry: ExperienceEntry) => void }) {
  const contacts = uniqueContacts(rows)
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {contacts.length ? contacts.map((entry) => (
        <ContactCard
          key={entry.id}
          name={entry.supervisor || entry.contact || entry.org || 'Physician'}
          role={entry.role || 'Physician'}
          detail={entry.org}
          followUp={entry.status === 'active' ? 'Follow up ready' : 'Logged'}
          onLetter={() => onRequestLetter(entry)}
          onTouch={() => onPatch(entry.id, { contact: `Last touched ${new Date().toLocaleDateString()}` })}
        />
      )) : <EmptyState icon={UserRound} title="No physicians yet" hint="Add a shadowing session and the physician directory will build itself." />}
    </div>
  )
}

function LabNotebookView({ notes, onAdd }: { notes: NotePage[]; onAdd: () => void }) {
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const [query, setQuery] = useState('')
  const visible = notes.filter((note) => `${note.title} ${note.body} ${note.tag ?? ''}`.toLowerCase().includes(query.toLowerCase()))
  return (
    <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notebook..." className="pl-9" />
          </div>
          <Button className="w-full" onClick={onAdd}><Plus className="size-4" /> New lab note</Button>
          <div className="space-y-2">
            {visible.map((note) => (
              <div key={note.id} className="rounded-xl border bg-muted/15 p-3">
                <Input value={note.title} onChange={(event) => patchItem('notePages', note.id, { title: event.target.value, updatedAt: Date.now() })} className="h-8 border-0 bg-transparent px-0 font-bold" />
                <p className="text-xs font-semibold text-muted-foreground">{note.tag || 'lab'} · {new Date(note.updatedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 p-4">
          {visible[0] ? (
            <>
              <Input value={visible[0].title} onChange={(event) => patchItem('notePages', visible[0].id, { title: event.target.value, updatedAt: Date.now() })} className="border-0 bg-transparent px-0 font-display text-2xl font-extrabold" />
              <Textarea value={visible[0].body} onChange={(event) => patchItem('notePages', visible[0].id, { body: event.target.value, updatedAt: Date.now() })} className="min-h-[24rem]" />
              <div className="flex justify-end"><Button variant="ghost" className="text-destructive hover:text-destructive" onClick={() => removeItem('notePages', visible[0].id)}>Delete note</Button></div>
            </>
          ) : <EmptyState icon={BookOpen} title="No lab notes yet" hint="Create dated notes for experiments, papers, meetings, and next steps." action={<Button onClick={onAdd}><Plus className="size-4" /> New lab note</Button>} />}
        </CardContent>
      </Card>
    </div>
  )
}

function ResearchProgressView({
  rows, driveUrl, onDriveUrl, onAdd, onPatch, onRequestLetter,
}: {
  rows: ExperienceEntry[]
  notes: NotePage[]
  driveUrl: string
  onDriveUrl: (url: string) => void
  onAdd: (patch?: ExperiencePatch) => void
  onPatch: (id: string, patch: ExperiencePatch) => void
  onRequestLetter: (entry: ExperienceEntry) => void
}) {
  const projects = uniqueProjects(rows)
  const [project, setProject] = useState(projects[0] ?? 'General')
  const projectRows = rows.filter((row) => (row.org || 'General') === project)
  const contact = projectRows[0]
  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="flex flex-wrap gap-1 rounded-full bg-muted p-1">
            {(projects.length ? projects : ['General']).map((item) => (
              <button key={item} type="button" onClick={() => setProject(item)} className={cn('rounded-full px-3 py-1.5 text-xs font-extrabold', project === item ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground')}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {contact && <Button variant="outline" onClick={() => onRequestLetter(contact)}><Mail className="size-4" /> PI letter</Button>}
            <Button onClick={() => onAdd({ org: project, role: 'Research milestone' })}><Plus className="size-4" /> Add milestone</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3 lg:grid-cols-5">
        {RESEARCH_STAGES.map((stage) => (
          <div key={stage} className="rounded-xl border bg-card p-3">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{stage}</p>
            <div className="space-y-2">
              {projectRows.filter((row) => (row.tags ?? []).includes(stage.toLowerCase()) || row.role.toLowerCase().includes(stage.toLowerCase())).map((row) => (
                <button key={row.id} type="button" onClick={() => onPatch(row.id, { tags: [...new Set([...row.tags, stage.toLowerCase()])] })} className="w-full rounded-lg bg-muted/25 p-2 text-left text-sm font-semibold">
                  {row.description || row.role || 'Milestone'}
                </button>
              ))}
              <button type="button" onClick={() => onAdd({ org: project, role: stage, tags: [stage.toLowerCase()] })} className="w-full rounded-lg border border-dashed border-border p-2 text-xs font-bold text-muted-foreground hover:text-primary">
                Add {stage.toLowerCase()}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Research Drive</CardTitle></CardHeader>
        <CardContent>
          <DocEmbed kind="folder" title="Papers, proposals and slide decks" value={driveUrl} onChange={onDriveUrl} height={360} />
        </CardContent>
      </Card>
    </div>
  )
}

function EventsView({ rows, onAdd, onPatch, onDraftStory }: { rows: ExperienceEntry[]; onAdd: (patch?: ExperiencePatch) => void; onPatch: (id: string, patch: ExperiencePatch) => void; onDraftStory: (entry: ExperienceEntry, theme?: string) => void }) {
  const dated = rows.filter((row) => row.startDate).sort((a, b) => String(a.startDate).localeCompare(String(b.startDate)))
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-3 pb-3">
        <CardTitle className="text-base">One-off service events</CardTitle>
        <Button onClick={() => onAdd({ role: 'Service event', tags: ['event'] })}><Plus className="size-4" /> Add event</Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {dated.length ? dated.map((entry) => (
          <div key={entry.id} className="grid gap-3 rounded-xl border bg-card/70 p-3 md:grid-cols-[9rem_1fr_auto] md:items-center">
            <Input type="date" value={entry.startDate ?? ''} onChange={(event) => onPatch(entry.id, { startDate: event.target.value })} />
            <div>
              <Input value={entry.org} onChange={(event) => onPatch(entry.id, { org: event.target.value })} placeholder="Organization or event" className="h-8 border-0 bg-transparent px-0 font-bold" />
              <p className="text-xs font-semibold text-muted-foreground">{entry.hours || 0}h · {(entry.tags ?? []).join(', ') || 'service'}</p>
            </div>
            <Button variant="outline" onClick={() => onDraftStory(entry, 'service')}>Draft the story</Button>
          </div>
        )) : <EmptyState icon={CalendarDays} title="No events yet" hint="Add date-anchored service days here. Ongoing roles stay under Orgs & Hours." />}
      </CardContent>
    </Card>
  )
}

function ThemeRollup({ rows, themes }: { rows: ExperienceEntry[]; themes: string[] }) {
  return (
    <div className="grid gap-2 md:grid-cols-5">
      {themes.map((theme) => {
        const count = rows.filter((row) => textFor(row).toLowerCase().includes(theme.toLowerCase()) || row.tags.includes(theme)).length
        return (
          <div key={theme} className="rounded-xl border bg-card/70 p-3">
            <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{theme}</p>
            <p className="mt-1 text-lg font-extrabold">{count}</p>
          </div>
        )
      })}
    </div>
  )
}

function ContactCard({ name, role, detail, followUp, onLetter, onTouch }: { name: string; role: string; detail?: string; followUp: string; onLetter: () => void; onTouch: () => void }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><UserRound className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{name}</p>
          <p className="truncate text-xs font-semibold text-muted-foreground">{role}{detail ? ` · ${detail}` : ''}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">{followUp}</span>
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={onTouch}>Follow up</Button>
          <Button size="sm" onClick={onLetter}><Mail className="size-4" /> Letter</Button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={cn('space-y-1.5 text-sm font-bold', className)}><span>{label}</span>{children}</label>
}

function buildWeeks(rows: ExperienceEntry[]) {
  const result = Array.from({ length: 7 }, (_, index) => ({ label: `W${index + 1}`, hours: 0 }))
  rows.forEach((row, index) => {
    const bucket = Math.min(result.length - 1, index % result.length)
    result[bucket].hours += Number(row.hours || 0)
  })
  return result
}

function siteSummaries(rows: ExperienceEntry[]) {
  const map = new Map<string, { key: string; org: string; role: string; hours: number; entry: ExperienceEntry }>()
  rows.forEach((entry) => {
    const key = entry.org || entry.id
    const current = map.get(key)
    if (current) current.hours += Number(entry.hours || 0)
    else map.set(key, { key, org: entry.org, role: entry.role, hours: Number(entry.hours || 0), entry })
  })
  return [...map.values()]
}

function uniqueContacts(rows: ExperienceEntry[]) {
  const seen = new Set<string>()
  return rows.filter((entry) => {
    const key = entry.supervisor || entry.contact || entry.org
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function uniqueProjects(rows: ExperienceEntry[]) {
  return [...new Set(rows.map((row) => row.org || 'General'))].filter(Boolean)
}

function sortByOrderThenDate(a: ExperienceEntry, b: ExperienceEntry) {
  return (a.order ?? 0) - (b.order ?? 0) || String(b.startDate ?? '').localeCompare(String(a.startDate ?? ''))
}

function formatDate(value?: string) {
  if (!value) return 'No date'
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function textFor(entry: ExperienceEntry) {
  return `${entry.org} ${entry.role} ${entry.description} ${entry.mostMeaningful ?? ''} ${entry.tags.join(' ')}`
}
