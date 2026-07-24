import { Orbit, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardContent } from '@/components/ui/card'

export function Atlas() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader title="Atlas" />
      <div className="grid min-h-[44vh] place-items-center">
        <Card className="w-full max-w-3xl overflow-hidden border-primary/20 bg-gradient-to-br from-card to-primary/5">
          <CardContent className="px-6 py-12 text-center sm:px-12">
            <div className="mx-auto grid size-14 place-items-center rounded-xl bg-primary/10 text-primary">
              <Orbit className="size-7" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Reserved space</p>
            <h2 className="mt-2 font-display text-lg font-semibold">Atlas is coming soon</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Atlas will connect your coursework, experiences, stories, and school research. The knowledge graph itself is intentionally deferred.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" /> Your existing data stays ready for it
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
