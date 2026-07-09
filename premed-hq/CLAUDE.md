# Premed HQ — Project Guide (read first)

Personal, interactive premed dashboard for **Andy Quach** (UNC Neuroscience B.S., Pre-Med, Class of 2030). A private browser app/hub — **not** a public website, **not** a Notion clone.

## Golden rules (non-negotiable)
- **Functionality over decoration. No wasted space.** Every element is either interactive (clickable → does something / navigates) or shows genuinely useful at-a-glance info. No filler rectangles, no explainer blurbs.
- **Interactive, deep, deliberate.** Tabs/buttons open into more pages/subtabs and side "peek" panels — not a flat grid of boxes or always-open textareas.
- **Minimalist.** No "this is your command center" copy, no source labels (e.g., never render "Appendix A"), no decorative descriptions.
- **Unfilled is fine; missing structure is not.** Placeholders OK; the outline + functionality must exist.
- **Match the vibe:** warm Ghibli-adjacent feel, subtle Carolina blue, characterful (non-vanilla) font, art banner/background. See `rules/design-and-theme.md`.
- Translate plain requests into proper UI patterns (combobox, debounce, fuzzy search, drag-drop, accordions, side-peek, modals, keyboard nav, loading/empty/error states).

## Stack
React + TypeScript + Vite + Tailwind v4 + Radix (shadcn-style) + Recharts + dnd-kit + Zustand. localStorage/IndexedDB primary store; Google Drive backup; Google Calendar connector for the live-event widget. Details in `rules/architecture.md`.

## Rules index (load the relevant file before working on an area)
- `rules/design-and-theme.md` — **highest priority** look/feel, Ghibli art, fonts, mascot, palette.
- `rules/architecture.md` — stack, data model, persistence, backup, calendar sync.
- `rules/ui-ux-patterns.md` — the pattern toolkit + 23-category glossary (see `/spec/guides/`).
- `rules/pillars.md` — each pillar's purpose, subtabs, and must-have features.
- `rules/personalization.md` — Andy's seed data (UNC plan, MCAT timeline, goals).
- `rules/revisions.md` — the ACTIVE change list; do these next. Supersedes older specs on conflict.

## Full reference
The complete spec is `/spec/premed-dashboard-brief.md` (15 sections + appendices). The rules above are the distilled, authoritative working set; the brief is the deep reference. **On any conflict: `rules/revisions.md` > `rules/*` > the brief.**

## Working method
Andy gives plain-language feedback → it's translated into precise UI specs → applied here. Keep changes modular, typed, commented. Prefer small focused components in `src/components/`.

## Collaboration — two agents share this repo (Claude + Codex)
This folder is a **git repo** and is worked on by **both Claude and Codex**. Git is our shared memory so we pick up where the other left off without clobbering work. Protocol:
- **Before starting:** `git log --oneline -10` and check `git status` to see what the other agent just did. Read changed files rather than assuming the old state.
- **After each meaningful, working change:** `git add -A && git commit -m "…"` (only when it builds: `npm run build`). Small, scoped, descriptive commits. Sign with a `Co-Authored-By:` line for your agent.
- **Don't** revert or rewrite the other agent's recent work unless Andy asks — build additively (new files + minimal insertions) when touching shared files like `Home.tsx`.
- **One writer per file at a time.** If both must touch the same area, commit first so the other can rebase/merge instead of overwriting.
- Run dev with `npm run dev` (port 5180). Node is user-local: `export PATH="$HOME/.local/node/bin:$PATH"`.
- `node_modules`/`dist` are gitignored; commit source + `public/art` + `rules/` + this file.
