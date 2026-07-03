import { Link } from 'react-router-dom'
import { Cloud, CloudOff, Check, Loader2, ShieldCheck } from 'lucide-react'
import { useBackup } from '@/store/useBackup'
import { fmtTimeAgo } from '@/lib/date'
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/** Compact "your data is safe" indicator: localStorage is always on;
 *  Drive shows last-backed-up + live status. Links to Settings. */
export function BackupIndicator() {
  const { enabled, status, lastBackupAt } = useBackup()

  const drive = !enabled
    ? { icon: CloudOff, text: 'Set up backup', tone: 'muted' as const }
    : status === 'saving'
      ? { icon: Loader2, text: 'Backing up…', tone: 'busy' as const }
      : status === 'error' || status === 'offline'
        ? { icon: CloudOff, text: 'Reconnect Drive', tone: 'warn' as const }
        : { icon: Cloud, text: lastBackupAt ? `Drive · ${fmtTimeAgo(lastBackupAt)}` : 'Drive ready', tone: 'ok' as const }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to="/settings"
          className="flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold card-soft hover:bg-muted"
        >
          <span className="flex items-center gap-1 text-[color-mix(in_srgb,var(--success)_60%,var(--foreground))]">
            <ShieldCheck className="size-3.5" /> Autosaved
          </span>
          <span className="h-3 w-px bg-border" />
          <span
            className={cn(
              'flex items-center gap-1',
              drive.tone === 'ok' && 'text-primary',
              drive.tone === 'warn' && 'text-destructive',
              drive.tone === 'muted' && 'text-muted-foreground',
              drive.tone === 'busy' && 'text-muted-foreground'
            )}
          >
            <drive.icon className={cn('size-3.5', drive.tone === 'busy' && 'animate-spin')} />
            {drive.text}
            {drive.tone === 'ok' && status === 'saved' && <Check className="size-3" />}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        Every edit saves instantly to this browser. {enabled ? 'Google Drive holds a daily backup copy.' : 'Connect Google Drive in Settings for an off-device backup.'}
      </TooltipContent>
    </Tooltip>
  )
}
