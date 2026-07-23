/* ============================================================
   DateField — themed date picker matching the app's UI (rounded,
   warm-paper / warm-dark, Baloo numerals). Replaces the native
   <input type="date"> whose OS popup clashes with the design.
   Built on the existing Radix Popover + date-fns; no new deps.
   Value is an ISO 'yyyy-MM-dd' string ('' = unset).
   ============================================================ */
import { useMemo, useState } from 'react'
import {
  addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay,
  isSameMonth, parseISO, startOfMonth, startOfWeek, subMonths,
} from 'date-fns'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function toDate(iso: string): Date | null {
  if (!iso) return null
  const d = parseISO(iso)
  return Number.isNaN(d.getTime()) ? null : d
}

export function DateField({
  value, onChange, placeholder = 'Pick a date', ariaLabel, className, align = 'start',
}: {
  value: string
  onChange: (iso: string) => void
  placeholder?: string
  ariaLabel?: string
  className?: string
  align?: 'start' | 'center' | 'end'
}) {
  const selected = toDate(value)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => selected ?? new Date())

  const days = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(view), { weekStartsOn: 0 })
    const gridEnd = endOfWeek(endOfMonth(view), { weekStartsOn: 0 })
    return eachDayOfInterval({ start: gridStart, end: gridEnd })
  }, [view])

  const today = new Date()

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) setView(selected ?? new Date()) }}>
      <PopoverTrigger
        aria-label={ariaLabel ?? placeholder}
        className={cn(
          'inline-flex h-auto min-h-8 w-full items-center gap-1.5 rounded-full border border-border/70 bg-transparent px-2.5 py-1 text-left text-sm font-normal shadow-none transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35',
          !selected && 'text-muted-foreground',
          className,
        )}
      >
        <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="min-w-0 truncate tabular-nums">{selected ? format(selected, 'MMM d, yyyy') : placeholder}</span>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-[17rem] rounded-2xl border-border bg-card/95 p-3 font-display shadow-xl backdrop-blur-md"
      >
        <div className="mb-2 flex items-center justify-between">
          <button type="button" aria-label="Previous month" onClick={() => setView((v) => subMonths(v, 1))} className="grid size-7 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35">
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-sm font-extrabold tabular-nums">{format(view, 'MMMM yyyy')}</span>
          <button type="button" aria-label="Next month" onClick={() => setView((v) => addMonths(v, 1))} className="grid size-7 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35">
            <ChevronRight className="size-4" />
          </button>
        </div>
        <div className="mb-1 grid grid-cols-7 text-center text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
          {WEEKDAYS.map((d, i) => <span key={i} className="py-1">{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((day) => {
            const isSel = selected != null && isSameDay(day, selected)
            const isToday = isSameDay(day, today)
            const inMonth = isSameMonth(day, view)
            return (
              <button
                key={day.toISOString()}
                type="button"
                aria-label={format(day, 'PPPP')}
                aria-pressed={isSel}
                onClick={() => { onChange(format(day, 'yyyy-MM-dd')); setOpen(false) }}
                className={cn(
                  'grid size-9 place-items-center rounded-lg text-sm font-bold tabular-nums transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                  !inMonth && 'text-muted-foreground/40',
                  inMonth && !isSel && 'hover:bg-muted',
                  isSel && 'bg-primary text-primary-foreground shadow-sm',
                  !isSel && isToday && 'ring-1 ring-primary/50',
                )}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2">
          <button type="button" onClick={() => { onChange(format(new Date(), 'yyyy-MM-dd')); setOpen(false) }} className="rounded-md px-2 py-1 text-xs font-bold text-primary transition hover:bg-primary/10">
            Today
          </button>
          {selected && (
            <button type="button" onClick={() => { onChange(''); setOpen(false) }} className="rounded-md px-2 py-1 text-xs font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground">
              Clear
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
