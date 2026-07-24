import { Compass, Zap, Layers, CalendarRange, Brain, ExternalLink } from 'lucide-react'
import { ROUTE_MAP } from '@/app/routes'
import { PageHeader } from '@/components/common/PageHeader'
import { Collapsible } from '@/components/common/Collapsible'
import { Card, CardContent } from '@/components/ui/card'

const SYSTEMS = [
  ['AMCAS', 'MD (allopathic) schools — the main one for Andy.'],
  ['AACOMAS', 'DO (osteopathic) schools.'],
  ['TMDSAS', 'Texas public schools.'],
]
const COMPONENTS = [
  ['Academics', 'Cumulative GPA + BCPM (science) GPA — the science GPA is the most scrutinized number.'],
  ['MCAT', 'One standardized score; gates a lot of screening.'],
  ['Clinical experience', 'Paid or volunteer patient contact — proves you know what you’re signing up for.'],
  ['Volunteering / service', 'Especially with the underserved; shows orientation toward others.'],
  ['Shadowing', 'Observing physicians; many schools want documented hours.'],
  ['Research', 'Valued, increasingly at top/research-heavy schools.'],
  ['Leadership & ECs', 'Depth and commitment over a long scatter of one-offs.'],
  ['Letters of rec', 'Usually science faculty + others; some schools want a committee letter.'],
  ['Personal statement', 'The “why medicine” narrative.'],
  ['Secondary essays', 'School-specific; pre-writing common prompts is a known edge.'],
  ['Interviews', 'Traditional + MMI; the final filter and a two-way fit check.'],
  ['School list', 'Built realistically against your stats + mission fit + in-state status.'],
]
const TIMELINE = [
  ['Years 1–3 — build phase', 'Finish prereqs, protect GPA, accumulate clinical/volunteer/shadowing/research hours, build letter relationships, keep a running story bank.'],
  ['~12–18 months before matriculation', 'Take the MCAT once content is complete (for you: spring 2029).'],
  ['Application year — May/June', 'AMCAS opens; submit the primary early.'],
  ['Summer', 'Secondaries arrive in waves — turn them around fast.'],
  ['Fall–winter', 'Interviews (rolling).'],
  ['Winter–spring', 'Decisions, including waitlists. Then matriculate the following fall.'],
]
const MINDSET = [
  'Longitudinal commitment beats last-minute box-checking — start early, stay consistent.',
  'Reflection matters as much as the activity — log why it mattered while it’s fresh.',
  'Fit is mutual — the school list and interviews are about matching mission, not just stats.',
  'Apply early, apply complete.',
]
const COMMUNITY = [
  ['r/premed wiki', 'https://www.reddit.com/r/premed/wiki/index', 'The #1 human-made overview of the whole process.'],
  ['Student Doctor Network', 'https://forums.studentdoctor.net/forums/pre-medical-md.10/', 'Moderated, higher-signal forum with adcoms/residents.'],
  ['r/MCAT', 'https://www.reddit.com/r/Mcat/', 'MCAT Q&A, score threads, deck/resource discussion.'],
]

export function NorthStar() {
  const route = ROUTE_MAP.northstar
  return (
    <div>
      <PageHeader title={route.label} />

      <Card className="mb-6 overflow-hidden border-primary/30">
        <CardContent className="flex items-start gap-4 bg-gradient-to-br from-secondary/70 to-card py-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Zap className="size-5" /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">The one fact that drives the timing</p>
            <p className="mt-1 font-display text-lg font-semibold">Med school is rolling admissions.</p>
            <p className="mt-1 text-sm text-muted-foreground">Schools review and offer seats as applications arrive — so applying early (complete and verified, ideally by June) materially raises your odds. A strong application submitted late competes for fewer remaining seats. This is why the whole timeline is front-loaded.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="flex items-start gap-3 py-5">
          <Compass className="size-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">Getting in isn’t a checklist of boxes — it’s assembling a <b className="text-foreground">coherent story</b> that convinces a committee you’ll make a good physician. Grades + MCAT show you can handle the academics; experiences show you know what medicine is; essays, letters, and interviews show who you are and why medicine. The pieces are read together, not in isolation.</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Collapsible defaultOpen title={<span className="flex items-center gap-2"><Layers className="size-4 text-primary" /> The three application systems</span>}>
          <ul className="space-y-2">{SYSTEMS.map(([k, v]) => <li key={k} className="text-sm"><b>{k}</b> — {v}</li>)}</ul>
          <p className="mt-2 text-xs text-muted-foreground">Each service recalculates GPA its own way (no grade replacement on AMCAS; repeats averaged; BCPM broken out).</p>
        </Collapsible>

        <Collapsible title={<span className="flex items-center gap-2"><Brain className="size-4 text-primary" /> What adcoms weigh</span>}>
          <div className="grid gap-2 sm:grid-cols-2">{COMPONENTS.map(([k, v]) => <div key={k} className="text-sm"><b>{k}</b> — <span className="text-muted-foreground">{v}</span></div>)}</div>
        </Collapsible>

        <Collapsible title={<span className="flex items-center gap-2"><CalendarRange className="size-4 text-primary" /> The master timeline</span>}>
          <ol className="space-y-2">{TIMELINE.map(([k, v]) => <li key={k} className="text-sm"><b>{k}</b> — <span className="text-muted-foreground">{v}</span></li>)}</ol>
        </Collapsible>

        <Collapsible title="Mindset themes that recur across every good guide">
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{MINDSET.map((m) => <li key={m}>{m}</li>)}</ul>
        </Collapsible>
      </div>

      <h3 className="mb-3 mt-7 text-sm font-bold">Human-made resources (lead here, not consulting blogs)</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {COMMUNITY.map(([label, url, desc]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border bg-card p-4 card-soft transition-all hover:-translate-y-0.5 hover:border-primary/40">
            <div className="flex items-center gap-1.5 font-semibold">{label}<ExternalLink className="size-3.5 text-muted-foreground" /></div>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
