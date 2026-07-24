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
      className="inline-flex h-10 items-center gap-2.5 rounded-full border border-border bg-card px-3 shadow-sm transition-colors duration-200 hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
    >
      <span className={cn('text-sm font-extrabold transition-colors duration-200 motion-reduce:transition-none', checked ? 'text-muted-foreground' : 'text-foreground')}>
        {left.label}
      </span>
      <span className={cn('relative h-6 w-11 rounded-full transition-colors duration-200 motion-reduce:transition-none', checked ? 'bg-primary' : 'bg-muted-foreground/45')} aria-hidden="true">
        <m.span
          className="absolute left-1 top-1 size-4 rounded-full bg-card shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={MOTION_TRANSITION.standard}
        />
      </span>
      <span className={cn('text-sm font-extrabold transition-colors duration-200 motion-reduce:transition-none', checked ? 'text-foreground' : 'text-muted-foreground')}>
        {right.label}
      </span>
    </m.button>
  )
}
