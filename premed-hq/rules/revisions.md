# Active Revisions (do these next — supersedes older specs on conflict)

Round 1 from Andy's walkthrough. Full detail + technical specs: `/REVISIONS-ROUND-1.md`. Work in the priority order below.

## Priority order
1. **Theme + font + banner/background → cozy iyashikei (lo-fi anime) vibe** — retune light/dark palette to warm "paper" + soft Ghibli greens; add per-page painterly header art + background tint; "paint + pixel" combo (gouache scenery + pixel sprites); swap to a characterful font (propose 2–3). Biggest "feels vanilla" fix.
2. **Cleanup** — remove "Appendix A" leak, the top-left "UNC chapter" label, and ALL explainer/description copy. Minimalist.
3. **Mascot → pixel-art chibi creature, fixed nook** — replace the SVG ram with an original cozy pixel sprite (iyashikei palette); pin it in reserved whitespace per page; never scroll over/block content (current Academics bug).
4. **Sidebar collapse** (Arc-style hover-reveal + pin shortcut `⌘B`, not ⌘S) · **top bar** shows quote + MCAT-Q · **search** stays ⌘K + `/` (⌘F is reserved by browser), expanded to entities + actions.
5. **Academics rework** — Assignments Tracker + Calendar as main dashboard; transfer credit behind button/peek; split School List into its own DB; Notion-style note peek panels; fix table text fit.
6. **MCAT rework** — tabs to top; kill 4 squares; phased visual schedule; rebuild error log as filterable cards; resource items link out.
7. **Extracurriculars rebuild** (per-org database) · **Profile rebuild** (sectioned + editable avatar) · **archive view** for finished tasks · **open-to-write peek** for all textboxes.
8. **Live "next event" widget** (Google Calendar) on Home · **quotes API** swap.
9. **Asset swaps** when Andy sends them: main background (`wallpaper.jpg` → `/art/home-banner.jpg`), animated mascot (`/art/mascot.gif`), real UNC data.
10. **Theme switcher in Settings** — Ghibli (default) + Doraemon, swapping banner/background/mascot/accent by suffixed asset names; persisted; extensible. (See `rules/design-and-theme.md`.)

## Decisions locked
- Search: ⌘K + `/` (not ⌘F). Sidebar pin: ⌘B (not ⌘S). Both: confirm with Andy if he prefers other keys.

## Art style — cozy iyashikei / lo-fi anime ("paint + pixel")
Theme = iyashikei (cozy "healing" slice-of-life). **Painterly gouache Ghibli scenery** for banners/backgrounds + **pixel-art chibi sprite** for the mascot. Full prompts + integration in `rules/design-and-theme.md`. Images come from an image model or Andy; Claude Code only places them (`src/assets/banners/`, reusable `<PageBanner>`; mascot sprite in `src/components/mascot/`), with tasteful placeholders until then.

## Pending assets from Andy
Ghibli background art (or generate via the prompt) · ram reference pics · UNC transfer-credit/requirements data · next-event widget inspiration · (optional) quotes source.

---
*Note: this file mirrors what Claude sends Andy in chat — specs/prompts are recorded here so they travel with the project.*
