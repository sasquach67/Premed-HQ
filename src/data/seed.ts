/* ============================================================
   seed.ts — Andy's personalized starting data.
   Pulled from the brief: Appendix A (UNC Neuroscience plan),
   §9 personalization, §13 feature picks, §10/§12 mindset + tips.
   The app opens already personal, not blank.
   ============================================================ */
import { uid } from '@/lib/id'
import type {
  AppData, Course, RequirementItem, TaskItem, StoryEntry, ResourceLink,
  TipEntry, AdvisingQuestion, McatScheduleItem, InterviewQA, FocusTarget,
  QuarterlyGoal, SchoolEntry,
} from '@/lib/types'

/** attach incrementing `order` + a fresh `id` to seed rows */
function seq<T extends object>(rows: T[]): (T & { id: string; order: number })[] {
  return rows.map((r, i) => ({ id: uid(), order: i, ...r }))
}

// ---- Courses: transfer/AP credit (no GPA impact) + locked Year 1 + planned path ----
const courses: Course[] = seq<Omit<Course, 'id' | 'order'>>([
  // Incoming credit — completed, NOT in residence, ungraded (does not affect college GPA)
  cAP('Transfer / AP Credit', 'BIOL 101', 'Principles of Biology', 3, true),
  cAP('Transfer / AP Credit', 'BIOL 101L', 'Intro Biology Lab', 1, true),
  cAP('Transfer / AP Credit', 'CHEM 101', 'General Chemistry I', 3, true),
  cAP('Transfer / AP Credit', 'CHEM 101L', 'Gen Chem I Lab', 1, true),
  cAP('Transfer / AP Credit', 'CHEM 102', 'General Chemistry II', 3, true),
  cAP('Transfer / AP Credit', 'CHEM 102L', 'Gen Chem II Lab', 1, true),
  cAP('Transfer / AP Credit', 'MATH 231', 'Calculus I', 4, true),
  cAP('Transfer / AP Credit', 'MATH 232', 'Calculus II', 4, true),
  cAP('Transfer / AP Credit', 'STOR 155', 'Intro to Data Models & Inference', 3, true),
  cAP('Transfer / AP Credit', 'NSCI 175', 'Intro to Neuroscience (core)', 3, true),
  cAP('Transfer / AP Credit', 'PHYS 114', 'General Physics I', 4, true),
  cAP('Transfer / AP Credit', 'PHYS 115', 'General Physics II', 4, true),
  cAP('Transfer / AP Credit', 'SPAN 203', 'Intermediate Spanish (Global Language)', 3, false),

  // Fall 2026 — LOCKED
  c('Fall 2026', 'PSYC 101', 'General Psychology', 3, false, 'planned', ['Major req', 'Med prereq (Psych)', 'MCAT P/S'], 'Psychology'),
  c('Fall 2026', 'NURS 50', 'First-Year Seminar (Wellness)', 3, false, 'planned', ['First-Year Foundation']),
  c('Fall 2026', 'BIOL 103', 'How Cells Function', 3, true, 'planned', ['Major: Additional Req']),
  c('Fall 2026', 'ENGL 105', 'English Composition & Rhetoric', 3, false, 'planned', ['First-Year Foundation (Writing)']),
  c('Fall 2026', 'IDST 101', 'College Thriving', 1, false, 'planned', ['First-Year Foundation']),
  c('Fall 2026', 'IDST 111L', 'Data Literacy Lab', 1, false, 'planned', ['First-Year Foundation']),

  // Spring 2027 — chem chain begins
  c('Spring 2027', 'CHEM 241', 'Modern Analytical Methods', 3, true, 'planned', ['Major: Additional Req', 'Opens chem chain']),
  c('Spring 2027', 'CHEM 241L', 'Analytical Methods Lab', 1, true, 'planned', ['Major: Additional Req', 'Prereq for 262L', 'Med "orgo lab"']),
  c('Spring 2027', 'BIOL 220', 'Molecular Genetics', 3, true, 'planned', ['Major: Additional Req', 'Med prereq']),
  c('Spring 2027', 'SOCI 101', 'Sociology', 3, false, 'planned', ['Med prereq (Soc)', 'MCAT P/S']),
  c('Spring 2027', 'Focus-Capacity Gen Ed', 'IDEAs-in-Action elective', 3, false, 'planned', ['IDEAs-in-Action']),

  // Recommended path (illustrative — junior/senior stays flexible)
  c('Fall 2027', 'CHEM 261', 'Organic Chemistry I (no lab)', 3, true, 'planned', ['Major: Additional Req', 'MCAT orgo']),
  c('Fall 2027', 'NSCI 221', 'Core NSCI 22x (#1)', 3, true, 'planned', ['Major: Core (select two)']),
  c('Fall 2027', 'COMP 116', 'Intro Programming', 3, false, 'planned', ['Major: Additional Req']),
  c('Spring 2028', 'CHEM 262', 'Organic Chemistry II', 3, true, 'planned', ['Major: Additional Req', 'MCAT orgo']),
  c('Spring 2028', 'CHEM 262L', 'Organic Chemistry Lab', 1, true, 'planned', ['Major: Additional Req', 'Closes lab chain']),
  c('Spring 2028', 'NSCI 27x', 'Research Methods Lab', 3, true, 'planned', ['Major: Core (research methods)']),
  c('Spring 2028', 'PSYC 210', 'Statistical Principles (med-safe stats)', 3, false, 'planned', ['MMS elective', 'Med-safe stats']),
  c('Summer 2028', 'CHEM 430', 'Biochemistry (last content domino)', 3, true, 'planned', ['Med prereq', 'Knowledge Elective', 'Gates MCAT']),
  c('Fall 2028', 'NSCI 222', 'Core NSCI 22x (#2)', 3, true, 'planned', ['Major: Core (select two)']),
  c('Fall 2028', 'BIOL 240', 'Cell Biology (HPA recommended)', 3, true, 'planned', ['Knowledge Elective']),
  c('Spring 2029', 'BIOL 252', 'Anatomy & Physiology (med rec)', 3, true, 'planned', ['Med recommended']),
  c('Spring 2029', 'BIOL 252L', 'A&P Lab', 1, true, 'planned', ['Med recommended']),
  c('Spring 2029', 'PSYC 245', 'Psychopathology', 3, false, 'planned', ['Knowledge Elective', 'MCAT P/S']),
  c('Fall 2029', 'EXSS 175', 'Human Anatomy', 3, true, 'planned', ['Knowledge Elective']),
])

function c(
  term: string, code: string, title: string, credits: number, bcpm: boolean,
  status: Course['status'], satisfies: string[], prereqOf?: string
): Omit<Course, 'id' | 'order'> {
  return { term, code, title, credits, grade: '', bcpm, status, inResidence: true, satisfies, prereqOf }
}
function cAP(term: string, code: string, title: string, credits: number, bcpm: boolean): Omit<Course, 'id' | 'order'> {
  return { term, code, title, credits, grade: '', bcpm, status: 'completed', inResidence: false, satisfies: ['Satisfied by incoming credit'] }
}

// ---- Tar Heel Tracker: degree + major + med requirements ----
const requirements: RequirementItem[] = seq<Omit<RequirementItem, 'id' | 'order'>>([
  r('Satisfied by incoming credit', 'Gen Chem I + II w/ labs (CHEM 101/101L, 102/102L)', true, ['CHEM 101', 'CHEM 102']),
  r('Satisfied by incoming credit', 'Bio I w/ lab (BIOL 101/101L)', true, ['BIOL 101']),
  r('Satisfied by incoming credit', 'Calculus I + II (MATH 231/232)', true, ['MATH 231', 'MATH 232']),
  r('Satisfied by incoming credit', 'Statistics core (STOR 155)', true, ['STOR 155'], 'Verify med schools accept AP stat — else PSYC 210 in residence'),
  r('Satisfied by incoming credit', 'Physics I + II (PHYS 114/115) — fully complete', true, ['PHYS 114', 'PHYS 115']),
  r('Satisfied by incoming credit', 'NSCI 175 core + Global Language (SPAN 203)', true, ['NSCI 175', 'SPAN 203']),

  r('Major — Additional Requirements (C or better)', 'BIOL 103 How Cells Function', false, ['BIOL 103']),
  r('Major — Additional Requirements (C or better)', 'BIOL 220 Molecular Genetics', false, ['BIOL 220']),
  r('Major — Additional Requirements (C or better)', 'CHEM 241 + 241L', false, ['CHEM 241', 'CHEM 241L']),
  r('Major — Additional Requirements (C or better)', 'CHEM 261 (no lab)', false, ['CHEM 261']),
  r('Major — Additional Requirements (C or better)', 'CHEM 262 + 262L', false, ['CHEM 262', 'CHEM 262L']),
  r('Major — Additional Requirements (C or better)', 'COMP 110 or 116', false, ['COMP 116']),
  r('Major — Additional Requirements (C or better)', 'PSYC 101', false, ['PSYC 101']),

  r('Major — Core', 'Research-methods lab (NSCI 27*)', false, ['NSCI 27x']),
  r('Major — Core', 'Two of NSCI 221 / 222 / 225', false, ['NSCI 221', 'NSCI 222']),
  r('Major — Core', '6 hrs Knowledge Electives', false),
  r('Major — Core', '6 hrs Math/Methods/Stats (MMS) Electives', false),

  r('Med Prerequisites (UNC HPA)', 'CHEM 430 Biochemistry', false, ['CHEM 430'], 'Last content domino — gates MCAT date'),
  r('Med Prerequisites (UNC HPA)', '1 sem Psychology (PSYC 101)', false, ['PSYC 101']),
  r('Med Prerequisites (UNC HPA)', '1 sem Sociology (SOCI 101)', false, ['SOCI 101']),
  r('Med Prerequisites (UNC HPA)', 'BIOL 252/252L (HPA recommended)', false, ['BIOL 252']),

  r('Graduation', 'First-Year Foundations (ENGL 105, NURS 50 sem, IDST 101, IDST 111L)', false),
  r('Graduation', 'IDEAs-in-Action Focus Capacities', false),
  r('Graduation', 'LFIT (lifetime fitness)', false),
  r('Graduation', '120 total credit hours', false),
])
function r(group: string, label: string, done: boolean, satisfiedBy?: string[], note?: string): Omit<RequirementItem, 'id' | 'order'> {
  return { group, label, done, satisfiedBy, note }
}

// ---- Timeline / Tasks: near-term registration + 2029 application cycle milestones ----
const tasks: TaskItem[] = seq<Omit<TaskItem, 'id' | 'order'>>([
  t('Enroll for Fall 2026 — window opens 10:00 AM', 'Application', '2026-07-06', true, 'Use Swap (not Drop-then-Add). Enroll order: PSYC 101 → NURS 50 seminar → BIOL 103 → ENGL 105 → IDST 101 → IDST 111L.'),
  t('Build ConnectCarolina shopping cart (30–40 sections)', 'Personal', '2026-07-05', false, 'Load multiple sections of each course + all preference-compliant backups.'),
  t('Verify advising questions at orientation / HPA', 'Advising', '2026-08-15', false, 'See the Verify-with-advisor checklist in Timeline.'),
  t('Find a research lab to reach out to', 'Personal', undefined, false, 'Start relationships early — research + a future letter writer.'),
  t('Set up first physician shadowing', 'Personal', undefined, false),
  t('Start clinical volunteering', 'Personal', undefined, false),
  // 2029 cycle milestones (pinned on the timeline graphic)
  tm('MCAT — sit the exam', '2029-03-15', 'Option 2 (GPA-safe): study winter 2028→spring 2029, sit Jan–Apr 2029.'),
  tm('AMCAS opens (2029 cycle)', '2029-05-01', 'Primary application opens.'),
  tm('Submit AMCAS primary — early!', '2029-05-30', 'Rolling admissions: earlier complete = stronger.'),
  tm('Secondaries arrive in waves', '2029-07-01', 'Pre-write common prompts in June; turn around fast.'),
  tm('Interview season begins', '2029-09-01', 'Rolling through winter.'),
  tm('Matriculate — Fall 2030 (no gap year)', '2030-08-20', 'The finish line for this plan.'),
])
function t(title: string, type: TaskItem['type'], deadline: string | undefined, milestone: boolean, notes?: string): Omit<TaskItem, 'id' | 'order'> {
  return { title, type, deadline, progress: 'Not started', kanban: 'todo', notes, archived: false, milestone }
}
function tm(title: string, deadline: string, notes?: string): Omit<TaskItem, 'id' | 'order'> {
  return { title, type: 'Application', deadline, progress: 'Not started', kanban: 'todo', notes, archived: false, milestone: true }
}

// ---- Story Bank reflection prompts (§13.4) ----
const STORY_PROMPTS = [
  'Reasons you want to be a physician',
  "Something you're very passionate about",
  'A difficult experience that inspired self-growth',
  'A notable leadership experience',
  'A notable research experience',
  'Any notable clinical experiences',
  'A time you asked for help',
  'A time you were humbled',
  'A time you witnessed discrimination',
  'A time you interacted with someone different than you',
  'A time you advocated for someone different than you',
  'A time you failed',
]
const stories: StoryEntry[] = seq<Omit<StoryEntry, 'id' | 'order'>>(
  STORY_PROMPTS.map((prompt) => ({ prompt, title: '', commentary: '', tags: [] }))
)

const interviewQs: InterviewQA[] = seq<Omit<InterviewQA, 'id' | 'order'>>([
  { question: 'Why do you want to be a physician?', answer: '', category: 'Why medicine' },
  { question: 'Tell me about yourself.', answer: '', category: 'Behavioral' },
  { question: 'Describe a time you faced a significant challenge.', answer: '', category: 'Behavioral' },
  { question: 'Tell me about a time you worked on a team.', answer: '', category: 'Behavioral' },
  { question: 'Why this school specifically?', answer: '', category: 'School-specific' },
  { question: 'Describe an ethical dilemma you navigated.', answer: '', category: 'Ethical' },
])

// ---- MCAT schedule (phase-based, §13.3) ----
const mcatSchedule: McatScheduleItem[] = seq<Omit<McatScheduleItem, 'id' | 'order'>>([
  { phase: 'Content Review', focus: 'Bio/Biochem — Khan Academy + AnKing deck', done: false },
  { phase: 'Content Review', focus: 'Gen Chem + Orgo — content + Miledown', done: false },
  { phase: 'Content Review', focus: 'Physics — equation sheet drilling', done: false },
  { phase: 'Content Review', focus: 'Psych/Soc — 300-page doc + "lazy OCD" sheet', done: false },
  { phase: 'Practice', focus: 'Daily CARS passages (Jack Westin)', done: false },
  { phase: 'Practice', focus: 'UWorld question bank — log every miss', done: false },
  { phase: 'Full Lengths', focus: 'AAMC FL1–FL4 (one per week, review 2 days)', done: false },
  { phase: 'Full Lengths', focus: 'Final review of error log + weak topics', done: false },
])

// ---- Advising questions (Appendix A §9) ----
const ADVISING = [
  'Did NSCI 175 post as core, and did SPAN 203 clear Global Language? (placement said SPAN 105)',
  'Did CHEM 101/101L/102/102L, BIOL 101/101L, MATH 231/232, STOR 155, PHYS 115 all post — any conditions?',
  'Confirm BOTH PHYS 114 and PHYS 115 posted (physics treated as fully complete).',
  'Will an advisor approve a 200-level chem earlier — or is Spring 2027 truly the earliest for CHEM 241?',
  'Exact offered terms for CHEM 241/241L/261/262/262L — and does CHEM 430 run in Summer?',
  'Prereqs that apply to me for BIOL 220 and NSCI 221/222/225 (need PSYC 101 / BIOL 103 first?).',
  'Will AP-based STOR 155 satisfy med-school stats, or take PSYC 210 in residence? (check MSAR)',
  'Confirm BIOL 252/252L and BIOL 240 recommendations — do target schools want 2 sem bio WITH lab?',
  'Which transfers (ENEC 202, HIST 103, ARTS/AMST/AAAD, ECON) clear IDEAs Focus Capacities?',
  'Can a FY-Launch section of BIOL 103 or PSYC 101 also clear my FYS/FYL foundation this fall?',
]
const advisingQs: AdvisingQuestion[] = seq<Omit<AdvisingQuestion, 'id' | 'order'>>(
  ADVISING.map((question) => ({ question, answered: false }))
)

const focusTargets: FocusTarget[] = seq<Omit<FocusTarget, 'id' | 'order'>>([
  { text: 'Draft one Story Bank reflection while it’s fresh', minutes: 20, done: false },
  { text: 'Log this week’s clinical/volunteer hours', minutes: 10, done: false },
  { text: 'Email one professor or lab about research', minutes: 15, done: false },
])

const quarterlyGoals: QuarterlyGoal[] = seq<Omit<QuarterlyGoal, 'id' | 'order'>>([
  { quarter: 'Fall 2026', text: 'Lock a 3.8+ first semester; build study systems before anything else', done: false },
  { quarter: 'Fall 2026', text: 'Start ONE longitudinal commitment (clinical, volunteering, or research)', done: false },
])

const schools: SchoolEntry[] = seq<Omit<SchoolEntry, 'id' | 'order'>>([
  {
    name: 'UNC School of Medicine', location: 'Chapel Hill, NC', state: 'NC', type: 'MD',
    category: 'target', status: 'researching',
    msarUrl: 'https://mec.aamc.org/msar-ui/', mission: 'In-state; mission-driven, primary-care strong.',
    notes: 'In-state anchor school. Check MSAR each cycle for stats + course policies.',
  },
])

// ---- Resources, organized by pillar + category, all clickable ----
const resources: ResourceLink[] = seq<Omit<ResourceLink, 'id' | 'order'>>([
  // MCAT — Content Review
  res('mcat', 'Content Review', 'Khan Academy MCAT Prep', 'https://www.khanacademy.org/test-prep/mcat'),
  res('mcat', 'Content Review', 'MCAT Self Prep (free e-course)', 'https://mcatselfprep.com/'),
  res('mcat', 'Content Review', 'Jack Westin — AAMC content outline', 'https://jackwestin.com/'),
  res('mcat', 'Content Review', 'Ninja Nerd (video lectures)', 'https://www.youtube.com/@NinjaNerdOfficial'),
  // MCAT — Anki
  res('mcat', 'Anki Decks', 'MileDown decks', 'https://www.reddit.com/r/Mcat/wiki/index/'),
  res('mcat', 'Anki Decks', 'AnKing / Pankow overview', 'https://www.reddit.com/r/Mcat/wiki/index/'),
  res('mcat', 'Anki Decks', 'Anki (download)', 'https://apps.ankiweb.net/'),
  // MCAT — Practice & Exams
  res('mcat', 'Practice & Exams', 'AAMC Official Prep (the source)', 'https://students-residents.aamc.org/prepare-mcat-exam/prepare-mcat-exam', true),
  res('mcat', 'Practice & Exams', 'UWorld MCAT QBank', 'https://www.uworld.com/'),
  res('mcat', 'Practice & Exams', 'Jack Westin — free CARS daily', 'https://jackwestin.com/resources/cars'),
  res('mcat', 'Practice & Exams', 'Blueprint free half-length', 'https://blueprintprep.com/mcat'),
  // MCAT — Community
  res('mcat', 'Community', 'r/MCAT', 'https://www.reddit.com/r/Mcat/'),
  res('mcat', 'Community', 'AAMC — about the MCAT', 'https://students-residents.aamc.org/taking-mcat-exam/taking-mcat-exam', true),

  // Academics — UNC official
  res('academics', 'Official UNC', 'Neuroscience B.S. catalog', 'https://catalog.unc.edu/undergraduate/programs-study/neuroscience-major-bs/', true),
  res('academics', 'Official UNC', 'HPA — Medicine prereqs', 'https://hpa.unc.edu/explore/explore-health-careers/medicine/', true),
  res('academics', 'Official UNC', 'IDEAs in Action — First-Year Foundations', 'https://ideasinaction.unc.edu/first-year-foundations/', true),
  res('academics', 'Official UNC', 'CHEM course descriptions / prereqs', 'https://catalog.unc.edu/courses/chem/', true),
  res('academics', 'Official UNC', 'Registrar — registration FAQ (swap/waitlist)', 'https://registrar.unc.edu/registration-faq/', true),
  res('academics', 'Official UNC', 'Live class search (sections/times)', 'https://reports.unc.edu/class-search/', true),

  // Clinical / Volunteering / Shadowing / Research / Letters / School list — community hubs
  res('clinical', 'Community', 'r/premed wiki — Clinical Experience', 'https://www.reddit.com/r/premed/wiki/clinicaljobs'),
  res('volunteering', 'Community', 'r/premed wiki — Non-Clinical Volunteering', 'https://www.reddit.com/r/premed/wiki/volunteering'),
  res('shadowing', 'Community', 'r/premed wiki — Shadowing', 'https://www.reddit.com/r/premed/wiki/shadowing'),
  res('research', 'Community', 'r/premed wiki — Research', 'https://www.reddit.com/r/premed/wiki/research'),
  res('letters', 'Community', 'r/premed wiki — Letters of Rec', 'https://www.reddit.com/r/premed/wiki/lors'),
  res('schools', 'Tools', 'AAMC MSAR (build your school list)', 'https://mec.aamc.org/msar-ui/', true),
  res('schools', 'Community', 'r/premed wiki — School List', 'https://www.reddit.com/r/premed/wiki/schoollist'),
  res('essays', 'Community', 'r/premed wiki — Essays', 'https://www.reddit.com/r/premed/wiki/essays'),
  res('timeline', 'Community', 'r/premed wiki — Applying (AMCAS)', 'https://www.reddit.com/r/premed/wiki/applications'),
])
function res(pillar: string, category: string, label: string, url: string, official = false): Omit<ResourceLink, 'id' | 'order'> {
  return { pillar, category, label, url, official }
}

// ---- Mascot tip pool (the ram serves one a day) ----
const tips: TipEntry[] = [
  tip('Apply early, apply complete — rolling admissions reward the front-runners.', 'r/premed', 'community'),
  tip('Reflection matters as much as the activity. Log WHY it mattered while it’s fresh.', 'r/premed', 'community', 'essays'),
  tip('Your BCPM (science) GPA is the single most-scrutinized number. Protect it.', 'AAMC', 'official', 'academics'),
  tip('Longitudinal commitment beats last-minute box-checking. Depth > a scatter of one-offs.', 'r/premed', 'community'),
  tip('No 200-level bio/chem your first semester without advisor approval — start chem in Spring.', 'your UNC plan', 'andy', 'academics'),
  tip('Use Swap, not Drop-then-Add, for a class you can’t afford to lose.', 'your UNC plan', 'andy', 'academics'),
  tip('AP credit usually won’t satisfy med-school prereqs — use it to free space, not to skip a requirement.', 'your UNC plan', 'andy', 'academics'),
  tip('Don’t schedule the MCAT before CHEM 430 — biochem is the last content domino.', 'your UNC plan', 'andy', 'mcat'),
  tip('Store each supervisor’s contact as you go, so verification season isn’t a scramble.', 'PreMedOS', 'community', 'clinical'),
  tip('Pre-write the common secondary prompts in June — it’s a known timing edge.', 'r/premed', 'community', 'essays'),
  tip('Fit is mutual. The school list and interviews are about mission match, not just stats.', 'r/premed', 'community', 'schools'),
  tip('Protect the GPA, build study habits, and lock in research/shadowing early.', 'your UNC plan', 'andy'),
  tip('Don’t take CHEM 262L before 241L — it’s a prereq and ConnectCarolina will block it.', 'your UNC plan', 'andy', 'academics'),
  tip('Every Neuroscience Additional Requirement needs a C or better — and so do most med prereqs.', 'your UNC plan', 'andy', 'academics'),
  tip('Writing and reviewing goals measurably boosts follow-through. Keep them visible.', 'Deluxe planner', 'community'),
]
function tip(text: string, source: string, tag: TipEntry['tag'], pillar?: string): TipEntry {
  return { id: uid(), text, source, tag, pillar }
}

export const FALLBACK_QUOTES = [
  { t: 'It always seems impossible until it’s done.', by: 'Nelson Mandela' },
  { t: 'The secret of getting ahead is getting started.', by: 'Mark Twain' },
  { t: 'Wherever the art of medicine is loved, there is also a love of humanity.', by: 'Hippocrates' },
  { t: 'Discipline is choosing between what you want now and what you want most.', by: 'Abraham Lincoln' },
  { t: 'Little by little, one travels far.', by: 'J.R.R. Tolkien' },
  { t: 'The expert in anything was once a beginner.', by: 'Helen Hayes' },
  { t: 'Don’t watch the clock; do what it does. Keep going.', by: 'Sam Levenson' },
]

export function createSeedData(): AppData {
  const now = Date.now()
  return {
    profile: {
      name: 'Andy',
      school: 'UNC–Chapel Hill',
      major: 'Neuroscience B.S.',
      track: 'Pre-Med',
      classYear: 'Class of 2030',
      startTerm: 'Fall 2026',
      matriculationTarget: 'Fall 2030',
      applicationCycle: '2029 cycle',
      resumeDocUrl: '',
    },
    goals: {
      clinical: 150, volunteering: 150, shadowing: 50, research: 300,
      activities: 15, mcatTarget: 515, gpaTarget: 3.85,
    },
    courses,
    requirements,
    experiences: [],
    tasks,
    letters: [],
    stories,
    secondaries: [],
    interviewQs,
    mcat: {
      targetDate: '2029-03-15',
      goalScore: 515,
      attempts: [],
      errorLog: [],
      schedule: mcatSchedule,
    },
    schools,
    resources,
    tips,
    focusTargets,
    quarterlyGoals,
    advisingQs,
    notePages: [],
    orgs: [],
    notes: {
      'academics-priming': '',
      'academics-syllabi': '',
    },
    settings: {
      theme: 'system',
      visualTheme: 'ghibli',
      backup: { enabled: false, googleClientId: '' },
      quotesApi: true,
      sidebarCollapsed: false,
      studentBannerDismissed: false,
      dismissedAlertKey: '',
      northStarExpanded: false,
      overviewTaskMode: 'today',
    },
    meta: {
      recentRoutes: [],
      activity: [],
      lastOpenedAt: now,
      seedVersion: 1,
    },
  }
}
