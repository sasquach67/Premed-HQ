import { Rating } from 'ts-fsrs'
import type {
  AcademicFile, ClassCenterData, KeyPoint, ReviewGrade, SourceChunk, Topic,
} from '@/lib/types'

export type RecallConfidence = 'no-idea' | 'shaky' | 'pretty-sure' | 'know-it-cold'
export type GapDisposition = 'had' | 'missed' | 'wrong'

export interface RecallScopeItem {
  id: string
  label: string
  keyPointId?: string
  provenance:
    | { kind: 'material'; fileId: string; chunkId: string; start: number; end: number }
    | { kind: 'general' }
}

export interface CalibrationResult {
  overconfident: boolean
  underconfident: boolean
  label: string
}

const CONFIDENCE_RANK: Record<RecallConfidence, number> = {
  'no-idea': 0,
  shaky: 1,
  'pretty-sure': 2,
  'know-it-cold': 3,
}

const GRADE_RANK: Record<ReviewGrade, number> = {
  again: 0,
  hard: 1,
  good: 2,
  easy: 3,
}

export const REVIEW_RATINGS = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
} as const

export function buildRecallQueue(
  topics: Topic[],
  now = Date.now(),
  requestedTopicId?: string,
): Topic[] {
  const requested = requestedTopicId ? topics.find((topic) => topic.id === requestedTopicId) : undefined
  const rest = topics
    .filter((topic) => topic.id !== requested?.id)
    .sort((a, b) => {
      const weakDelta = Number(b.status === 'weak') - Number(a.status === 'weak')
      if (weakDelta) return weakDelta
      const neverDelta = Number(a.fsrs.reps > 0) - Number(b.fsrs.reps > 0)
      if (neverDelta) return neverDelta
      return a.fsrs.due - b.fsrs.due || a.order - b.order
    })
  const due = rest.filter((topic) => topic.fsrs.due <= now)
  const fallback = rest.filter((topic) => topic.status === 'weak' || topic.fsrs.reps === 0)
  const selected = due.length ? due : fallback.length ? fallback : rest
  return requested ? [requested, ...selected] : selected
}

export function buildScopeItems(
  topic: Topic,
  keyPoints: KeyPoint[],
  chunks: SourceChunk[],
  files: AcademicFile[],
): RecallScopeItem[] {
  const topicPoints = keyPoints
    .filter((point) => point.topicId === topic.id)
    .sort((a, b) => a.order - b.order)
    .slice(0, 5)

  if (!topicPoints.length) {
    return [{
      id: `topic-${topic.id}`,
      label: topic.title,
      provenance: { kind: 'general' },
    }]
  }

  return topicPoints.map((point) => {
    const chunk = point.sourceChunkIds
      .map((id) => chunks.find((item) => item.id === id))
      .find((item): item is SourceChunk => Boolean(item && files.some((file) => file.id === item.fileId)))
    if (!chunk) {
      return { id: point.id, label: point.text, keyPointId: point.id, provenance: { kind: 'general' as const } }
    }
    const found = chunk.content.toLocaleLowerCase().indexOf(point.text.toLocaleLowerCase())
    const start = found >= 0 ? found : 0
    const end = found >= 0 ? found + point.text.length : Math.min(chunk.content.length, Math.max(1, point.text.length))
    return {
      id: point.id,
      label: point.text,
      keyPointId: point.id,
      provenance: { kind: 'material' as const, fileId: chunk.fileId, chunkId: chunk.id, start, end },
    }
  })
}

export function calibrationFor(confidence: RecallConfidence, grade: ReviewGrade): CalibrationResult {
  const predicted = CONFIDENCE_RANK[confidence]
  const actual = GRADE_RANK[grade]
  const overconfident = predicted >= 2 && actual <= 1
  const underconfident = predicted <= 1 && actual >= 2
  return {
    overconfident,
    underconfident,
    label: overconfident
      ? 'Overconfident'
      : underconfident
        ? 'You knew more than you expected'
        : 'Confidence matched recall',
  }
}

export function confidenceForEvent(confidence: RecallConfidence): 1 | 2 | 3 {
  if (confidence === 'know-it-cold') return 3
  if (confidence === 'pretty-sure') return 2
  return 1
}

export function noKeyLoopAvailable(): true {
  return true
}

export function aiGapCheckAvailable(apiKey?: string): boolean {
  return Boolean(apiKey?.trim())
}

export function sourceForScope(
  item: RecallScopeItem,
  data: Pick<ClassCenterData, 'sourceChunks' | 'files'>,
) {
  if (item.provenance.kind !== 'material') return null
  const provenance = item.provenance
  return {
    chunk: data.sourceChunks.find((chunk) => chunk.id === provenance.chunkId),
    file: data.files.find((file) => file.id === provenance.fileId),
  }
}
