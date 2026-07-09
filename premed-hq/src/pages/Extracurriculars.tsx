import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, Users } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import type { Org, OrgReflection } from '@/lib/types'
import { uid } from '@/lib/id'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/common/PageHeader'
import { ResourceGrid } from '@/components/common/ResourceGrid'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OrgCard } from '@/components/ecs/OrgCard'
import { OrgPeek } from '@/components/ecs/OrgPeek'
import { StatStrip } from '@/components/ecs/StatStrip'
import { activeOrg, statusLabel } from '@/components/ecs/ecsUtils'

type Filter = 'all' | 'active' | 'leadership' | 'watchlist' | 'past'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'past', label: 'Past' },
]

/** Extracurriculars = organization board + reflection journal, not an hours tracker. */
export function Extracurriculars() {
  const route = ROUTE_MAP.ecs
  const orgs = useStore((s) => s.orgs)
  const addItem = useStore((s) => s.addItem)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)
  const [openId, setOpenId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 160)
  const [focusReflectionId, setFocusReflectionId] = useState<string | null>(null)

  const active = orgs.find((org) => org.id === openId) ?? null
  const filtered = useMemo(() => filterOrgs(orgs, filter, debouncedQuery), [orgs, filter, debouncedQuery])
  const sections = useMemo(() => buildSections(filtered, filter), [filtered, filter])

  function add(status: Org['status'] = 'interested') {
    const org: Org = {
      id: uid(),
      name: '',
      type: 'Club',
      role: 'Member',
      status,
      reflection: '',
      reflections: [],
      opportunities: '',
      meetingInfo: '',
      link: '',
      order: orgs.length,
    }
    addItem('orgs', org)
    setOpenId(org.id)
  }

  function patchOrg(id: string, patch: Partial<Org>) {
    patchItem('orgs', id, patch)
  }

  function addReflection(org: Org) {
    const reflection: OrgReflection = {
      id: uid(),
      date: new Date().toISOString().slice(0, 10),
      title: 'New reflection',
      body: '',
    }
    patchOrg(org.id, { reflections: [reflection, ...(org.reflections ?? [])] })
    setFocusReflectionId(reflection.id)
    setOpenId(org.id)
  }

  return (
    <div>
      <PageHeader
        title={route.label}
        actions={(
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search organizations..."
                className="h-9 w-56 rounded-full pl-9"
              />
            </div>
            <Button onClick={() => add()}><Plus className="size-4" /> Add organization</Button>
          </div>
        )}
      />

      {orgs.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No organizations yet"
          hint="Add each club, sport, or org you want to track for roles, meetings, reflections, and opportunities."
          action={<Button size="sm" onClick={() => add()}><Plus className="size-4" /> Add your first</Button>}
        />
      ) : (
        <div className="mb-6 space-y-5">
          <StatStrip orgs={orgs} />
          <div className="inline-flex max-w-full overflow-x-auto rounded-full bg-muted p-1">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm font-extrabold transition',
                  filter === item.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {sections.length === 0 ? (
            <EmptyState icon={Search} title="No matching organizations" hint="Try a different name, type, or filter." />
          ) : (
            <div className="space-y-6">
              {sections.map((section) => (
                <section key={section.id} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">{section.label}</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">{section.orgs.length}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {section.orgs.map((org) => {
                      const index = orgs.findIndex((item) => item.id === org.id)
                      return (
                        <OrgCard
                          key={org.id}
                          org={org}
                          index={index}
                          watchlist={section.id === 'watchlist'}
                          onOpen={() => { setFocusReflectionId(null); setOpenId(org.id) }}
                          onNewReflection={() => addReflection(org)}
                          onStatus={(status) => patchOrg(org.id, { status })}
                          onDelete={() => removeItem('orgs', org.id)}
                        />
                      )
                    })}
                    {section.id === 'watchlist' && (
                      <button
                        type="button"
                        onClick={() => add('interested')}
                        className="flex min-h-[10.5rem] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/15 p-4 text-center font-extrabold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        <Plus className="mb-2 size-5" />
                        Add organization to watchlist
                      </button>
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      )}

      <ResourceGrid pillar="ecs" />

      <OrgPeek
        org={active}
        open={!!active}
        colorIndex={active ? Math.max(0, orgs.findIndex((org) => org.id === active.id)) : 0}
        focusReflectionId={focusReflectionId}
        onOpenChange={(value) => {
          if (!value) {
            setOpenId(null)
            setFocusReflectionId(null)
          }
        }}
        onPatch={(patch) => active && patchOrg(active.id, patch)}
      />
    </div>
  )
}

function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(id)
  }, [value, delay])
  return debounced
}

function filterOrgs(orgs: Org[], filter: Filter, query: string) {
  const normalized = query.trim().toLowerCase()
  return orgs
    .filter((org) => {
      if (filter === 'active') return activeOrg(org)
      if (filter === 'leadership') return org.status === 'leader'
      if (filter === 'watchlist') return org.status === 'interested'
      if (filter === 'past') return org.status === 'inactive'
      return true
    })
    .filter((org) => {
      if (!normalized) return true
      return `${org.name} ${org.type} ${org.role}`.toLowerCase().includes(normalized)
    })
    .sort((a, b) => a.order - b.order)
}

function buildSections(orgs: Org[], filter: Filter) {
  const base = [
    { id: 'active', label: 'Active', orgs: orgs.filter(activeOrg) },
    { id: 'watchlist', label: statusLabel('interested'), orgs: orgs.filter((org) => org.status === 'interested') },
    { id: 'past', label: statusLabel('inactive'), orgs: orgs.filter((org) => org.status === 'inactive') },
  ]
  if (filter === 'leadership') return [{ id: 'active', label: 'Leadership', orgs }]
  if (filter === 'active') return [{ id: 'active', label: 'Active', orgs }]
  if (filter === 'watchlist') return [{ id: 'watchlist', label: statusLabel('interested'), orgs }]
  if (filter === 'past') return [{ id: 'past', label: statusLabel('inactive'), orgs }]
  return base.filter((section) => section.orgs.length > 0)
}
