import { useMemo } from 'react'
import { Plus, School, TrendingUp } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { SchoolEntry } from '@/lib/types'
import { gpaStats, bestMcat, fmtGpa } from '@/lib/selectors'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { TrackerTable, type ColumnDef } from '@/components/common/TrackerTable'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { EmptyState } from '@/components/common/EmptyState'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const COLUMNS: ColumnDef[] = [
  { key: 'name', header: 'School', type: 'text', width: '200px', placeholder: 'School name' },
  { key: 'state', header: 'St', type: 'text', width: '56px' },
  { key: 'type', header: 'Type', type: 'select', width: '90px', options: ['MD', 'DO', 'Other'] },
  { key: 'category', header: 'Tier', type: 'select', width: '120px', options: ['reach', 'target', 'safety', 'undecided'] },
  { key: 'status', header: 'Status', type: 'select', width: '140px', options: ['researching', 'will-apply', 'applied', 'secondary', 'interview', 'accepted', 'waitlist', 'rejected'] },
  { key: 'medianGpa', header: 'Med GPA', type: 'number', width: '90px', align: 'right' },
  { key: 'medianMcat', header: 'Med MCAT', type: 'number', width: '96px', align: 'right' },
  { key: 'msarUrl', header: 'MSAR', type: 'link', width: '110px' },
  { key: 'notes', header: 'Mission / notes', type: 'longtext', placeholder: 'Why it fits…' },
]

export function Schools() {
  const route = ROUTE_MAP.schools
  const schools = useStore((s) => s.schools)
  const courses = useStore((s) => s.courses)
  const mcat = useStore((s) => s.mcat)
  const addItem = useStore((s) => s.addItem)

  const myGpa = useMemo(() => gpaStats(courses), [courses])
  const myMcat = bestMcat(mcat)

  function add() {
    addItem('schools', { id: uid(), name: '', type: 'MD', category: 'undecided', status: 'researching', order: 0 } as SchoolEntry)
  }

  return (
    <div>
      <PageHeader title={route.label} actions={<Button onClick={add}><Plus className="size-4" /> Add school</Button>} />

      <Card className="mb-6 border-primary/30 bg-secondary/50">
        <CardContent className="flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-sm">
          <span className="flex items-center gap-2 font-semibold"><TrendingUp className="size-4 text-primary" /> Your stats to compare against MSAR medians:</span>
          <span>Cumulative GPA <b className="text-primary">{fmtGpa(myGpa.cum)}</b></span>
          <span>Science GPA <b className="text-primary">{fmtGpa(myGpa.science)}</b></span>
          <span>MCAT <b className="text-primary">{myMcat ?? '—'}</b></span>
        </CardContent>
      </Card>

      <div className="mb-6">
        <TrackerTable
          collection="schools" rows={schools} columns={COLUMNS}
          empty={<EmptyState icon={School} title="Your list is empty" hint="It's early — that's fine. Use AAMC MSAR to add target schools and track each one against your stats, mission fit, and in-state status." action={<Button size="sm" onClick={add}><Plus className="size-4" /> Add a school</Button>} />}
        />
      </div>
      <ResourceGrid pillar="schools" />
    </div>
  )
}
