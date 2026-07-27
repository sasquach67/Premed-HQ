import { createEmptyCard, fsrs, type Card, type CardInput, type Grade } from 'ts-fsrs'
import type { TopicFsrsState } from '@/lib/types'

const scheduler = fsrs()

function toMillis(value: Date | number | string | null | undefined): number | undefined {
  if (value == null) return undefined
  const millis = value instanceof Date ? value.getTime() : new Date(value).getTime()
  return Number.isFinite(millis) ? millis : undefined
}

export function serializeFsrsCard(card: Card): TopicFsrsState {
  return {
    due: card.due.getTime(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsedDays: card.elapsed_days,
    scheduledDays: card.scheduled_days,
    learningSteps: card.learning_steps,
    reps: card.reps,
    lapses: card.lapses,
    state: Number(card.state),
    lastReview: toMillis(card.last_review),
  }
}

export function createTopicFsrsState(now: Date | number = Date.now()): TopicFsrsState {
  return serializeFsrsCard(createEmptyCard(now))
}

export function toFsrsCardInput(state: TopicFsrsState): CardInput {
  return {
    due: state.due,
    stability: state.stability,
    difficulty: state.difficulty,
    elapsed_days: state.elapsedDays,
    scheduled_days: state.scheduledDays,
    learning_steps: state.learningSteps,
    reps: state.reps,
    lapses: state.lapses,
    state: state.state,
    last_review: state.lastReview ?? null,
  }
}

/** Retrievability is derived from the canonical FSRS memory state. It is not
 * persisted as a second, drift-prone value. */
export function topicRetrievability(state: TopicFsrsState, now: Date | number = Date.now()): number {
  const value = scheduler.get_retrievability(toFsrsCardInput(state), now, false)
  return Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0))
}

export function reviewTopic(
  state: TopicFsrsState,
  grade: Grade,
  now: Date | number = Date.now(),
): TopicFsrsState {
  return serializeFsrsCard(scheduler.next(toFsrsCardInput(state), now, grade).card)
}
