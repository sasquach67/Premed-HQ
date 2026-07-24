import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { m } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_GESTURE, MOTION_TRANSITION } from '@/lib/motion'

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root asChild {...props}>
    <m.button
      ref={ref}
      whileTap={MOTION_GESTURE.press}
      transition={MOTION_TRANSITION.micro}
      className={cn(
        'field-solid peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40',
        className
      )}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-4 rounded-full bg-card shadow-sm ring-0 transition-transform duration-200 ease-[cubic-bezier(.16,1,.3,1)] data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0" />
    </m.button>
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
