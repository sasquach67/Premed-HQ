import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { NAV_GROUPS } from '@/app/routes'
import { useStore } from '@/store/store'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/** MedCoach-style grouped nav. Collapsible on desktop; always full-width inside the mobile drawer. */
export function Sidebar({
  onNavigate, collapsible = false,
}: { onNavigate?: () => void; collapsible?: boolean }) {
  const profile = useStore((s) => s.profile)
  const touchRoute = useStore((s) => s.touchRoute)
  const collapsed = useStore((s) => s.settings.sidebarCollapsed)
  const update = useStore((s) => s.update)
  const [hovered, setHovered] = useState(false)
  const [suppressHover, setSuppressHover] = useState(false)

  // expanded view shows labels; collapsed + not-hovered shows icons only
  const expanded = !collapsible || !collapsed || (hovered && !suppressHover)

  return (
    <nav
      onMouseEnter={() => {
        if (!suppressHover) setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
        setSuppressHover(false)
      }}
      className={cn(
        'flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200',
        expanded ? 'w-64' : 'w-[4.25rem]',
        collapsible && 'absolute inset-y-0 left-0 z-30',
        collapsible && collapsed && hovered && 'z-40 shadow-2xl'
      )}
    >
      {/* brand + collapse toggle (no school subtitle — minimalist) */}
      <div className="flex items-center gap-2.5 px-3.5 py-4">
        <AppMark />
        {expanded && <p className="flex-1 font-display text-lg font-bold">Premed HQ</p>}
        {collapsible && expanded && (
          <button
            onClick={() => {
              const nextCollapsed = !collapsed
              setHovered(false)
              setSuppressHover(nextCollapsed)
              update((d) => { d.settings.sidebarCollapsed = !d.settings.sidebarCollapsed })
            }}
            className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
            aria-label={collapsed ? 'Pin sidebar open' : 'Collapse sidebar'}
            title={collapsed ? 'Pin open (⌘B)' : 'Collapse (⌘B)'}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        )}
      </div>

      {/* groups */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 pb-3">
        {NAV_GROUPS.map(({ group, items }) => (
          <div key={group} className="mb-2.5">
            {expanded && group === 'Home'
              ? null
              : expanded
              ? <p className="px-2.5 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/80">{group}</p>
              : <div className="mx-auto my-2 h-px w-6 bg-sidebar-border" />}
            <ul className="space-y-0.5">
              {items.map((r) => {
                const link = (
                  <NavLink
                    to={r.id === 'home' ? '/' : `/${r.id}`}
                    onClick={() => { touchRoute(r.id); onNavigate?.() }}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors',
                        !expanded && 'justify-center',
                        r.id === 'home' && expanded && 'mb-2 border border-sidebar-border bg-card/70 py-2.5 text-base shadow-sm',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_var(--sidebar-primary)]'
                          : 'text-sidebar-foreground/85 hover:bg-sidebar-accent/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <r.icon className={cn('size-[18px] shrink-0', isActive ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-primary')} />
                        {expanded && <span className="truncate">{r.label}</span>}
                      </>
                    )}
                  </NavLink>
                )
                return (
                  <li key={r.id}>
                    {expanded ? link : (
                      <Tooltip>
                        <TooltipTrigger asChild>{link}</TooltipTrigger>
                        <TooltipContent side="right">{r.label}</TooltipContent>
                      </Tooltip>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* profile footer */}
      <div className="border-t border-sidebar-border px-3 py-2.5">
        <div className={cn('flex items-center gap-2.5', !expanded && 'justify-center')}>
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {profile.name.slice(0, 1)}
          </div>
          {expanded && (
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold">{profile.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{profile.major} • {profile.track} • {profile.classYear}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function AppMark() {
  return (
    <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm" aria-hidden="true">
      <svg viewBox="0 0 36 36" className="size-7">
        <rect x="8" y="9" width="20" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M13 15h10M13 20h10" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M18 7v7M14.5 10.5h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M10 26c3.2 2.2 12.8 2.2 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".75" />
      </svg>
    </div>
  )
}
