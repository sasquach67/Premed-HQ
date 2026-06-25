# Visual & Structural References — for Claude Code

Drop screenshots of inspiration here (PNG/JPG). Each is tagged by **purpose** so you know whether to draw from its *look* or its *structure*. The brief (`premed-dashboard-brief.md`) carries the full features/logic; these images carry the look + organization.

Two kinds of inspo:
- 🎨 **FRONTEND / VISUAL** = how it should LOOK (layout, color, spacing, components). Match the feel.
- 🧱 **STRUCTURE / SETUP** = how it should be ORGANIZED (navigation, data model, what features exist). Use for architecture, not styling.

---

## Files to add (suggested names + purpose)

### 🎨 Frontend / visual style
- `medcoach.png` — **PRIMARY visual reference.** Clean, card-based layout; generous whitespace; calm single-accent color; grouped left sidebar. (Also doubles as a structure reference — see below.) Build to *this* cleanliness; swap its green accent for subtle Carolina blue.
- `premed-app-home.png` — **Home-screen look + widgets.** Today's Quote banner, multi-segment category progress bar (GPA/MCAT/Shadowing/Volunteering/Activities), MCAT Question of the Day card, Today's Focus Targets list. Shows desktop + mobile → confirms responsive design.

### 🧱 Structure / setup
- `medcoach-sidebar.png` (or reuse `medcoach.png`) — **Navigation / information-architecture model.** Sidebar grouped into labeled sections (Foundation / Your Story / Primary Application / Schools / Profile / Practice & Beyond) → maps onto our pillar grouping.
- `acamode-1.png` … `acamode-4.png` — **Academic-system structure / data model (NOT a visual reference).** Mind-map of Acamode's modes: Dashboard Mode, Lecture Mode (course profiles + sessions), Study Mode (spaced repetition + Pomodoro + stopwatch), Exam & Assignment Mode (table views + properties), and the Relations/database model. Use for how to *organize and wire* the Academics pillar's data — ignore its plain styling.

### (add your own)
- `youtube-reference.png` — screenshot the frame from the YouTube video; note here whether it's 🎨 frontend or 🧱 structure.

---

## Style direction (full notes in brief §14)
Clean, card-based, generous whitespace, MedCoach-style grouped sidebar; single subtle **Carolina-blue** accent over white/light-gray; dark slate text; mobile-responsive; the Tar Heel ram mascot on the home screen. Emulate the FEEL — don't clone any single source.
