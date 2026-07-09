import { useState } from 'react'
import { ExternalLink, Plus } from 'lucide-react'
import type { Org, OrgReflection } from '@/lib/types'
import { uid } from '@/lib/id'
import { cn } from '@/lib/utils'
import { SidePeek } from '@/components/common/SidePeek'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  ORG_COLOR_CLASSES, ORG_COLORS, ORG_STATUSES, ORG_TYPES,
  joinedLabel, orgInitials, statusLabel,
} from './ecsUtils'
import { ReflectionList } from './ReflectionList'

export function OrgPeek({
  org, open, colorIndex, focusReflectionId, onOpenChange, onPatch,
}: {
  org: Org | null
  open: boolean
  colorIndex: number
  focusReflectionId?: string | null
  onOpenChange: (open: boolean) => void
  onPatch: (patch: Partial<Org>) => void
}) {
  if (!org) return null

  return (
    <OrgPeekContent
      key={`${org.id}:${focusReflectionId ?? 'overview'}`}
      org={org}
      open={open}
      colorIndex={colorIndex}
      focusReflectionId={focusReflectionId}
      onOpenChange={onOpenChange}
      onPatch={onPatch}
    />
  )
}

function OrgPeekContent({
  org, open, colorIndex, focusReflectionId, onOpenChange, onPatch,
}: {
  org: Org
  open: boolean
  colorIndex: number
  focusReflectionId?: string | null
  onOpenChange: (open: boolean) => void
  onPatch: (patch: Partial<Org>) => void
}) {
  const [tab, setTab] = useState(focusReflectionId ? 'reflections' : 'overview')
  const [editingReflectionId, setEditingReflectionId] = useState<string | null>(focusReflectionId ?? null)
  const [editingOpportunities, setEditingOpportunities] = useState(false)

  const reflections = org.reflections ?? []
  const opportunitiesCount = org.opportunities.trim() ? 1 : 0

  function addReflection() {
    const reflection: OrgReflection = {
      id: uid(),
      date: new Date().toISOString().slice(0, 10),
      title: 'New reflection',
      body: '',
    }
    onPatch({ reflections: [reflection, ...reflections] })
    setTab('reflections')
    setEditingReflectionId(reflection.id)
  }

  function patchReflection(id: string, patch: Partial<OrgReflection>) {
    onPatch({ reflections: reflections.map((reflection) => reflection.id === id ? { ...reflection, ...patch } : reflection) })
  }

  const title = (
    <div className="flex min-w-0 items-center gap-3">
      <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold', ORG_COLOR_CLASSES[ORG_COLORS[colorIndex % ORG_COLORS.length]])}>
        {orgInitials(org.name)}
      </span>
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate">{org.name || 'Untitled org'}</span>
          {org.link && (
            <a href={org.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80" aria-label="Open organization link">
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
        <p className="truncate text-sm font-semibold text-muted-foreground">{org.type || 'Organization'} · {org.role || 'Role TBD'}</p>
      </div>
    </div>
  )

  const footer = (org.meetingInfo || org.nextGoal) ? (
    <div className="grid gap-2 sm:grid-cols-2">
      {org.meetingInfo && <FooterCell label="Meetings" value={org.meetingInfo} />}
      {org.nextGoal && <FooterCell label="Next goal" value={org.nextGoal} />}
    </div>
  ) : undefined

  return (
    <SidePeek open={open} onOpenChange={onOpenChange} width="lg" title={title} footer={footer}>
      <div className="space-y-4">
        <div className="inline-flex rounded-full bg-muted p-1">
          {ORG_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onPatch({ status })}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm font-extrabold transition',
                org.status === status ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {statusLabel(status)}
            </button>
          ))}
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent bg-transparent shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">Overview</TabsTrigger>
            <TabsTrigger value="reflections" className="rounded-none border-b-2 border-transparent bg-transparent shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">Reflections · {reflections.length}</TabsTrigger>
            <TabsTrigger value="opportunities" className="rounded-none border-b-2 border-transparent bg-transparent shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">Opportunities · {opportunitiesCount}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name"><Input value={org.name} onChange={(event) => onPatch({ name: event.target.value })} placeholder="e.g. Carolina EMS" /></Field>
              <Field label="Type">
                <Select value={org.type} onValueChange={(value) => onPatch({ type: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ORG_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Role"><Input value={org.role} onChange={(event) => onPatch({ role: event.target.value })} placeholder="Member, officer, captain..." /></Field>
              <Field label="Joined"><Input type="month" value={org.joinedAt ?? ''} onChange={(event) => onPatch({ joinedAt: event.target.value })} /></Field>
              <Field label="Meetings"><Input value={org.meetingInfo} onChange={(event) => onPatch({ meetingInfo: event.target.value })} placeholder="Tue 7 pm · SRC" /></Field>
              <Field label="Link"><Input value={org.link} onChange={(event) => onPatch({ link: event.target.value })} placeholder="https://..." /></Field>
              <Field label="Next goal"><Input value={org.nextGoal ?? ''} onChange={(event) => onPatch({ nextGoal: event.target.value })} placeholder="Crew Chief cert, Fall 2027" /></Field>
              <div className="rounded-xl bg-muted/35 p-3 text-sm font-semibold text-muted-foreground">
                {joinedLabel(org.joinedAt) ? `Since ${joinedLabel(org.joinedAt)}` : 'Add a joined month to power the status chip.'}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reflections">
            <ReflectionList
              reflections={reflections}
              activeId={editingReflectionId}
              onOpen={setEditingReflectionId}
              onBack={() => setEditingReflectionId(null)}
              onNew={addReflection}
              onPatch={patchReflection}
            />
          </TabsContent>

          <TabsContent value="opportunities">
            {org.opportunities || editingOpportunities ? (
              <Textarea
                value={org.opportunities}
                onChange={(event) => onPatch({ opportunities: event.target.value })}
                placeholder="Leadership roles, events, projects, contacts, and chances to pursue..."
                className="min-h-56"
              />
            ) : (
              <button
                type="button"
                onClick={() => setEditingOpportunities(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 p-4 text-sm font-extrabold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                <Plus className="size-4" /> Add opportunities
              </button>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SidePeek>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>
}

function FooterCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/40 p-3">
      <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  )
}
