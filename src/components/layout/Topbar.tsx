import { useState } from 'react'
import { Menu, Moon, Sun, Brain } from 'lucide-react'
import { CommandSearch } from './CommandSearch'
import { BackupIndicator } from './BackupIndicator'
import { UltimateGuideDialog } from '@/components/guide/UltimateGuideDialog'
import { useTheme } from '@/store/useTheme'
import { MCAT_QOTD } from '@/data/mcatQotd'
import { pickDaily } from '@/lib/date'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { isDark, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-background/85 px-4 py-2.5 backdrop-blur md:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu className="size-5" />
      </Button>
      <CommandSearch />

      <div className="flex-1" />

      <div className="ml-auto flex items-center gap-2">
        <UltimateGuideDialog />
        <QotdPopover />
        <BackupIndicator />
        <label className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-xs font-semibold text-muted-foreground">
          <Sun className="size-3.5" aria-hidden="true" />
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          />
          <Moon className="size-3.5" aria-hidden="true" />
        </label>
      </div>
    </header>
  )
}

/** Compact MCAT Question-of-the-Day in a popover (full card lives on Home). */
function QotdPopover() {
  const q = pickDaily(MCAT_QOTD, 13) ?? MCAT_QOTD[0]
  const [picked, setPicked] = useState<number | null>(null)
  const revealed = picked != null
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="hidden gap-1.5 bg-card md:inline-flex" aria-label="Open MCAT question of the day">
          <Brain className="size-4 text-primary" /> QOTD
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Question of the day</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">{q.section}</span>
        </div>
        <p className="mb-2 text-sm font-semibold">{q.question}</p>
        <div className="space-y-1.5">
          {q.choices.map((c, i) => {
            const correct = i === q.answer
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setPicked(i)}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-sm transition-colors',
                  !revealed && 'border-border hover:bg-muted',
                  revealed && correct && 'border-[var(--success)] bg-[color-mix(in_srgb,var(--success)_14%,transparent)]',
                  revealed && !correct && picked === i && 'border-destructive bg-[color-mix(in_srgb,var(--destructive)_12%,transparent)]',
                  revealed && !correct && picked !== i && 'border-border opacity-60'
                )}
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-current text-[10px] font-bold">{String.fromCharCode(65 + i)}</span>
                {c}
              </button>
            )
          })}
        </div>
        {revealed && <p className="mt-2 rounded-lg bg-muted/60 p-2 text-xs text-muted-foreground">{q.explanation}</p>}
      </PopoverContent>
    </Popover>
  )
}
