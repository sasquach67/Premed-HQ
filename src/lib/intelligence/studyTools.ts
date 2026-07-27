import type { SupabaseClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export type StudyCitation =
  | {
      kind: 'material'
      fileId: string
      chunkId: string
      start: number
      end: number
      title?: string
    }
  | { kind: 'general' }

export interface GapCheckItem {
  text: string
  citation: StudyCitation
}

export interface GapCheckResult {
  covered: GapCheckItem[]
  missed: GapCheckItem[]
  wrong: GapCheckItem[]
  suggestedGrade: 'again' | 'hard' | 'good' | 'easy'
}

export interface GapCheckRequest {
  action: 'gap-check'
  courseId: string
  topicId: string
  response: string
  /** Topic-scoped local sources are mirrored only when the user explicitly
   * runs the gap-check. localStorage remains canonical. */
  sources?: Array<{
    chunkId: string
    fileId: string
    content: string
    start: number
    end: number
  }>
}

export type StudyToolFailureCode =
  | 'unconfigured'
  | 'sign-in-required'
  | 'rate-limited'
  | 'request-too-large'
  | 'invalid-response'
  | 'unavailable'

export type StudyToolResponse<T> =
  | { ok: true; data: T }
  | { ok: false; code: StudyToolFailureCode; message: string }

interface FunctionClient {
  auth: SupabaseClient['auth']
  functions: SupabaseClient['functions']
}

export function isGapCheckResult(value: unknown): value is GapCheckResult {
  if (!isRecord(value) || !isGrade(value.suggestedGrade)) return false
  return ['covered', 'missed', 'wrong'].every((key) => {
    const items = value[key]
    return Array.isArray(items) && items.every(isGapCheckItem)
  })
}

export function createStudyToolsClient(client: FunctionClient | null = supabase) {
  return {
    async gapCheck(request: GapCheckRequest): Promise<StudyToolResponse<GapCheckResult>> {
      if (!client) {
        return { ok: false, code: 'unconfigured', message: 'AI gap-check is not configured. Manual review remains available.' }
      }
      const { data: sessionData } = await client.auth.getSession()
      if (!sessionData.session) {
        return { ok: false, code: 'sign-in-required', message: 'Sign in to use the server-side AI gap-check.' }
      }
      const { data, error } = await client.functions.invoke('study-tools', { body: request })
      if (error) {
        const status = (error as { context?: { status?: number } }).context?.status
        if (status === 429) return { ok: false, code: 'rate-limited', message: 'AI usage limit reached. Try again later.' }
        if (status === 413) return { ok: false, code: 'request-too-large', message: 'This response is too large for one gap-check.' }
        return { ok: false, code: 'unavailable', message: 'AI gap-check is unavailable. Continue with the manual report.' }
      }
      if (!isGapCheckResult(data)) {
        return { ok: false, code: 'invalid-response', message: 'The gap-check returned an invalid result. Nothing was saved.' }
      }
      return { ok: true, data }
    },
  }
}

export const studyTools = createStudyToolsClient()

function isGapCheckItem(value: unknown): value is GapCheckItem {
  if (!isRecord(value) || typeof value.text !== 'string' || !value.text.trim()) return false
  const citation = value.citation
  if (!isRecord(citation) || (citation.kind !== 'material' && citation.kind !== 'general')) return false
  if (citation.kind === 'general') return true
  return typeof citation.fileId === 'string'
    && typeof citation.chunkId === 'string'
    && Number.isInteger(citation.start)
    && Number.isInteger(citation.end)
    && Number(citation.start) >= 0
    && Number(citation.end) > Number(citation.start)
}

function isGrade(value: unknown): value is GapCheckResult['suggestedGrade'] {
  return value === 'again' || value === 'hard' || value === 'good' || value === 'easy'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}
