/* ============================================================
   supabase.ts — single Supabase client for cloud sync + login.
   Reads env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). If either
   is missing the client is null and the app runs fully offline
   (localStorage stays primary), exactly like the Drive backup is optional.
   The anon key is public/client-safe; Row Level Security protects data.
   ============================================================ */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim()
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim()

export const isSupabaseConfigured = Boolean(url && anonKey)

/** The base URL the app is served from (e.g. https://sasquach67.github.io/Premed-HQ/).
 *  Used as the magic-link redirect target — must be listed in Supabase Auth → URL config. */
export const authRedirectTo =
  typeof window !== 'undefined' ? `${window.location.origin}${import.meta.env.BASE_URL}` : undefined

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        // PKCE returns `?code=…` on the base URL, which HashRouter ignores and
        // supabase-js consumes cleanly — friendlier than implicit hash tokens here.
        flowType: 'pkce',
      },
    })
  : null

/** Row shape of the `dashboards` table (one row per user; whole app state as jsonb). */
export interface DashboardRow {
  user_id: string
  data: unknown
  updated_at: string
}
