import { type ReactNode, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Lightweight accordion section — used to compact long lists
 *  (grad requirements, resource groups) into toggles. */
export function Collapsible({
  title, badge, defaultOpen = false, children, right,
}: {
  title: ReactNode
  badge?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
  right?: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card card-soft">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-muted/40"
      >
        <ChevronRight className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-90')} />
        <span className="flex-1 text-sm font-bold">{title}</span>
        {badge}
        {right}
      </button>
      {open && <div className="border-t border-border px-4 py-3">{children}</div>}
    </div>
  )
}
