import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION } from '@/lib/motion'

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => {
  const reduceMotion = useReducedMotion()
  const exactValue = Math.min(100, Math.max(0, value ?? 0))
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn('glass-inset relative h-2.5 w-full overflow-hidden rounded-full border', className)}
      value={exactValue}
      {...props}
    >
      <ProgressPrimitive.Indicator asChild>
        <m.div
          className={cn('h-full w-full flex-1 rounded-full bg-primary', indicatorClassName)}
          initial={false}
          animate={{ x: `${exactValue - 100}%` }}
          transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
        />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
