import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { m } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_GESTURE, MOTION_TRANSITION } from '@/lib/motion'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border text-sm font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-sm hover:brightness-105 hover:shadow-md',
        secondary: 'border-transparent bg-secondary text-secondary-foreground shadow-sm hover:brightness-[0.97]',
        outline: 'border-border bg-transparent text-foreground hover:bg-muted',
        ghost: 'border-transparent bg-transparent text-foreground hover:bg-muted',
        destructive: 'border-transparent bg-destructive text-destructive-foreground shadow-sm hover:brightness-105',
        link: 'border-transparent bg-transparent text-primary shadow-none underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }))
    if (asChild) return <Slot ref={ref} className={classes} {...props} />
    const motionProps = props as unknown as React.ComponentPropsWithoutRef<typeof m.button>
    return <m.button ref={ref} whileHover={{ y: -1 }} whileTap={MOTION_GESTURE.press} transition={MOTION_TRANSITION.micro} className={classes} {...motionProps} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
