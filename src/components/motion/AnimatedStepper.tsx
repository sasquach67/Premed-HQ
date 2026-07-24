import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION_DISTANCE, MOTION_GESTURE, MOTION_TRANSITION } from '@/lib/motion'

export interface StepDefinition {
  id: string
  label: string
  content: React.ReactNode
}

export function AnimatedStepper({ steps, activeIndex, onStepChange }: { steps: StepDefinition[]; activeIndex: number; onStepChange?: (index: number) => void }) {
  const reduceMotion = useReducedMotion()
  const active = steps[activeIndex]

  return (
    <div className="space-y-5">
      <ol className="flex items-center" aria-label="Progress">
        {steps.map((step, index) => (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <m.button type="button" whileTap={onStepChange ? MOTION_GESTURE.press : undefined} transition={MOTION_TRANSITION.micro} className="grid min-w-8 place-items-center gap-1 text-xs font-bold" onClick={() => onStepChange?.(index)} disabled={!onStepChange} aria-current={index === activeIndex ? 'step' : undefined}>
              <m.span layout className={cn('grid size-8 place-items-center rounded-full border shadow-sm', index <= activeIndex ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground')} transition={MOTION_TRANSITION.standard}>
                {index < activeIndex ? <Check className="size-4" /> : index + 1}
              </m.span>
              <span className="sr-only sm:not-sr-only">{step.label}</span>
            </m.button>
            {index < steps.length - 1 && (
              <span className="mx-2 h-0.5 flex-1 overflow-hidden rounded-full bg-border">
                <m.span className="block size-full origin-left bg-primary" initial={false} animate={{ scaleX: index < activeIndex ? 1 : 0 }} transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard} />
              </span>
            )}
          </li>
        ))}
      </ol>
      <AnimatePresence mode="wait" initial={false}>
        {active && (
          <m.div
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, x: MOTION_DISTANCE.medium }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -MOTION_DISTANCE.medium }}
            transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
          >
            {active.content}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
