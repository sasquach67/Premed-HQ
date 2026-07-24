import { Bot, GitBranch, Quote, Send } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOTION_GESTURE, MOTION_TRANSITION } from '@/lib/motion'

/** Parked building blocks only. Atlas composition and knowledge-graph chrome are deferred. */
export function AtlasAgentAvatar({ label = 'Atlas' }: { label?: string }) {
  return <m.span whileHover={MOTION_GESTURE.lift} transition={MOTION_TRANSITION.micro} className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm" aria-label={label}><Bot className="size-4" /></m.span>
}

export function AtlasBranch({ label, children }: { label: string; children?: React.ReactNode }) {
  return <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={MOTION_TRANSITION.standard} className="glass-surface rounded-xl border p-3"><p className="flex items-center gap-2 text-sm font-bold"><GitBranch className="size-4 text-primary" />{label}</p>{children && <div className="mt-2 pl-6 text-sm text-muted-foreground">{children}</div>}</m.div>
}

export function AtlasInput({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="glass-surface flex items-center gap-2 rounded-2xl border p-2 focus-within:ring-2 focus-within:ring-ring">
      <Input className="min-w-0 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0" value={value} onChange={(event) => onChange(event.target.value)} aria-label="Atlas message" />
      <Button type="button" size="icon" className="rounded-xl" onClick={onSubmit} disabled={!value.trim()} aria-label="Send message"><Send className="size-4" /></Button>
    </div>
  )
}

export function AtlasTypewriterText({ children }: { children: string }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <span>{children}</span>
  return (
    <m.span
      aria-label={children}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.012 } } }}
    >
      {Array.from(children).map((character, index) => (
        <m.span key={`${character}-${index}`} aria-hidden="true" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: MOTION_TRANSITION.micro } }}>
          {character}
        </m.span>
      ))}
    </m.span>
  )
}

export function AtlasTweetCard({ author, children }: { author: string; children: React.ReactNode }) {
  return <m.figure whileHover={MOTION_GESTURE.glowLift} transition={MOTION_TRANSITION.micro} className="glass-surface rounded-2xl border p-4"><Quote className="size-4 text-primary" /><blockquote className="mt-2 text-sm">{children}</blockquote><figcaption className="mt-3 text-xs font-bold text-muted-foreground">{author}</figcaption></m.figure>
}
