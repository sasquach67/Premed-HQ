/* Part 2 — data-health + completeness engine.
 *
 * Implements the general.md warning list and data-model §7 completeness states.
 * Every warning is deterministic (a field is present or it is not; a date is
 * before another or it is not) and every warning states WHY it appeared in
 * plain language. No warning carries a confidence score, because none of these
 * checks are uncertain.
 */
import type {
  AppData, CollectionRecord, Course, ExperienceCategory, ExperienceEntry, LetterEntry, Org,
  SchoolEntry, StoryEntry,
} from '@/lib/types'
import { daysSinceUpdate, parseIsoDate } from './derived'
import { INTELLIGENCE_THRESHOLDS, type Completeness, type Explained, type Severity } from './types'

export type EntityKind =
  | 'experience' | 'course' | 'letter' | 'org' | 'school' | 'story'

export interface DataHealthWarning extends Explained {
  /** Stable identity: `${rule}:${entityId}`. Snooze/dismiss keys hang off this. */
  id: string
  rule: string
  severity: Severity
  entityKind: EntityKind
  entityId: string
  /** Human label for the offending record, so the warning reads on its own. */
  entityLabel: string
  route: string
  actionLabel: string
}

const PILLAR_ROUTE: Record<ExperienceCategory, string> = {
  clinical: '/clinical',
  volunteering: '/volunteering',
  shadowing: '/shadowing',
  research: '/research',
  leadership: '/ecs',
}

function isUsableUrl(value?: string): boolean {
  if (!value) return false
  return /^https?:\/\/\S+$/i.test(value.trim())
}

function text(value?: string): boolean {
  return Boolean(value && value.trim())
}

/* ---------------------------------------------------------------------------
 * Completeness (data-model §7 / general.md → Completeness)
 *
 * Labeled states, never a bare number, and always paired with exactly what is
 * still missing. Tiers ladder up: required → documented → export.
 * ------------------------------------------------------------------------- */
type Check = { label: string; present: boolean; tier: 'required' | 'documented' | 'export' }

function completenessFrom(checks: Check[]): Completeness {
  const missing = checks.filter((check) => !check.present).map((check) => check.label)
  const missingRequired = checks.some((check) => check.tier === 'required' && !check.present)
  const missingDocumented = checks.some((check) => check.tier === 'documented' && !check.present)
  const missingExport = checks.some((check) => check.tier === 'export' && !check.present)
  const percent = checks.length
    ? Math.round((checks.filter((check) => check.present).length / checks.length) * 100)
    : 100

  const state = missingRequired
    ? 'incomplete'
    : missingDocumented
      ? 'usable'
      : missingExport
        ? 'well-documented'
        : 'ready-for-export'

  return { state, missing, percent }
}

export function experienceCompleteness(entry: ExperienceEntry): Completeness {
  return completenessFrom([
    { label: 'Organization', present: text(entry.org), tier: 'required' },
    { label: 'Role', present: text(entry.role), tier: 'required' },
    { label: 'Hours', present: (entry.hours || 0) > 0, tier: 'required' },
    { label: 'Start date', present: Boolean(parseIsoDate(entry.startDate)), tier: 'documented' },
    { label: 'Description', present: text(entry.description), tier: 'documented' },
    { label: 'Verification contact', present: text(entry.supervisor) || Boolean(entry.supervisorId), tier: 'export' },
    { label: 'Reflection', present: text(entry.mostMeaningful), tier: 'export' },
  ])
}

export function letterCompleteness(letter: LetterEntry): Completeness {
  return completenessFrom([
    { label: 'Recommender', present: text(letter.recommender) || Boolean(letter.recommenderId), tier: 'required' },
    { label: 'Relationship', present: text(letter.relationship), tier: 'documented' },
    { label: 'Role', present: text(letter.role), tier: 'documented' },
    { label: 'Date asked', present: Boolean(parseIsoDate(letter.dateAsked)), tier: 'export' },
  ])
}

export function courseCompleteness(course: Course): Completeness {
  return completenessFrom([
    { label: 'Course code', present: text(course.code), tier: 'required' },
    { label: 'Credits', present: (course.credits || 0) > 0, tier: 'required' },
    { label: 'Title', present: text(course.title), tier: 'documented' },
    { label: 'Grade', present: course.status !== 'completed' || text(course.grade), tier: 'export' },
  ])
}

/* ---------------------------------------------------------------------------
 * Warnings
 * ------------------------------------------------------------------------- */

function experienceWarnings(entries: CollectionRecord<ExperienceEntry>[], now: Date): DataHealthWarning[] {
  const out: DataHealthWarning[] = []
  for (const entry of entries) {
    if (entry.deletedAt) continue
    const label = entry.org || entry.role || 'Untitled experience'
    const route = PILLAR_ROUTE[entry.category] ?? '/clinical'
    const base = { entityKind: 'experience' as const, entityId: entry.id, entityLabel: label, route }

    // Blocking: the record contradicts itself and cannot be trusted as-is.
    const start = parseIsoDate(entry.startDate)
    const end = parseIsoDate(entry.endDate)
    if (start && end && end.getTime() < start.getTime()) {
      out.push({
        ...base, id: `invalid-date-range:${entry.id}`, rule: 'invalid-date-range', severity: 'blocking',
        why: `${label} ends before it starts, so its hours can't be dated correctly.`,
        actionLabel: 'Fix dates',
      })
    }
    if (!text(entry.org) && !text(entry.role)) {
      out.push({
        ...base, id: `missing-identity:${entry.id}`, rule: 'missing-identity', severity: 'blocking',
        why: 'This entry has no organization and no role, so there is nothing to verify.',
        actionLabel: 'Add details',
      })
    }

    // Important: AMCAS-facing gaps that cost the user later.
    if ((entry.hours || 0) > 0 && !text(entry.supervisor) && !entry.supervisorId) {
      out.push({
        ...base, id: `missing-verifier:${entry.id}`, rule: 'missing-verifier', severity: 'important',
        why: `AMCAS asks for someone who can verify your ${label} hours, and none is recorded.`,
        actionLabel: 'Add contact',
      })
    }
    if ((entry.hours || 0) > 0 && !start) {
      out.push({
        ...base, id: `missing-date-range:${entry.id}`, rule: 'missing-date-range', severity: 'important',
        why: `${label} has logged hours but no start date, so longevity can't be calculated.`,
        actionLabel: 'Add start date',
      })
    }
    const idleDays = daysSinceUpdate(entry, now)
    if (entry.status === 'active' && idleDays != null && idleDays > INTELLIGENCE_THRESHOLDS.staleExperienceDays) {
      out.push({
        ...base, id: `stale-active:${entry.id}`, rule: 'stale-active', severity: 'important',
        why: `${label} is marked active but hasn't been updated in ${idleDays} days.`,
        actionLabel: 'Log hours',
      })
    }

    // Suggested: tidy-up that improves the record without blocking anything.
    if (text(entry.fileUrl) && !isUsableUrl(entry.fileUrl)) {
      out.push({
        ...base, id: `broken-file-link:${entry.id}`, rule: 'broken-file-link', severity: 'suggested',
        why: `The file link on ${label} isn't a working web address.`,
        actionLabel: 'Fix link',
      })
    }
  }
  return out
}

/** "Unlinked imported record" (general.md).
 *
 *  Only the canonical Person/Organization entities carry `source` provenance —
 *  the legacy collections have no import metadata to reason about, so we check
 *  where the data actually exists rather than inferring it. */
function unlinkedImportWarnings(data: AppData): DataHealthWarning[] {
  const out: DataHealthWarning[] = []

  const referencedPeople = new Set<string>([
    ...data.experiences.map((entry) => entry.supervisorId),
    ...data.letters.map((letter) => letter.recommenderId),
    ...data.orgs.map((org) => org.verifierId),
  ].filter((id): id is string => Boolean(id)))

  const referencedOrgs = new Set<string>(
    data.experiences.map((entry) => entry.organizationId).filter((id): id is string => Boolean(id))
  )

  for (const person of data.persons) {
    if (person.archived || person.deletedAt) continue
    if (person.source?.type !== 'import') continue
    if (referencedPeople.has(person.id)) continue
    out.push({
      id: `unlinked-import:${person.id}`, rule: 'unlinked-import', severity: 'suggested',
      entityKind: 'experience', entityId: person.id, entityLabel: person.name || 'Imported contact',
      route: '/settings', actionLabel: 'Review contact',
      why: `${person.name || 'This imported contact'} isn't attached to any experience or letter yet.`,
    })
  }

  for (const organization of data.organizations) {
    if (organization.archived || organization.deletedAt) continue
    if (organization.source?.type !== 'import') continue
    if (referencedOrgs.has(organization.id)) continue
    out.push({
      id: `unlinked-import:${organization.id}`, rule: 'unlinked-import', severity: 'suggested',
      entityKind: 'org', entityId: organization.id, entityLabel: organization.name || 'Imported organization',
      route: '/settings', actionLabel: 'Review organization',
      why: `${organization.name || 'This imported organization'} isn't attached to any experience yet.`,
    })
  }

  return out
}

function courseWarnings(courses: CollectionRecord<Course>[]): DataHealthWarning[] {
  const out: DataHealthWarning[] = []
  for (const course of courses) {
    if (course.deletedAt) continue
    const label = course.code || course.title || 'Untitled course'
    const base = { entityKind: 'course' as const, entityId: course.id, entityLabel: label, route: '/academics?mode=planning&tab=planner' }

    // "Completed record with unresolved data" — a finished in-residence course
    // with no grade silently drops out of the GPA engine.
    if (course.status === 'completed' && course.inResidence && !text(course.grade)) {
      out.push({
        ...base, id: `completed-no-grade:${course.id}`, rule: 'completed-no-grade', severity: 'important',
        why: `${label} is marked completed but has no grade, so it isn't counting toward your GPA.`,
        actionLabel: 'Add grade',
      })
    }
    if (course.status === 'completed' && course.inResidence && (course.credits || 0) <= 0) {
      out.push({
        ...base, id: `missing-credits:${course.id}`, rule: 'missing-credits', severity: 'important',
        why: `${label} has no credit hours, so it carries no weight in the GPA calculation.`,
        actionLabel: 'Add credits',
      })
    }
  }
  return out
}

function letterWarnings(letters: CollectionRecord<LetterEntry>[], now: Date): DataHealthWarning[] {
  const out: DataHealthWarning[] = []
  for (const letter of letters) {
    if (letter.deletedAt) continue
    const label = letter.recommender || 'Unnamed recommender'
    const base = { entityKind: 'letter' as const, entityId: letter.id, entityLabel: label, route: '/letters' }

    // "Deadline without owner" — a due date exists but nobody has actually been
    // asked, so no one owns delivering it.
    if (parseIsoDate(letter.dueDate) && letter.status === 'identified') {
      out.push({
        ...base, id: `deadline-without-owner:${letter.id}`, rule: 'deadline-without-owner', severity: 'important',
        why: `This letter has a due date but ${label} hasn't been asked yet.`,
        actionLabel: 'Open letters',
      })
    }
    const asked = parseIsoDate(letter.dateAsked)
    if (letter.status === 'asked' && asked) {
      const waiting = Math.max(0, Math.round((now.getTime() - asked.getTime()) / 86_400_000))
      if (waiting > INTELLIGENCE_THRESHOLDS.letterFollowUpDays) {
        out.push({
          ...base, id: `letter-no-response:${letter.id}`, rule: 'letter-no-response', severity: 'important',
          why: `${label} was asked ${waiting} days ago and hasn't agreed yet.`,
          actionLabel: 'Follow up',
        })
      }
    }
    if (!text(letter.recommender) && !letter.recommenderId) {
      out.push({
        ...base, id: `missing-identity:${letter.id}`, rule: 'missing-identity', severity: 'blocking',
        why: 'This letter slot has no recommender recorded.',
        actionLabel: 'Add recommender',
      })
    }
  }
  return out
}

function orgWarnings(orgs: CollectionRecord<Org>[], now: Date): DataHealthWarning[] {
  const out: DataHealthWarning[] = []
  for (const org of orgs) {
    if (org.deletedAt) continue
    const label = org.name || 'Untitled organization'
    const base = { entityKind: 'org' as const, entityId: org.id, entityLabel: label, route: '/ecs' }
    const involved = org.status === 'member' || org.status === 'leader'

    if (involved && !text(org.verifierName) && !org.verifierId) {
      out.push({
        ...base, id: `missing-verifier:${org.id}`, rule: 'missing-verifier', severity: 'suggested',
        why: `${label} has no verifier contact recorded for your involvement.`,
        actionLabel: 'Add verifier',
      })
    }
    const idleDays = daysSinceUpdate(org, now)
    if (involved && idleDays != null && idleDays > INTELLIGENCE_THRESHOLDS.staleOrgDays) {
      out.push({
        ...base, id: `stale-active:${org.id}`, rule: 'stale-active', severity: 'suggested',
        why: `${label} hasn't been updated in ${idleDays} days.`,
        actionLabel: 'Review org',
      })
    }
  }
  return out
}

function storyWarnings(stories: CollectionRecord<StoryEntry>[]): DataHealthWarning[] {
  const out: DataHealthWarning[] = []
  for (const story of stories) {
    if (story.deletedAt) continue
    if (!text(story.commentary)) continue
    if (story.relatedExperienceId) continue
    out.push({
      id: `unlinked-reflection:${story.id}`, rule: 'unlinked-reflection', severity: 'suggested',
      entityKind: 'story', entityId: story.id, entityLabel: story.title || 'Untitled reflection',
      route: '/essays', actionLabel: 'Link experience',
      why: `"${story.title || 'This reflection'}" isn't linked to an experience, so it won't surface where you need it.`,
    })
  }
  return out
}

function schoolWarnings(schools: CollectionRecord<SchoolEntry>[]): DataHealthWarning[] {
  const out: DataHealthWarning[] = []
  for (const school of schools) {
    if (school.deletedAt) continue
    if (text(school.name)) continue
    out.push({
      id: `missing-identity:${school.id}`, rule: 'missing-identity', severity: 'blocking',
      entityKind: 'school', entityId: school.id, entityLabel: 'Unnamed school',
      route: '/schools', actionLabel: 'Add name',
      why: 'A school entry has no name, so it can’t be researched or applied to.',
    })
  }
  return out
}

/** Every data-health warning across the workspace, most severe first. */
export function dataHealthWarnings(data: AppData, now: Date = new Date()): DataHealthWarning[] {
  const order: Record<Severity, number> = { blocking: 0, important: 1, suggested: 2 }
  return [
    ...experienceWarnings(data.experiences, now),
    ...courseWarnings(data.courses),
    ...letterWarnings(data.letters, now),
    ...orgWarnings(data.orgs, now),
    ...storyWarnings(data.stories),
    ...schoolWarnings(data.schools),
    ...unlinkedImportWarnings(data),
  ].sort((a, b) => order[a.severity] - order[b.severity])
}
