import { useEffect, useState } from 'react'
import { FALLBACK_QUOTES } from '@/data/seed'
import { pickDaily } from '@/lib/date'

export interface Quote { t: string; by: string }

const CACHE_KEY = 'premed_hq_quote'

/** Today's quote: pulled live from a free quotes API and cached for the day,
 *  with a graceful fallback to the local bank if offline. */
export function useDailyQuote(live: boolean): Quote {
  const [quote, setQuote] = useState<Quote>(() => pickDaily(FALLBACK_QUOTES) ?? FALLBACK_QUOTES[0])

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
      if (cached?.date === today && cached.quote) { setQuote(cached.quote); return }
    } catch { /* ignore */ }

    if (!live) return
    let cancelled = false
    ;(async () => {
      try {
        // ZenQuotes "today" endpoint — free, no key.
        const res = await fetch('https://zenquotes.io/api/today')
        if (!res.ok) throw new Error()
        const data = (await res.json()) as { q: string; a: string }[]
        const q = data?.[0]
        if (q?.q && !cancelled) {
          const next = { t: q.q, by: q.a }
          setQuote(next)
          localStorage.setItem(CACHE_KEY, JSON.stringify({ date: today, quote: next }))
        }
      } catch {
        // keep the local fallback already in state
      }
    })()
    return () => { cancelled = true }
  }, [live])

  return quote
}
