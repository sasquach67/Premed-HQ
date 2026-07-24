import { Bot, GitBranch, Quote, Send } from 'lucide-react'
import { m } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOTION_TRANSITION } from '@/lib/motion'

/** Parked building blocks only. Atlas composition and knowledge-graph chrome are deferred. */
export function AtlasAgentAvatar({ label = 'Atlas' }: { label?: string }) {
  return <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground" aria-label={label}><Bot className="size-4" /></span>
}

export function AtlasBranch({ label, children }: { label: string; children?: React.ReactNode }) {
  return <div className="rounded-xl border border-border bg-muted/30 p-3"><p className="flex items-center gap-2 text-sm font-bold"><GitBranch className="size-4 text-primary" />{label}</p>{children && <div className="mt-2 pl-6 text-sm text-muted-foreground">{children}</div>}</div>
}

export function AtlasInput({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-input bg-card p-2 focus-within:ring-2 focus-within:ring-ring">
      <Input className="min-w-0 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0" value={value} onChange={(event) => onChange(event.target.value)} aria-label="Atlas message" />
      <Button type="button" size="icon" className="rounded-xl" onClick={onSubmit} disabled={!value.trim()} aria-label="Send message"><Send className="size-4" /></Button>
    </div>
  )
}

export function AtlasTypewriterText({ children }: { children: string }) {
  return <m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={MOTION_TRANSITION.standard}>{children}</m.span>
}

export function AtlasTweetCard({ author, children }: { author: string; children: React.ReactNode }) {
  return <figure className="rounded-2xl border border-border bg-card p-4"><Quote className="size-4 text-primary" /><blockquote className="mt-2 text-sm">{children}</blockquote><figcaption className="mt-3 text-xs font-bold text-muted-foreground">{author}</figcaption></figure>
}
