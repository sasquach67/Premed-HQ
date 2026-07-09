import type { NormalizedScheduleEvent } from '@/lib/types'
import { endOfLocalDay, startOfLocalDay } from '@/lib/schedule'

const GIS_SRC = 'https://accounts.google.com/gsi/client'
const SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'

interface TokenResponse { access_token?: string; error?: string; expires_in?: number }
interface TokenClient { requestAccessToken: (opts?: { prompt?: string }) => void }
interface GoogleOAuth {
  accounts: {
    oauth2: {
      initTokenClient: (cfg: {
        client_id: string
        scope: string
        callback: (resp: TokenResponse) => void
      }) => TokenClient
      revoke: (token: string, done?: () => void) => void
    }
  }
}

interface GoogleCalendarEvent {
  id?: string
  summary?: string
  description?: string
  location?: string
  status?: string
  colorId?: string
  htmlLink?: string
  hangoutLink?: string
  conferenceData?: {
    entryPoints?: { entryPointType?: string; uri?: string }[]
  }
  start?: { date?: string; dateTime?: string; timeZone?: string }
  end?: { date?: string; dateTime?: string; timeZone?: string }
  organizer?: { email?: string; displayName?: string }
}

interface CalendarListEntry {
  id: string
  summary?: string
  backgroundColor?: string
}

let gisPromise: Promise<void> | null = null
let accessToken: string | null = null
let tokenExpiry = 0

function googleApi(): GoogleOAuth | undefined {
  return (window as unknown as { google?: GoogleOAuth }).google
}

function loadGis(): Promise<void> {
  if (googleApi()?.accounts?.oauth2) return Promise.resolve()
  if (gisPromise) return gisPromise
  gisPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = GIS_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Could not load Google sign-in.'))
    document.head.appendChild(s)
  })
  return gisPromise
}

export function isCalendarConnected() {
  return !!accessToken && Date.now() < tokenExpiry
}

async function getToken(clientId: string, prompt: 'consent' | '') {
  if (!clientId) throw new Error('Add a Google Calendar OAuth Client ID in Settings first.')
  await loadGis()
  const oauth2 = googleApi()!.accounts.oauth2
  await new Promise<void>((resolve, reject) => {
    const client = oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (resp) => {
        if (resp.error || !resp.access_token) {
          reject(new Error(resp.error || 'Calendar authorization failed.'))
          return
        }
        accessToken = resp.access_token
        tokenExpiry = Date.now() + Math.max(1, (resp.expires_in ?? 3300) - 60) * 1000
        resolve()
      },
    })
    client.requestAccessToken({ prompt })
  })
}

export function connectCalendar(clientId: string) {
  return getToken(clientId, 'consent')
}

export function connectCalendarSilent(clientId: string) {
  return getToken(clientId, '')
}

export function disconnectCalendar() {
  if (accessToken && googleApi()?.accounts?.oauth2) {
    googleApi()!.accounts.oauth2.revoke(accessToken)
  }
  accessToken = null
  tokenExpiry = 0
}

async function calendarFetch<T>(url: string): Promise<T> {
  if (!isCalendarConnected()) throw new Error('Calendar is not connected.')
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } })
  if (!res.ok) throw new Error(`Google Calendar request failed (${res.status})`)
  return res.json() as Promise<T>
}

function findMeetingUrl(event: GoogleCalendarEvent) {
  return event.hangoutLink
    || event.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === 'video')?.uri
    || event.htmlLink
}

function normalizeGoogleEvent(event: GoogleCalendarEvent, calendar?: CalendarListEntry): NormalizedScheduleEvent | null {
  if (!event.id || !event.start) return null
  const allDay = Boolean(event.start.date && !event.start.dateTime)
  const start = event.start.dateTime ?? event.start.date
  if (!start) return null
  const end = event.end?.dateTime ?? event.end?.date
  return {
    id: event.id,
    title: event.summary || '(No title)',
    start,
    end,
    allDay,
    location: event.location,
    meetingUrl: findMeetingUrl(event),
    calendarId: calendar?.id ?? 'primary',
    color: calendar?.backgroundColor,
    status: event.status === 'cancelled' ? 'cancelled' : event.status === 'tentative' ? 'tentative' : 'confirmed',
  }
}

export async function fetchPrimaryCalendarLabel() {
  const calendar = await calendarFetch<CalendarListEntry>('https://www.googleapis.com/calendar/v3/users/me/calendarList/primary')
  return calendar.summary || calendar.id || 'Primary calendar'
}

export async function fetchPrimaryDayEvents(date = new Date()) {
  const calendar = await calendarFetch<CalendarListEntry>('https://www.googleapis.com/calendar/v3/users/me/calendarList/primary')
  const params = new URLSearchParams({
    calendarId: 'primary',
    timeMin: startOfLocalDay(date).toISOString(),
    timeMax: endOfLocalDay(date).toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    showDeleted: 'false',
  })
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`
  const json = await calendarFetch<{ items?: GoogleCalendarEvent[] }>(url)
  return (json.items ?? [])
    .map((event) => normalizeGoogleEvent(event, calendar))
    .filter(Boolean) as NormalizedScheduleEvent[]
}
