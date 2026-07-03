/* ============================================================
   types.ts — the full Premed HQ data model.
   One root AppData object is persisted to localStorage and
   (optionally) mirrored to Google Drive.
   ============================================================ */

export type ID = string

/** Letter grades on the AMCAS 4.0 scale (no +/- on AMCAS, but we keep them
 *  for display; the engine maps each to a 4.0 quality-point value). */
export type LetterGrade =
  | 'A+' | 'A' | 'A-'
  | 'B+' | 'B' | 'B-'
  | 'C+' | 'C' | 'C-'
  | 'D+' | 'D' | 'D-'
  | 'F' | 'P' | 'NP' | 'IP' | ''

export type CourseStatus = 'planned' | 'in-progress' | 'completed'

/** A single course — drives both the GPA engine and the degree planner. */
export interface Course {
  id: ID
  term: string            // e.g. "Fall 2026"
  code: string            // e.g. "CHEM 241"
  title: string
  credits: number
  grade: LetterGrade
  /** AMCAS BCPM (Biology/Chem/Physics/Math) = science GPA bucket. */
  bcpm: boolean
  status: CourseStatus
  /** taken in-residence at college (vs AP/transfer) — matters for med prereqs */
  inResidence: boolean
  /** requirement tags this course satisfies, e.g. ["Major: Additional Req", "Med prereq"] */
  satisfies: string[]
  /** med-school prerequisite this course covers, if any */
  prereqOf?: string
  notes?: string
  order: number
}

/** Degree-requirement checklist item (UNC Tar Heel Tracker). */
export interface RequirementItem {
  id: ID
  group: string           // "Major: Additional Requirements", "First-Year Foundations", "Med Prerequisites"...
  label: string           // "BIOL 220 Molecular Genetics"
  note?: string
  /** course code(s) that satisfy this requirement */
  satisfiedBy?: string[]
  done: boolean
  order: number
}

export type ExperienceCategory =
  | 'clinical' | 'volunteering' | 'shadowing' | 'research' | 'leadership'

/** Generic logged experience row — the detailed TABLE behind every hours pillar. */
export interface ExperienceEntry {
  id: ID
  category: ExperienceCategory
  org: string             // who/where — site, lab, org
  role: string
  startDate?: string      // ISO date
  endDate?: string
  hours: number
  description: string
  /** AMCAS "Most Meaningful" reflection (per-activity click-in). */
  mostMeaningful?: string
  supervisor?: string     // verification-ready contact
  contact?: string
  status: 'active' | 'completed' | 'planned'
  fileUrl?: string        // Drive link
  tags: string[]
  order: number
}

export type TaskType =
  | 'Assignment' | 'Exam' | 'Quiz' | 'Lab' | 'Reading'
  | 'Application' | 'Meeting' | 'Advising' | 'Personal' | 'Other'

export type TaskProgress = 'Not started' | 'Working on' | 'Finished'
export type KanbanColumn = 'todo' | 'doing' | 'done'

/** Timeline / assignment / task item — feeds the calendar + kanban + home alerts. */
export interface TaskItem {
  id: ID
  title: string
  course?: string
  type: TaskType
  deadline?: string       // ISO date
  progress: TaskProgress
  kanban: KanbanColumn
  notes?: string
  fileUrl?: string
  /** finished items auto-leave the active assignment table */
  archived: boolean
  /** pinned application-cycle milestones show on the timeline graphic */
  milestone?: boolean
  order: number
}

export type LetterStatus = 'identified' | 'asked' | 'agreed' | 'submitted' | 'declined'

export interface LetterEntry {
  id: ID
  recommender: string
  role: string            // "Gen Chem professor", "Research PI"
  relationship: string
  type: string            // "Science faculty", "Committee", "Other"
  status: LetterStatus
  dateAsked?: string
  dueDate?: string
  notes?: string
  order: number
}

/** Story Bank entry — pre-seeded with reflection prompts. */
export interface StoryEntry {
  id: ID
  prompt: string          // the guiding reflection prompt
  title: string
  /** the reflection / personal commentary */
  commentary: string
  tags: string[]
  relatedExperienceId?: ID
  /** optional link to a full Google Doc the user writes in */
  docUrl?: string
  order: number
}

export interface SecondaryEntry {
  id: ID
  school: string
  prompt: string
  wordLimit?: number
  status: 'not started' | 'drafting' | 'submitted'
  docUrl?: string
  notes?: string
  order: number
}

export interface InterviewQA {
  id: ID
  question: string
  answer: string
  category: string        // "Why medicine", "Behavioral", "Ethical", "School-specific"
  order: number
}

export interface McatAttempt {
  id: ID
  date?: string
  total?: number          // 472–528
  cp?: number             // Chem/Phys
  cars?: number
  bb?: number             // Bio/Biochem
  ps?: number             // Psych/Soc
  kind: 'official' | 'aamc-fl' | 'practice'
  source?: string         // "AAMC FL1", "UWorld", ...
  notes?: string
  order: number
}

export interface McatErrorLog {
  id: ID
  date?: string
  section: string
  topic: string
  whyMissed: string
  fix: string
  resolved: boolean
  order: number
}

export interface McatScheduleItem {
  id: ID
  phase: string           // "Content Review", "Practice", "Full Lengths"
  week?: string
  focus: string
  resource?: string
  done: boolean
  order: number
}

export interface McatState {
  targetDate?: string
  goalScore?: number
  attempts: McatAttempt[]
  errorLog: McatErrorLog[]
  schedule: McatScheduleItem[]
}

export type SchoolStatus =
  | 'researching' | 'will-apply' | 'applied' | 'secondary' | 'interview' | 'accepted' | 'waitlist' | 'rejected'

export interface SchoolEntry {
  id: ID
  name: string
  location?: string
  state?: string
  type: 'MD' | 'DO' | 'Other'
  category: 'reach' | 'target' | 'safety' | 'undecided'
  status: SchoolStatus
  msarUrl?: string
  medianGpa?: number
  medianMcat?: number
  mission?: string
  secondaryStatus?: 'not started' | 'received' | 'submitted'
  notes?: string
  order: number
}

/** Category-organized, clickable resource link (per pillar). */
export interface ResourceLink {
  id: ID
  pillar: string          // route id: "mcat", "clinical", ...
  category: string        // "Anki", "Practice Exams", "Content Review", "Official UNC"...
  label: string
  url: string
  note?: string
  official?: boolean
  order: number
}

/** Mascot tip pool — the ram serves one per day, deterministic by date. */
export interface TipEntry {
  id: ID
  text: string
  source?: string
  tag?: 'official' | 'community' | 'andy'
  pillar?: string         // optional: scope a tip to a pillar
}

export interface FocusTarget {
  id: ID
  text: string
  minutes?: number
  done: boolean
  order: number
}

export interface QuarterlyGoal {
  id: ID
  quarter: string
  text: string
  done: boolean
  order: number
}

export interface AdvisingQuestion {
  id: ID
  question: string
  answered: boolean
  answer?: string
  order: number
}

/** A note "page" in the mini notes database (opens in a side-peek). */
export interface NotePage {
  id: ID
  title: string
  body: string
  tag?: string
  pillar?: string         // which pillar's notes this belongs to (e.g. 'academics')
  updatedAt: number
  order: number
}

/** An extracurricular organization (club / sport / org) — NOT an hour log. */
export interface Org {
  id: ID
  name: string
  type: string            // Club, Sport, Greek life, Volunteer org, Professional, Cultural...
  role: string            // Member, Officer, President, Captain...
  status: 'interested' | 'member' | 'leader' | 'inactive'
  reflection: string      // experiences / write-ups (feeds essays)
  opportunities: string   // events, positions, things to pursue
  meetingInfo: string     // calendar / events / when-where
  link: string
  order: number
}

export interface Profile {
  name: string
  school: string
  major: string
  track: string           // "Pre-Med"
  classYear: string       // "Class of 2030"
  startTerm: string       // "Fall 2026"
  matriculationTarget: string // "Fall 2030"
  applicationCycle: string    // "2029 cycle"
  resumeDocUrl?: string   // embedded Google Doc CV
  avatarDataUrl?: string  // profile photo stored locally (data URL)
}

export interface Goals {
  clinical: number
  volunteering: number
  shadowing: number
  research: number
  activities: number
  mcatTarget: number
  gpaTarget: number
}

export interface BackupMeta {
  enabled: boolean
  googleClientId: string
  lastBackupAt?: number   // epoch ms
  driveFileId?: string
  lastError?: string
}

export interface Settings {
  theme: 'light' | 'dark' | 'system'
  visualTheme: 'ghibli' | 'doraemon'
  backup: BackupMeta
  quotesApi: boolean      // pull daily quote live vs local bank
  sidebarCollapsed: boolean
  studentBannerDismissed: boolean
  dismissedAlertKey: string
  northStarExpanded: boolean
  overviewTaskMode: 'today' | 'all'
}

export interface ActivityEvent {
  id: ID
  at: number              // epoch ms
  pillar: string
  label: string
}

export interface Meta {
  recentRoutes: string[]
  activity: ActivityEvent[]
  lastOpenedAt: number
  seedVersion: number
}

/** The single persisted root object. */
export interface AppData {
  profile: Profile
  goals: Goals
  courses: Course[]
  requirements: RequirementItem[]
  experiences: ExperienceEntry[]
  tasks: TaskItem[]
  letters: LetterEntry[]
  stories: StoryEntry[]
  secondaries: SecondaryEntry[]
  interviewQs: InterviewQA[]
  mcat: McatState
  schools: SchoolEntry[]
  resources: ResourceLink[]
  tips: TipEntry[]
  focusTargets: FocusTarget[]
  quarterlyGoals: QuarterlyGoal[]
  advisingQs: AdvisingQuestion[]
  notePages: NotePage[]
  orgs: Org[]
  notes: Record<string, string>   // free-text scratchpads keyed by id (e.g. "research-drive", "ps-doc")
  settings: Settings
  meta: Meta
}

/** Array-typed collections eligible for generic CRUD. */
export type CollectionKey =
  | 'courses' | 'requirements' | 'experiences' | 'tasks' | 'letters'
  | 'stories' | 'secondaries' | 'interviewQs' | 'schools' | 'resources'
  | 'tips' | 'focusTargets' | 'quarterlyGoals' | 'advisingQs'
  | 'notePages' | 'orgs'
