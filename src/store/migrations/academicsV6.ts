import type { AppData } from '@/lib/types'

/**
 * Academics schema v6 introduces the optional ClassAssignment.important flag.
 *
 * The field is intentionally not backfilled: an absent value means the record
 * has never been explicitly starred. This migration only guarantees the
 * canonical assignments container for older local backups.
 */
export function migrateAcademicsV6(data: AppData): AppData {
  data.academics.classCenter.assignments ??= []
  return data
}
