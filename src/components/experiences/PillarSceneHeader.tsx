/* ============================================================
   PillarSceneHeader — the shared nested background-art hero used by
   every tab (via PageHeader) and by the experience-pillar layout. Art
   sits *behind* the title (+ optional summary) as one layered
   composition: image → dark overlay → gradient fade into the page
   background. Falls back to a warm accent gradient until real art
   lands (see pillarScenes.ts).
   ============================================================ */
import { type ReactNode, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PILLAR_SCENES, type SceneKey } from './pillarScenes'
import { Button } from '@/components/ui/button'

export function PillarSceneHeader({
  scene, accent, title, subtitle, addLabel, onAdd, actions, image, imageFallback, children, compact,
}: {
  scene: SceneKey
  /** Override the scene's default accent. */
  accent?: string
  title: string
  subtitle?: string
  /** Built-in "Add …" button (pillar layouts). */
  addLabel?: string
  onAdd?: () => void
  /** Arbitrary top-right controls (pages via PageHeader). Wins over onAdd. */
  actions?: ReactNode
  /** Override the scene's image. */
  image?: string
  /** Optional fallback when the preferred scene artwork cannot load. */
  imageFallback?: string
  children?: ReactNode
  /** Tighter vertical padding for dense utility pages. */
  compact?: boolean
}) {
  const cfg = PILLAR_SCENES[scene]
  const ink = accent ?? cfg.accent
  const preferredImage = image ?? cfg.image
  const [src, setSrc] = useState(preferredImage)

  useEffect(() => setSrc(preferredImage), [preferredImage])

  return (
    <section
      className="relative isolate overflow-hidden rounded-xl border border-border bg-card"
      aria-label={`${title} header`}
    >
      {/* base fallback gradient — always painted so a missing image still reads intentional */}
      <div className="absolute inset-0 -z-20" style={{ background: cfg.fallbackGradient }} />

      {/* the artwork (hidden if it fails to load) */}
      {src && (
        <img
          src={src}
          alt=""
          aria-hidden
          onError={() => setSrc(src === preferredImage && imageFallback ? imageFallback : undefined)}
          className="absolute inset-0 -z-10 size-full object-cover [object-position:var(--pos)] max-[380px]:[object-position:var(--pos-m)]"
          style={{ '--pos': cfg.position, '--pos-m': cfg.mobilePosition } as React.CSSProperties}
        />
      )}

      {/* readability: accent wash + top scrim + fade to page bg at the bottom */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/65" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/65 to-background/40" />

      <div className={cn('flex min-h-48 flex-col justify-end gap-4 p-6', compact && 'min-h-40')}>
        {/* title row over the art */}
        <div className="flex flex-wrap items-start gap-3 rounded-xl border border-border bg-card/90 p-4 backdrop-blur">
          <span className="mt-1 h-8 w-2 shrink-0 rounded-md" style={{ background: ink }} aria-hidden="true" />
          <div className="min-w-0">
            <h1 className="font-display text-3xl font-semibold leading-tight text-card-foreground">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {actions ?? (onAdd && (
              <Button
                type="button"
                onClick={onAdd}
              >
                <Plus className="size-4" /> {addLabel}
              </Button>
            ))}
          </div>
        </div>

        {children && (
          <div className="rounded-xl border border-border bg-card/90 p-4 text-card-foreground backdrop-blur">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
