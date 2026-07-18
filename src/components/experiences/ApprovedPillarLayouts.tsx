import { useState, type ComponentType, type ReactNode } from 'react'
import {
  Activity, Award, Building2, CalendarDays, ClipboardCheck, Clock3,
  Copy, FileText, HeartHandshake, Microscope,
  Plus, ShieldCheck, Stethoscope, TrendingUp, UserRound, Users,
} from 'lucide-react'
import type { ExperienceCategory, ExperienceEntry } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AddExperience = (patch?: Partial<ExperienceEntry> & Record<string, unknown>) => ExperienceEntry

type ExperienceLayoutProps = {
  category: Exclude<ExperienceCategory, 'leadership'>
  onAddEntity: () => void
  onAddEntry: AddExperience
}

type Entity = {
  id: string
  name: string
  subtitle: string
  meta: string
  hours: string
  tail: string
  tone?: 'primary' | 'warn' | 'quiet'
}

type Metric = { label: string; value: string; detail?: string; icon?: ComponentType<{ className?: string }> }

const PILLAR_META = {
  volunteering: {
    title: 'Volunteering',
    subtitle: 'audit-ready · the ledger is the tool',
    add: 'Add organization',
    metrics: [
      { label: 'Total hours', value: '230', detail: 'Clinical 138 · Non-clinical 92', icon: Clock3 },
      { label: 'Clinical target', value: '138/150', detail: '12 hours remaining', icon: Stethoscope },
      { label: 'Non-clinical target', value: '92/100', detail: '8 hours remaining', icon: HeartHandshake },
      { label: 'At current pace', value: '3.4 hrs/wk', detail: 'Both targets land by Feb 2027', icon: TrendingUp },
    ],
    entities: [
      { id: 'unc-childrens', name: "UNC Children's — playroom", subtitle: 'Clinical · Sat mornings', meta: 'last logged 5 days ago', hours: '138h', tail: 'active', tone: 'primary' },
      { id: 'habitat', name: 'Habitat for Humanity', subtitle: 'Non-clinical · build days', meta: 'last logged 2 weeks ago', hours: '64h', tail: 'active' },
      { id: 'table', name: 'TABLE meal packing', subtitle: 'Non-clinical · weekends', meta: 'gone quiet 6 weeks — log or archive?', hours: '28h', tail: 'attention', tone: 'warn' },
    ],
  },
  shadowing: {
    title: 'Shadowing',
    subtitle: 'coverage + relationship upkeep',
    add: 'Add physician',
    metrics: [
      { label: 'Total hours', value: '58', detail: 'Across 3 physicians', icon: Clock3 },
      { label: 'Specialties', value: '2', detail: 'Emergency · Orthopaedics', icon: Stethoscope },
      { label: 'Settings seen', value: '3', detail: 'ED · OR · clinic', icon: Building2 },
      { label: 'Coverage gap', value: '0h', detail: 'Primary care', icon: Activity },
    ],
    entities: [
      { id: 'vasquez', name: 'Dr. Elena Vasquez, MD', subtitle: 'Emergency Medicine · UNC Hillsborough ED', meta: 'thank-you sent · letter asked', hours: '34h', tail: 'active', tone: 'primary' },
      { id: 'chen', name: 'Dr. Marcus Chen, MD', subtitle: 'Orthopaedic Surgery · OR + clinic', meta: 'thank-you due · letter maybe', hours: '24h', tail: 'follow up', tone: 'warn' },
    ],
  },
  clinical: {
    title: 'Clinical',
    subtitle: 'hours momentum + staying credentialed',
    add: 'Add job / site',
    metrics: [
      { label: 'Clinical hours', value: '376', detail: 'Across 2 sites', icon: Clock3 },
      { label: 'Sites', value: '2', detail: 'EMS · Family Medicine', icon: Building2 },
      { label: 'Renewal due', value: '1', detail: 'NC EMT-Basic', icon: ShieldCheck },
      { label: 'At current pace', value: '8.2 hrs/wk', detail: '≈812 by Jun 2027 · clears 750', icon: TrendingUp },
    ],
    entities: [
      { id: 'ems', name: 'Orange County EMS — MEDIC', subtitle: 'EMT-Basic · 12-hour Saturdays', meta: 'last shift 3 days ago', hours: '312h', tail: 'active', tone: 'primary' },
      { id: 'family-med', name: 'UNC Family Medicine — scribe', subtitle: 'Scribe (PRN) · 2 shifts/mo', meta: 'started May 2026', hours: '64h', tail: 'active' },
    ],
  },
  research: {
    title: 'Research',
    subtitle: 'turning time into lines on a CV',
    add: 'Add lab / project',
    metrics: [
      { label: 'Labs / projects', value: '2', detail: 'Both active', icon: Microscope },
      { label: 'Total hours', value: '248', detail: '196 + 52', icon: Clock3 },
      { label: 'Outputs', value: '5', detail: 'Poster · abstract · paper · talk', icon: Award },
      { label: 'Pipeline', value: '1 · 2 · 1 · 1', detail: 'Idea · submitted · accepted · presented', icon: TrendingUp },
    ],
    entities: [
      { id: 'kwon', name: 'Kwon Lab — TBI neuroinflammation', subtitle: 'PI Sarah Kwon · since Jun 2025', meta: '4 outputs · 1 first-author poster', hours: '196h', tail: 'active', tone: 'primary' },
      { id: 'policy', name: 'Health Policy — EMS outcomes', subtitle: 'PI Alan Reyes · since Feb 2026', meta: '1 output', hours: '52h', tail: 'active' },
    ],
  },
} satisfies Record<ExperienceLayoutProps['category'], { title: string; subtitle: string; add: string; metrics: Metric[]; entities: Entity[] }>

export function ApprovedExperienceLayout({ category, onAddEntity, onAddEntry }: ExperienceLayoutProps) {
  const meta = PILLAR_META[category]
  const [activeId, setActiveId] = useState(meta.entities[0].id)
  const active = meta.entities.find((entity) => entity.id === activeId) ?? meta.entities[0]

  return (
    <div className="space-y-3.5 pb-10">
      <PillarHeading category={category} title={meta.title} subtitle={meta.subtitle} />
      <PillarSummary category={category} />
      {category === 'volunteering' && <VerificationLedger />}
      {category === 'shadowing' && <SpecialtyExposure />}
      {category === 'research' && <ResearchOutputs />}
      <EntityRail category={category} entities={meta.entities} activeId={activeId} addLabel={meta.add} onSelect={setActiveId} onAdd={onAddEntity} />
      {category === 'volunteering' && <VolunteeringWorkspace entity={active} onAddEntry={onAddEntry} />}
      {category === 'shadowing' && <ShadowingWorkspace entity={active} onAddEntry={onAddEntry} />}
      {category === 'clinical' && <ClinicalWorkspace entity={active} onAddEntry={onAddEntry} />}
      {category === 'research' && <ResearchWorkspace entity={active} onAddEntry={onAddEntry} />}
    </div>
  )
}

function pillarAccent(category: ExperienceLayoutProps['category']) {
  return category === 'volunteering' ? 'var(--cat-volunteer)' : category === 'shadowing' ? 'var(--cat-shadow)' : category === 'clinical' ? 'var(--cat-clinical)' : 'var(--cat-research)'
}

function PillarHeading({ category, title, subtitle }: { category: ExperienceLayoutProps['category']; title: string; subtitle: string }) {
  return (
    <header className="flex flex-wrap items-center gap-2.5">
      <span className="h-[26px] w-2.5 rounded-full" style={{ background: pillarAccent(category) }} />
      <h1 className="font-display text-2xl font-extrabold">{title}</h1>
      <p className="ml-auto text-[0.78rem] font-bold text-muted-foreground">{subtitle}</p>
    </header>
  )
}

function SummaryKpi({ value, label, valueClassName }: { value: ReactNode; label: string; valueClassName?: string }) {
  return <span className="inline-flex items-baseline gap-2 whitespace-nowrap"><strong className={cn('font-display text-[1.4rem] font-extrabold tabular-nums', valueClassName)}>{value}</strong><span className="text-[0.68rem] font-extrabold uppercase tracking-[0.05em] text-muted-foreground">{label}</span></span>
}

function PillarSummary({ category }: { category: ExperienceLayoutProps['category'] }) {
  const shell = 'flex flex-wrap items-center gap-x-5 gap-y-2.5 rounded-[14px] border bg-card px-[18px] py-3 shadow-sm'
  if (category === 'volunteering') return (
    <section className={shell}>
      <SummaryKpi value="230" label="total hours" />
      <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold"><span className="text-[var(--cat-volunteer)]">Clinical 138</span><span className="flex h-2 w-32 overflow-hidden rounded-full bg-muted"><i className="h-full w-3/5 bg-[var(--cat-volunteer)]" /><i className="h-full w-2/5 bg-amber-500" /></span><span className="text-amber-600 dark:text-amber-300">Non-clin 92</span></div>
      <SummaryKpi value={<><span className="text-emerald-600 dark:text-emerald-300">138</span><span className="text-muted-foreground">/150</span></>} label="clin target" valueClassName="text-base" />
      <SummaryKpi value={<><span className="text-emerald-600 dark:text-emerald-300">92</span><span className="text-muted-foreground">/100</span></>} label="non-clin target" valueClassName="text-base" />
      <p className="text-xs font-bold text-muted-foreground xl:ml-auto"><b className="text-foreground">3.4 hrs/wk</b> → both targets land by <b className="text-foreground">Feb 2027</b></p>
    </section>
  )
  if (category === 'shadowing') return (
    <section className={shell}>
      <SummaryKpi value="58" label="hours" /><SummaryKpi value="3" label="physicians" /><SummaryKpi value="2" label="specialties" /><SummaryKpi value="3" label="settings seen" />
      <p className="text-xs font-bold text-muted-foreground xl:ml-auto"><span className="text-amber-600 dark:text-amber-300">Gap: 0 hrs primary care</span> · typical accepted range 40–100 total</p>
    </section>
  )
  if (category === 'clinical') return (
    <section className={shell}>
      <SummaryKpi value="376" label="clinical hours" /><SummaryKpi value="2" label="sites" /><SummaryKpi value="1" label="cert renewal due" valueClassName="text-amber-600 dark:text-amber-300" />
      <p className="flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground xl:ml-auto"><span><b className="text-foreground">8.2 hrs/wk</b> → <b className="text-foreground">≈812</b> by Jun 2027</span><span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-300"><ClipboardCheck className="size-3.5" /> clears your 750 target</span></p>
    </section>
  )
  return (
    <section className={shell}>
      <SummaryKpi value="2" label="labs / projects" /><SummaryKpi value="248" label="total hours" /><SummaryKpi value="5" label="outputs" />
      <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-extrabold xl:ml-auto"><StatusDot color="bg-muted-foreground" label="idea 1" /><StatusDot color="bg-primary" label="submitted 2" /><StatusDot color="bg-amber-500" label="accepted 1" /><StatusDot color="bg-emerald-500" label="presented 1" /></div>
    </section>
  )
}

function StatusDot({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5"><i className={cn('size-2 rounded-full', color)} />{label}</span>
}

function EntityRail({ category, entities, activeId, addLabel, onSelect, onAdd }: { category: ExperienceLayoutProps['category']; entities: Entity[]; activeId: string; addLabel: string; onSelect: (id: string) => void; onAdd: () => void }) {
  const columns = category === 'volunteering'
    ? 'grid-cols-[repeat(auto-fit,minmax(min(100%,14.375rem),1fr))]'
    : category === 'research'
      ? 'grid-cols-[repeat(auto-fit,minmax(min(100%,15.625rem),1fr))]'
      : 'grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))]'
  return (
    <section>
      <div className={cn('grid gap-2.5', columns)} role="tablist">
        {entities.map((entity) => (
          <button key={entity.id} type="button" role="tab" aria-selected={entity.id === activeId} onClick={() => onSelect(entity.id)} className={cn('relative min-h-[70px] rounded-xl border bg-card px-3.5 py-3 text-left shadow-sm transition', entity.id === activeId ? 'ring-1 ring-current/25' : 'hover:border-primary/35')} style={entity.id === activeId ? { borderColor: pillarAccent(category), color: 'inherit' } : undefined}>
            <div className="flex items-start gap-2">
              <span className="mt-1 size-2 shrink-0 rounded-full" style={{ background: pillarAccent(category) }} />
              <h2 className="min-w-0 flex-1 font-display text-sm font-extrabold leading-tight">{entity.name}</h2>
              <strong className="font-display text-lg leading-none tabular-nums">{entity.hours.replace('h', '')}</strong>
            </div>
            <p className="mt-1.5 text-[11.5px] font-bold leading-snug text-muted-foreground">{entity.subtitle}</p>
            <p className={cn('mt-1 text-[10.5px] font-bold leading-snug', entity.tone === 'warn' ? 'text-amber-600 dark:text-amber-300' : 'text-muted-foreground')}>{entity.meta}</p>
          </button>
        ))}
        <button type="button" onClick={onAdd} className="grid min-h-[70px] place-items-center rounded-xl border border-dashed bg-muted/10 p-3 text-[12.5px] font-extrabold text-muted-foreground hover:border-primary/40 hover:text-primary"><span>+ {addLabel.toLowerCase()}</span></button>
      </div>
    </section>
  )
}

function SectionShell({ title, hint, children, className }: { title: string; hint?: string; children: ReactNode; className?: string }) {
  return <section className={cn('overflow-hidden rounded-[14px] border bg-card px-[18px] py-4 shadow-sm', className)}><div className="mb-3"><h2 className="font-display text-base font-extrabold">{title}</h2>{hint && <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{hint}</p>}</div>{children}</section>
}

function VerificationLedger() {
  const rows = [
    ["UNC Children's Hospital — patient playroom", 'Chapel Hill, NC', '138', '3.0', 'Sep 2025–present', 'Marcus Lee · Volunteer Services Coord.', 'mlee@unchealth.unc.edu · (984) 974-1136', 'Clinical'],
    ['Habitat for Humanity — Orange County', 'Chapel Hill, NC', '64', '1.5', 'Oct 2025–present', 'Dana Whitfield · Site Supervisor', 'dwhitfield@orangehabitat.org · (919) 932-7077', 'Non-clinical'],
    ['TABLE — weekend meal packing', 'Carrboro, NC', '28', '1.0', 'Feb 2026–present', 'Priya Shah · Program Manager', 'priya@tablenc.org · (919) 636-4860', 'Non-clinical'],
  ]
  return <SectionShell title="Verification ledger" hint="Formatted the way AMCAS asks for it. One copy button per organization at application time."><DataTable headers={['Organization', 'Total hrs', 'Avg / wk', 'Dates', 'Contact (verifier)', 'Type', '']} mobileMinWidth="min-w-[47.5rem]">{rows.map((row) => <tr key={row[0]} className="border-t border-border/70"><td><strong>{row[0]}</strong><span className="block text-[10.5px] text-muted-foreground">{row[1]}</span></td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td><td><strong>{row[5]}</strong><span className="block text-[10.5px] text-muted-foreground">{row[6]}</span></td><td><StatusChip>{row[7]}</StatusChip></td><td><button className="inline-flex items-center gap-1 whitespace-nowrap text-[10.5px] font-bold text-primary"><Copy className="size-3" /> Copy for AMCAS</button></td></tr>)}</DataTable></SectionShell>
}

function SpecialtyExposure() {
  const rows = [
    ['Emergency Medicine', '34', '59%', 'ED, rural ED', 'Maintain relationship'],
    ['Orthopaedic Surgery', '24', '41%', 'OR, clinic', 'Send thank-you'],
    ['Primary care / Family Med', '0', '0%', 'None · adcoms ask about this one', 'Find a physician'],
  ]
  return <SectionShell title="Specialty exposure" hint="A plain table so gaps are facts, not vibes. Settings: OR · clinic · ED · rural."><DataTable headers={['Specialty', 'Hours', 'Share', 'Settings', 'Next move']} mobileMinWidth="min-w-[40rem]">{rows.map((row) => <tr key={row[0]} className="border-t border-border/70"><td className="font-bold">{row[0]}</td><td>{row[1]}</td><td><div className="flex items-center gap-2"><div className="h-1.5 w-24 rounded-full bg-muted"><div className={cn('h-full rounded-full', row[1] === '0' ? 'bg-amber-500' : 'bg-primary')} style={{ width: row[1] === '0' ? '4%' : row[2] }} /></div><span className="text-[10.5px] text-muted-foreground">{row[2]}</span></div></td><td className="text-muted-foreground">{row[3]}</td><td className="font-bold text-primary">{row[4]} →</td></tr>)}</DataTable></SectionShell>
}

function ResearchOutputs() {
  const rows = [
    ['Astrocyte Ca²⁺ signaling after mild TBI', 'Kwon Lab · first author', 'Poster', 'UNC Neuroscience Symposium', 'Presented · Apr 2026', 'presented'],
    ['Same, extended cohort (n=42)', 'Kwon Lab · co-author', 'Abstract', 'Society for Neuroscience 2026', 'Accepted · present Nov', 'accepted'],
    ['Microglial morphology pipeline (methods)', 'Kwon Lab · co-author', 'Paper', 'J. Neurotrauma (under review)', 'Submitted · Jun 2026', 'submitted'],
    ['EMS pre-hospital data retrospective', 'Health Policy lab · lead', 'Abstract', 'NC Health Research Day', 'Submitted · Jul 2026', 'submitted'],
    ['Prehospital stroke recognition review', 'Health Policy lab · lead', 'Talk', 'Undecided', 'Draft by Oct 1', 'idea'],
  ]
  return <SectionShell title="Outputs" hint="Every poster, abstract, talk, and paper as a row — the thing adcoms actually count."><DataTable headers={['Project / output', 'Type', 'Venue', 'Deadline / milestone', 'Status']} mobileMinWidth="min-w-[45rem]">{rows.map((row) => <tr key={row[0]} className="border-t border-border/70"><td><strong>{row[0]}</strong><span className="block text-[10.5px] text-muted-foreground">{row[1]}</span></td><td>{row[2]}</td><td>{row[3]}</td><td>{row[4]}</td><td><StatusChip tone={row[5] === 'presented' || row[5] === 'accepted' ? 'good' : row[5] === 'idea' ? 'quiet' : 'primary'}>{row[5]}</StatusChip></td></tr>)}</DataTable></SectionShell>
}

function DataTable({ headers, children, mobileMinWidth }: { headers: string[]; children: ReactNode; mobileMinWidth: string }) {
  return <div className="overflow-x-auto"><table className={cn('w-full border-collapse text-[12.5px] font-semibold [&_td]:px-2.5 [&_td]:py-2.5 [&_td]:align-middle md:min-w-0', mobileMinWidth)}><thead className="bg-muted/25 text-left text-[10px] uppercase tracking-[0.08em] text-muted-foreground"><tr>{headers.map((header) => <th key={header} className="px-2.5 py-1.5 font-extrabold">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>
}

function StatusChip({ children, tone = 'primary' }: { children: ReactNode; tone?: 'primary' | 'good' | 'warn' | 'quiet' }) {
  return <span className={cn('inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-bold', tone === 'good' && 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300', tone === 'warn' && 'bg-amber-500/12 text-amber-700 dark:text-amber-300', tone === 'quiet' && 'bg-muted text-muted-foreground', tone === 'primary' && 'bg-primary/10 text-primary')}>{children}</span>
}

function WorkspaceHero({ title, metadata, hours, footer }: { title: string; metadata: ReactNode; hours: string; footer: ReactNode }) {
  return <div className="mb-3.5 grid gap-3 rounded-xl border bg-muted/20 px-[17px] py-[15px] sm:grid-cols-[1fr_auto]"><div className="min-w-0"><h2 className="font-display text-[19px] font-extrabold leading-tight">{title}</h2><div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px] font-bold text-muted-foreground">{metadata}</div></div><div><strong className="font-display text-[38px] font-extrabold leading-none tabular-nums">{hours}</strong><span className="block text-[10px] font-extrabold uppercase tracking-[0.06em] text-muted-foreground">hours here</span></div><div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-dashed border-border pt-2 text-[11px] font-bold text-muted-foreground sm:col-span-2">{footer}</div></div>
}

function WorkspaceModule({ title, icon: Icon, children, action, className }: { title: string; icon: ComponentType<{ className?: string }>; children: ReactNode; action?: string; className?: string }) {
  return <section className={cn('rounded-xl border bg-muted/15 px-[15px] py-[13px]', className)}><div className="mb-2.5 flex items-center gap-2"><Icon className="size-3.5 text-primary" /><h3 className="text-[11px] font-extrabold uppercase tracking-[0.08em]">{title}</h3>{action && <span className="ml-auto text-[10.5px] font-bold text-primary">{action}</span>}</div>{children}</section>
}

function VolunteeringWorkspace({ entity, onAddEntry }: { entity: Entity; onAddEntry: AddExperience }) {
  return <section className="rounded-[14px] border bg-card p-[18px] shadow-sm">
    <WorkspaceHero title={entity.id === 'unc-childrens' ? "UNC Children's Hospital — patient playroom" : entity.name} metadata={<><span>Clinical</span><span>Sep 2025 – present</span><span>Sat 9a–12p</span></>} hours={entity.id === 'unc-childrens' ? '138' : entity.hours.replace('h', '')} footer={<><span>AMCAS verifier: Marcus Lee · Volunteer Services Coordinator</span><span>mlee@unchealth.unc.edu · (984) 974-1136</span><span>Last activity: 5 days ago</span></>} />
    <div className="grid gap-3 lg:grid-cols-2"><WorkspaceModule title="Impact numbers" icon={TrendingUp}><div className="grid grid-cols-3 gap-2"><SmallFact value="~310" label="patient visits" /><SmallFact value="46" label="shifts" /><SmallFact value="4" label="event days run" /></div></WorkspaceModule><WorkspaceModule title="Notes" icon={FileText}><p className="text-[13px] leading-relaxed text-muted-foreground">Charge nurse (5E) knows me by name — ask Marcus about the teen-lounge pilot in August. Isolation-room protocol retrained Jun 14.</p></WorkspaceModule><WorkspaceModule className="lg:col-span-2" title="Hours log" icon={Clock3}><ExactLogRows initialDate="Jul 19" rows={[['Jul 12', 'Playroom + two bedside visits (5E)', '3.0'], ['Jul 5', 'Playroom · craft table · sibling support', '3.0'], ['Jun 28', 'Family movie night setup + run', '4.0']]} onAdd={(values) => onAddEntry({ org: entity.name, startDate: values[0], hours: Number(values[1]), description: values[2], status: 'active' })} placeholder="what did you do? who did it help? (numbers make AMCAS descriptions)" /><p className="mt-2.5 text-[11px] text-muted-foreground">Impact prompt at log time: “how many patients/people today?” — keeps descriptions concrete.</p></WorkspaceModule></div>
  </section>
}

function ShadowingWorkspace({ entity, onAddEntry }: { entity: Entity; onAddEntry: AddExperience }) {
  return <section className="rounded-[14px] border bg-card p-[18px] shadow-sm">
    <WorkspaceHero title="Dr. Elena Vasquez, MD — Emergency Medicine" metadata={<><span>UNC Hillsborough ED · community hospital</span><span>First session Mar 2026</span></>} hours="34" footer={<><span>evasquez@unchealth.unc.edu</span><span>(919) 245-3200 · via ED admin</span><span>Met through MEDIC ride-along</span></>} />
    <div className="grid gap-3 lg:grid-cols-2"><WorkspaceModule title="Thank-you" icon={UserRound}><LabeledRow label="Status" value="Sent · Jun 30 (card + email)" action="Log another touch" /></WorkspaceModule><WorkspaceModule title="Letter potential" icon={FileText}><LabeledRow label="Status" value="Asked · Jul 2 — she said yes" action="Open in Letters →" /></WorkspaceModule><WorkspaceModule className="lg:col-span-2" title="Sessions" icon={CalendarDays}><ExactLogRows initialDate="Jul 20" rows={[['Jul 2', 'Friday overnight, 7p–1a||STEMI activation → cath lab handoff · pediatric asthma · how she runs a family conversation about hospice', '6.0'], ['Jun 14', 'Day shift||shoulder reduction under sedation · psych hold placement · she let me listen to a murmur', '8.0'], ['May 30', 'First shadow day||triage flow · two traumas · debrief over coffee about EM lifestyle and burnout', '8.0']]} onAdd={(values) => onAddEntry({ org: entity.name, startDate: values[0], hours: Number(values[1]), description: values[2], status: 'active' })} placeholder="what did you see? (procedures, conversations, decisions)" /></WorkspaceModule></div>
  </section>
}

function ClinicalWorkspace({ entity, onAddEntry }: { entity: Entity; onAddEntry: AddExperience }) {
  return <section className="rounded-[14px] border bg-card p-[18px] shadow-sm">
    <WorkspaceHero title="Orange County EMS — MEDIC" metadata={<><span>EMT-Basic</span><StatusChip tone="good">Active</StatusChip><span>Jan 2026 – present</span><span>26 shifts</span></>} hours="312" footer={<><span>AMCAS verifier: Capt. Dana Brooks · Shift Supervisor</span><span>dbrooks@orangecountync.gov · (919) 245-6145</span><span>8.2 hrs/wk here · streak intact</span></>} />
    <div className="grid gap-3 lg:grid-cols-[1.05fr_.95fr]"><div className="space-y-3"><WorkspaceModule title="Certifications" icon={ShieldCheck}><div className="space-y-2"><LabeledRow label="NC EMT-Basic" value="Expires Mar 31, 2027 · 24 CE hrs needed, 9 done" action="Renew by Jan 2027" /><LabeledRow label="AHA BLS Provider" value="Expires Nov 2027" action="Current" /><LabeledRow label="NIMS ICS-100/200" value="No expiry" action="Done" /></div></WorkspaceModule><WorkspaceModule title="Skills — observed / performed" icon={ClipboardCheck}><div className="space-y-2"><SkillRow label="Vitals full set (BP, SpO₂, BGL)" observed="4" performed="180+" /><SkillRow label="Trauma assessment + splinting" observed="12" performed="31" /><SkillRow label="CPR / BVM on arrest" observed="3" performed="2" /><SkillRow label="12-lead placement" observed="9" performed="22" /><SkillRow label="Med admin (O₂, glucose, ASA)" observed="6" performed="17" /></div></WorkspaceModule></div><WorkspaceModule title="Shift log" icon={Clock3}><ExactLogRows initialDate="Jul 19" rows={[['Jul 12', 'Sat 7a–7p, Unit 42 w/ Brooks · trauma ×2 · code ×1 · transfers ×3', '12.0'], ['Jul 5', 'Sat 7a–7p · psych ×1 · routine ×5', '12.0'], ['Jun 28', 'Sat 7a–3p (cut short, truck down) · trauma ×1 · routine ×2', '8.0']]} onAdd={(values) => onAddEntry({ org: entity.name, startDate: values[0], hours: Number(values[1]), description: values[2], status: 'active' })} placeholder="shift + calls (e.g. 7a–7p, 2 trauma, 1 code)" /></WorkspaceModule></div>
  </section>
}

function ResearchWorkspace({ entity, onAddEntry }: { entity: Entity; onAddEntry: AddExperience }) {
  return <section className="rounded-[14px] border bg-card p-[18px] shadow-sm">
    <WorkspaceHero title="Kwon Lab — TBI neuroinflammation" metadata={<><span>Wet lab · confocal imaging + behavior</span><span>Jun 2025 – present · ~6 hrs/wk</span></>} hours="196" footer={<><span>AMCAS verifier: Dr. Sarah Kwon · Principal Investigator</span><span>skwon@neuro.unc.edu · (919) 966-1029</span><span>4 outputs · 1 first-author poster</span></>} />
    <div className="grid gap-3 lg:grid-cols-2"><WorkspaceModule title="Meetings with PI" icon={Users}><div className="rounded-lg bg-muted/25 p-2.5"><strong className="text-[12px]">Jul 10 · 1:1</strong><p className="mt-1 text-[12px] text-muted-foreground">Agreed I lead the SfN poster figures. She wants n bumped before submission.</p></div><p className="mt-3 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">To discuss next time</p><div className="mt-1.5 space-y-1.5">{['Ask about authorship order on the methods paper', 'Confocal time conflict w/ Tue clinicals', 'Summer stipend / work-study paperwork'].map((item) => <label key={item} className="flex items-center gap-2 text-[12px]"><input type="checkbox" className="size-3.5 rounded" />{item}</label>)}</div></WorkspaceModule><WorkspaceModule title="Lab notebook / hours" icon={Microscope}><ExactLogRows initialDate="Jul 14" rows={[['Jul 11', 'Confocal — 6 slices, GFAP+Iba1 co-stain', '5.0'], ['Jul 8', 'ImageJ morphology batch + QC', '4.0'], ['Jul 3', 'Perfusions + tissue collection (n=4)', '6.0']]} onAdd={(values) => onAddEntry({ org: entity.name, startDate: values[0], hours: Number(values[1]), description: values[2], status: 'active' })} placeholder="what you did in lab" /></WorkspaceModule></div>
  </section>
}
function SmallFact({ value, label }: { value: string; label: string }) { return <div className="rounded-lg bg-muted/25 px-2.5 py-2"><strong className="font-display text-[18px] leading-none">{value}</strong><span className="mt-1 block text-[10.5px] text-muted-foreground">{label}</span></div> }
function LabeledRow({ label, value, action }: { label: string; value: string; action: string }) { return <div className="grid gap-1 rounded-lg bg-muted/25 px-2.5 py-2 sm:grid-cols-[7rem_1fr_auto] sm:items-center"><strong className="text-[12px]">{label}</strong><span className="text-[11.5px] text-muted-foreground">{value}</span><span className="text-[10.5px] font-bold text-primary">{action}</span></div> }
function SkillRow({ label, observed, performed }: { label: string; observed: string; performed: string }) { return <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg bg-muted/20 px-2.5 py-1.5 text-[12px]"><strong>{label}</strong><span className="text-[10.5px] text-muted-foreground">Observed {observed}</span><span className="text-[10.5px] font-bold text-primary">Performed {performed}</span></div> }

function ExactLogRows({ rows, onAdd, placeholder, initialDate }: { rows: string[][]; onAdd: (values: string[]) => void; placeholder: string; initialDate: string }) {
  const [date, setDate] = useState(initialDate)
  const [hours, setHours] = useState('')
  const [description, setDescription] = useState('')
  return <div><div>{rows.map((row) => {
    const [main, detail] = row[1].split('||')
    return <div key={`${row[0]}-${row[1]}`} className="grid gap-1.5 border-b border-dashed border-border px-1 py-2 sm:grid-cols-[4.5rem_1fr_3.25rem] sm:items-center"><strong className="text-[10.5px] text-muted-foreground">{row[0]}</strong><span className="text-[12px]"><span className="font-semibold">{main}</span>{detail && <span className="mt-0.5 block text-[10.5px] leading-snug text-muted-foreground">{detail}</span>}</span><strong className="text-right text-[12px]">{row[2]}h</strong></div>
  })}</div><div className="mt-2.5 grid gap-2 border-t border-dashed border-border pt-2.5 sm:grid-cols-[6rem_4.5rem_1fr_auto]"><Input className="h-8 text-xs" value={date} onChange={(event) => setDate(event.target.value)} placeholder={initialDate} aria-label="Date" /><Input className="h-8 text-xs" value={hours} onChange={(event) => setHours(event.target.value)} placeholder="hrs" aria-label="Hours" /><Input className="h-8 text-xs" value={description} onChange={(event) => setDescription(event.target.value)} placeholder={placeholder} aria-label="Log detail" /><Button className="h-8" size="sm" onClick={() => { onAdd([date, hours, description]); setDate(initialDate); setHours(''); setDescription('') }}><Plus className="size-3.5" /> Log</Button></div></div>
}
