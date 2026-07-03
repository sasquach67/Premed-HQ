import { useMemo } from 'react'
import { useStore } from '@/store/store'
import { ROUTE_MAP, type MascotSpot } from '@/app/routes'
import { MascotBubble } from './MascotBubble'
import { cn } from '@/lib/utils'

const CORNER: Record<Exclude<MascotSpot, 'home' | 'hidden'>, { pos: string; side: 'left' | 'right' }> = {
  'top-right': { pos: 'top-20 right-5', side: 'left' },
  'bottom-right': { pos: 'bottom-5 right-5', side: 'left' },
  'bottom-left': { pos: 'bottom-5 left-5 lg:left-[17rem]', side: 'right' },
}

/** Floats the ram into the corner each route declares.
 *  Home renders its own inline mascot, so it's skipped here. */
export function MascotLayer({ routeId }: { routeId: string }) {
  const allTips = useStore((s) => s.tips)
  const spot = ROUTE_MAP[routeId]?.mascot ?? 'hidden'

  const tips = useMemo(() => {
    const scoped = allTips.filter((t) => t.pillar === routeId)
    const general = allTips.filter((t) => !t.pillar)
    const list = [...scoped, ...general]
    return list.length ? list : allTips
  }, [allTips, routeId])

  if (spot === 'home' || spot === 'hidden') return null
  const c = CORNER[spot]

  return (
    <div className={cn('pointer-events-none fixed z-30 hidden md:block', c.pos)}>
      <div className="pointer-events-auto">
        <MascotBubble tips={tips} side={c.side} ramSize={76} floating />
      </div>
    </div>
  )
}
