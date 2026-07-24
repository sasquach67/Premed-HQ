import { useId } from 'react'
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
  const indicatorId = useId()
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
      className="inline-grid h-10 grid-cols-2 items-stretch rounded-xl border border-border bg-muted/55 p-1 shadow-sm transition-colors duration-200 hover:bg-muted/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
    >
      <span className={cn('relative flex min-w-20 items-center justify-center px-3 text-sm font-extrabold transition-colors duration-200 motion-reduce:transition-none', checked ? 'text-muted-foreground' : 'text-foreground')}>
        {!checked && (
          <m.span
            layoutId={`${indicatorId}-mode-indicator`}
            className="absolute inset-0 rounded-lg border border-border/80 bg-card shadow-sm"
            transition={MOTION_TRANSITION.standard}
          />
        )}
        <span className="relative">{left.label}</span>
      </span>
      <span className={cn('relative flex min-w-20 items-center justify-center px-3 text-sm font-extrabold transition-colors duration-200 motion-reduce:transition-none', checked ? 'text-foreground' : 'text-muted-foreground')}>
        {checked && (
          <m.span
            layoutId={`${indicatorId}-mode-indicator`}
            className="absolute inset-0 rounded-lg border border-border/80 bg-card shadow-sm"
            transition={MOTION_TRANSITION.standard}
          />
        )}
        <span className="relative">{right.label}</span>
      </span>
    </m.button>
  )
}
