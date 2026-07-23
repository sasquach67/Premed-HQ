import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Shell-free frame for long, autosaving work. Every focus route owns an exit. */
export function FocusModeLayout({
  exitTo, exitLabel, headerEnd, background, children, className,
}: {
  exitTo: string
  exitLabel: string
  headerEnd?: ReactNode
  background?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <main className={cn('relative min-h-svh overflow-hidden bg-background text-foreground', className)}>
      {background}
      <div className="relative flex min-h-svh flex-col p-5 sm:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" className="rounded-full border-current/20 bg-background/55 backdrop-blur transition-colors motion-reduce:transition-none">
            <Link to={exitTo}><ArrowLeft className="size-4" /> {exitLabel}</Link>
          </Button>
          {headerEnd}
        </header>
        {children}
      </div>
    </main>
  )
}
