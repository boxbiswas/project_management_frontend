# BugBoard — Design System (Sunset Coral, Light Mode)

> Warm, inviting issue tracking that does not look like every other blue project tool.

**App name:** BugBoard
**Theme:** Sunset Coral (light mode only)
**Stack this targets:** React + Vite + Tailwind CSS (v3) + Redux Toolkit + dnd-kit
**Fixed product data this design must express:**
- Status: `todo`, `in_progress`, `done`
- Priority: `low`, `medium`, `high`
- Roles: `admin`, `manager`, `developer`, `viewer`

---

## 1. Design principles

1. **Warm, not loud.** Coral orange is the single brand color. It appears on actions, active navigation, focus, and the logo. Everything else stays in warm neutrals so the orange means "you can act here."
2. **Status and priority are the only other colors.** Cards are neutral. Color is reserved for information (where a ticket is, how urgent it is) and never used as decoration.
3. **Soft shapes, generous space.** Large radii, 16px+ card padding, pill buttons. The app should feel friendly during a long bug triage session.
4. **One memorable thing: the board.** The Kanban board is the signature screen. Columns have tinted backgrounds, cards lift when dragged, and the drop target is obvious. Every other screen stays quiet.
5. **Words are part of the interface.** Plain verbs, sentence case, specific errors, empty states that point to the next action (see section 13).
6. **Never rely on color alone.** Status and priority badges always include a text label. Status columns also carry an icon.

---

## 2. Brand

### 2.1 Name and wordmark

- **Name:** BugBoard (one word, capital B twice)
- **Wordmark:** "BugBoard" set in DM Sans Bold (700), letter-spacing `-0.02em`, color `stone-900` (`#292524`).
- **Logomark:** a rounded square (radius 10px) filled with `coral-500` (`#F97316`), containing a white three-column board glyph (three vertical rounded bars of different heights, representing Kanban columns).
- **Sizes:** logomark 32px in sidebar, 24px in mobile header, 64px on auth pages.
- **Favicon:** the logomark on transparent background, 32x32 and 180x180.

### 2.2 Voice

Friendly, direct, calm. Never jokey about errors. See section 13.

---

## 3. Color

### 3.1 Brand scale (coral)

| Token | Hex | Usage |
|---|---|---|
| `coral-50` | `#FFF7ED` | Selected row/nav background, primary tint, hover on ghost buttons |
| `coral-100` | `#FFEDD5` | Badges on tint, avatar fallback background, soft highlights |
| `coral-200` | `#FED7AA` | Focus ring outer glow, drag-over outline fill |
| `coral-300` | `#FDBA74` | Disabled primary button background |
| `coral-400` | `#FB923C` | Progress, secondary accents |
| `coral-500` | `#F97316` | **Brand primary.** Logo, focus ring, active nav indicator, links on hover |
| `coral-600` | `#EA580C` | **Solid button background**, hover on brand surfaces |
| `coral-700` | `#C2410C` | Button hover/pressed, link text on white (passes AA) |
| `coral-800` | `#9A3412` | Text on `coral-100` badges |
| `coral-900` | `#7C2D12` | Rare, strong emphasis text on tint |

> **Accessibility note:** white text on `#F97316` is about 2.8:1, which fails WCAG AA for normal text. For that reason, solid buttons use `coral-600` (`#EA580C`) with white semibold text (about 3.6:1, acceptable for 14px+ semibold UI text under the large/bold-text rule) and darken to `coral-700` on hover (about 5.2:1). Use `coral-700` for any orange text on white. Use `coral-500` for non-text accents only (focus ring, indicators, icons next to text, the logo).

### 3.2 Neutral scale (warm stone)

| Token | Hex | Usage |
|---|---|---|
| `app-bg` | `#FFFBF5` | Page background (warm off-white) |
| `surface` | `#FFFFFF` | Cards, sidebar, modals, dropdowns, inputs |
| `surface-sunken` | `#FAF5EE` | Table header, comment input area, code-like blocks |
| `border` | `#F5E6D3` | Default borders, dividers (warm sand) |
| `border-strong` | `#E7D5BF` | Input borders, hover borders |
| `stone-900` | `#292524` | Primary text, headings |
| `stone-700` | `#44403C` | Body text on dense UI |
| `stone-500` | `#78716C` | Secondary text, metadata (4.8:1 on white) |
| `stone-400` | `#A8A29E` | Placeholder text, disabled text, decorative icons |
| `stone-300` | `#D6D3D1` | Disabled borders, skeleton base |

### 3.3 Ticket status colors

`in_progress` uses sky blue, not amber, so it is never confused with the orange brand or the medium-priority amber.

| Status | Label | Accent (dot, icon, top bar) | Column background | Badge background | Badge text |
|---|---|---|---|---|---|
| `todo` | To do | `#78716C` | `#F5F1EC` | `#F0EBE4` | `#44403C` |
| `in_progress` | In progress | `#0EA5E9` | `#F0F9FF` | `#E0F2FE` | `#075985` |
| `done` | Done | `#16A34A` | `#F0FDF4` | `#DCFCE7` | `#166534` |

Status icons (lucide-react): `Circle` (todo), `Loader` (in progress), `CheckCircle2` (done).

### 3.4 Ticket priority colors

| Priority | Label | Badge background | Badge text | Icon (lucide) |
|---|---|---|---|---|
| `low` | Low | `#DCFCE7` | `#166534` | `ArrowDown` |
| `medium` | Medium | `#FEF3C7` | `#92400E` | `Minus` |
| `high` | High | `#FEE2E2` | `#991B1B` | `ArrowUp` |

Each ticket card also shows a 3px left edge in the priority color (low `#4ADE80`, medium `#FBBF24`, high `#EF4444`) so priority is scannable down a column.

### 3.5 Project role badges

| Role | Badge background | Badge text |
|---|---|---|
| `admin` | `#FFEDD5` | `#9A3412` |
| `manager` | `#EDE9FE` | `#5B21B6` |
| `developer` | `#E0F2FE` | `#075985` |
| `viewer` | `#F0EBE4` | `#57534E` |

### 3.6 Feedback colors

| Type | Solid | Tint background | Text on tint | Border |
|---|---|---|---|---|
| Success | `#16A34A` | `#F0FDF4` | `#166534` | `#BBF7D0` |
| Error | `#DC2626` | `#FEF2F2` | `#991B1B` | `#FECACA` |
| Warning | `#D97706` | `#FFFBEB` | `#92400E` | `#FDE68A` |
| Info | `#0284C7` | `#F0F9FF` | `#075985` | `#BAE6FD` |

Destructive buttons use Error solid `#DC2626` with white text (4.8:1).

### 3.7 Avatar colors

User avatars show initials on a deterministic color picked from the user's `_id`. Palette (background / text):

`#FFEDD5 / #9A3412`, `#FEF3C7 / #92400E`, `#DCFCE7 / #166534`, `#E0F2FE / #075985`, `#EDE9FE / #5B21B6`, `#FCE7F3 / #9D174D`.

Unassigned tickets show a dashed-border circle with a `User` icon in `stone-400`.

---

## 4. Typography

### 4.1 Font

- **Family:** DM Sans (single family, all UI)
- **Fallback stack:** `"DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- **Weights loaded:** 400, 500, 600, 700
- **Numerals:** use `font-variant-numeric: tabular-nums` for counts, dates, and column totals.

Load in `client/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet" />
```

### 4.2 Type scale

Sentence case everywhere. No all-caps labels.

| Token | Size / line-height | Weight | Letter-spacing | Used for |
|---|---|---|---|---|
| `display` | 36px / 44px | 700 | -0.02em | Auth page headline only |
| `h1` | 28px / 36px | 700 | -0.02em | Page titles (Projects, Project name) |
| `h2` | 22px / 30px | 600 | -0.01em | Section titles, modal titles |
| `h3` | 18px / 26px | 600 | -0.01em | Card titles, column headers |
| `body-lg` | 16px / 24px | 400 | 0 | Descriptions, comment text |
| `body` | 14px / 22px | 400 | 0 | Default UI text |
| `body-strong` | 14px / 22px | 600 | 0 | Ticket titles on cards, table cells with emphasis |
| `small` | 13px / 20px | 500 | 0 | Badges, metadata, timestamps, helper text |
| `tiny` | 12px / 16px | 500 | 0 | Counters, avatar initials, tooltips |

Rules:
- Body text lines stay under 75 characters (use `max-w-prose` for descriptions and comments).
- Headings use `stone-900`. Secondary text uses `stone-500`.
- Ticket titles on cards clamp to 2 lines (`line-clamp-2`). Descriptions on cards clamp to 2 lines.

---

## 5. Spacing, radius, elevation

### 5.1 Spacing (Tailwind 4px base)

| Context | Value |
|---|---|
| Card padding | `p-4` (16px); project cards `p-5` (20px) |
| Modal padding | `p-6` (24px) |
| Page padding | `px-4` mobile, `px-6` tablet, `px-8` desktop |
| Gap between cards in a column | `gap-3` (12px) |
| Gap between Kanban columns | `gap-4` (16px) |
| Form field vertical gap | `gap-4` |
| Section gap on pages | `gap-6` / `gap-8` |
| Button padding | `px-4 py-2` (default), `px-3 py-1.5` (small), `px-5 py-2.5` (large) |

### 5.2 Radius (hierarchy, not one value everywhere)

| Element | Radius |
|---|---|
| Buttons | `rounded-full` (pill) |
| Inputs, selects, textareas | `rounded-xl` (12px) |
| Ticket cards | `rounded-xl` (12px) |
| Project cards, Kanban columns | `rounded-2xl` (16px) |
| Modals | `rounded-2xl` (16px) |
| Badges, chips, avatars | `rounded-full` |
| Dropdown menus, toasts | `rounded-xl` |
| Logomark | 10px |

### 5.3 Shadows (warm-tinted, not grey)

| Token | Value | Usage |
|---|---|---|
| `shadow-soft` | `0 1px 2px rgba(124, 45, 18, 0.06), 0 1px 3px rgba(124, 45, 18, 0.05)` | Cards at rest |
| `shadow-lift` | `0 6px 16px rgba(124, 45, 18, 0.10)` | Card hover (project cards only), dropdowns |
| `shadow-pop` | `0 20px 40px rgba(124, 45, 18, 0.16)` | Modals, drag overlay, toasts |
| `shadow-focus` | `0 0 0 4px rgba(249, 115, 22, 0.25)` | Focus ring glow |

### 5.4 Borders

- Default: `1px solid #F5E6D3`
- Inputs: `1px solid #E7D5BF`, focus border `#F97316`
- Dividers: `1px solid #F5E6D3`

---

## 6. Layout

### 6.1 App shell (Day 6)

```
+----------------+--------------------------------------------------+
| Sidebar 256px  | Topbar 64px (breadcrumbs, project selector, user)|
|                +--------------------------------------------------+
| Logo           | Page content                                     |
| Dashboard      |   max-width 1280px, centered with page padding   |
| Projects       |   Board view may use full width                  |
| Profile        |                                                  |
|                |                                                  |
| [User card]    |                                                  |
+----------------+--------------------------------------------------+
```

- **Sidebar:** 256px wide, `surface` white, right border `#F5E6D3`. Fixed on `lg` and up. On smaller screens it becomes a slide-in drawer (280px) with a backdrop of `rgba(41, 37, 36, 0.4)`.
- **Topbar:** 64px high, `surface` white, bottom border. Left: hamburger (mobile) and breadcrumbs. Center/left: project selector. Right: user avatar menu.
- **Content area:** background `app-bg` `#FFFBF5`.
- **Alignment:** all text is left-aligned. Only the auth card header and empty states are centered.

### 6.2 Sidebar details

- Logo row: logomark + wordmark, 64px high, aligned with topbar.
- Nav items: 44px high, `rounded-xl`, `px-3`, icon (20px) + label (14px, 500 weight), gap 12px.
  - Default: text `stone-500`, icon `stone-400`.
  - Hover: background `#FFF7ED`, text `stone-900`.
  - Active: background `#FFF7ED`, text `#C2410C`, icon `#F97316`, plus a 3px `coral-500` bar on the left edge (inside the item, rounded).
- Nav entries (lucide): Dashboard (`LayoutDashboard`), Projects (`FolderKanban`), Profile (`UserCircle`).
- Bottom: user card with avatar, name, email (truncated), and a logout icon button.

### 6.3 Project selector

- A pill-shaped dropdown button in the topbar: project initial tile + project title + `ChevronsUpDown` icon.
- Menu: up to 8 projects visible with scroll, search not required. Selected project has a check icon in `coral-600`.
- Footer item in the menu: "All projects".

### 6.4 Breadcrumbs

- Format: `Projects / Payments API / Board`. Separator is a `ChevronRight` icon (14px, `stone-400`), not a slash character.
- Last item is `stone-900` weight 600 and not a link. Earlier items are `stone-500` with hover `coral-700` and underline.
- On mobile, show only the last two items.

### 6.5 Page grid

| Screen | Layout |
|---|---|
| Projects list | CSS grid, 1 col mobile, 2 cols `md`, 3 cols `xl`, gap 20px |
| Project detail | Header + tab bar (Board, List, Members) + content |
| Board | Three equal columns on `lg+`, horizontal scroll with snap on smaller screens |
| Auth | Two-panel on `lg` (brand panel left, form right), single panel below |

### 6.6 Breakpoints

Use Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Design mobile first.

---

## 7. Components

### 7.1 Buttons

All buttons: `rounded-full`, weight 600, 14px, `transition-colors duration-150`, min height 40px (36px for small), min touch target 44px on mobile.

| Variant | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| Primary | bg `#EA580C`, text white | bg `#C2410C` | bg `#9A3412` | bg `#FDBA74`, text white, `cursor-not-allowed` |
| Secondary | bg white, border `#E7D5BF`, text `#44403C` | bg `#FFF7ED`, border `#FDBA74` | bg `#FFEDD5` | text `#A8A29E`, border `#F5E6D3` |
| Ghost | transparent, text `#44403C` | bg `#FFF7ED` | bg `#FFEDD5` | text `#A8A29E` |
| Danger | bg `#DC2626`, text white | bg `#B91C1C` | bg `#991B1B` | bg `#FCA5A5` |
| Icon button | 36px square circle, ghost styling | same as ghost | same as ghost | same as ghost |

- Focus (all): `outline-none` plus `shadow-focus` and a 2px `#F97316` ring offset 2px.
- Loading: replace the label with a 16px spinner and the label text kept in the DOM for width (visually hidden), button disabled.
- Do not append arrows to button labels. Labels are verbs: "Create project", "Add member", "Save changes", "Delete ticket".

Tailwind:

```
Primary: inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-coral-700 active:bg-coral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-coral-300
```

### 7.2 Inputs, textarea, select

- Height 44px (inputs/selects), textarea min height 96px.
- Background white, border `#E7D5BF`, radius 12px, padding `px-3.5`, text 14px `stone-900`, placeholder `stone-400`.
- Hover: border `#D6BFA3`.
- Focus: border `#F97316`, `shadow-focus`.
- Error: border `#DC2626`, focus glow `rgba(220, 38, 38, 0.2)`, error message below in 13px `#991B1B` with an `AlertCircle` icon.
- Disabled: background `#FAF5EE`, text `#A8A29E`.
- Label: 14px weight 600 `stone-900`, 6px above the input. Optional hint in `small` `stone-500` below the label. Mark optional fields with "(optional)" in `stone-500`; do not use red asterisks.
- Select: native `<select>` styled the same, with a `ChevronDown` icon positioned right. Use custom dropdown only for the project selector and assignee picker.
- Assignee picker: dropdown listing project members with avatar + name + role badge, plus an "Unassigned" option at the top.

### 7.3 Search bar

- Input with leading `Search` icon (18px, `stone-400`), 44px high, pill shape (`rounded-full`) to differentiate it from form inputs.
- Clear button (`X` icon) appears when text is present.
- Debounce 300ms before calling the API (Day 10).

### 7.4 Badges

- Height 24px, padding `px-2.5`, `rounded-full`, text `small` (13px, 500).
- Leading 6px dot or 12px icon in the badge's text color, gap 6px.
- Status and priority colors come from sections 3.3 and 3.4.
- Count badge (column totals): 20px high, min width 20px, background white, text `stone-700`, tiny size, tabular nums.

### 7.5 Avatars

- Sizes: 24px (cards), 32px (comments, sidebar), 40px (member list), 64px (profile).
- Initials: first letter of first and last name, tiny/small weight 600, colors from section 3.7.
- Avatar group: overlap by 8px, 2px white ring, show up to 4 then a `+N` circle.

### 7.6 Cards

**Project card** (`rounded-2xl`, `p-5`, white, border, `shadow-soft`):
- Top row: 40px rounded-xl tile with the project initial on `coral-100` (text `coral-800`), kebab menu button right.
- Title: `h3`. Description: `body`, `stone-500`, 2-line clamp.
- Footer: avatar group (members) left, ticket count right ("12 tickets", `small`, `stone-500`).
- Hover: `shadow-lift`, border `#FDBA74`, no scale transform.
- The whole card is a link to the project; the kebab menu stops propagation.

**Ticket card** (see section 8).

**Generic panel:** white, `rounded-2xl`, border, `p-6`.

### 7.7 Modal (Create/edit ticket, delete confirmation, add member)

- Backdrop: `rgba(41, 37, 36, 0.45)`, with a light `backdrop-blur-sm`.
- Panel: white, `rounded-2xl`, `shadow-pop`, `p-6`.
- Widths: confirm dialog 420px, form modal 560px, ticket detail 760px. Full-screen sheet on mobile (`rounded-none`, slides up from the bottom).
- Header: `h2` title, optional `body` `stone-500` subtitle, close icon button top right.
- Footer: right-aligned, Secondary "Cancel" then Primary action. Delete confirmation uses the Danger button.
- Behavior: focus trapped, Escape closes, clicking the backdrop closes unless the form is dirty.
- Animation: backdrop fades (150ms), panel scales from 0.97 to 1 and fades (180ms). Respect reduced motion.

### 7.8 Dropdown menu

White, border, `rounded-xl`, `shadow-lift`, `p-1.5`. Items 36px high, `rounded-lg`, `px-3`, 14px. Hover `#FFF7ED`. Selected item shows a `Check` icon in `coral-600`. Destructive item text `#B91C1C`, hover `#FEF2F2`.

### 7.9 Tabs (Project detail: Board, List, Members)

- Underline style. Tab height 44px, 14px weight 600.
- Inactive `stone-500`; hover `stone-900`; active `#C2410C` with a 2px `coral-500` underline.
- The tab row sits on a bottom border `#F5E6D3`.

### 7.10 Filter bar (Day 10)

```
[ Search tickets...        ]  [Status v] [Priority v] [Assignee v]   Clear filters
```

- Wraps to two rows on mobile (search full width, then filters in a horizontally scrollable row).
- Active filters show the selected value inside the pill (`Status: In progress`) with a `coral-50` background, `coral-300` border, and `coral-800` text.
- "Clear filters" is a ghost button, visible only when at least one filter is active.
- Show a result count ("8 tickets") in `small` `stone-500` at the right.

### 7.11 Toasts (Day 13)

- Position: top right on desktop, top center on mobile. Stack with 8px gap, max 3 visible.
- White background, `rounded-xl`, `shadow-pop`, 1px border in the feedback border color, 4px left bar in the feedback solid color, leading icon, message (14px), close button.
- Auto-dismiss: success and info 4s, error 6s. Pausing on hover.
- Message pattern: action noun in past tense. "Ticket created", "Member removed", "Changes saved". Error: say what failed and what to do ("Couldn't move ticket. Check your connection and try again.").

### 7.12 Loaders

- **Spinner:** 16px/24px circular, 2px stroke, track `#FFEDD5`, indicator `#F97316`, 700ms linear.
- **Page loader:** centered 40px spinner on `app-bg`.
- **Skeleton:** base `#F5F1EC`, shimmer highlight `#FFFBF5`, `rounded-xl`, matching the final shape of cards and rows. Use for project grid (6 card skeletons), board (3 columns with 3 skeleton cards each), and comments.

### 7.13 Tables and lists (List view, Members tab)

- Header row: `surface-sunken` background, 13px weight 600 `stone-500`, sentence case.
- Rows 56px high, bottom border `#F5E6D3`, hover `#FFFBF5`.
- On mobile, rows collapse into stacked cards.

---

## 8. Kanban board (Day 8)

The board is the signature screen. It deserves the most care.

### 8.1 Board layout

```
+------------------------------------------------------------------+
| Filter bar                                                       |
+------------------------------------------------------------------+
| +---- To do (4) ----+ +-- In progress (2) --+ +---- Done (7) ---+|
| |  [ticket card]    | |  [ticket card]      | |  [ticket card]  ||
| |  [ticket card]    | |  [ticket card]      | |  [ticket card]  ||
| |  [ticket card]    | |                     | |                 ||
| |  + Add ticket     | |  + Add ticket       | |  + Add ticket   ||
| +-------------------+ +---------------------+ +-----------------+|
+------------------------------------------------------------------+
```

- Component tree (from the plan): `KanbanBoard` → `TodoColumn`, `InProgressColumn`, `DoneColumn` (all can render one shared `KanbanColumn` with a config object).
- Columns: equal width on `lg+` (`grid-cols-3`), `min-w-[300px]` and horizontal scroll with `snap-x snap-mandatory` below `lg`.
- Column height: grows with content; the cards list scrolls inside on tall boards (`max-h-[calc(100vh-280px)]`, `overflow-y-auto`).

### 8.2 Column

- Background: status column color from section 3.3, `rounded-2xl`, `p-3`, border `1px solid` status accent at 15% opacity.
- Header (sticky inside the column): status icon (18px, accent color), column name `h3` (16px), count badge, and a ghost icon button for "Add ticket".
- Top accent: 3px bar in the status accent color across the top of the column header, `rounded-full`, inset by 12px.
- Empty column: dashed 1.5px border in the status accent at 40% opacity, centered text "No tickets here yet" in `stone-500`, plus ghost button "Add ticket". When dragging, the empty state is replaced by the drop target.
- **Drop target (drag over):** column background becomes white at 70% over the status tint, outline `2px dashed` in the status accent, and a 48px dashed placeholder slot appears at the insertion point.

### 8.3 Ticket card

```
+--------------------------------------------+
|▌ [↑ High]                      [⋯]        |
|▌ Login fails on Safari 17                  |
|▌ Users get a blank screen after entering   |
|▌ credentials. Console shows a CORS...      |
|▌                                           |
|▌ (AB)                         Nov 12       |
+--------------------------------------------+
```

- Container: white, border `#F5E6D3`, `rounded-xl`, `p-4`, `shadow-soft`, left edge 3px priority color (section 3.4).
- Row 1: priority badge (left), kebab menu (right, visible on hover and always on touch).
- Title: `body-strong`, `stone-900`, 2-line clamp.
- Description: `small` weight 400, `stone-500`, 2-line clamp, 4px below the title. Hidden when empty.
- Footer: assignee avatar (24px) left, created date right (`small`, `stone-500`, format "Nov 12"). Unassigned shows the dashed avatar.
- Comment count (once Day 9 is done): `MessageSquare` icon 14px + number, `small`, `stone-500`, placed before the date.
- Cursor: `grab`. On hover: border `#E7D5BF`, shadow `shadow-lift`.
- Focus-visible: `shadow-focus` plus `#F97316` ring.
- Clicking opens the ticket detail modal (description, metadata, comments, edit, delete).

### 8.4 Dragging (dnd-kit)

| State | Visual |
|---|---|
| Idle | As in 8.3 |
| Pick up (active) | Original card stays in place at 40% opacity with a dashed `#FDBA74` border and no shadow (ghost placeholder) |
| Drag overlay | Clone rendered in `DragOverlay`: `shadow-pop`, rotate `2deg`, scale `1.03`, cursor `grabbing`, white background, border `#F97316` |
| Over a column | Column highlighted as in 8.2 |
| Drop | Overlay animates into place (200ms ease-out). Card appears in the new column immediately (optimistic Redux update) |
| Failure | Card returns to the original column with a 250ms ease-out, plus an error toast: "Couldn't move ticket. Try again." |

Interaction details:
- Sensors: `PointerSensor` with `activationConstraint: { distance: 6 }` so clicks still open the card, plus `KeyboardSensor` for accessibility (Space to lift, arrows to move, Space to drop).
- Announce moves with dnd-kit's `announcements` for screen readers: "Moved Login fails on Safari 17 to In progress."
- Viewers (role `viewer`) cannot drag: cursor `default`, no grab affordance, and a tooltip "Viewers can't change ticket status."
- On touch devices, use `TouchSensor` with a 200ms press delay to avoid conflict with scrolling.

---

## 9. Screens

### 9.1 Auth (Day 2): Login and Register

- Desktop: split screen. Left panel (50%) has a `coral-500` to `coral-600` vertical gradient with the logomark in white, headline "Track every bug to done." (`display`, white), and one supporting sentence in `body-lg` at 90% white. A simple illustration of three overlapping board columns in white at 20% opacity. Right panel: `app-bg` with a centered form card.
- Mobile: the gradient panel collapses to a 120px header with logomark; the form card follows.
- Form card: max width 420px, `p-8`, white, `rounded-2xl`, `shadow-soft`, border.
- Fields: Register has name, email, password. Login has email, password. Password field has a show/hide icon button.
- Primary button full width. Below it, a text link ("New to BugBoard? Create an account" / "Already have an account? Sign in") in `coral-700`.
- Validation messages appear below each field on blur and on submit. Server errors (duplicate email, wrong credentials) appear in an error alert at the top of the card.

### 9.2 Dashboard (Day 6)

- Heading: "Welcome back, {firstName}" (`h1`) with a `body` subline "Here's what's happening across your projects."
- Summary row: 3 compact stat tiles (Open tickets, In progress, Done this week). Tile: white, `rounded-2xl`, `p-5`, a 40px icon tile in the status tint, the number in 28px weight 700, label in `small` `stone-500`. Only show if the data comes from the API.
- Below: "Your projects" grid (up to 6 cards) with a "View all projects" ghost button.
- Below that: "Assigned to you" list of tickets (title, project, priority badge, status badge).

### 9.3 Projects list (Day 3)

- Header: `h1` "Projects", Primary button "New project" on the right.
- Grid of project cards (section 7.6).
- Empty state: see section 12.
- "New project" opens a modal: title (required), description (optional).

### 9.4 Project detail (Day 3, 5, 8)

- Header: project tile + title (`h1`), description (`body`, `stone-500`, max 75 characters wide), avatar group and a "Members" ghost button, and Primary "New ticket".
- Tabs: Board, List, Members.
- **Members tab:** list/table with avatar, name, email, role badge, and a remove (ghost icon) button. "Add member" opens a modal with an email input (existing registered users only) and a role select. Removal opens a Danger confirmation. The project owner cannot be removed (disabled with tooltip).
- Permission-aware UI: hide or disable actions the user's role cannot perform (see section 11).

### 9.5 Ticket detail modal (Day 5, 9, 11)

```
+----------------------------------------------------------+
| Login fails on Safari 17                    [Edit] [⋯] [x]|
| In project Payments API                                  |
+--------------------------------+-------------------------+
| Description                    | Status      [In progress]|
| Users get a blank screen...    | Priority    [High]      |
|                                | Assignee    (AB) Aisha  |
| Comments (3)                   | Created     Nov 12      |
| (AB) Aisha · 2h ago            | Created by  Ravi        |
|   Reproduced on 17.1           |                         |
| ...                            |                         |
| [ Write a comment...  ] [Post] |                         |
+--------------------------------+-------------------------+
```

- Two columns on `md+` (content 2/3, metadata 1/3 with a `surface-sunken` background and left border). Stacked on mobile with metadata first.
- Comment item: avatar 32px, name (`body-strong`), timestamp (`small`, `stone-500`, relative: "2h ago", full date on hover), text in `body-lg` `stone-700`. Newest first (matches the `{ ticketId: 1, createdAt: -1 }` index).
- Comment input: `surface-sunken` area, auto-growing textarea, Primary "Post comment" disabled until text is entered. Viewers can read but not post (input replaced by a note: "Viewers can't comment on tickets.").

### 9.6 Edit and delete (Day 11)

- Edit ticket modal reuses the create form, prefilled. Primary "Save changes".
- Delete: confirmation dialog, title "Delete this ticket?", body "This also removes its comments. You can't undo this.", buttons "Cancel" and Danger "Delete ticket".

---

## 10. Motion

Keep motion rare and purposeful. Motion answers an action; nothing animates just to decorate.

| Interaction | Animation | Duration / easing |
|---|---|---|
| Button, link, row hover | Color change only | 150ms ease |
| Modal open/close | Fade + scale 0.97 → 1 | 180ms ease-out |
| Drawer (mobile sidebar) | Slide from left | 220ms ease-out |
| Dropdown open | Fade + translateY(-4px → 0) | 120ms ease-out |
| Toast in/out | Slide from top + fade | 200ms |
| Drag drop | Overlay settles into slot | 200ms ease-out |
| New ticket appears | Brief `coral-100` background flash fading to white | 900ms, once |
| Skeleton | Shimmer | 1.4s linear infinite |

- One orchestrated moment: when the board first loads, the three columns fade in with a 60ms stagger (once per page visit). No scroll-triggered entrance animations anywhere else.
- Do not scale cards or buttons on hover.
- Reduced motion: wrap all non-essential animation in `@media (prefers-reduced-motion: no-preference)`. With reduced motion, use instant state changes and keep only opacity fades under 100ms.

---

## 11. Role-aware UI

The Day 11 authorization rules are mirrored in the UI so people are not offered actions that will fail. The backend remains the source of truth.

| Action | admin | manager | developer | viewer |
|---|---|---|---|---|
| View project and tickets | Yes | Yes | Yes | Yes |
| Create ticket | Yes | Yes | Yes | No |
| Edit ticket / change status (drag) | Yes | Yes | Yes | No |
| Assign ticket | Yes | Yes | Yes | No |
| Delete ticket | Yes | Yes | No | No |
| Comment | Yes | Yes | Yes | Yes (members) |
| Add/remove members | Yes | Yes | No | No |
| Edit/delete project | Yes | No | No | No |

> This matrix is a suggested default for the "basic role-based access" requirement; adjust it when you implement Day 11, then keep the UI and the backend checks in sync.

UI treatment for denied actions:
- Hide actions that are never relevant to the role (for example, "Delete project" for non-admins).
- Show disabled controls with a tooltip when the person might expect an action to exist (for example, drag on the board for viewers).
- Disabled controls use the disabled styles from section 7 and `aria-disabled="true"`.

---

## 12. Empty, loading, and error states

Empty states are invitations to act. Centered, max width 360px, 64px illustration tile (`coral-100` circle with a `coral-500` line icon), `h3` heading, `body` `stone-500` text, one Primary button.

| Where | Heading | Text | Button |
|---|---|---|---|
| No projects | Create your first project | Projects hold your tickets and your team. | New project |
| No tickets in project | No tickets yet | Add a ticket to start tracking work. | New ticket |
| Empty board column | No tickets here yet | Drag a ticket in or add a new one. | Add ticket |
| No filter results | No tickets match these filters | Try removing a filter or searching for something else. | Clear filters |
| No comments | No comments yet | Start the conversation about this ticket. | (focus the comment input) |
| No members besides owner | It's just you for now | Add teammates who already have a BugBoard account. | Add member |
| Nothing assigned to you | Nothing assigned to you | Tickets assigned to you will show up here. | (none) |

Loading: skeletons for lists and boards, spinner inside buttons for form submits, page loader only for the initial auth check.

Errors:
- Field errors: below the field, section 7.2.
- Request errors: toast for background actions, inline alert for forms.
- Page-level error (failed fetch): centered state with `AlertTriangle` icon on a `#FEF2F2` circle, heading "Couldn't load this page", text "Check your connection and try again.", Secondary button "Try again".
- 404: heading "Page not found", text "This page doesn't exist or you don't have access.", Primary button "Go to projects".
- Never write "Oops" or apologize. State what happened and what to do.

---

## 13. Content and microcopy

- Sentence case for everything (buttons, headings, labels, menu items).
- Active voice. Buttons are verbs: "Create project", "Add member", "Post comment", "Save changes", "Delete ticket", "Sign in", "Create account".
- An action keeps the same name through the whole flow: button "Create ticket" → toast "Ticket created".
- Use "ticket" everywhere (not "issue", "task", or "bug") so the interface stays consistent with the data model.
- Use "member" for project people and "assignee" for the person on a ticket.
- Status labels: "To do", "In progress", "Done". Priority labels: "Low", "Medium", "High". Role labels: "Admin", "Manager", "Developer", "Viewer".
- Dates: "Nov 12" this year, "Nov 12, 2025" for other years. Comments use relative time under 7 days ("2h ago", "3d ago"), then the date.
- Placeholders show an example, not an instruction: search "Search by title or description"; ticket title "Login fails on Safari"; comment "Add a comment".
- Validation messages say what to do: "Enter a valid email address", "Use at least 8 characters", "Title is required".

---

## 14. Iconography

- Library: `lucide-react`.
- Sizes: 16px inline with small text, 18px in buttons and inputs, 20px in navigation, 24px in empty states and headers.
- Stroke width: 2 (default) for UI, 1.75 for large (24px+) icons.
- Color: inherits from text unless it is a status or priority icon.
- Icons next to text always have `aria-hidden="true"`. Icon-only buttons need an `aria-label`.

---

## 15. Accessibility

- **Contrast:** body text `#292524` on `#FFFBF5` is above 14:1. Secondary text `#78716C` on white is about 4.8:1. Orange text on white must use `coral-700`. White-on-`coral-600` buttons rely on 14px+ semibold text (see note in 3.1).
- **Focus:** every interactive element has a visible focus indicator (`ring-2 ring-coral-500 ring-offset-2`). Never remove outlines without a replacement.
- **Targets:** minimum 44x44px on touch devices.
- **Color independence:** status and priority always include text; columns also show icons.
- **Keyboard:** full keyboard support for modals (focus trap, Escape), dropdowns (arrow keys, Enter), and the board (dnd-kit `KeyboardSensor`).
- **Labels:** every input has a visible `<label>`; errors use `aria-describedby` and `aria-invalid`.
- **Live regions:** toasts use `role="status"` (success/info) and `role="alert"` (error).
- **Motion:** respect `prefers-reduced-motion`.
- **Language:** `<html lang="en">`.

---

## 16. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| `< 640` (mobile) | Sidebar becomes a drawer. Topbar shows hamburger, last two breadcrumb items, and avatar. Project grid 1 column. Board scrolls horizontally with snap, columns 85% viewport width. Modals become full-screen sheets. Tables become stacked cards. |
| `640–1023` (tablet) | Sidebar is a drawer. Project grid 2 columns. Board scrolls horizontally with columns about 320px. Filter bar wraps to two rows. |
| `>= 1024` (desktop) | Fixed sidebar. Project grid 3 columns (`xl`). Board shows three columns without scrolling. Ticket detail modal is two-column. |

Rules: no horizontal page scroll (only the board and wide tables scroll inside their own containers); keep a minimum 16px page padding on mobile; test at 360px, 768px, 1024px and 1440px widths.

---

## 17. Implementation

### 17.1 `client/tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      colors: {
        coral: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        app: "#FFFBF5",
        sunken: "#FAF5EE",
        sand: {
          DEFAULT: "#F5E6D3",
          strong: "#E7D5BF",
        },
        status: {
          todo: "#78716C",
          progress: "#0EA5E9",
          done: "#16A34A",
        },
        column: {
          todo: "#F5F1EC",
          progress: "#F0F9FF",
          done: "#F0FDF4",
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(124, 45, 18, 0.06), 0 1px 3px rgba(124, 45, 18, 0.05)",
        lift: "0 6px 16px rgba(124, 45, 18, 0.10)",
        pop: "0 20px 40px rgba(124, 45, 18, 0.16)",
        focus: "0 0 0 4px rgba(249, 115, 22, 0.25)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "flash-new": {
          "0%": { backgroundColor: "#FFEDD5" },
          "100%": { backgroundColor: "#FFFFFF" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s linear infinite",
        "pop-in": "pop-in 180ms ease-out",
        "flash-new": "flash-new 900ms ease-out 1",
      },
    },
  },
  plugins: [],
};
```

### 17.2 `client/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bb-bg: #FFFBF5;
  --bb-surface: #FFFFFF;
  --bb-sunken: #FAF5EE;
  --bb-border: #F5E6D3;
  --bb-border-strong: #E7D5BF;
  --bb-text: #292524;
  --bb-text-body: #44403C;
  --bb-text-muted: #78716C;
  --bb-text-placeholder: #A8A29E;
  --bb-primary: #F97316;
  --bb-primary-solid: #EA580C;
  --bb-primary-hover: #C2410C;
  --bb-primary-tint: #FFF7ED;
  color-scheme: light;
}

@layer base {
  html {
    font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
    background-color: var(--bb-bg);
    color: var(--bb-text);
    -webkit-font-smoothing: antialiased;
  }
  body { @apply bg-app text-stone-900; }
  h1, h2, h3 { letter-spacing: -0.01em; }
  ::selection { background: #FED7AA; color: #7C2D12; }
  :focus-visible { @apply outline-none ring-2 ring-coral-500 ring-offset-2; }
}

@layer components {
  .btn { @apply inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed; }
  .btn-primary { @apply btn bg-coral-600 text-white hover:bg-coral-700 active:bg-coral-800 disabled:bg-coral-300; }
  .btn-secondary { @apply btn border border-sand-strong bg-white text-stone-700 hover:border-coral-300 hover:bg-coral-50 active:bg-coral-100 disabled:text-stone-400; }
  .btn-ghost { @apply btn text-stone-700 hover:bg-coral-50 active:bg-coral-100 disabled:text-stone-400; }
  .btn-danger { @apply btn bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300; }

  .input { @apply h-11 w-full rounded-xl border border-sand-strong bg-white px-3.5 text-sm text-stone-900 placeholder:text-stone-400 hover:border-[#D6BFA3] focus:border-coral-500 focus:shadow-focus focus:outline-none disabled:bg-sunken disabled:text-stone-400; }
  .input-error { @apply border-red-600 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.2)]; }
  .label { @apply mb-1.5 block text-sm font-semibold text-stone-900; }

  .card { @apply rounded-xl border border-sand bg-white p-4 shadow-soft; }
  .panel { @apply rounded-2xl border border-sand bg-white p-6; }

  .badge { @apply inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-medium; }
  .badge-status-todo { @apply badge bg-[#F0EBE4] text-stone-700; }
  .badge-status-progress { @apply badge bg-sky-100 text-sky-800; }
  .badge-status-done { @apply badge bg-green-100 text-green-800; }
  .badge-priority-low { @apply badge bg-green-100 text-green-800; }
  .badge-priority-medium { @apply badge bg-amber-100 text-amber-800; }
  .badge-priority-high { @apply badge bg-red-100 text-red-800; }

  .skeleton { @apply animate-shimmer rounded-xl bg-[linear-gradient(90deg,#F5F1EC_25%,#FFFBF5_50%,#F5F1EC_75%)] bg-[length:200%_100%]; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 17.3 Suggested component folder mapping

```
client/src/components/
├── ui/            Button, Input, Select, Textarea, Badge, Avatar, Modal, Dropdown, Tabs, Toast, Spinner, Skeleton, EmptyState
├── layout/        (use client/src/layouts/) Sidebar, Topbar, Breadcrumbs, ProjectSelector, DashboardLayout
├── projects/      ProjectCard, ProjectForm, MemberList, AddMemberModal
├── tickets/       TicketCard, TicketForm, TicketDetailModal, TicketFilters, PriorityBadge, StatusBadge
├── kanban/        KanbanBoard, KanbanColumn, SortableTicketCard, TicketDragOverlay
└── comments/      CommentList, CommentItem, CommentForm
```

Keep `StatusBadge` and `PriorityBadge` as the single source of truth for status and priority styling, driven by one lookup object so the enums stay fixed:

```js
export const STATUS = {
  todo:        { label: "To do",       icon: "Circle",       badge: "badge-status-todo",     accent: "#78716C" },
  in_progress: { label: "In progress", icon: "Loader",       badge: "badge-status-progress", accent: "#0EA5E9" },
  done:        { label: "Done",        icon: "CheckCircle2", badge: "badge-status-done",     accent: "#16A34A" },
};

export const PRIORITY = {
  low:    { label: "Low",    icon: "ArrowDown", badge: "badge-priority-low",    edge: "#4ADE80" },
  medium: { label: "Medium", icon: "Minus",     badge: "badge-priority-medium", edge: "#FBBF24" },
  high:   { label: "High",   icon: "ArrowUp",   badge: "badge-priority-high",   edge: "#EF4444" },
};

export const ROLE = {
  admin:     { label: "Admin",     badge: "bg-orange-100 text-orange-800" },
  manager:   { label: "Manager",   badge: "bg-violet-100 text-violet-800" },
  developer: { label: "Developer", badge: "bg-sky-100 text-sky-800" },
  viewer:    { label: "Viewer",    badge: "bg-[#F0EBE4] text-stone-600" },
};
```

---

## 18. Where each part is built (14-day plan)

| Day | Design work |
|---|---|
| 1 | Install Tailwind, `lucide-react`; add the config (17.1), `index.css` (17.2), and DM Sans link |
| 2 | Auth screens (9.1), inputs, buttons, error alert |
| 3 | Project cards, project form modal, members list, role badges |
| 4 | No UI. Keep `STATUS`, `PRIORITY` constants ready |
| 5 | Ticket form, ticket card (basic), priority and status badges, avatars |
| 6 | App shell: sidebar, topbar, breadcrumbs, project selector, dashboard |
| 7 | Review focus states, contrast, and empty states across screens |
| 8 | Kanban board (section 8) |
| 9 | Ticket detail modal comments section |
| 10 | Filter bar and search (7.10, 7.3) |
| 11 | Edit modal, delete confirmation, role-aware UI (section 11) |
| 12 | No design changes. Verify fonts and assets load in production |
| 13 | Toasts, skeletons, spinners, responsive pass, empty states, README screenshots |
| 14 | Final visual QA on all breakpoints, record the demo |

---

## 19. Do and don't

**Do**
- Use `coral-600` for solid buttons and `coral-700` for orange text.
- Keep cards neutral; let status and priority carry the color.
- Use warm-tinted shadows and sand borders for a consistent feel.
- Use pill buttons and `rounded-xl` inputs consistently.
- Add text labels to every status, priority, and role indicator.

**Don't**
- Don't use blue as a brand or button color. Blue belongs to the "In progress" status and info messages only.
- Don't use `#F97316` as a background behind white small text.
- Don't use pure black or cool grey; use the stone scale.
- Don't use all-caps labels, numbered markers on non-sequential content, or arrows on button labels.
- Don't add hover scale effects or scroll-triggered entrance animations.
- Don't introduce new colors, fonts, or radii outside this file without updating it.

---

## 20. Quick reference card

| Item | Value |
|---|---|
| App name | BugBoard |
| Brand | `#F97316` (accent) / `#EA580C` (solid buttons) / `#C2410C` (text, hover) |
| Background / surface | `#FFFBF5` / `#FFFFFF` |
| Border | `#F5E6D3` (default), `#E7D5BF` (inputs) |
| Text | `#292524` / `#44403C` / `#78716C` / `#A8A29E` |
| Status | To do `#78716C`, In progress `#0EA5E9`, Done `#16A34A` |
| Priority | Low `#16A34A`, Medium `#D97706`, High `#DC2626` |
| Font | DM Sans 400/500/600/700 |
| Radius | pill buttons, 12px inputs/cards, 16px panels/modals |
| Shadows | warm-tinted (`rgba(124, 45, 18, …)`) |
| Icons | lucide-react, 2px stroke |