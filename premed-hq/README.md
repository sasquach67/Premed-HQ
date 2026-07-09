# Premed HQ

Andy's personal premed command center — a private, interactive dashboard for UNC
pre-med planning, AMCAS prep, and daily execution. Built per `premed-dashboard-brief.md`
(esp. §15 design direction).

**Stack:** React + TypeScript + Vite · Tailwind v4 · shadcn-style components (Radix) ·
Recharts · dnd-kit · Zustand (+ immer + persist). Single-page app, client-side routing
(HashRouter), data lives in your browser (localStorage) with an optional Google Drive backup.

---

## Run it locally

This machine has a user-local Node at `~/.local/node`. Put it on your PATH first:

```bash
export PATH="$HOME/.local/node/bin:$PATH"
cd "premed-dashboard-project 2/premed-hq"

npm install        # first time only
npm run dev        # http://localhost:5173  (we used 5179 in dev)
```

## Safe-use runbook for registration week

```bash
npm install
npm run dev        # local editing: http://127.0.0.1:5173
npm run build      # production files in dist/
```

1. Deploy to a real HTTPS origin. Netlify is ready via `netlify.toml` (`npm run build`, publish `dist/`).
2. In Google Cloud, enable **Google Drive API** and create an **OAuth Client ID → Web application**.
3. Add the exact deployed origin shown in **Settings → Google Drive backup** to **Authorized JavaScript origins**.
4. Set `VITE_GOOGLE_CLIENT_ID` on the host, or paste the Client ID in Settings.
5. In Settings, click **Connect Drive**, then **Back up now**. Confirm the card says **Configured** and shows a latest backup time.
6. Before registration changes, also click **Export JSON** once and keep that file somewhere safe.

> Data always lives in your browser's localStorage regardless of hosting. Drive is the
> redundant off-device safety layer. The app backs up while open and once per day on open.

---

## Google Drive backup details

The backup file is stored in Drive's hidden **appDataFolder** using the `drive.appdata`
scope, so it does not clutter Drive and only Premed HQ can read it. A static site cannot run
while fully closed; open the app before/after registration work and use **Back up now** for
important changes.

---

## Swapping in the final ram mascot art

The mascot is currently a hand-drawn **SVG** (`src/components/mascot/Ram.tsx`) — cute, warm,
and emoji-free as a functional placeholder. Per brief §15.5 the final art should be a
commissioned/image-model **Ghibli-adjacent cartoon ram** from your reference pics. To swap:
drop the artwork (e.g. a few PNG poses) into `src/assets/`, then replace the SVG in `Ram.tsx`
with an `<img>` — every mascot slot (`MascotBubble`, `MascotLayer`, home hero, sidebar) reuses
that one component, so it updates everywhere. The per-tab positions live in `src/app/routes.tsx`.

---

## Project map

```
src/
  app/routes.tsx            nav registry (grouped sidebar + per-tab mascot spot)
  lib/                      types, AMCAS GPA engine + selectors, dates, Drive, calendar, export/import
  data/seed.ts              Andy's seeded UNC plan (Appendix A), resources, tips, story prompts
  data/mcatQotd.ts          curated MCAT Question-of-the-Day bank
  store/                    zustand store (localStorage autosave) + backup + theme hooks
  components/ui/            shadcn-style primitives (button, card, dialog, tabs, …)
  components/common/        TrackerTable, Ring, SegmentedBar, Kanban, ResourceGrid, DocEmbed, …
  components/mascot/        the ram + speech bubble + per-tab layer
  components/layout/        Sidebar, Topbar, AlertsStrip, CommandSearch (⌘K), AppShell
  pages/                    Home + 13 pillar deep-views + Help + Settings
```

Press **⌘K / Ctrl+K** anywhere to search every page, course, task, school, and resource.
