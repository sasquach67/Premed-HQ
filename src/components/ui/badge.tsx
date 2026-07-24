import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'interactive-glass inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'glass-primary text-primary-foreground',
        secondary: 'glass-secondary text-secondary-foreground',
        outline: 'text-foreground',
        muted: 'glass-muted text-muted-foreground',
        success: 'glass-success text-[color-mix(in_srgb,var(--success)_48%,var(--foreground))]',
        warning: 'glass-warning text-[color-mix(in_srgb,var(--warning)_48%,var(--foreground))]',
        danger: 'glass-destructive text-destructive-foreground',
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
