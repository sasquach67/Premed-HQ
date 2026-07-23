import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION } from '@/lib/motion'

export interface ContributionDatum {
  date: string
  count: number
}

export function ContributionHeatmap({ values, className }: { values: ContributionDatum[]; className?: string }) {
  const reduceMotion = useReducedMotion()
  const max = Math.max(1, ...values.map((item) => item.count))

  return (
    <div className={cn('grid grid-flow-col grid-rows-7 gap-1', className)} role="img" aria-label="Contribution activity heatmap">
      {values.map((item, index) => {
        const level = item.count === 0 ? 0 : Math.max(1, Math.ceil((item.count / max) * 4))
        return (
          <m.span
            key={item.date}
            className={cn(
              'size-3 rounded-[3px] border border-border/60',
              level === 0 && 'bg-muted/45',
              level === 1 && 'bg-primary/20',
              level === 2 && 'bg-primary/40',
              level === 3 && 'bg-primary/65',
              level === 4 && 'bg-primary'
            )}
            title={`${item.date}: ${item.count}`}
            aria-label={`${item.date}: ${item.count}`}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { ...MOTION_TRANSITION.micro, delay: Math.min(index * 0.006, 0.2) }}
          />
        )
      })}
    </div>
  )
}

