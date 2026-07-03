import { useEffect, useState } from 'react'
import { useStore } from '@/store/store'
import type { Settings } from '@/lib/types'

/** Applies the saved theme (light/dark/system) to <html>. */
export function useTheme() {
  const theme = useStore((s) => s.settings.theme)
  const visualTheme = useStore((s) => s.settings.visualTheme)
  const update = useStore((s) => s.update)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mql.matches)
      document.documentElement.classList.toggle('dark', dark)
      setIsDark(dark)
    }
    apply()
    mql.addEventListener('change', apply)
    return () => mql.removeEventListener('change', apply)
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.visualTheme = visualTheme
  }, [visualTheme])

  const setTheme = (t: Settings['theme']) => update((d) => { d.settings.theme = t })
  return { theme, isDark, setTheme }
}
