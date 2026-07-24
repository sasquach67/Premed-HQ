import { cn } from '@/lib/utils'

interface RingProps {
  /** 0–100 */
  value: number
  size?: number
  stroke?: number
  /** any CSS color, defaults to the Carolina-blue primary */
  color?: string
  label?: string
  sublabel?: string
  className?: string
}

/** A soft progress ring — layered on top of trackers, never a bare bar. */
export function Ring({
  value, size = 92, stroke = 9, color = 'var(--primary)', label, sublabel, className,
}: RingProps) {
  const pct = Math.max(0, Math.min(100, value))
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c
  return (
    <div className={cn('inline-flex flex-col items-center gap-1', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--muted)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-base font-extrabold tabular-nums" style={{ color }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>
      {label && <span className="text-sm font-semibold leading-none">{label}</span>}
      {sublabel && <span className="text-xs text-muted-foreground leading-none">{sublabel}</span>}
    </div>
  )
}
