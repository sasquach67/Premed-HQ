import { useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const MCAT_SECTIONS = ['CARS', 'Bio/Biochem', 'Chem/Phys', 'Psych/Soc', 'Mixed Review']
const SESSION_LENGTHS = [30, 45, 60, 75, 90, 105, 120]

export function McatSessionSetupDialog({
  trigger,
  triggerClassName,
}: {
  trigger: ReactNode
  triggerClassName: string
}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState('CARS')
  const [minutes, setMinutes] = useState(90)

  function start(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      section,
      minutes: String(Math.max(10, Math.min(240, Number(minutes) || 90))),
    })
    setOpen(false)
    navigate(`/mcat/session?${params.toString()}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={triggerClassName}>{trigger}</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Play className="size-4 fill-current text-leaf" /> Set up focus session</DialogTitle>
          <DialogDescription>Choose the section and length before the timer starts. You can set the session goal on the focus screen.</DialogDescription>
        </DialogHeader>
        <form onSubmit={start} className="space-y-3">
          <fieldset>
            <legend className="mb-2 text-sm font-bold">MCAT section</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {MCAT_SECTIONS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSection(value)}
                  className={cn(
                    'rounded-2xl border px-3 py-2 text-left text-sm font-extrabold transition',
                    section === value ? 'border-primary bg-primary text-primary-foreground shadow-sm' : 'border-border bg-card hover:bg-muted'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-2 text-sm font-bold">Session length</legend>
            <DurationWheel value={minutes} onChange={setMinutes} />
          </fieldset>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit"><Play className="size-4 fill-current" /> Start session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DurationWheel({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const itemRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  useEffect(() => {
    itemRefs.current[value]?.scrollIntoView({ block: 'center' })
  }, [value])

  return (
    <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-border bg-muted/45 p-2">
      <div className="pointer-events-none absolute inset-x-2 top-1/2 h-11 -translate-y-1/2 rounded-2xl border border-primary/30 bg-primary/12 shadow-sm" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-card to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" />
      <div className="relative h-36 snap-y snap-mandatory overflow-y-auto px-1 py-[50px] text-center">
        {SESSION_LENGTHS.map((minutes) => (
          <button
            key={minutes}
            ref={(node) => {
              itemRefs.current[minutes] = node
            }}
            type="button"
            onClick={() => onChange(minutes)}
            className={cn(
              'flex h-11 w-full snap-center items-center justify-center rounded-2xl text-lg font-extrabold leading-none tabular-nums transition',
              value === minutes ? 'scale-105 text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {minutes} min
          </button>
        ))}
      </div>
    </div>
  )
}
