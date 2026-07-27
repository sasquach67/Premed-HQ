import { describe, expect, it } from 'vitest'
import { createStudyToolsClient, isGapCheckResult } from './studyTools'

describe('study tools boundary', () => {
  it('keeps a zero-Supabase clone fully deterministic and offline', async () => {
    const result = await createStudyToolsClient(null).gapCheck({
      action: 'gap-check',
      courseId: 'course-1',
      topicId: 'topic-1',
      response: 'My recall',
      sources: [],
    })
    expect(result).toEqual({
      ok: false,
      code: 'unconfigured',
      message: 'AI gap-check is not configured. Manual review remains available.',
    })
  })

  it('rejects malformed model output instead of accepting prose', () => {
    expect(isGapCheckResult('Looks good!')).toBe(false)
    expect(isGapCheckResult({ covered: [], missed: [], wrong: [], suggestedGrade: 'great' })).toBe(false)
  })

  it('accepts only typed results with valid material ranges', () => {
    expect(isGapCheckResult({
      covered: [{ text: 'ATP is used', citation: { kind: 'material', fileId: 'f', chunkId: 'c', start: 4, end: 12 } }],
      missed: [],
      wrong: [],
      suggestedGrade: 'good',
    })).toBe(true)
  })
})
