import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { m } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_DISTANCE, MOTION_TRANSITION } from '@/lib/motion'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content asChild sideOffset={sideOffset} {...props}>
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: MOTION_DISTANCE.small / 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={MOTION_TRANSITION.micro}
        className={cn(
          'z-50 max-w-xs rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-md',
          className
        )}
      >
        {children}
      </m.div>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
