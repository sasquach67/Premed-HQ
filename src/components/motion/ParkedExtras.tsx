import { ExternalLink, Moon, Pin, Sun } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION } from '@/lib/motion'

export function PreviewLinkCard({ href, title, description }: { href: string; title: string; description?: string }) {
  return (
    <m.a href={href} target="_blank" rel="noreferrer" whileHover={{ y: -2 }} transition={MOTION_TRANSITION.micro} className="block rounded-2xl border border-border bg-card p-4 shadow-sm">
      <span className="flex items-center justify-between gap-3 font-bold">{title}<ExternalLink className="size-4 text-primary" /></span>
      {description && <span className="mt-1 block text-sm text-muted-foreground">{description}</span>}
    </m.a>
  )
}

export function PinList({ items }: { items: Array<{ id: string; label: string }> }) {
  return <ul className="space-y-2">{items.map((item) => <li key={item.id} className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold"><Pin className="size-3.5 text-primary" />{item.label}</li>)}</ul>
}

export function ThemeToggleButton({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <m.button type="button" whileTap={{ scale: 0.94 }} transition={MOTION_TRANSITION.micro} className="grid size-9 place-items-center rounded-full border border-border bg-card" onClick={onToggle} aria-label={isDark ? 'Switch to light appearance' : 'Switch to dark appearance'}>
      <m.span key={isDark ? 'moon' : 'sun'} initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 1, rotate: 0 }} transition={MOTION_TRANSITION.micro}>
        {isDark ? <Moon className="size-4 text-primary" /> : <Sun className="size-4 text-warning" />}
      </m.span>
    </m.button>
  )
}

/** Parked for genuine milestone events only. */
export function MilestoneFireworks({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion()
  if (!active || reduceMotion) return null
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <m.span
          key={index}
          className={cn('absolute left-1/2 top-1/2 size-1.5 rounded-full', index % 3 === 0 ? 'bg-primary' : index % 3 === 1 ? 'bg-success' : 'bg-warning')}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: 0, x: Math.cos(index) * 110, y: Math.sin(index) * 90, scale: 1 }}
          transition={MOTION_TRANSITION.celebration}
        />
      ))}
    </div>
  )
}

/** Parked for logged-out auth/landing surfaces only. */
export function AuthAtmosphere() {
  return <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent_35%),radial-gradient(circle_at_75%_70%,color-mix(in_srgb,var(--leaf)_12%,transparent),transparent_38%)]" aria-hidden="true" />
}

