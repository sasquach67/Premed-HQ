import type { LucideIcon } from 'lucide-react'
import { AlertCircle } from 'lucide-react'
import { EmptyState } from '@/components/common/EmptyState'
import { Button } from '@/components/ui/button'

export type CollectionLoadState = 'ready' | 'loading' | 'error'

export function CollectionState({
  state,
  empty,
  errorMessage = 'This collection could not be loaded.',
  onRetry,
  skeletonRows = 4,
}: {
  state: CollectionLoadState
  empty?: { icon: LucideIcon; title: string; hint: string; action?: React.ReactNode }
  errorMessage?: string
  onRetry?: () => void
  skeletonRows?: number
}) {
  if (state === 'loading') {
    return (
      <div className="space-y-2 rounded-2xl border border-border bg-card p-4" aria-label="Loading collection">
        {Array.from({ length: skeletonRows }, (_, index) => (
          <div key={index} className="h-12 animate-pulse rounded-xl bg-muted motion-reduce:animate-none" />
        ))}
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="grid min-h-48 place-items-center rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-center" role="alert">
        <div>
          <AlertCircle className="mx-auto size-6 text-destructive" aria-hidden="true" />
          <p className="mt-2 text-sm font-bold">Collection unavailable</p>
          <p className="mt-1 text-sm text-muted-foreground">{errorMessage}</p>
          {onRetry && <Button className="mt-3" size="sm" variant="outline" onClick={onRetry}>Retry</Button>}
        </div>
      </div>
    )
  }

  if (empty) {
    return <EmptyState icon={empty.icon} title={empty.title} hint={empty.hint} action={empty.action} />
  }

  return null
}
