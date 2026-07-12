import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Archive, BookOpenText, Brain, CalendarPlus, CheckCircle2, ChevronDown, CircleHelp,
  ClipboardList, Cloud, CloudOff, Contact, LifeBuoy, Menu,
  Moon, Plus, Settings, ShieldCheck, Stethoscope, Sun, Target, User,
} from 'lucide-react'
import { CommandSearch } from './CommandSearch'
import { useTheme } from '@/store/useTheme'
import { useBackup } from '@/store/useBackup'
import { useStore } from '@/store/store'
import { MCAT_QOTD } from '@/data/mcatQotd'
import { fmtTimeAgo, pickDaily } from '@/lib/date'
import { ROUTE_MAP } from '@/app/routes'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const location = useLocation()
  const tasks = useStore((s) => s.tasks)
  const profile = useStore((s) => s.profile)
  const { isDark, setTheme } = useTheme()

  const activeRoute = useMemo(() => {
    const first = location.pathname.split('/').filter(Boolean)[0] || 'home'
    return ROUTE_MAP[first] ?? ROUTE_MAP.home
  }, [location.pathname])

  const dueSoon = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const soon = new Date(today)
    soon.setDate(soon.getDate() + 7)
    return tasks.filter((task) => {
      if (task.archived || task.progress === 'Finished' || !task.deadline) return false
      const deadline = new Date(`${task.deadline}T00:00:00`)
      return deadline >= today && deadline <= soon
    }).length
  }, [tasks])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 px-3 py-2.5 backdrop-blur-xl md:px-6">
      <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 lg:grid-cols-[minmax(16rem,22rem)_minmax(8rem,1fr)_auto]">
        <div className="flex min-w-0 items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={onMenu} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <CommandSearch />
        </div>

        <div className="hidden min-w-0 justify-center md:flex">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
            <span className="truncate text-foreground">{activeRoute.label}</span>
            <span className="size-1 rounded-full bg-muted-foreground/45" aria-hidden="true" />
            <span className="hidden truncate lg:inline">{dueSoon ? `Today · ${dueSoon} due soon` : 'Today · clear'}</span>
          </div>
        </div>

        <div className="ml-auto flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          <GlobalAddMenu />
          <HelpMenu />
          <StatusMenu />
          <label className="hidden h-8 items-center gap-1.5 rounded-full border border-border bg-card/80 px-2 text-xs font-semibold text-muted-foreground shadow-sm sm:flex">
            <Sun className="size-3.5" aria-hidden="true" />
            <Switch
              checked={isDark}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            />
            <Moon className="size-3.5" aria-hidden="true" />
          </label>
          <ProfileMenu name={profile.name} email={profile.email} />
        </div>
      </div>
    </header>
  )
}

function GlobalAddMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="rounded-full px-3" aria-label="Add a new item">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add</span>
          <ChevronDown className="hidden size-3.5 sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Create</DropdownMenuLabel>
        <DropdownMenuItem asChild><Link to="/timeline"><ClipboardList className="size-4" /> Task</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/academics"><BookOpenText className="size-4" /> Class note</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/academics?tab=assignments"><CalendarPlus className="size-4" /> Assignment</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/mcat?tab=mistakes"><Brain className="size-4" /> MCAT mistake</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/clinical"><Stethoscope className="size-4" /> Clinical hours</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/settings"><Archive className="size-4" /> Resource</Link></DropdownMenuItem>
        <DropdownMenuItem disabled><Contact className="size-4" /> Contact <span className="ml-auto text-[10px] text-muted-foreground">soon</span></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function StatusMenu() {
  const { enabled, status, lastBackupAt } = useBackup()
  const backupLabel = !enabled
    ? 'Backup not set'
    : status === 'saving'
      ? 'Backing up'
      : status === 'error' || status === 'offline'
        ? 'Backup needs attention'
        : lastBackupAt
          ? `Drive ${fmtTimeAgo(lastBackupAt)}`
          : 'Drive ready'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden rounded-full bg-card/80 px-3 text-[color-mix(in_srgb,var(--success)_65%,var(--foreground))] md:inline-flex" aria-label="Open save and backup status">
          <ShieldCheck className="size-4" />
          Autosaved
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <div className="px-2.5 py-2 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="size-4 text-[color-mix(in_srgb,var(--success)_70%,var(--foreground))]" />
            Saved in this browser
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            {enabled ? <Cloud className="size-3.5" /> : <CloudOff className="size-3.5" />}
            {backupLabel}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/settings"><ShieldCheck className="size-4" /> Set up backup</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/settings?tab=export"><Archive className="size-4" /> Export data</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function HelpMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden rounded-full bg-card/80 px-3 md:inline-flex" aria-label="Open guide and help">
          <CircleHelp className="size-4 text-primary" />
          <span className="hidden lg:inline">Guide</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Help</DropdownMenuLabel>
        <DropdownMenuItem asChild><Link to="/?guide=open"><Target className="size-4" /> Ultimate Guide</Link></DropdownMenuItem>
        <QotdMenuItem />
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/help"><LifeBuoy className="size-4" /> Help center</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ProfileMenu({ name, email }: { name: string; email?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full bg-card/80" aria-label="Open profile menu">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
            {(name || 'A').slice(0, 1).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="px-2.5 py-2">
          <p className="truncate text-sm font-bold">{name || 'Profile'}</p>
          <p className="truncate text-xs text-muted-foreground">{email || 'Add email in Profile'}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link to="/profile"><User className="size-4" /> Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/settings"><Settings className="size-4" /> Settings</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function QotdMenuItem() {
  const q = pickDaily(MCAT_QOTD, 13) ?? MCAT_QOTD[0]
  return (
    <DropdownMenuItem asChild>
      <Link to="/mcat">
        <Brain className="size-4" />
        QOTD
        <span className="ml-auto text-[10px] text-muted-foreground">{q.section}</span>
      </Link>
    </DropdownMenuItem>
  )
}
