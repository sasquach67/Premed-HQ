# Premed HQ — Claude Code project memory

Premed journey dashboard (public beta). React + TypeScript + Vite + zustand.
Deployed to GitHub Pages from `main` via Actions. Supabase magic-link auth
with local-first sync: **localStorage is primary; signed-out mode must stay
fully functional.**

## Commands

- `npm run dev` — local dev server
- `npm run build` — MUST pass before every push
- Typecheck runs in build; treat new TS errors as blockers

## Design foundation (LOCKED — full doc: rules/design-foundation.md)

- Warm dark default: bg `#282420`, cards `#322d27`, borders `#423a32`,
  text `#ece3d4` / `#a89c8c` / `#7c7264`, primary `#4b9cd3` (Carolina blue).
  Light "paper" theme is a user toggle — every new surface must work in both.
- Fonts: Baloo 2 (display/numbers) + Nunito (body). NEVER change.
- **No emoji as UI icons — lucide-react only.** No text glyphs as controls.
- ONE hero graphic per view; graphic vocabulary limited to: stacked bars,
  progress pills, status chips, heatmaps, ring gauges.
- One primary action per view (accent pill, top right).
- Per-pillar `--cat-*` accent carried in subtab underline + title bar + hero.
- Ram mascot = illustration only, never a UI icon. Celebrations only on
  real milestones (goal hit, letter submitted, first pub, cert renewed).
- Shared components: InlineAddRow, ExpandableEntryRow, ContactCard,
  PillarShell. Reuse — never fork variants.
- Every logging flow must complete in ≤5 seconds.

## Standing MUST-NOT-CHANGE (unless a prompt explicitly overrides)

- Design tokens, theme system, fonts, mascot assets
- Auth/Supabase sync layer and schemas; localStorage-first behavior
- Letters page structure (deep-link prefills only)
- Any localStorage schema change needs a versioned, lossless migration
- No new dependencies without flagging first
- If you find uncommitted WIP from another session, stop and flag it —
  Claude Code and Codex both work in this repo

## Workflow conventions

- One feature per commit; conventional commits (`feat(pillar): …`).
- Build must pass before push; verify signed-out mode + both themes +
  empty states (friendly one-liner, never a blank void) for any new view.
- Design comes from Claude Design sessions; implementation prompts follow:
  design reference → numbered changes → must-NOT list → verify → commit.
- Keep responses high-signal; flag disagreement instead of complying silently.
