import { useState, type FormEvent } from 'react'
import type { ExperienceCategory, ExperienceEntry, Organization, Person } from '@/lib/types'
import { findOrganizationMatches, findPersonMatches } from '@/lib/entityMatching'
import { uid } from '@/lib/id'
import { useStore } from '@/store/store'
import { EntityLinkCombobox } from '@/components/common/EntityLinkCombobox'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ExperienceIdentityPatch = Pick<
  ExperienceEntry,
  'org' | 'organizationId' | 'supervisor' | 'supervisorId' | 'role'
>

export function CreateExperienceDialog({
  open,
  category,
  defaultRole = '',
  onOpenChange,
  onCreate,
}: {
  open: boolean
  category: ExperienceCategory
  defaultRole?: string
  onOpenChange: (open: boolean) => void
  onCreate: (patch: ExperienceIdentityPatch) => void
}) {
  const persons = useStore((state) => state.persons)
  const organizations = useStore((state) => state.organizations)
  const addItem = useStore((state) => state.addItem)
  const [org, setOrg] = useState('')
  const [organizationId, setOrganizationId] = useState<string>()
  const [supervisor, setSupervisor] = useState('')
  const [supervisorId, setSupervisorId] = useState<string>()
  const [role, setRole] = useState(defaultRole)

  function reset() {
    setOrg('')
    setOrganizationId(undefined)
    setSupervisor('')
    setSupervisorId(undefined)
    setRole(defaultRole)
  }

  function createOrganization(name: string): Organization {
    const now = Date.now()
    const organization: Organization = {
      id: uid(),
      name,
      createdAt: now,
      updatedAt: now,
      archived: false,
      source: { type: 'manual' },
      order: organizations.length,
    }
    addItem('organizations', organization)
    return organization
  }

  function createPerson(name: string): Person {
    const now = Date.now()
    const person: Person = {
      id: uid(),
      name,
      organizationId,
      createdAt: now,
      updatedAt: now,
      archived: false,
      source: { type: 'manual' },
      order: persons.length,
    }
    addItem('persons', person)
    return person
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!org.trim()) return
    onCreate({
      org: org.trim(),
      organizationId,
      supervisor: supervisor.trim(),
      supervisorId,
      role: role.trim(),
    })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <DialogContent className="max-h-[90svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add experience</DialogTitle>
          <DialogDescription>
            Start with the organization and contact. You can add the rest on the experience page.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <EntityLinkCombobox
            label="Organization"
            value={org}
            selectedId={organizationId}
            items={organizations}
            findMatches={findOrganizationMatches}
            createLabel="Create organization"
            placeholder="Search or create an organization"
            onLink={(id, name) => {
              setOrganizationId(id)
              setOrg(name)
            }}
            onCreate={createOrganization}
          />
          <EntityLinkCombobox
            label="Supervisor or contact"
            value={supervisor}
            selectedId={supervisorId}
            items={persons}
            findMatches={findPersonMatches}
            createLabel="Create person"
            placeholder="Search or create a person"
            onLink={(id, name) => {
              setSupervisorId(id)
              setSupervisor(name)
            }}
            onCreate={createPerson}
          />
          <div className="space-y-1.5">
            <Label htmlFor={`experience-role-${category}`}>Role</Label>
            <Input
              id={`experience-role-${category}`}
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Your role"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                onOpenChange(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!org.trim()}>Create experience</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
