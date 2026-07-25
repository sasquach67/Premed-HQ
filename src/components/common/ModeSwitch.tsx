import { m } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION } from '@/lib/motion'

export interface ModeSwitchOption<T extends string> {
  id: T
  label: string
}

export function ModeSwitch<T extends string>({
  value,
  options,
  onChange,
  label = 'Page mode',
}: {
  value: T
  options: ModeSwitchOption<T>[]
  onChange: (value: T) => void
  label?: string
}) {
  const left = options[0]
  const right = options[1]
  if (!left || !right) return null

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    onChange(event.key === 'ArrowRight' ? right.id : left.id)
  }

  const checked = value === right.id

  return (
    <m.button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      onClick={() => onChange(checked ? left.id : right.id)}
      onKeyDown={onKeyDown}
      whileTap={{ scale: 0.985 }}
      transition={MOTION_TRANSITION.micro}
      className="relative inline-grid h-10 min-w-56 grid-cols-2 items-stretch rounded-full border border-border bg-muted p-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      <m.span
        aria-hidden
        className="pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow-sm"
        animate={{ x: checked ? '100%' : '0%' }}
        transition={MOTION_TRANSITION.standard}
      />
      <span className={cn('relative z-10 flex min-w-20 items-center justify-center px-4 text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none', checked ? 'text-muted-foreground' : 'text-primary-foreground')}>
        {left.label}
      </span>
      <span className={cn('relative z-10 flex min-w-20 items-center justify-center px-4 text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none', checked ? 'text-primary-foreground' : 'text-muted-foreground')}>
        {right.label}
      </span>
    </m.button>
  )
}
