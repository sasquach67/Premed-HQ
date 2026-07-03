import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Compact KPI tile — value-forward, with an icon and a sublabel. */
export function StatTile({
  icon: Icon, label, value, sub, accent = 'var(--primary)', className,
}: {
  icon: LucideIcon
  label: string
  value: string
  sub?: string
  accent?: string
  className?: string
}) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-4 card-soft', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="grid size-7 place-items-center rounded-lg" style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}
