import type { ReactNode } from 'react'
import { PageBanner } from './PageBanner'

/** Page title block = a Ghibli art banner with the title overlaid.
 *  No explainer copy — just the title + any page actions (minimalism rule).
 *  `image` lets a page override its banner; otherwise it falls back to the
 *  default/home art (see PageBanner). */
export function PageHeader({
  title, actions, image,
}: { title: string; actions?: ReactNode; image?: string }) {
  return (
    <div className="mb-6">
      <PageBanner title={title} actions={actions} image={image} height={188} />
    </div>
  )
}
