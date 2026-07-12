import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [hoverPreview, setHoverPreview] = useState(false)

  // expanded view shows labels; collapsed + not-hovered shows icons only
  const expanded = !collapsible || !collapsed || hoverPreview
  const labelsShown = expanded

  return (
    <nav
      onMouseEnter={() => { if (collapsible && collapsed) setHoverPreview(true) }}
      onMouseMove={() => { if (collapsible && collapsed && !hoverPreview) setHoverPreview(true) }}
      onMouseLeave={() => setHoverPreview(false)}
      onPointerEnter={() => { if (collapsible && collapsed) setHoverPreview(true) }}
      onPointerMove={() => { if (collapsible && collapsed && !hoverPreview) setHoverPreview(true) }}
      onPointerLeave={() => setHoverPreview(false)}
      onFocus={() => { if (collapsible && collapsed) setHoverPreview(true) }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverPreview(false)
      }}
      className={cn(
        'flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,box-shadow] duration-500 ease-[cubic-bezier(.16,1,.3,1)] will-change-[width] motion-reduce:transition-none',
        expanded ? 'w-64' : 'w-[4.75rem]',
        collapsible && 'absolute inset-y-0 left-0 z-30',
        collapsible && collapsed && hoverPreview && 'z-40 shadow-2xl'
      )}
    >
      {/* brand + collapse toggle (no school subtitle — minimalist) */}
      <div
        className={cn(
          'grid h-[4.25rem] items-center overflow-hidden transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none',
          expanded ? 'grid-cols-[2.25rem_minmax(0,1fr)_1.75rem] gap-2 px-3.5' : 'grid-cols-[2.25rem] justify-center px-0'
        )}
      >
        <AppMark />
        {expanded && (
          <p className={cn('min-w-0 font-display text-lg font-bold transition-[opacity,transform] duration-300 motion-reduce:transition-none', labelsShown ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0')}>Premed HQ</p>
        )}
        {collapsible && expanded && (
          <button
            onClick={() => {
              const nextCollapsed = !collapsed
              setHoverPreview(false)
              update((d) => { d.settings.sidebarCollapsed = nextCollapsed })
            }}
            className={cn(
              'grid size-7 place-items-center rounded-md text-muted-foreground transition-[opacity,background-color,color] duration-150 hover:bg-sidebar-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
              labelsShown ? 'opacity-100' : 'opacity-70'
            )}
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
            <div className="h-6 overflow-hidden">
              {group === 'Home' ? null : (
                <p className={cn(
                  'px-2.5 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/80 transition-[opacity,transform] duration-300 motion-reduce:transition-none',
                  labelsShown ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                )}>{group}</p>
              )}
              {!expanded && group !== 'Home' && <div className="mx-auto my-3 h-px w-6 bg-sidebar-border" />}
            </div>
            <ul className="space-y-0.5">
              {items.map((r) => {
                const to = r.id === 'home' ? '/' : `/${r.id}`
                const isActive = r.id === 'home' ? location.pathname === '/' : location.pathname === to
                const link = (
                  <Link
                    to={to}
                    onClick={() => { touchRoute(r.id); onNavigate?.() }}
                    className={cn(
                      'group relative grid h-9 grid-cols-[2.25rem_minmax(0,1fr)] items-center overflow-hidden rounded-lg text-sm font-semibold transition-[background-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                      expanded ? 'px-1.5' : 'mx-auto w-9 px-0',
                      r.id === 'home' && expanded && 'mb-2 h-10 border border-sidebar-border bg-card/70 text-base shadow-sm',
                      expanded
                        ? isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_3px_0_0_var(--sidebar-primary)]'
                          : 'text-sidebar-foreground/85 hover:bg-sidebar-accent/60'
                        : isActive
                          ? 'text-sidebar-primary'
                          : 'text-muted-foreground hover:text-sidebar-primary'
                    )}
                  >
                    <span className="grid size-9 place-items-center">
                      <r.icon className={cn('size-[18px] shrink-0 transition-colors duration-200', isActive ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-primary')} />
                    </span>
                    <span
                      className={cn(
                        'min-w-0 truncate transition-[opacity,transform] duration-300 motion-reduce:transition-none',
                        labelsShown ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                      )}
                    >
                      {r.label}
                    </span>
                  </Link>
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
        <div className={cn('grid items-center overflow-hidden', expanded ? 'grid-cols-[2.25rem_minmax(0,1fr)] gap-2' : 'grid-cols-[2.25rem] justify-center')}>
          <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {profile.name.slice(0, 1)}
          </div>
          {expanded && (
            <div className={cn('min-w-0 leading-tight transition-[opacity,transform] duration-300 motion-reduce:transition-none', labelsShown ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0')}>
              <p className="truncate text-sm font-bold">{profile.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">{profile.email || 'Add email in Profile'}</p>
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
