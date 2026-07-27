import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_DISTANCE, MOTION_TRANSITION } from '@/lib/motion'

export function NumberFlow({
  value,
  format = (next) => next.toLocaleString(),
  className,
  animationKey,
}: {
  value: number
  format?: (value: number) => string
  className?: string
  /** Keep stable to update text without motion; change it only when a transition is meaningful. */
  animationKey?: string | number
}) {
  const reduceMotion = useReducedMotion()
  const output = format(value)

  return (
    <span className={cn('relative inline-grid overflow-hidden tabular-nums', className)} aria-live="polite" aria-label={output}>
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={animationKey ?? output}
          className="col-start-1 row-start-1"
          initial={reduceMotion ? false : { opacity: 0, y: MOTION_DISTANCE.small }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -MOTION_DISTANCE.small }}
          transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
          aria-hidden="true"
        >
          {output}
        </m.span>
      </AnimatePresence>
    </span>
  )
}
