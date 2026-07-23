import type { Transition, Variants } from 'motion/react'

export const MOTION_DURATION = {
  micro: 0.12,
  standard: 0.2,
  entrance: 0.3,
} as const

export const MOTION_DISTANCE = {
  small: 8,
  medium: 16,
} as const

export const MOTION_EASE = {
  enter: [0.16, 1, 0.3, 1],
  symmetric: [0.4, 0, 0.2, 1],
} as const

export const MOTION_TRANSITION = {
  micro: { duration: MOTION_DURATION.micro, ease: MOTION_EASE.enter },
  standard: { duration: MOTION_DURATION.standard, ease: MOTION_EASE.enter },
  entrance: { duration: MOTION_DURATION.entrance, ease: MOTION_EASE.enter },
  toggle: { duration: MOTION_DURATION.micro, ease: MOTION_EASE.symmetric },
  celebration: { type: 'spring', stiffness: 360, damping: 22, mass: 0.8 },
} satisfies Record<string, Transition>

export const fadeThrough: Variants = {
  hidden: { opacity: 0, y: MOTION_DISTANCE.small },
  visible: { opacity: 1, y: 0, transition: MOTION_TRANSITION.entrance },
  exit: { opacity: 0, y: -MOTION_DISTANCE.small, transition: MOTION_TRANSITION.micro },
}

export const microScaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: MOTION_TRANSITION.standard },
  exit: { opacity: 0, scale: 0.98, transition: MOTION_TRANSITION.micro },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: MOTION_DISTANCE.medium },
  visible: { opacity: 1, x: 0, transition: MOTION_TRANSITION.standard },
  exit: { opacity: 0, x: MOTION_DISTANCE.medium, transition: MOTION_TRANSITION.micro },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
}

/** Shared mechanism map. Motion is presentational and must never alter source values. */
export const MOTION_MECHANISM = {
  originAwarePeek: 'layoutId',
  enterExit: 'AnimatePresence',
  orderedEntrance: 'variants + staggerChildren',
  viewportReveal: 'whileInView / useInView',
  scrollLinked: 'useScroll + useTransform',
  coordinatedLayout: 'LayoutGroup',
  reorder: 'Reorder',
  constrainedDrag: 'drag + dragConstraints',
  microinteraction: 'whileHover / whileTap / whileFocus',
  exactValueFollow: 'useTransform',
  chartDraw: 'SVG pathLength',
  milestoneOnly: 'spring',
} as const

