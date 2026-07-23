import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { m } from "motion/react"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle-variants"
import { MOTION_TRANSITION } from "@/lib/motion"

function Toggle({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root asChild {...props}>
      <m.button
        data-slot="toggle"
        whileTap={{ scale: 0.97 }}
        transition={MOTION_TRANSITION.micro}
        className={cn(toggleVariants({ variant, size, className }))}
      >
        {children}
      </m.button>
    </TogglePrimitive.Root>
  )
}

export { Toggle }
