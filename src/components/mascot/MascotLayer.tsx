import { useMemo } from 'react'
import { useStore } from '@/store/store'
import { MascotBubble } from './MascotBubble'

/** The app's one restrained mascot instance, owned by the shell. */
export function MascotLayer() {
  const allTips = useStore((s) => s.tips)
  const tips = useMemo(() => allTips.filter((tip) => !tip.pillar), [allTips])

  return (
    <div className="pointer-events-none fixed bottom-3 right-4 z-30 hidden lg:block">
      <div className="pointer-events-auto">
        <MascotBubble tips={tips.length ? tips : allTips} side="left" ramSize={52} floating />
      </div>
    </div>
  )
}
