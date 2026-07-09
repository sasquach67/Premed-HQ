import { useMemo } from 'react'
import { Plus, Clock, ListChecks, FolderOpen } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { ExperienceCategory, ExperienceEntry, Goals } from '@/lib/types'
import { hourTotals, percent } from '@/lib/selectors'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { Ring } from '@/components/common/Ring'
import { StatTile } from '@/components/common/StatTile'
import { TrackerTable, type ColumnDef } from '@/components/common/TrackerTable'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { DocEmbed } from '@/components/common/DocEmbed'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLUMNS: ColumnDef[] = [
  { key: 'org', header: 'Site / Org', type: 'text', width: '160px', placeholder: 'Where?' },
  { key: 'role', header: 'Role', type: 'text', width: '140px', placeholder: 'Your role' },
  { key: 'hours', header: 'Hrs', type: 'number', width: '64px', align: 'right' },
  { key: 'startDate', header: 'Since', type: 'date', width: '140px' },
  { key: 'status', header: 'Status', type: 'select', width: '120px', options: ['active', 'completed', 'planned'] },
  { key: 'supervisor', header: 'Supervisor', type: 'text', width: '140px', placeholder: 'Contact (verification)' },
  { key: 'description', header: 'Description', type: 'longtext', placeholder: 'What you did…', maxLength: 700 },
  { key: 'mostMeaningful', header: 'Most meaningful', type: 'longtext', placeholder: 'Why it mattered (feeds your essays)…', maxLength: 1325 },
  { key: 'fileUrl', header: 'File', type: 'link', width: '120px' },
]

const ROUTE_BY_CATEGORY: Record<ExperienceCategory, string> = {
  clinical: 'clinical', volunteering: 'volunteering', shadowing: 'shadowing', research: 'research', leadership: 'ecs',
}

const GOAL_KEY: Record<ExperienceCategory, keyof Goals> = {
  clinical: 'clinical', volunteering: 'volunteering', shadowing: 'shadowing', research: 'research', leadership: 'activities',
}

export function ExperiencePillar({ category }: { category: ExperienceCategory }) {
  const experiences = useStore((s) => s.experiences)
  const goals = useStore((s) => s.goals)
  const addItem = useStore((s) => s.addItem)
  const logActivity = useStore((s) => s.logActivity)
  const driveUrl = useStore((s) => s.notes['research-drive'] ?? '')
  const setNote = useStore((s) => s.setNote)

  const routeId = ROUTE_BY_CATEGORY[category]
  const route = ROUTE_MAP[routeId]
  const rows = useMemo(() => experiences.filter((e) => e.category === category), [experiences, category])
  const totals = hourTotals(experiences)
  const goal = goals[GOAL_KEY[category]]
  const totalHours = Math.round(totals[category])
  const pct = category === 'leadership' ? percent(rows.length, goal) : percent(totalHours, goal)

  function addEntry() {
    addItem('experiences', {
      id: uid(), category, org: '', role: '', hours: 0, status: 'active',
      description: '', mostMeaningful: '', supervisor: '', tags: [], order: 0,
    } as ExperienceEntry)
    logActivity(routeId, `Added a ${category} entry`)
  }

  return (
    <div>
      <PageHeader
        title={route.label}
        actions={<Button onClick={addEntry}><Plus className="size-4" /> Log entry</Button>}
      />

      {/* summary: ring layered over the numbers */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="sm:col-span-1">
          <CardContent className="flex items-center justify-center py-5">
            <Ring
              value={pct}
              size={108}
              color={`var(--cat-${category === 'leadership' ? 'activities' : category})`}
              label={category === 'leadership' ? 'Activities' : 'Toward goal'}
              sublabel={category === 'leadership' ? `${rows.length}/${goal}` : `${totalHours}/${goal}h`}
            />
          </CardContent>
        </Card>
        <StatTile icon={Clock} label="Total hours" value={String(totalHours)} sub={`across ${rows.length} ${rows.length === 1 ? 'entry' : 'entries'}`} accent={`var(--cat-${category === 'leadership' ? 'activities' : category})`} />
        <StatTile icon={ListChecks} label="Active now" value={String(rows.filter((r) => r.status === 'active').length)} sub="ongoing commitments" />
        <StatTile icon={FolderOpen} label="Goal" value={category === 'leadership' ? `${goal}` : `${goal}h`} sub="editable in Profile" />
      </div>

      <div className="mb-6">
        <TrackerTable
          collection="experiences"
          rows={rows}
          columns={COLUMNS}
          onDelete={(id) => useStore.getState().removeItem('experiences', id)}
          empty={<EmptyState icon={Clock} title={`No ${category} entries yet`} hint="Log each role with hours, a supervisor contact for verification, and a quick reflection while it's fresh." action={<Button onClick={addEntry} size="sm"><Plus className="size-4" /> Log your first entry</Button>} />}
        />
      </div>

      {/* Research gets an embedded Drive folder for papers/proposals/slides */}
      {category === 'research' && (
        <Card className="mb-6">
          <CardHeader><CardTitle>Research Drive</CardTitle></CardHeader>
          <CardContent>
            <DocEmbed kind="folder" title="Papers, proposals & slide decks" value={driveUrl} onChange={(url) => setNote('research-drive', url)} height={420} />
          </CardContent>
        </Card>
      )}

      <ResourceGrid pillar={routeId} />
    </div>
  )
}
