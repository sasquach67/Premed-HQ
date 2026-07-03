import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Notion-style right-side slide-over panel. Used wherever a card/row should
 *  "open to read/write" instead of inlining a giant textbox (H1 pattern). */
export function SidePeek({
  open, onOpenChange, title, children, footer, width = 'md',
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  width?: 'md' | 'lg'
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-border bg-card shadow-2xl outline-none',
            'duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
            width === 'lg' ? 'sm:max-w-2xl' : 'sm:max-w-lg'
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3.5">
            <DialogPrimitive.Title className="font-display text-lg font-bold">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X className="size-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && <div className="border-t border-border px-5 py-3">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
