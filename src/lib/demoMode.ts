export const DEMO_MODE_FLAG = 'hq:demo-mode'
export const REAL_STORAGE_KEY = 'hq:app-data'
export const DEMO_STORAGE_KEY = 'hq-demo:app-data'
export const LEGACY_STORAGE_KEY = 'premed_hq_v1'

export function isDemoMode(): boolean {
  return typeof localStorage !== 'undefined' && localStorage.getItem(DEMO_MODE_FLAG) === 'on'
}

export function setDemoMode(active: boolean) {
  localStorage.setItem(DEMO_MODE_FLAG, active ? 'on' : 'off')
  window.location.reload()
}

export function activeStorageKey(): string {
  return isDemoMode() ? DEMO_STORAGE_KEY : REAL_STORAGE_KEY
}
