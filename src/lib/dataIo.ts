/* Export / import the whole dashboard as a JSON file (manual data safety). */
import type { AppData } from '@/lib/types'
import { snapshotData } from '@/store/store'

export function exportJson(): void {
  const data = snapshotData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `premed-hq-backup-${stamp}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** Light validation: must look like our AppData (has a few known keys). */
export function looksLikeAppData(x: unknown): x is AppData {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return 'courses' in o && 'profile' in o && 'settings' in o
}

export async function readJsonFile(file: File): Promise<AppData> {
  const text = await file.text()
  const parsed = JSON.parse(text)
  if (!looksLikeAppData(parsed)) throw new Error('That file is not a Premed HQ backup.')
  return parsed
}
