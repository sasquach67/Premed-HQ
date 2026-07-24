import { Check, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SaveStatus = 'saved' | 'saving' | 'error'

export function AutosaveStatus({ status = 'saved', className }: { status?: SaveStatus; className?: string }) {
  const label = status === 'saving' ? 'Saving' : status === 'error' ? 'Save failed' : 'Saved'
  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-bold text-muted-foreground',
        status === 'error' && 'text-destructive',
        className
      )}
      role="status"
      aria-live="polite"
    >
      {status === 'saving'
        ? <LoaderCircle className="size-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
        : <Check className="size-3.5" aria-hidden="true" />}
      {label}
    </span>
  )
}
