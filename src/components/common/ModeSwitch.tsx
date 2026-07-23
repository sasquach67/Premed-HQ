import { cn } from '@/lib/utils'

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
  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const index = options.findIndex((option) => option.id === value)
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const next = options[(index + delta + options.length) % options.length]
    onChange(next.id)
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="inline-flex rounded-xl border border-border bg-muted/55 p-1"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          tabIndex={value === option.id ? 0 : -1}
          onClick={() => onChange(option.id)}
          className={cn(
            'min-h-9 rounded-lg px-4 text-sm font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none',
            value === option.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
