import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Archive, Link2, Plus } from 'lucide-react'
import { useStore } from '@/store/store'
import { resolveAcademicMigration } from '@/store/migrations/academicsV4'
import { resolveAcademicContactMigration } from '@/store/migrations/academicsV5'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function field(record: Record<string, unknown> | undefined, key: string) {
  return String(record?.[key] ?? '').trim()
}

export function AcademicMigrationReview() {
  const journal = useStore((state) => state.academics.migrationJournal)
  const courses = useStore((state) => state.courses)
  const persons = useStore((state) => state.persons)
  const update = useStore((state) => state.update)
  const pending = useMemo(() => journal.filter((entry) => entry.status === 'pending'), [journal])
  const [open, setOpen] = useState(false)
  const active = pending[0]
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [selectedPersonId, setSelectedPersonId] = useState('')
  const [code, setCode] = useState('')
  const [title, setTitle] = useState('')
  const [term, setTerm] = useState('')

  useEffect(() => {
    if (!active) return
    setSelectedCourseId(active.candidateCourseIds?.[0] ?? active.courseId ?? '')
    setSelectedPersonId(active.candidatePersonIds?.[0] ?? '')
    setCode(field(active.legacyWorkspace, 'courseCode'))
    setTitle(field(active.legacyWorkspace, 'courseTitle'))
    setTerm(active.inferredTerm ?? field(active.legacyWorkspace, 'semester'))
  }, [active])

  if (!active) return null

  function resolve(
    resolution: Parameters<typeof resolveAcademicMigration>[2],
  ) {
    update((draft) => { resolveAcademicMigration(draft, active.id, resolution) })
  }

  const isTermConfirmation = active.kind === 'current-term-confirmation'
  const isContactConflict = active.kind === 'contact-conflict'
  const contactName = field(active.legacyContact, 'name')
  const contactEmail = field(active.legacyContact, 'email')
  return (
    <>
      <section className="mb-4 flex flex-col gap-3 rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-300" aria-hidden="true" />
          <div>
            <p className="font-bold">Academics migration needs your review</p>
            <p className="text-sm text-muted-foreground">
              {pending.length} {pending.length === 1 ? 'item needs' : 'items need'} confirmation. Nothing was discarded.
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => setOpen(true)}>Review migration</Button>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isTermConfirmation
                ? 'Confirm your current term'
                : isContactConflict
                  ? 'Reconcile an academic contact'
                  : 'Reconcile an older class workspace'}
            </DialogTitle>
            <DialogDescription>
              {active.reason} Original snapshots remain in the migration journal.
            </DialogDescription>
          </DialogHeader>

          {isTermConfirmation ? (
            <label className="space-y-2 text-sm font-semibold">
              Current term
              <Input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Fall 2026" />
            </label>
          ) : isContactConflict ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-muted/35 p-3">
                <p className="font-bold">{contactName || 'Unnamed contact'}</p>
                <p className="text-sm text-muted-foreground">{contactEmail || 'No email on the imported contact'}</p>
              </div>
              {!!active.candidatePersonIds?.length && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Link to an existing Person</p>
                  <div className="flex gap-2">
                    <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
                      <SelectTrigger className="flex-1"><SelectValue placeholder="Choose a person" /></SelectTrigger>
                      <SelectContent>
                        {persons
                          .filter((person) => active.candidatePersonIds?.includes(person.id))
                          .map((person) => (
                            <SelectItem key={person.id} value={person.id}>
                              {person.name}{person.email ? ` · ${person.email}` : ''}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={() => selectedPersonId && update((draft) => {
                        resolveAcademicContactMigration(draft, active.id, { type: 'link-person', personId: selectedPersonId })
                      })}
                    >
                      <Link2 className="size-4" /> Link
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="space-y-2 text-sm font-semibold">
                  Course code
                  <Input value={code} onChange={(event) => setCode(event.target.value)} placeholder="CHEM 262" />
                </label>
                <label className="space-y-2 text-sm font-semibold sm:col-span-2">
                  Course title
                  <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Biochemistry" />
                </label>
                <label className="space-y-2 text-sm font-semibold sm:col-span-3">
                  Term
                  <Input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Fall 2026" />
                </label>
              </div>

              {courses.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Or link to an existing Course</p>
                  <div className="flex gap-2">
                    <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                      <SelectTrigger className="flex-1"><SelectValue placeholder="Choose a course" /></SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code} · {course.term}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={() => selectedCourseId && resolve({ type: 'link', courseId: selectedCourseId })}
                    >
                      <Link2 className="size-4" /> Link
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-between">
            {!isTermConfirmation && !isContactConflict && (
              <Button variant="ghost" onClick={() => resolve({ type: 'journal-only' })}>
                <Archive className="size-4" /> Keep in journal only
              </Button>
            )}
            {isTermConfirmation ? (
              <Button onClick={() => term.trim() && resolve({ type: 'confirm-term', term })}>
                Confirm term
              </Button>
            ) : isContactConflict ? (
              <Button onClick={() => update((draft) => {
                resolveAcademicContactMigration(draft, active.id, { type: 'create-person' })
              })}>
                <Plus className="size-4" /> Keep as a separate Person
              </Button>
            ) : (
              <Button onClick={() => code.trim() && title.trim() && term.trim() && resolve({ type: 'create', code, title, term })}>
                <Plus className="size-4" /> Create Course
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
