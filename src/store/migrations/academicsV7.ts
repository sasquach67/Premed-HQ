import type { AppData } from '@/lib/types'

/** D6 additive migration. It records honest source ranges and assignment
 * provenance without moving, merging, dropping, or reinterpreting any chunk. */
export function migrateAcademicsV7(data: AppData): AppData {
  const center = data.academics.classCenter

  for (const chunk of center.sourceChunks ?? []) {
    chunk.characterStart ??= 0
    chunk.characterEnd ??= chunk.content.length
    chunk.assignmentMethod ??= chunk.topicId ? 'manual' : 'pending'
    chunk.assignmentConfirmed ??= Boolean(chunk.topicId)
  }

  for (const file of center.files ?? []) {
    if (file.processingStatus) continue
    file.processingStatus = center.sourceChunks.some((chunk) => chunk.fileId === file.id)
      ? 'ready'
      : 'pending'
  }

  return data
}
