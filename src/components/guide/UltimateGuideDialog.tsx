import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Brain, CalendarRange, Compass, ExternalLink, Layers, Zap } from 'lucide-react'
import { useStore } from '@/store/store'
import { Collapsible } from '@/components/common/Collapsible'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'

const APPLICATION_SYSTEMS = [
  ['AMCAS', 'MD (allopathic) schools; the main system for this plan.'],
  ['AACOMAS', 'DO (osteopathic) schools.'],
  ['TMDSAS', 'Texas public schools.'],
]

const APPLICATION_COMPONENTS = [
  ['Academics', 'Cumulative GPA + BCPM (science) GPA; the science GPA is the most scrutinized number.'],
  ['MCAT', 'One standardized score that gates a lot of screening.'],
  ['Clinical experience', 'Paid or volunteer patient contact; proof that medicine is an informed choice.'],
  ['Volunteering / service', 'Especially service with underserved communities; shows orientation toward others.'],
  ['Shadowing', 'Observing physicians; many schools want documented hours.'],
  ['Research', 'Valued broadly and increasingly important at research-heavy schools.'],
  ['Leadership & ECs', 'Depth and commitment over a long scatter of one-offs.'],
  ['Letters of rec', 'Usually science faculty plus others; some schools want a committee letter.'],
  ['Personal statement', 'The why-medicine narrative.'],
  ['Secondary essays', 'School-specific writing; pre-writing common prompts is a real edge.'],
  ['Interviews', 'Traditional and MMI formats; the final filter and a two-way fit check.'],
  ['School list', 'Built realistically against stats, mission fit, geography, and in-state status.'],
]

const MASTER_TIMELINE = [
  ['Years 1-3 - build phase', 'Finish prereqs, protect GPA, accumulate clinical/service/shadowing/research hours, build letter relationships, and keep a running story bank.'],
  ['12-18 months before matriculation', 'Take the MCAT once content is complete; for this plan, that points to spring 2029.'],
  ['Application year - May/June', 'AMCAS opens; submit the primary early and complete.'],
  ['Summer', 'Secondaries arrive in waves; turn them around fast.'],
  ['Fall-winter', 'Interviews happen during rolling review.'],
  ['Winter-spring', 'Decisions and waitlists, then matriculation the following fall.'],
]

const GUIDE_MINDSET = [
  'Longitudinal commitment beats last-minute box-checking: start early, stay consistent.',
  'Reflection matters as much as the activity: log why an experience mattered while it is fresh.',
  'Fit is mutual: the school list and interviews are about mission fit, not just stats.',
  'Apply early, apply complete.',
]

const COMMUNITY_RESOURCES = [
  ['r/premed wiki', 'https://www.reddit.com/r/premed/wiki/index', 'Broad, human-made overview of the whole process.'],
  ['Student Doctor Network', 'https://forums.studentdoctor.net/forums/pre-medical-md.10/', 'Moderated forum with adcom, resident, and applicant perspectives.'],
  ['r/MCAT', 'https://www.reddit.com/r/Mcat/', 'MCAT Q&A, score threads, deck and resource discussion.'],
]

export function UltimateGuideDialog() {
  const [open, setOpen] = useState(false)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const guideLinkOpened = params.get('guide') === 'open' || params.get('northstar') === 'open'

  useEffect(() => {
    if (guideLinkOpened) setOpen(true)
  }, [guideLinkOpened])

  function onOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen && guideLinkOpened) navigate(location.pathname, { replace: true })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="inline-flex gap-1.5 border border-primary/30 bg-primary text-primary-foreground shadow-sm"
        >
          <Compass className="size-4" />
          <span className="hidden sm:inline">Ultimate Guide</span>
          <span className="sm:hidden">Guide</span>
        </Button>
      </DialogTrigger>
        <DialogContent className="max-h-[86svh] max-w-5xl overflow-y-auto p-0">
          <DialogHeader className="border-b border-border bg-[color-mix(in_srgb,var(--secondary)_42%,var(--card))] px-5 py-4 pr-12">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Premed Ultimate Guide</p>
            <DialogTitle className="font-display text-2xl">The whole application, kept in view</DialogTitle>
            <DialogDescription>A compact map of the systems, evidence, timing, mindset, and resources behind the dashboard.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-5">
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-primary/25 bg-secondary/45 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-primary"><Zap className="size-4" /> The fact that drives timing</div>
                <p className="font-display text-lg font-semibold">Med school is rolling admissions.</p>
                <p className="mt-1 text-sm text-muted-foreground">Schools review and offer seats as applications arrive, so applying early, complete, and verified materially raises your odds. This is why the whole plan front-loads MCAT, letters, essays, and secondaries.</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/25 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold"><Compass className="size-4 text-primary" /> What the application is really doing</div>
                <p className="text-sm text-muted-foreground">It is not just a checklist. Grades and MCAT show academic readiness; experiences show exposure and commitment; essays, letters, and interviews explain who you are and why medicine. The pieces are read together.</p>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              <Collapsible defaultOpen title={<span className="flex items-center gap-2"><Layers className="size-4 text-primary" /> The three application systems</span>}>
                <ul className="space-y-2">
                  {APPLICATION_SYSTEMS.map(([name, detail]) => <li key={name} className="text-sm"><b>{name}</b> - <span className="text-muted-foreground">{detail}</span></li>)}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">Each service recalculates GPA its own way. AMCAS does not replace grades; repeats are averaged, and BCPM is broken out.</p>
              </Collapsible>

              <Collapsible defaultOpen title={<span className="flex items-center gap-2"><CalendarRange className="size-4 text-primary" /> The master timeline</span>}>
                <ol className="space-y-2">
                  {MASTER_TIMELINE.map(([name, detail]) => <li key={name} className="text-sm"><b>{name}</b> - <span className="text-muted-foreground">{detail}</span></li>)}
                </ol>
              </Collapsible>
            </div>

            <Collapsible defaultOpen title={<span className="flex items-center gap-2"><Brain className="size-4 text-primary" /> What admissions committees weigh</span>}>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {APPLICATION_COMPONENTS.map(([name, detail]) => (
                  <div key={name} className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
                    <b>{name}</b>
                    <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            <div className="grid gap-3 xl:grid-cols-2">
              <Collapsible defaultOpen={guideLinkOpened} title="Mindset themes that recur across every good guide">
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {GUIDE_MINDSET.map((m) => <li key={m}>{m}</li>)}
                </ul>
              </Collapsible>
              <GuideResources guideLinkOpened={guideLinkOpened} />
            </div>

            <div className="flex justify-end">
              <Button asChild variant="outline" size="sm">
                <Link to="/timeline" onClick={() => setOpen(false)}>Open cycle timeline</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
    </Dialog>
  )
}

function GuideResources({ guideLinkOpened }: { guideLinkOpened: boolean }) {
  const officialResources = useStore((s) => s.resources).filter((r) => r.official).slice(0, 6)

  return (
    <Collapsible defaultOpen={guideLinkOpened} title="Human-made and official resources">
      <div className="grid gap-2 sm:grid-cols-2">
        {COMMUNITY_RESOURCES.map(([label, url, desc]) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card p-3 hover:border-primary/40">
            <span className="flex items-center gap-1.5 text-sm font-bold">{label}<ExternalLink className="size-3.5 text-muted-foreground" /></span>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
          </a>
        ))}
        {officialResources.map((r) => (
          <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border bg-card p-3 hover:border-primary/40">
            <span className="flex items-center gap-1.5 text-sm font-bold">{r.label}<ExternalLink className="size-3.5 text-muted-foreground" /></span>
            <p className="mt-1 text-xs text-muted-foreground">{r.category}</p>
          </a>
        ))}
      </div>
    </Collapsible>
  )
}
