# Architecture

## Stack
- React + TypeScript + Vite, Tailwind v4, Radix primitives (shadcn-style) in `src/components/ui/`.
- Recharts (charts), dnd-kit (drag/reorder + kanban), Zustand + immer (state), idb-keyval (IndexedDB), date-fns.
- Client-side routing (react-router) for nested pillar pages + subtabs + side-peek panels.

## State & persistence
- Single Zustand store (`src/store/store.ts`); selectors in `src/lib/selectors.ts`; types in `src/lib/types.ts`.
- **localStorage/IndexedDB is the primary store**, autosave on every edit. Never lose data between sessions.
- All trackers are data-driven from the store (no hardcoded rows in components).

## Backup (flagship safety feature)
- Export/Import JSON (manual).
- **Auto-backup to Google Drive** (debounced on change) + **daily-on-open check** (≥24h → push) + a "last backed up" indicator. OAuth; app is hosted so auth works. Code in `src/lib/googleDrive.ts`, `src/store/useBackup.ts`.
- Leave a clean hook for future "backup while closed" (needs a backend/scheduled job).

## Calendar sync (for the live-event widget)
- A **Google Calendar connector** is available. The home "next event" widget (NCSSM-Time-style live countdown) should read upcoming events from it; degrade gracefully if not connected.

## Conventions
- Small focused components in `src/components/` (common/, layout/, mascot/, ui/).
- One page per pillar in `src/pages/`; shared patterns (TrackerTable, Ring, SegmentedBar, ResourceGrid, Kanban, DocEmbed, side-peek) are reusable components.
- Typed, commented, modular. Add tests for non-trivial logic (GPA engine, selectors).
