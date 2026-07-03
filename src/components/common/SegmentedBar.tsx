import { cn } from '@/lib/utils'

export interface Segment {
  name: string
  /** 0–1 fraction of the whole bar this segment fills */
  value: number
  color: string
  detail?: string
}

/** Single multi-segment progress bar (GPA / MCAT / Shadowing / ...). */
export function SegmentedBar({ segments, className }: { segments: Segment[]; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-muted">
        {segments.map((s) => (
          <div
            key={s.name}
            className="h-full transition-all duration-700"
            style={{ width: `${Math.max(0, Math.min(1, s.value)) * (100 / segments.length)}%`, background: s.color }}
            title={`${s.name}${s.detail ? ` — ${s.detail}` : ''}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5 text-xs">
            <span className="size-2.5 rounded-full" style={{ background: s.color }} />
            <span className="font-semibold">{s.name}</span>
            {s.detail && <span className="text-muted-foreground">{s.detail}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
