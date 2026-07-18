import { Plus, Mail } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { LetterEntry } from '@/lib/types'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { TrackerTable, type ColumnDef } from '@/components/common/TrackerTable'
import { EmptyState } from '@/components/common/EmptyState'
import { StatTile } from '@/components/common/StatTile'
import { Button } from '@/components/ui/button'

const COLUMNS: ColumnDef[] = [
  { key: 'recommender', header: 'Recommender', type: 'text', width: '180px', placeholder: 'Name', wrap: true },
  { key: 'role', header: 'Role', type: 'text', width: '180px', placeholder: 'Professor, PI, advisor…', wrap: true },
  {
    key: 'type',
    header: 'Type',
    type: 'select',
    width: '190px',
    options: ['Science faculty', 'Non-science faculty', 'Research PI', 'Physician', 'Committee', 'Other'],
    optionDots: {
      'Science faculty': 'bg-primary',
      'Non-science faculty': 'bg-violet-400',
      'Research PI': 'bg-success',
      Physician: 'bg-cyan-400',
      Committee: 'bg-warning',
      Other: 'bg-muted-foreground',
    },
  },
  {
    key: 'status',
    header: 'Status',
    type: 'select',
    width: '135px',
    options: ['identified', 'asked', 'agreed', 'submitted', 'declined'],
    optionDots: {
      identified: 'bg-muted-foreground',
      asked: 'bg-warning',
      agreed: 'bg-success',
      submitted: 'bg-primary',
      declined: 'bg-destructive',
    },
  },
  { key: 'dateAsked', header: 'Asked', type: 'date', width: '132px' },
  { key: 'notes', header: 'Notes', type: 'longtext', width: '300px', placeholder: 'Context or follow-up…', wrap: true },
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
      <div className="mb-6 space-y-3">
        <h3 className="text-sm font-bold">Recommender tracker</h3>
        <TrackerTable
          collection="letters" rows={letters} columns={COLUMNS}
          empty={<EmptyState icon={Mail} title="No recommenders yet" hint="Most schools want science faculty + others; some want a committee letter. Build relationships early — a letter writer needs to actually know you." action={<Button size="sm" onClick={add}><Plus className="size-4" /> Add your first</Button>} />}
        />
      </div>
    </div>
  )
}
