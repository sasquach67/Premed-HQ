import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CornerDownLeft, ExternalLink } from 'lucide-react'
import { useStore } from '@/store/store'
import { ROUTES, ROUTE_MAP } from '@/app/routes'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type HitKind = 'dashboard' | 'file' | 'external'
type SearchTab = 'all' | HitKind

interface Hit {
  id: string
  label: string
  sub: string
  group: string
  kind: HitKind
  route: string
  url?: string
}

const TABS: { id: SearchTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'file', label: 'Files' },
  { id: 'external', label: 'External links' },
]

/** subsequence fuzzy match returns a score, lower is better. */
function fuzzy(needle: string, hay: string): number {
  const n = needle.toLowerCase()
  const h = hay.toLowerCase()
  if (!n) return 0
  if (h.includes(n)) return h.indexOf(n)
  let qi = 0
  for (let i = 0; i < h.length && qi < n.length; i++) if (h[i] === n[qi]) qi++
  return qi === n.length ? 100 + (h.length - n.length) : -1
}

function dashboardPath(route: string) {
  if (route.startsWith('/')) return route
  return route === 'home' ? '/' : `/${route}`
}

function pushFile(hits: Hit[], id: string, label: string, sub: string, route: string, url?: string) {
  if (!url) return
  hits.push({ id, label, sub, group: 'Files', kind: 'file', route, url })
}

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [tab, setTab] = useState<SearchTab>('all')
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const store = useStore()

  const index = useMemo<Hit[]>(() => {
    const hits: Hit[] = []

    for (const r of ROUTES.filter((route) => route.nav !== false)) {
      hits.push({ id: `route-${r.id}`, label: r.label, sub: 'Page', group: 'Navigate', kind: 'dashboard', route: r.id })
    }
    hits.push({ id: 'section-guide', label: 'Premed Ultimate Guide', sub: 'Overview section', group: 'Navigate', kind: 'dashboard', route: '/?guide=open' })
    hits.push({ id: 'section-archive', label: 'Archive', sub: 'Settings section', group: 'Navigate', kind: 'dashboard', route: '/settings?tab=archive' })

    for (const c of store.courses) hits.push({ id: `course-${c.id}`, label: `${c.code} - ${c.title}`, sub: c.term, group: 'Courses', kind: 'dashboard', route: 'academics' })
    for (const t of store.tasks) {
      hits.push({ id: `task-${t.id}`, label: t.title, sub: t.type, group: 'Tasks', kind: 'dashboard', route: 'timeline' })
      pushFile(hits, `task-file-${t.id}`, `${t.title} file`, 'Task attachment', 'timeline', t.fileUrl)
    }
    for (const e of store.experiences) {
      const route = e.category === 'leadership' ? 'ecs' : e.category
      hits.push({ id: `exp-${e.id}`, label: e.org || e.role, sub: e.category, group: 'Experiences', kind: 'dashboard', route })
      pushFile(hits, `exp-file-${e.id}`, `${e.org || e.role} file`, 'Experience attachment', route, e.fileUrl)
    }
    for (const s of store.schools) hits.push({ id: `school-${s.id}`, label: s.name, sub: s.location || s.type, group: 'Schools', kind: 'dashboard', route: 'schools' })
    for (const story of store.stories) pushFile(hits, `story-doc-${story.id}`, story.title || story.prompt, 'Story Bank doc', 'essays', story.docUrl)
    for (const secondary of store.secondaries) pushFile(hits, `secondary-doc-${secondary.id}`, `${secondary.school} secondary`, 'Secondary doc', 'essays', secondary.docUrl)
    pushFile(hits, 'profile-resume', 'Resume / CV', 'Profile document', 'profile', store.profile.resumeDocUrl)

    for (const r of store.resources) {
      hits.push({
        id: `res-${r.id}`,
        label: r.label,
        sub: `${ROUTE_MAP[r.pillar]?.label ?? r.pillar} - ${r.category}`,
        group: 'External links',
        kind: 'external',
        route: r.pillar,
        url: r.url,
      })
    }

    const actions: [string, string][] = [
      ['Add a task', 'timeline'], ['Add a course', 'academics'], ['Log an experience', 'clinical'],
      ['Add a school', 'schools'], ['Connect Google Drive backup', 'settings'], ['Export my data', 'settings'],
    ]
    for (const [label, route] of actions) hits.push({ id: `act-${route}-${label}`, label, sub: 'Action', group: 'Actions', kind: 'dashboard', route })

    return hits
  }, [store.courses, store.tasks, store.experiences, store.schools, store.stories, store.secondaries, store.resources, store.profile.resumeDocUrl])

  const rankedResults = useMemo(() => {
    if (!q.trim()) {
      const recentIds = new Set(store.meta.recentRoutes.map((r) => `route-${r}`))
      const recents = store.meta.recentRoutes
        .map((r) => index.find((h) => h.id === `route-${r}`))
        .filter((h): h is Hit => Boolean(h))
        .map((h) => ({ ...h, group: 'Recent', sub: 'Jump back in' }))
      const actions = index.filter((h) => h.group === 'Actions')
      const nav = index.filter((h) => h.group === 'Navigate' && !recentIds.has(h.id))
      const dashboard = index.filter((h) => h.kind === 'dashboard' && !recentIds.has(h.id) && h.group !== 'Navigate' && h.group !== 'Actions').slice(0, 10)
      const files = index.filter((h) => h.kind === 'file').slice(0, 10)
      const external = index.filter((h) => h.kind === 'external').slice(0, 10)
      return [...recents, ...actions, ...nav, ...dashboard, ...files, ...external]
    }

    return index
      .map((h) => ({
        h,
        score: Math.min(...[fuzzy(q, h.label), fuzzy(q, h.sub), fuzzy(q, h.group)].map((s) => (s < 0 ? 9999 : s))),
      }))
      .filter((x) => x.score < 9999)
      .sort((a, b) => a.score - b.score)
      .map((x) => x.h)
  }, [q, index, store.meta.recentRoutes])

  const counts = useMemo(() => ({
    all: rankedResults.length,
    dashboard: rankedResults.filter((h) => h.kind === 'dashboard').length,
    file: rankedResults.filter((h) => h.kind === 'file').length,
    external: rankedResults.filter((h) => h.kind === 'external').length,
  }), [rankedResults])

  const results = useMemo(() => (
    tab === 'all' ? rankedResults : rankedResults.filter((h) => h.kind === tab)
  ).slice(0, 24), [rankedResults, tab])

  useEffect(() => setActive(0), [q, tab])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function choose(h?: Hit) {
    if (!h) return
    if (h.url) window.open(h.url, '_blank', 'noopener,noreferrer')
    else navigate(dashboardPath(h.route))
    setOpen(false)
    setQ('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 min-w-0 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground card-soft hover:bg-muted sm:w-64 lg:w-80"
      >
        <Search className="size-4" />
        <span className="hidden truncate md:inline">Search or type a command...</span>
        <kbd className="ml-auto hidden rounded border border-border px-1.5 text-[10px] font-semibold md:inline">⌘K</kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[18%] max-w-xl translate-y-0 gap-0 p-0">
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
                else if (e.key === 'Enter') { e.preventDefault(); choose(results[active]) }
              }}
              placeholder="Search classes, notes, assignments, MCAT, tasks, resources, contacts..."
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2">
            {TABS.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn('whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold', tab === item.id ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60')}
              >
                {item.label} <span className="text-[10px] font-semibold opacity-70">{counts[item.id]}</span>
              </button>
            ))}
          </div>

          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">No matches for "{q}".</p>
            )}
            {results.map((h, i) => (
              <button
                key={h.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(h)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm',
                  i === active ? 'bg-muted' : 'hover:bg-muted/60'
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{h.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{h.group} - {h.sub}</span>
                </span>
                {h.url ? <ExternalLink className="size-3.5 text-muted-foreground" /> : i === active && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
