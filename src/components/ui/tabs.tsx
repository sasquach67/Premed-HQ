import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { m } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_DISTANCE, MOTION_TRANSITION } from '@/lib/motion'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'glass-inset inline-flex h-10 items-center justify-start gap-1 rounded-xl border p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger asChild {...props}>
    <m.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      transition={MOTION_TRANSITION.micro}
      className={cn(
        'interactive-glass inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-transparent px-3 py-1.5 text-sm font-semibold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:text-foreground',
        className
      )}
    >
      {children}
    </m.button>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content asChild {...props}>
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: MOTION_DISTANCE.small }}
      animate={{ opacity: 1, y: 0 }}
      transition={MOTION_TRANSITION.entrance}
      className={cn(
        'mt-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      {children}
    </m.div>
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
