/* ============================================================
   routes.tsx — the navigation registry.
   Grouped MedCoach-style. Icons are chosen to MATCH their labels
   (a fix for the old prototype's mismatched glyphs). Each route
   also declares where the ram mascot sits on that page.
   ============================================================ */
import type { LucideIcon } from 'lucide-react'
import {
  Home, Compass, GraduationCap, Brain, Mail, Stethoscope, HeartHandshake,
  Eye, Microscope, Trophy, BookOpenText, School, CalendarDays, IdCard,
  LifeBuoy, Settings, Archive,
} from 'lucide-react'

export type MascotSpot = 'home' | 'top-right' | 'bottom-right' | 'bottom-left' | 'hidden'

export interface RouteDef {
  id: string
  label: string
  group: string
  icon: LucideIcon
  /** short tagline shown under the page title */
  tagline: string
  mascot: MascotSpot
  nav?: boolean
}

export const ROUTES: RouteDef[] = [
  { id: 'home', label: 'Overview', group: 'Home', icon: Home, tagline: '', mascot: 'home' },
  { id: 'northstar', label: 'Ultimate Guide', group: 'Home', icon: Compass, tagline: 'The big-picture roadmap to med school.', mascot: 'top-right', nav: false },

  { id: 'academics', label: 'Academics', group: 'Foundation', icon: GraduationCap, tagline: 'AMCAS GPA engine + your UNC Tar Heel tracker.', mascot: 'bottom-right' },
  { id: 'mcat', label: 'MCAT', group: 'Foundation', icon: Brain, tagline: 'Resources, schedule, score tracker, error log.', mascot: 'top-right' },
  { id: 'letters', label: 'Letters of Rec', group: 'Foundation', icon: Mail, tagline: 'Who, when asked, and where each letter stands.', mascot: 'bottom-right' },

  { id: 'clinical', label: 'Clinical', group: 'Experiences', icon: Stethoscope, tagline: 'Patient-contact hours toward your goal.', mascot: 'bottom-left' },
  { id: 'volunteering', label: 'Volunteering', group: 'Experiences', icon: HeartHandshake, tagline: 'Service hours, especially with the underserved.', mascot: 'bottom-left' },
  { id: 'shadowing', label: 'Shadowing', group: 'Experiences', icon: Eye, tagline: 'Documented hours observing physicians.', mascot: 'bottom-right' },
  { id: 'research', label: 'Research', group: 'Experiences', icon: Microscope, tagline: 'Labs, posters, papers — with your Drive embedded.', mascot: 'top-right' },
  { id: 'ecs', label: 'Extracurriculars', group: 'Experiences', icon: Trophy, tagline: 'Leadership, clubs & orgs — depth over scatter.', mascot: 'bottom-right' },

  { id: 'essays', label: 'Essays & Story Bank', group: 'Your Story', icon: BookOpenText, tagline: 'Reflections, personal statement, secondaries.', mascot: 'bottom-left' },

  { id: 'schools', label: 'School List', group: 'Application', icon: School, tagline: 'Build a realistic list against your stats + mission.', mascot: 'bottom-right' },
  { id: 'timeline', label: 'Timeline & Tasks', group: 'Application', icon: CalendarDays, tagline: 'The cycle as a graphic + your assignment tracker.', mascot: 'top-right' },
  { id: 'archive', label: 'Archive', group: 'Application', icon: Archive, tagline: 'Finished tasks & focus targets — restorable.', mascot: 'bottom-right', nav: false },

  { id: 'profile', label: 'Profile / CV', group: 'Profile', icon: IdCard, tagline: 'Auto-CV from your logged roles + editable resume.', mascot: 'bottom-right' },

  { id: 'help', label: 'Help', group: 'Support', icon: LifeBuoy, tagline: 'Communities, the Discord, and how this app works.', mascot: 'bottom-left' },
  { id: 'settings', label: 'Settings', group: 'Support', icon: Settings, tagline: 'Data safety, backups, theme, and reset.', mascot: 'hidden' },
]

export const ROUTE_MAP: Record<string, RouteDef> = Object.fromEntries(ROUTES.map((r) => [r.id, r]))

/** Sidebar groups in display order. */
export const NAV_GROUPS: { group: string; items: RouteDef[] }[] = (() => {
  const order = ['Home', 'Foundation', 'Experiences', 'Your Story', 'Application', 'Profile', 'Support']
  return order
    .map((group) => ({ group, items: ROUTES.filter((r) => r.group === group && r.nav !== false) }))
    .filter((g) => g.items.length > 0)
})()
