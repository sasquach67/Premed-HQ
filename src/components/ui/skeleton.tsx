import { m, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { MOTION_TRANSITION } from "@/lib/motion"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  const reduceMotion = useReducedMotion()
  return (
    <m.div
      data-slot="skeleton"
      className={cn("rounded-md bg-accent", className)}
      animate={reduceMotion ? undefined : { opacity: [0.55, 1] }}
      transition={reduceMotion ? MOTION_TRANSITION.instant : { ...MOTION_TRANSITION.entrance, repeat: Infinity, repeatType: "reverse" }}
      {...props}
    />
  )
}

export { Skeleton }
