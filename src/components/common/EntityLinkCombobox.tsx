import { useId, useMemo, useState } from 'react'
import { Check, Plus, Search } from 'lucide-react'
import { normalizeEntityName } from '@/lib/entityMatching'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'

type LinkableEntity = {
  id: string
  name: string
}

export function EntityLinkCombobox<T extends LinkableEntity>({
  label,
  value,
  selectedId,
  items,
  findMatches,
  createLabel,
  placeholder,
  onLink,
  onCreate,
}: {
  label: string
  value: string
  selectedId?: string
  items: T[]
  findMatches: (name: string, items: T[]) => T[]
  createLabel: string
  placeholder?: string
  onLink: (id: string | undefined, displayName: string) => void
  onCreate: (name: string) => T
}) {
  const inputId = useId()
  const listboxId = useId()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const trimmed = value.trim()
  const matches = useMemo(
    () => (trimmed ? findMatches(trimmed, items) : items.filter((item) => !('archived' in item) || !item.archived)).slice(0, 6),
    [findMatches, items, trimmed]
  )
  const exactMatch = items.some((item) => normalizeEntityName(item.name) === normalizeEntityName(trimmed))
  const canCreate = Boolean(trimmed) && !exactMatch
  const optionCount = matches.length + (canCreate ? 1 : 0)

  function select(item: T) {
    onLink(item.id, item.name)
    setOpen(false)
  }

  function create() {
    if (!trimmed) return
    const created = onCreate(trimmed)
    onLink(created.id, created.name)
    setOpen(false)
  }

  function chooseActive() {
    if (activeIndex < matches.length) {
      const match = matches[activeIndex]
      if (match) select(match)
      return
    }
    if (canCreate) create()
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id={inputId}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={open && optionCount ? `${listboxId}-option-${activeIndex}` : undefined}
              value={value}
              placeholder={placeholder}
              className="pl-9 pr-9"
              onFocus={() => {
                setActiveIndex(0)
                setOpen(true)
              }}
              onClick={() => setOpen(true)}
              onChange={(event) => {
                onLink(undefined, event.target.value)
                setActiveIndex(0)
                setOpen(true)
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setOpen(true)
                  setActiveIndex((index) => optionCount ? (index + 1) % optionCount : 0)
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  setOpen(true)
                  setActiveIndex((index) => optionCount ? (index - 1 + optionCount) % optionCount : 0)
                } else if (event.key === 'Enter' && open && optionCount) {
                  event.preventDefault()
                  chooseActive()
                } else if (event.key === 'Escape') {
                  setOpen(false)
                }
              }}
            />
            {selectedId && <Check className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-success" aria-hidden="true" />}
          </div>
        </PopoverAnchor>
        <PopoverContent
          id={listboxId}
          role="listbox"
          aria-label={`${label} matches`}
          className="w-[var(--radix-popover-trigger-width)] min-w-64 max-w-[calc(100vw-2rem)] p-1.5"
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          {matches.length === 0 && !canCreate && (
            <p className="px-3 py-3 text-sm text-muted-foreground">Type a name to find or create a record.</p>
          )}
          {matches.map((item, index) => (
            <button
              id={`${listboxId}-option-${index}`}
              key={item.id}
              type="button"
              role="option"
              aria-selected={item.id === selectedId}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(item)}
              className={cn(
                'flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeIndex === index && 'bg-muted',
                item.id === selectedId && 'font-semibold text-primary'
              )}
            >
              <span className="min-w-0 flex-1 truncate">{item.name}</span>
              {item.id === selectedId && <Check className="size-4 shrink-0" aria-hidden="true" />}
            </button>
          ))}
          {canCreate && (
            <button
              id={`${listboxId}-option-${matches.length}`}
              type="button"
              role="option"
              aria-selected={false}
              onMouseEnter={() => setActiveIndex(matches.length)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={create}
              className={cn(
                'flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeIndex === matches.length && 'bg-muted'
              )}
            >
              <Plus className="size-4 shrink-0" />
              <span className="truncate">{createLabel} “{trimmed}”</span>
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
