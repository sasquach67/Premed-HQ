import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { smartNextActions } from '@/lib/intelligence'
import { MOTION_TRANSITION } from '@/lib/motion'
import { useStore } from '@/store/store'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function SmartActionPanel({
  title = 'Smart next actions',
  className,
}: {
  title?: string
  className?: string
}) {
  const state = useStore()
  const accept = useStore((store) => store.acceptRecommendation)
  const dismiss = useStore((store) => store.dismissRecommendation)
  const reduceMotion = useReducedMotion()
  const recommendations = smartNextActions(state)

  return (
    <AnimatePresence initial={false}>
      {!!recommendations.length && (
        <m.section
          aria-labelledby="smart-actions-heading"
          layout={!reduceMotion}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
          className={className}
        >
          <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle id="smart-actions-heading" className="flex items-center gap-2 text-lg">
              <Sparkles className="size-5 text-primary" aria-hidden="true" />
              {title}
            </CardTitle>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">
              Deterministic suggestions, each with the reason it appeared.
            </p>
          </div>
          <Badge variant="outline">{recommendations.length} ready</Badge>
        </CardHeader>
        <CardContent>
          <div className={cn(
            'grid gap-3',
            recommendations.length === 2 && 'md:grid-cols-2',
            recommendations.length >= 3 && 'lg:grid-cols-3',
          )}>
            <AnimatePresence initial={false}>
              {recommendations.map((recommendation) => (
                <m.article
                  key={recommendation.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
                  transition={reduceMotion ? MOTION_TRANSITION.instant : MOTION_TRANSITION.standard}
                  className="flex min-h-40 flex-col rounded-2xl border border-border bg-muted/35 p-4 shadow-inner"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        recommendation.severity === 'blocking' && 'border-destructive/45 text-destructive',
                        recommendation.severity === 'important' && 'border-warning/45 text-warning',
                      )}
                    >
                      {recommendation.severity}
                    </Badge>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      aria-label={`Dismiss ${recommendation.title}`}
                      onClick={() => dismiss(recommendation)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold leading-tight">{recommendation.title}</h3>
                  <p className="mt-2 flex-1 text-xs font-semibold leading-relaxed text-muted-foreground">
                    {recommendation.why}
                  </p>
                  <Button asChild size="sm" className="mt-4 self-start">
                    <Link to={recommendation.route} onClick={() => accept(recommendation.id)}>
                      {recommendation.actionLabel}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </m.article>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
          </Card>
        </m.section>
      )}
    </AnimatePresence>
  )
}
