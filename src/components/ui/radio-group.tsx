"use client"

import * as React from "react"
import { CircleIcon } from "lucide-react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { m } from "motion/react"

import { cn } from "@/lib/utils"
import { MOTION_GESTURE, MOTION_TRANSITION } from "@/lib/motion"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item asChild {...props}>
      <m.button
        data-slot="radio-group-item"
        whileTap={MOTION_GESTURE.press}
        transition={MOTION_TRANSITION.micro}
        className={cn(
          "field-solid aspect-square size-4 shrink-0 rounded-full border text-primary outline-none transition-colors duration-200 data-[state=checked]:border-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
      >
        <RadioGroupPrimitive.Indicator asChild data-slot="radio-group-indicator">
          <m.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={MOTION_TRANSITION.micro}
            className="relative flex items-center justify-center"
          >
            <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
          </m.span>
        </RadioGroupPrimitive.Indicator>
      </m.button>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
