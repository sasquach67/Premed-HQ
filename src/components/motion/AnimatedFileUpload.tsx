import { useRef, useState } from 'react'
import { FileUp } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_TRANSITION } from '@/lib/motion'

export function AnimatedFileUpload({
  onFiles,
  accept,
  multiple = true,
  className,
}: {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  className?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const reduceMotion = useReducedMotion()

  function deliver(list: FileList | null) {
    const files = Array.from(list ?? [])
    if (files.length) onFiles(files)
  }

  return (
    <m.button
      type="button"
      className={cn('grid w-full place-items-center rounded-2xl border border-dashed border-border bg-muted/25 px-4 py-5 text-center hover:border-primary/55 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', dragging && 'border-primary bg-primary/10', className)}
      animate={reduceMotion ? undefined : { scale: dragging ? 1.01 : 1 }}
      transition={MOTION_TRANSITION.micro}
      onClick={() => inputRef.current?.click()}
      onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => { event.preventDefault(); setDragging(false); deliver(event.dataTransfer.files) }}
    >
      <FileUp className="size-5 text-primary" />
      <span className="mt-2 text-sm font-semibold">Drop class files here or browse</span>
      <span className="mt-1 text-xs text-muted-foreground">Stored as references in this class kit.</span>
      <input ref={inputRef} hidden type="file" accept={accept} multiple={multiple} onChange={(event) => { deliver(event.target.files); event.currentTarget.value = '' }} />
    </m.button>
  )
}

