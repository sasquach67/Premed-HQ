import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { useStore } from '@/store/store'
import { homeBanner } from '@/lib/themeAssets'
import { cn } from '@/lib/utils'

/** Wide Ghibli-art header banner (Notion-cover style). Renders the image with a
 *  fallback chain (page image → banner-default → home-banner → painted gradient)
 *  and a bottom scrim so the title stays legible over the art. */
export function PageBanner({
  image, title, actions, children, height = 200, className,
}: {
  image?: string
  title?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  height?: number
  className?: string
}) {
  const visualTheme = useStore((s) => s.settings.visualTheme)
  const candidates = useMemo(
    () => [image, visualTheme === 'doraemon' ? '/art/banner-default-doraemon.jpg' : undefined, '/art/banner-default.jpg', homeBanner(visualTheme), homeBanner('ghibli')].filter(Boolean) as string[],
    [image, visualTheme]
  )
  const [idx, setIdx] = useState(0)
  const src = candidates[idx]

  useEffect(() => setIdx(0), [candidates])

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-border card-soft', className)} style={{ height }}>
      {src ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 size-full object-cover"
          onError={() => setIdx((i) => i + 1)}
          draggable={false}
        />
      ) : (
        <div className="page-banner absolute inset-0" />
      )}
      {/* legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          {title && <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>}
          {children}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}
