import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Archive as ArchiveIcon, Cloud, Download, Upload, RotateCcw, Check, AlertCircle,
  Palette, ExternalLink, CheckCircle2, Trash2,
} from 'lucide-react'
import { useStore } from '@/store/store'
import { useBackup } from '@/store/useBackup'
import { ROUTE_MAP } from '@/app/routes'
import { exportJson, readJsonFile, looksLikeAppData } from '@/lib/dataIo'
import { fmtDate, fmtTimeAgo } from '@/lib/date'
import { VISUAL_THEMES } from '@/lib/themeAssets'
import type { AppData } from '@/lib/types'
import { PageHeader } from '@/components/common/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function Settings() {
  const route = ROUTE_MAP.settings
  const settings = useStore((s) => s.settings)
  const update = useStore((s) => s.update)
  const replaceAll = useStore((s) => s.replaceAll)
  const resetToSeed = useStore((s) => s.resetToSeed)
  const backup = useBackup()
  const fileRef = useRef<HTMLInputElement>(null)
  const archiveRef = useRef<HTMLDivElement>(null)
  const [params] = useSearchParams()
  const [msg, setMsg] = useState('')
  const archiveRequested = params.get('tab') === 'archive'

  useEffect(() => {
    if (archiveRequested) archiveRef.current?.scrollIntoView({ block: 'start' })
  }, [archiveRequested])

  async function onImport(file: File) {
    try {
      const data = await readJsonFile(file)
      replaceAll(data)
      setMsg('Imported successfully.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Import failed.')
    }
  }

  async function restoreFromDrive() {
    try {
      const data = await backup.restore()
      if (looksLikeAppData(data)) { replaceAll(data as AppData); setMsg('Restored from Google Drive.') }
      else setMsg('No backup found on Drive.')
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Restore failed.')
    }
  }

  return (
    <div>
      <PageHeader title={route.label} />

      {msg && <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/30 bg-secondary px-3 py-2 text-sm"><Check className="size-4 text-primary" /> {msg}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Local data</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Everything autosaves to this browser instantly. Export a JSON copy for safekeeping, or import one to restore.</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportJson}><Download className="size-4" /> Export JSON</Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}><Upload className="size-4" /> Import JSON</Button>
              <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f) }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Cloud className="size-4 text-primary" /> Google Drive backup</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label>Google OAuth Client ID</Label>
              <Input
                defaultValue={settings.backup.googleClientId}
                placeholder="xxxxxx.apps.googleusercontent.com"
                onBlur={(e) => update((d) => { d.settings.backup.googleClientId = e.target.value.trim() })}
              />
              <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Google Cloud Console <ExternalLink className="size-3" />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {backup.enabled
                ? <Button variant="outline" onClick={backup.disconnect}>Disconnect</Button>
                : <Button onClick={backup.connect}><Cloud className="size-4" /> Connect Drive</Button>}
              <Button variant="outline" onClick={backup.backupNow} disabled={!backup.enabled}>Back up now</Button>
              <Button variant="ghost" onClick={restoreFromDrive} disabled={!backup.enabled}>Restore</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {backup.lastBackupAt ? <>Last backed up {fmtTimeAgo(backup.lastBackupAt)}.</> : 'Not backed up to Drive yet.'}
              {backup.error && <span className="ml-1 inline-flex items-center gap-1 text-destructive"><AlertCircle className="size-3" /> {backup.error}</span>}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="size-4 text-primary" /> Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label className="normal-case">Mode</Label>
              <div className="flex gap-1 rounded-lg bg-muted p-1">
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <button key={t} onClick={() => update((d) => { d.settings.theme = t })} className={cn('rounded-md px-3 py-1 text-xs font-semibold capitalize', settings.theme === t ? 'bg-card shadow-sm' : 'text-muted-foreground')}>{t}</button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Label className="normal-case">Artwork</Label>
              <div className="flex gap-1 rounded-lg bg-muted p-1">
                {VISUAL_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    title={theme.description}
                    onClick={() => update((d) => { d.settings.visualTheme = theme.id })}
                    className={cn('inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold', settings.visualTheme === theme.id ? 'bg-card shadow-sm' : 'text-muted-foreground')}
                  >
                    <span className={cn('size-2.5 rounded-full', theme.id === 'doraemon' ? 'bg-[#1e9bd7]' : 'bg-leaf')} />
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div><Label className="normal-case">Live daily quote</Label><p className="text-xs text-muted-foreground">Pull from the web source when available.</p></div>
              <Switch checked={settings.quotesApi} onCheckedChange={(v) => update((d) => { d.settings.quotesApi = v })} />
            </div>

            {settings.dismissedAlertKey && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-muted/35 px-3 py-2">
                <span className="text-sm font-semibold">Due-soon task strip hidden</span>
                <Button size="sm" variant="outline" onClick={() => update((d) => { d.settings.dismissedAlertKey = '' })}>Restore</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader><CardTitle className="text-destructive">Danger zone</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Reset everything back to the seeded UNC plan. Export first if you want a copy.</p>
            <Button
              variant="destructive"
              onClick={() => { if (confirm('Reset all data to the seeded plan? This cannot be undone.')) { resetToSeed(); setMsg('Reset to the seeded plan.') } }}
            >
              <RotateCcw className="size-4" /> Reset to seed
            </Button>
          </CardContent>
        </Card>

        <div ref={archiveRef} id="archive" className="scroll-mt-24 lg:col-span-2">
          <ArchiveSettingsSection highlight={archiveRequested} />
        </div>
      </div>
    </div>
  )
}

function ArchiveSettingsSection({ highlight }: { highlight: boolean }) {
  const tasks = useStore((s) => s.tasks)
  const focusTargets = useStore((s) => s.focusTargets)
  const patchItem = useStore((s) => s.patchItem)
  const removeItem = useStore((s) => s.removeItem)

  const doneTasks = tasks.filter((t) => t.archived || t.progress === 'Finished')
  const doneFocus = focusTargets.filter((f) => f.done)

  return (
    <Card className={cn(highlight && 'ring-2 ring-primary/35')}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ArchiveIcon className="size-4 text-primary" /> Archive</CardTitle>
      </CardHeader>
      <CardContent>
        {doneTasks.length === 0 && doneFocus.length === 0 ? (
          <EmptyState icon={ArchiveIcon} title="Nothing archived yet" hint="Finished tasks and completed focus targets land here." />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-border bg-muted/20 p-3">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="size-4 text-success" /> Finished tasks <span className="text-xs font-normal text-muted-foreground">({doneTasks.length})</span></h3>
              <div className="space-y-1.5">
                {doneTasks.length === 0 && <p className="py-2 text-sm text-muted-foreground">No finished tasks.</p>}
                {doneTasks.map((t) => (
                  <div key={t.id} className="group flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-card/70">
                    <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground line-through">{t.title || 'Untitled'}</span>
                    {t.deadline && <span className="shrink-0 text-xs text-muted-foreground">{fmtDate(t.deadline)}</span>}
                    <Button size="sm" variant="ghost" className="h-7" onClick={() => patchItem('tasks', t.id, { archived: false, progress: 'Working on', kanban: 'doing' })}>
                      <RotateCcw className="size-3.5" /> Restore
                    </Button>
                    <button onClick={() => removeItem('tasks', t.id)} className="rounded-md p-1 text-muted-foreground hover:text-destructive" aria-label={`Delete ${t.title || 'task'}`}><Trash2 className="size-3.5" /></button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-border bg-muted/20 p-3">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="size-4 text-success" /> Completed focus <span className="text-xs font-normal text-muted-foreground">({doneFocus.length})</span></h3>
              <div className="space-y-1.5">
                {doneFocus.length === 0 && <p className="py-2 text-sm text-muted-foreground">No completed focus targets.</p>}
                {doneFocus.map((f) => (
                  <div key={f.id} className="group flex items-center gap-2 rounded-lg px-1 py-1.5 hover:bg-card/70">
                    <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground line-through">{f.text}</span>
                    <Button size="sm" variant="ghost" className="h-7" onClick={() => patchItem('focusTargets', f.id, { done: false })}>
                      <RotateCcw className="size-3.5" /> Restore
                    </Button>
                    <button onClick={() => removeItem('focusTargets', f.id)} className="rounded-md p-1 text-muted-foreground hover:text-destructive" aria-label={`Delete ${f.text}`}><Trash2 className="size-3.5" /></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
