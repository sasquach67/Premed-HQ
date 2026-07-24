import { useState } from 'react'
import { Archive, ExternalLink, FileText, Link2, Plus, Users } from 'lucide-react'
import type { Org, OrgReflection } from '@/lib/types'
import { uid } from '@/lib/id'
import { ObjectInspector } from '@/components/common/ObjectInspector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { MonthField } from '@/components/common/DateField'
import type { SaveStatus } from '@/components/common/AutosaveStatus'
import { ORG_STATUSES, ORG_TYPES, statusLabel } from './ecsUtils'

export function OrgPeek({
  org,
  relatedOrgs,
  onPatch,
  onOpenRelation,
}: {
  org: Org
  relatedOrgs: Org[]
  onPatch: (patch: Partial<Org>) => void
  onOpenRelation: (id: string) => void
}) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved')
  const reflections = org.reflections ?? []
  const warnings = [
    !org.joinedAt && 'Joined date is missing.',
    !org.role.trim() && 'Role is missing.',
    !org.meetingInfo.trim() && 'Meeting cadence is missing.',
    !org.verifierEmail?.trim() && 'Verifier email is missing.',
  ].filter(Boolean) as string[]

  function patch(next: Partial<Org>) {
    setSaveStatus('saving')
    onPatch(next)
    window.setTimeout(() => setSaveStatus('saved'), 350)
  }

  function addReflection() {
    const reflection: OrgReflection = {
      id: uid(),
      date: new Date().toISOString().slice(0, 10),
      title: 'New reflection',
      body: '',
    }
    patch({ reflections: [reflection, ...reflections] })
  }

  return (
    <ObjectInspector
      title={org.name || 'Untitled organization'}
      subtitle={`${org.type || 'Organization'} · ${org.role || 'Role not set'} · ${statusLabel(org.status)}`}
      saveStatus={saveStatus}
      config={{
        overview: {
          emptyLabel: 'No details yet.',
          content: (
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name">
                <Input value={org.name} onChange={(event) => patch({ name: event.target.value })} />
              </Field>
              <Field label="Type">
                <Select value={org.type} onValueChange={(type) => patch({ type })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ORG_TYPES.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Role">
                <Input value={org.role} onChange={(event) => patch({ role: event.target.value })} />
              </Field>
              <Field label="Status">
                <Select value={org.status} onValueChange={(status: Org['status']) => patch({ status })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ORG_STATUSES.map((status) => <SelectItem key={status} value={status}>{statusLabel(status)}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Joined">
                <MonthField value={org.joinedAt ?? ''} onChange={(joinedAt) => patch({ joinedAt })} ariaLabel="Joined month" />
              </Field>
              <Field label="Meetings">
                <Input value={org.meetingInfo} onChange={(event) => patch({ meetingInfo: event.target.value })} />
              </Field>
            </div>
          ),
        },
        relations: {
          emptyLabel: 'No related organizations yet.',
          addAction: <Button size="sm" variant="ghost"><Link2 className="size-4" /> Link</Button>,
          content: relatedOrgs.length ? (
            <ul className="space-y-2">
              {relatedOrgs.map((related) => (
                <li key={related.id}>
                  <button
                    type="button"
                    onClick={() => onOpenRelation(related.id)}
                    className="flex w-full items-center gap-3 rounded-xl bg-muted/35 p-3 text-left hover:bg-muted/60"
                  >
                    <Users className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold">{related.name || 'Untitled organization'}</span>
                      <span className="block text-xs text-muted-foreground">
                        Backlink · same {related.type || 'organization'} group
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : undefined,
        },
        files: {
          emptyLabel: 'No files or links yet.',
          addAction: <Button size="sm" variant="ghost"><Plus className="size-4" /> Add link</Button>,
          content: org.link ? (
            <a
              href={org.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-muted/35 p-3 text-sm font-bold text-primary hover:bg-muted/60"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Organization website
            </a>
          ) : undefined,
        },
        activity: {
          emptyLabel: 'Nothing logged yet.',
          addAction: <Button size="sm" variant="ghost" onClick={addReflection}><Plus className="size-4" /> Add reflection</Button>,
          content: reflections.length ? (
            <ol className="space-y-3">
              {reflections.slice(0, 4).map((reflection) => (
                <li key={reflection.id} className="border-l-2 border-primary/35 pl-3">
                  <p className="text-sm font-bold">{reflection.title || 'Untitled reflection'}</p>
                  <p className="text-xs text-muted-foreground">{reflection.date}</p>
                </li>
              ))}
            </ol>
          ) : undefined,
        },
        actions: {
          emptyLabel: 'No actions available.',
          content: (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={addReflection}><Plus className="size-4" /> New reflection</Button>
              <Button size="sm" variant="outline" onClick={() => patch({ status: 'inactive' })}>
                <Archive className="size-4" /> Archive
              </Button>
              {org.link && (
                <Button size="sm" variant="outline" asChild>
                  <a href={org.link} target="_blank" rel="noopener noreferrer">
                    <FileText className="size-4" /> Open website
                  </a>
                </Button>
              )}
            </div>
          ),
        },
        notes: {
          emptyLabel: 'No notes yet.',
          content: (
            <Textarea
              value={org.opportunities}
              onChange={(event) => patch({ opportunities: event.target.value })}
              placeholder="Opportunities, context, or a next step…"
              className="min-h-32"
            />
          ),
        },
        dataQuality: {
          emptyLabel: 'No data-quality issues.',
          content: warnings.length ? (
            <ul className="space-y-2 text-sm">
              {warnings.map((warning) => (
                <li key={warning} className="rounded-lg bg-warning/10 px-3 py-2 text-warning-foreground">
                  {warning}
                </li>
              ))}
            </ul>
          ) : undefined,
        },
      }}
    />
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
