# Art drop folder

Put background/banner images + the mascot sprite here. Vite serves `public/` at the site root, so `home-banner.jpg` here is reachable at `/art/home-banner.jpg` (no import needed — easy to swap).

## Files the app expects (drop + rename to these)
- `home-banner.jpg`   — MAIN background / home hero (Andy's `wallpaper.jpg` — the Ghibli rice-field scene). JPG/PNG fine.
- `mascot.gif`        — the mascot. **Animated GIF is supported** (render as a plain `<img>` so it animates). Transparent background.
- `banner-academics.jpg`, `banner-mcat.jpg`, … — optional per-page banners.
- `banner-default.jpg` — fallback banner for pages without their own.
- `background-tile.png` — optional subtle full-page texture/tint.

## Theme variants (for the Settings theme-switcher — see rules)
Use a suffix per theme so the switcher can swap sets:
- Ghibli (default): `home-banner.jpg`, `mascot.gif`, etc.
- Doraemon: `home-banner-doraemon.jpg`, `mascot-doraemon.gif`, etc.

## Concept boards (REFERENCE ONLY — do not render in the app)
Put `concept.png` / `concept2.png` (the mood boards) in `public/art/concepts/`. They're style references for Claude Code, not assets shown to the user.
