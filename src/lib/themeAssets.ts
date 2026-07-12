import type { Settings } from '@/lib/types'

export type VisualTheme = Settings['visualTheme']

export function themeAsset(theme: VisualTheme | undefined, base: 'home-banner' | 'wallpaper' | 'mascot', ext: 'jpg' | 'gif' = 'jpg') {
  const suffix = theme === 'doraemon' ? '-doraemon' : ''
  return `${import.meta.env.BASE_URL}art/${base}${suffix}.${ext}`
}

export function homeBanner(theme: VisualTheme | undefined) {
  return themeAsset(theme, 'home-banner', 'jpg')
}

export function mascotGif(theme: VisualTheme | undefined) {
  return themeAsset(theme, 'mascot', 'gif')
}

export const VISUAL_THEMES: { id: VisualTheme; label: string; description: string }[] = [
  { id: 'ghibli', label: 'Ghibli', description: 'Warm countryside, paper tones, cozy greens.' },
  { id: 'doraemon', label: 'Doraemon', description: 'Playful blue future-gadget palette and matching art.' },
]
