import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { MOTION_TRANSITION } from '@/lib/motion'

export function AppMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={MOTION_TRANSITION.standard}>
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}

