import { Plus, Mail } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { LetterEntry } from '@/lib/types'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { TrackerTable, type ColumnDef } from '@/components/common/TrackerTable'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { EmptyState } from '@/components/common/EmptyState'
import { StatTile } from '@/components/common/StatTile'
import { Button } from '@/components/ui/button'

const COLUMNS: ColumnDef[] = [
  { key: 'recommender', header: 'Recommender', type: 'text', width: '160px', placeholder: 'Name' },
  { key: 'role', header: 'Their role', type: 'text', width: '160px', placeholder: 'Gen Chem professor…' },
  { key: 'type', header: 'Type', type: 'select', width: '150px', options: ['Science faculty', 'Non-science faculty', 'Research PI', 'Physician', 'Committee', 'Other'] },
  { key: 'status', header: 'Status', type: 'select', width: '130px', options: ['identified', 'asked', 'agreed', 'submitted', 'declined'] },
  { key: 'dateAsked', header: 'Asked', type: 'date', width: '140px' },
  { key: 'notes', header: 'Notes', type: 'longtext', placeholder: 'Context, deadline, thank-you sent…' },
]

export function Letters() {
  const route = ROUTE_MAP.letters
  const letters = useStore((s) => s.letters)
  const addItem = useStore((s) => s.addItem)

  const submitted = letters.filter((l) => l.status === 'submitted').length
  const agreed = letters.filter((l) => l.status === 'agreed' || l.status === 'submitted').length

  function add() {
    addItem('letters', { id: uid(), recommender: '', role: '', relationship: '', type: 'Science faculty', status: 'identified', order: 0 } as LetterEntry)
  }

  return (
    <div>
      <PageHeader title={route.label} actions={<Button onClick={add}><Plus className="size-4" /> Add recommender</Button>} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatTile icon={Mail} label="Recommenders" value={String(letters.length)} sub="identified so far" />
        <StatTile icon={Mail} label="Agreed" value={String(agreed)} sub="committed to write" accent="var(--cat-volunteer)" />
        <StatTile icon={Mail} label="Submitted" value={String(submitted)} sub="letters in hand" accent="var(--success)" />
      </div>
      <div className="mb-6">
        <TrackerTable
          collection="letters" rows={letters} columns={COLUMNS}
          empty={<EmptyState icon={Mail} title="No recommenders yet" hint="Most schools want science faculty + others; some want a committee letter. Build relationships early — a letter writer needs to actually know you." action={<Button size="sm" onClick={add}><Plus className="size-4" /> Add your first</Button>} />}
        />
      </div>
      <ResourceGrid pillar="letters" />
    </div>
  )
}
