import { useState } from 'react'
import { Plus, Trophy, Users, ExternalLink, Trash2 } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { Org } from '@/lib/types'
import { uid } from '@/lib/id'
import { PageHeader } from '@/components/common/PageHeader'
import { SidePeek } from '@/components/common/SidePeek'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const ORG_TYPES = ['Club', 'Sport', 'Greek life', 'Volunteer org', 'Professional', 'Cultural', 'Research group', 'Other']
const STATUSES: Org['status'][] = ['interested', 'member', 'leader', 'inactive']
const STATUS_TONE: Record<Org['status'], string> = {
  interested: 'muted', member: 'secondary', leader: 'default', inactive: 'muted',
}

/** Extracurriculars = a database of organizations (one card per club/org),
 *  each opening a profile in the side-peek. NOT an hours tracker (G1). */
export function Extracurriculars() {
  const route = ROUTE_MAP.ecs
  const orgs = useStore((s) => s.orgs)
  const addItem = useStore((s) => s.addItem)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const [openId, setOpenId] = useState<string | null>(null)
  const active = orgs.find((o) => o.id === openId) ?? null

  function add() {
    const org: Org = { id: uid(), name: '', type: 'Club', role: 'Member', status: 'interested', reflection: '', opportunities: '', meetingInfo: '', link: '', order: 0 }
    addItem('orgs', org)
    setOpenId(org.id)
  }
  const patch = (p: Partial<Org>) => active && patchItem('orgs', active.id, p)

  return (
    <div>
      <PageHeader title={route.label} actions={<Button onClick={add}><Plus className="size-4" /> Add organization</Button>} />

      {orgs.length === 0 ? (
        <EmptyState icon={Users} title="No organizations yet" hint="Add each club, sport, or org you join. Each one opens a profile for your role, reflections (they feed your essays), opportunities, and meeting info. Placeholders are fine — you don't need to know your clubs yet." action={<Button size="sm" onClick={add}><Plus className="size-4" /> Add your first</Button>} />
      ) : (
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {orgs.map((o) => (
            <button
              key={o.id}
              onClick={() => setOpenId(o.id)}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-4 text-left card-soft transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid size-9 place-items-center rounded-lg bg-secondary text-secondary-foreground"><Trophy className="size-4" /></span>
                <Badge variant={STATUS_TONE[o.status] as 'default'}>{o.status}</Badge>
              </div>
              <span className="mt-2 truncate font-bold">{o.name || 'Untitled org'}</span>
              <span className="truncate text-xs text-muted-foreground">{o.type}{o.role ? ` · ${o.role}` : ''}</span>
              <span
                onClick={(e) => { e.stopPropagation(); removeItem('orgs', o.id) }}
                className="absolute right-1.5 top-1.5 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </span>
            </button>
          ))}
        </div>
      )}

      <ResourceGrid pillar="ecs" />

      <SidePeek open={!!active} onOpenChange={(v) => !v && setOpenId(null)} width="lg" title={active?.name || 'Organization'}>
        {active && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name"><Input value={active.name} onChange={(e) => patch({ name: e.target.value })} placeholder="e.g. UNC Red Cross" /></Field>
              <Field label="Role"><Input value={active.role} onChange={(e) => patch({ role: e.target.value })} placeholder="Member, Officer, Captain…" /></Field>
              <Field label="Type">
                <Select value={active.type} onValueChange={(v) => patch({ type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ORG_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Status">
                <Select value={active.status} onValueChange={(v) => patch({ status: v as Org['status'] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Experiences & reflections (feed your essays)">
              <Textarea value={active.reflection} onChange={(e) => patch({ reflection: e.target.value })} placeholder="What you did, what it meant, moments worth remembering…" className="min-h-28" />
            </Field>
            <Field label="Opportunities to pursue">
              <Textarea value={active.opportunities} onChange={(e) => patch({ opportunities: e.target.value })} placeholder="Leadership positions, events, projects to chase…" className="min-h-20" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Meetings / events"><Input value={active.meetingInfo} onChange={(e) => patch({ meetingInfo: e.target.value })} placeholder="Tue 7pm, Union 3rd floor…" /></Field>
              <Field label="Link">
                <div className="flex gap-1">
                  <Input value={active.link} onChange={(e) => patch({ link: e.target.value })} placeholder="https://…" />
                  {active.link && <a href={active.link} target="_blank" rel="noopener noreferrer" className={cn('grid w-9 shrink-0 place-items-center rounded-md border border-input text-primary')}><ExternalLink className="size-4" /></a>}
                </div>
              </Field>
            </div>
          </div>
        )}
      </SidePeek>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
}
