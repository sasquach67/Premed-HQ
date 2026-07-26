import { useRef, useState } from 'react'
import { CheckCircle2, FileUp } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { MOTION_DISTANCE, MOTION_GESTURE, MOTION_TRANSITION } from '@/lib/motion'

export function AnimatedFileUpload({
  onFiles,
  accept,
  multiple = true,
  className,
  label = 'Drop class files here or browse',
  description = 'Stored as references in this class kit.',
}: {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  className?: string
  label?: string
  description?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [lastCount, setLastCount] = useState(0)
  const reduceMotion = useReducedMotion()

  function deliver(list: FileList | null) {
    const files = Array.from(list ?? [])
    if (files.length) {
      setLastCount(files.length)
      onFiles(files)
    }
  }

  return (
    <m.button
      type="button"
      className={cn('grid w-full place-items-center rounded-2xl border border-dashed border-border bg-card card-soft px-4 py-5 text-center hover:border-primary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', dragging && 'border-primary bg-primary/10', className)}
      animate={reduceMotion ? undefined : { scale: dragging ? 1.01 : 1, y: dragging ? -MOTION_DISTANCE.small / 2 : 0 }}
      whileTap={reduceMotion ? undefined : MOTION_GESTURE.subtlePress}
      transition={MOTION_TRANSITION.micro}
      onClick={() => inputRef.current?.click()}
      onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => { event.preventDefault(); setDragging(false); deliver(event.dataTransfer.files) }}
    >
      <m.span animate={reduceMotion ? undefined : { y: dragging ? -2 : 0 }} transition={MOTION_TRANSITION.micro}>
        {lastCount ? <CheckCircle2 className="size-5 text-success" /> : <FileUp className="size-5 text-primary" />}
      </m.span>
      <span className="mt-2 text-sm font-bold">{lastCount ? `${lastCount} ${lastCount === 1 ? 'file' : 'files'} added` : label}</span>
      <span className="mt-1 text-xs text-muted-foreground">{dragging ? 'Release to add these files.' : description}</span>
      <input ref={inputRef} hidden type="file" accept={accept} multiple={multiple} onChange={(event) => { deliver(event.target.files); event.currentTarget.value = '' }} />
    </m.button>
  )
}
