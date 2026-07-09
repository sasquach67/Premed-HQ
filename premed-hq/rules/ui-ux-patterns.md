# UI/UX Pattern Toolkit

Apply the right pattern where it improves usability — a palette, not a checklist. Canonical reference: `/spec/guides/UI_UX_Frontend_Features_Master_Guide.pdf` (23 categories). Use the Frontend Design + UI/UX Pro Max skills, with restraint (this is a daily utility, not a flashy site).

## Reach for these often
- **Navigation:** grouped collapsible sidebar, nested tabs/subtabs, breadcrumbs, command palette (⌘K + `/`), recents.
- **Search:** autocomplete/combobox, **debounced (250ms)**, **fuzzy** matching, filter chips, sort, entity picker (schools, courses).
- **Open-to-edit pattern (KEY):** click a card/row → opens a **side-peek panel** or full editor (Notion-style). Use this everywhere instead of always-open textareas.
- **Dense content:** accordions/disclosure toggles, collapsible sections, "view in panel/new tab" buttons (never inline a giant list).
- **Data:** sortable/filterable tables with proper column sizing (text must fit — truncate+tooltip or wrap), progress bars + rings, clean Recharts.
- **Files/docs:** dropzone (drag-drop upload), embedded Google Doc/Drive (not a URL textbox).
- **Feedback/states:** toasts, modals, inline validation, and explicit loading / empty / error states.
- **Personalization:** light/dark, remembered filters/sort, editable avatar (import / photo / drag-drop).
- **Productivity:** keyboard shortcuts, bulk actions, quick-add, sticky headers.

## Anti-patterns (do NOT do)
- Plain rectangles/textareas as primary content. Giant flat tables. Hyperlink dumps. Icons that don't match labels. Decorative non-functional boxes. Explainer copy.

## Resources display rule
Resources are **categorized clickable cards** (grouped by type, e.g. MCAT → Anki / Content / Exams / Full-lengths), each opening in a new tab — never a raw link list.
