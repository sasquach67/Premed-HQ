import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, BellRing, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useStore } from '@/store/store'
import { buildAttention } from './attention'
import { cn } from '@/lib/utils'

export function AttentionBell() {
  const data = useStore()
  const update = useStore((state) => state.update)
  const [open, setOpen] = useState(false)
  const items = useMemo(() => buildAttention(data), [data])
  const count = items.filter((item) => item.priority === 'blocking' || item.priority === 'important').length

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener('premed:attention', show)
    return () => window.removeEventListener('premed:attention', show)
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative size-8 rounded-full bg-card" aria-label={`Attention${count ? `, ${count} important items` : ''}`}>
          {count ? <BellRing className="size-4" /> : <Bell className="size-4" />}
          {count > 0 && <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-extrabold leading-4 text-destructive-foreground">{count > 9 ? '9+' : count}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(25rem,calc(100vw-1rem))] p-0 max-sm:fixed max-sm:bottom-2 max-sm:left-2 max-sm:right-2 max-sm:top-auto max-sm:w-auto">
        <div className="border-b border-border px-4 py-3">
          <p className="font-display text-base font-extrabold">Attention</p>
          <p className="text-xs text-muted-foreground">Deadlines that deserve a decision now.</p>
        </div>
        <ScrollArea className="h-[min(60vh,30rem)]">
          <div className="p-2">
          {!items.length && <div className="px-4 py-8 text-center"><Bell className="mx-auto size-6 text-primary" /><p className="mt-2 text-sm font-bold">Nothing needs attention</p><p className="mt-1 text-xs text-muted-foreground">You’re clear for now.</p></div>}
          {items.map((item) => (
            <div key={item.id} className="rounded-xl px-3 py-3 hover:bg-muted/55">
              <div className="flex items-start gap-3">
                <span className={cn('mt-1 size-2 shrink-0 rounded-full', item.priority === 'blocking' ? 'bg-destructive' : item.priority === 'important' ? 'bg-primary' : 'bg-muted-foreground')} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-extrabold">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.why} · {item.source === 'deadline' ? 'Deadline' : item.source}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button asChild size="sm" onClick={() => setOpen(false)}><Link to={item.route}>{item.actionLabel}</Link></Button>
                    <Button size="sm" variant="ghost" onClick={() => update((draft) => { draft.settings.attentionSnoozedUntil[item.id] = Date.now() + 24 * 60 * 60 * 1000 })}><Clock3 className="size-3.5" /> Tomorrow</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
