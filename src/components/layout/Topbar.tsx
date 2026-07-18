import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Archive, LifeBuoy, Lightbulb, Menu,
  Settings, ShieldCheck, Target, User,
} from 'lucide-react'
import { CommandSearch } from './CommandSearch'
import { useTheme } from '@/store/useTheme'
import { useBackup } from '@/store/useBackup'
import { useStore } from '@/store/store'
import { ROUTE_MAP } from '@/app/routes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const location = useLocation()
  const tasks = useStore((s) => s.tasks)
  const profile = useStore((s) => s.profile)
  const { isDark, setTheme } = useTheme()
  const backup = useBackup()

  const activeRoute = useMemo(() => {
    const first = location.pathname.split('/').filter(Boolean)[0] || 'home'
    return ROUTE_MAP[first] ?? ROUTE_MAP.home
  }, [location.pathname])

  const taskStatus = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const soon = new Date(today)
    soon.setDate(soon.getDate() + 7)
    const openTasks = tasks.filter((task) => !(task.archived || task.progress === 'Finished' || !task.deadline))
    const dueToday = openTasks.filter((task) => {
      const deadline = new Date(`${task.deadline}T00:00:00`)
      return deadline.getTime() === today.getTime()
    }).length
    const overdue = openTasks.filter((task) => {
      const deadline = new Date(`${task.deadline}T00:00:00`)
      return deadline < today
    }).length
    const dueSoon = openTasks.filter((task) => {
      if (task.archived || task.progress === 'Finished' || !task.deadline) return false
      const deadline = new Date(`${task.deadline}T00:00:00`)
      return deadline >= today && deadline <= soon
    }).length
    return { dueToday, overdue, dueSoon }
  }, [tasks])

  const liveStatus = useMemo(() => {
    if (taskStatus.overdue) return { label: `${taskStatus.overdue} overdue`, tone: 'alert' as const }
    if (taskStatus.dueToday) return { label: `${taskStatus.dueToday} due today`, tone: 'due' as const }
    if (taskStatus.dueSoon) return { label: `${taskStatus.dueSoon} due soon`, tone: 'due' as const }
    if (!backup.enabled) return { label: 'Backup off', tone: 'system' as const }
    return { label: 'Saved', tone: 'clear' as const }
  }, [backup.enabled, taskStatus])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 px-3 py-2.5 backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={onMenu} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <CommandSearch />
        </div>

        <div className="ml-auto flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          <LiveStatusChip label={liveStatus.label} tone={liveStatus.tone} />
          <AppearanceButton isDark={isDark} onToggle={() => setTheme(isDark ? 'light' : 'dark')} />
          <MoreMenu
            activeLabel={activeRoute.label}
            liveStatus={liveStatus.label}
            taskStatus={taskStatus}
            profileName={profile.name}
            profileEmail={profile.email}
          />
        </div>
      </div>
    </header>
  )
}

function LiveStatusChip({ label, tone }: { label: string; tone: 'alert' | 'due' | 'system' | 'clear' }) {
  return (
    <Link
      to={tone === 'system' ? '/settings' : tone === 'clear' ? '/settings' : '/timeline'}
      className={cn(
        'inline-flex h-8 max-w-[9rem] items-center gap-1.5 truncate rounded-full border px-3 text-xs font-extrabold shadow-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:max-w-[12rem]',
        tone === 'alert' && 'border-destructive/35 bg-destructive/10 text-destructive',
        tone === 'due' && 'border-primary/30 bg-primary/10 text-primary',
        tone === 'system' && 'border-warning/35 bg-warning/10 text-warning',
        tone === 'clear' && 'border-[color-mix(in_srgb,var(--success)_30%,var(--border))] bg-card/80 text-[color-mix(in_srgb,var(--success)_70%,var(--foreground))]'
      )}
      aria-label={`Current status: ${label}`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  )
}

function AppearanceButton({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-8 rounded-full bg-card/80"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
      title={isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}
    >
      <Lightbulb className={cn('size-4', isDark ? 'text-primary' : 'text-amber-500')} />
    </Button>
  )
}

function MoreMenu({
  activeLabel,
  liveStatus,
  taskStatus,
  profileName,
  profileEmail,
}: {
  activeLabel: string
  liveStatus: string
  taskStatus: { dueToday: number; overdue: number; dueSoon: number }
  profileName: string
  profileEmail?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="size-8 rounded-full bg-card/80" aria-label="Open more actions">
          <Menu className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 overflow-hidden rounded-3xl p-2">
        <div className="rounded-2xl bg-muted/35 px-4 py-4 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full border border-primary/30 bg-primary text-lg font-extrabold text-primary-foreground shadow-sm">
            {(profileName || 'Andy').trim().charAt(0).toUpperCase() || 'A'}
          </div>
          <p className="mt-2 truncate text-base font-extrabold">{profileName || 'Andy'}</p>
          <p className="truncate text-xs font-medium text-muted-foreground">{profileEmail || 'Add email in Profile'}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button asChild size="sm" className="rounded-full">
              <Link to="/profile"><User className="size-3.5" /> Profile</Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="rounded-full bg-card/70">
              <Link to="/settings"><Settings className="size-3.5" /> Settings</Link>
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Today</DropdownMenuLabel>
        <div className="px-1.5 pb-2 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/35 px-2.5 py-2">
            <span className="truncate">{activeLabel}</span>
            <span className="shrink-0 text-foreground">{liveStatus}</span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
            <span className="rounded-md bg-muted/25 px-2 py-1">{taskStatus.overdue} overdue</span>
            <span className="rounded-md bg-muted/25 px-2 py-1">{taskStatus.dueToday} today</span>
            <span className="rounded-md bg-muted/25 px-2 py-1">{taskStatus.dueSoon} soon</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/?guide=open"><Target className="size-4" /> Ultimate Guide</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/help"><LifeBuoy className="size-4" /> Help</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/settings"><ShieldCheck className="size-4" /> Backup / sync</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/settings?tab=export"><Archive className="size-4" /> Export data</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
