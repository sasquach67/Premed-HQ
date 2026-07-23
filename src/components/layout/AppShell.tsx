import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { AlertsStrip } from './AlertsStrip'
import { useStore } from '@/store/store'
import { useTheme } from '@/store/useTheme'
import { useBackup } from '@/store/useBackup'
import { useCloudSync } from '@/store/useCloudSync'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToastProvider } from '@/components/common/ToastProvider'
import { ShellActionsProvider } from './ShellActionsProvider'
import { QuickAddDialog } from './QuickAddDialog'
import { HelpFeedbackLauncher } from './HelpFeedbackLauncher'
import { MascotLayer } from '@/components/mascot/MascotLayer'

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const update = useStore((s) => s.update)
  useTheme()
  useBackup() // wires daily-on-open check + debounced auto-backup
  const cloud = useCloudSync() // wires Supabase login + cross-device cloud sync (no-op until configured/signed in)

  // ⌘B / Ctrl+B or "[" toggles the sidebar (⌘S is reserved by the browser).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') || (!typing && e.key === '[')) {
        e.preventDefault()
        update((d) => { d.settings.sidebarCollapsed = !d.settings.sidebarCollapsed })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [update])

  return (
    <TooltipProvider delayDuration={200}>
      <ToastProvider>
      <ShellActionsProvider>
      <div className="flex h-svh overflow-hidden">
        {/* The compact rail always owns the same gutter. The full sidebar reveals
            over the page so opening it never reflows or re-centers page content. */}
        <aside className="relative hidden w-[4.75rem] shrink-0 lg:block">
          <Sidebar collapsible signedIn={Boolean(cloud.user)} onSignOut={() => { void cloud.signOut() }} />
        </aside>

        {/* mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-foreground/35 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)} />
            <div className="absolute inset-y-0 left-0 animate-pop-in">
              <Sidebar onNavigate={() => setMobileOpen(false)} signedIn={Boolean(cloud.user)} onSignOut={() => { void cloud.signOut() }} />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        )}

        {/* main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenu={() => setMobileOpen(true)} />
          <AlertsStrip />
          <main className="relative flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
              <Outlet />
            </div>
          </main>
        </div>
        <QuickAddDialog />
        <HelpFeedbackLauncher />
        <MascotLayer />
      </div>
      </ShellActionsProvider>
      </ToastProvider>
    </TooltipProvider>
  )
}
