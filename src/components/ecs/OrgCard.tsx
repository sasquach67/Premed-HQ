import { useState } from 'react'
import { ExternalLink, MoreHorizontal, Plus, Trash2, UserRoundCheck } from 'lucide-react'
import type { Org } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ORG_COLOR_CLASSES, ORG_COLORS, joinedLabel, orgInitials, reflectionCount, statusLabel } from './ecsUtils'

export function OrgCard({
  org, index, watchlist, onOpen, onNewReflection, onStatus, onDelete,
}: {
  org: Org
  index: number
  watchlist?: boolean
  onOpen: () => void
  onNewReflection: () => void
  onStatus: (status: Org['status']) => void
  onDelete: () => void
}) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const reflections = reflectionCount(org)
  const joined = joinedLabel(org.joinedAt)
  const color = ORG_COLORS[index % ORG_COLORS.length]

  return (
    <div
      className={cn(
        'group relative rounded-xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md',
        watchlist && 'border-dashed bg-warning/5'
      )}
    >
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="flex items-start gap-3">
          <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold', ORG_COLOR_CLASSES[color])}>
            {orgInitials(org.name)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold leading-tight">{org.name || 'Untitled org'}</h3>
                <p className="truncate text-sm font-semibold text-muted-foreground">{org.type || 'Organization'}{org.role ? ` · ${org.role}` : ''}</p>
              </div>
            </div>
            <Badge variant={org.status === 'leader' ? 'success' : org.status === 'inactive' ? 'muted' : org.status === 'interested' ? 'warning' : 'secondary'} className="mt-3">
              {statusLabel(org.status)}{joined ? ` · since ${joined}` : ''}
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span className={cn('inline-flex items-center gap-2 font-semibold', reflections ? 'text-muted-foreground' : 'text-warning')}>
            <span className={cn('size-2 rounded-full', reflections ? 'bg-leaf' : 'bg-warning')} />
            {reflections ? `${reflections} ${reflections === 1 ? 'reflection' : 'reflections'}` : 'No reflection yet'}
          </span>
          {org.meetingInfo && <span className="max-w-[11rem] truncate rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">{org.meetingInfo}</span>}
        </div>
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 size-8 rounded-full opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
            aria-label={`Organization actions for ${org.name || 'organization'}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onOpen}><ExternalLink className="size-4" /> Open profile</DropdownMenuItem>
          <DropdownMenuItem onClick={onNewReflection}><Plus className="size-4" /> New reflection</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatus(org.status === 'leader' ? 'inactive' : 'leader')}>
            <UserRoundCheck className="size-4" /> {org.status === 'leader' ? 'Move to past' : 'Mark as leadership'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={(event) => {
              event.preventDefault()
              setConfirmOpen(true)
            }}
          >
            <Trash2 className="size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete organization?</DialogTitle>
            <DialogDescription>This removes the org profile, reflections, and notes stored for it.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { onDelete(); setConfirmOpen(false) }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
