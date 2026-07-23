import { Bot, GitBranch, Quote, Send } from 'lucide-react'
import { m } from 'motion/react'
import { cn } from '@/lib/utils'
import { fadeThrough, MOTION_TRANSITION } from '@/lib/motion'

/** Parked building blocks only. Atlas composition and knowledge-graph chrome are deferred. */
export function AtlasBubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('max-w-[42rem] rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-sm', className)}>{children}</div>
}

export function AtlasMessage({ author, children }: { author: string; children: React.ReactNode }) {
  return (
    <m.article variants={fadeThrough} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-[2rem_1fr] gap-3">
      <AtlasAgentAvatar label={author} />
      <div><p className="mb-1 text-xs font-extrabold text-muted-foreground">{author}</p><AtlasBubble>{children}</AtlasBubble></div>
    </m.article>
  )
}

export function AtlasMessageScroller({ children }: { children: React.ReactNode }) {
  return <div className="max-h-[32rem] space-y-4 overflow-y-auto overscroll-contain pr-2">{children}</div>
}

export function AtlasMarker({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{children}</span>
}

export function AtlasAgentAvatar({ label = 'Atlas' }: { label?: string }) {
  return <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground" aria-label={label}><Bot className="size-4" /></span>
}

export function AtlasBranch({ label, children }: { label: string; children?: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-muted/30 p-3"><p className="flex items-center gap-2 text-sm font-bold"><GitBranch className="size-4 text-primary" />{label}</p>{children && <div className="mt-2 pl-6 text-sm text-muted-foreground">{children}</div>}</div>
}

export function AtlasInput({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-input bg-card p-2 focus-within:ring-2 focus-within:ring-ring">
      <input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" value={value} onChange={(event) => onChange(event.target.value)} aria-label="Atlas message" />
      <m.button type="button" whileTap={{ scale: 0.96 }} transition={MOTION_TRANSITION.micro} className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50" onClick={onSubmit} disabled={!value.trim()} aria-label="Send message"><Send className="size-4" /></m.button>
    </div>
  )
}

export function AtlasTypewriterText({ children }: { children: string }) {
  return <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={MOTION_TRANSITION.standard}>{children}</m.span>
}

export function AtlasTweetCard({ author, children }: { author: string; children: React.ReactNode }) {
  return <figure className="rounded-2xl border border-border bg-card p-4"><Quote className="size-4 text-primary" /><blockquote className="mt-2 text-sm">{children}</blockquote><figcaption className="mt-3 text-xs font-bold text-muted-foreground">{author}</figcaption></figure>
}

