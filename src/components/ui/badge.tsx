import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border text-foreground',
        muted: 'border-transparent bg-muted text-muted-foreground',
        success: 'border-transparent bg-[color-mix(in_srgb,var(--success)_18%,transparent)] text-[color-mix(in_srgb,var(--success)_55%,var(--foreground))]',
        warning: 'border-transparent bg-[color-mix(in_srgb,var(--warning)_20%,transparent)] text-[color-mix(in_srgb,var(--warning)_55%,var(--foreground))]',
        danger: 'border-transparent bg-[color-mix(in_srgb,var(--destructive)_16%,transparent)] text-[color-mix(in_srgb,var(--destructive)_60%,var(--foreground))]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
