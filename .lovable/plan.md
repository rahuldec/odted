# Training Program Tracker — Okie Dokie Solutions

Internal HR + Management dashboard to track trainees as they move through Levels 0–3. No auth — a role toggle switches between HR (full edit) and Management (read-only) views. Data persists in `localStorage`.

## Pages & routes

- `/` — Dashboard (role toggle, summary, content area)
- `/levels` — Static reference page describing each level's pay & expectations (also shown as a collapsible info panel on the dashboard)

## Data model (localStorage key: `odk-trainees`)

```ts
type Level = 0 | 1 | 2 | 3;
type Status = "Active" | "On Hold" | "Exited";

type Trainee = {
  id: string;
  name: string;
  phone: string;
  joinDate: string;          // ISO, date entered Level 0
  currentLevel: Level;
  levelSinceDate: string;    // ISO, date promoted to currentLevel
  manager: string;
  status: Status;
  notes?: string;
  history: { level: Level; date: string }[];
};
```

Role toggle stored in `localStorage` key `odk-role` ("hr" | "management").

## HR View

- **Add Trainee** dialog: name, phone, join date (defaults today), manager. New trainees start at Level 0; `levelSinceDate = joinDate`; status Active.
- **Trainee table/list** with per-row actions:
  - Promote → next level (disabled at Level 3); updates `currentLevel`, sets `levelSinceDate = today`, appends history entry
  - Edit (all fields incl. status: Active / On Hold / Exited)
  - Delete (confirm dialog)
- Inline status badges and quick status change.

## Management View (read-only)

- **Summary cards**: total trainees, count per level (L0–L3), promoted this month.
- **Kanban board**: 4 columns (Level 0 / 1 / 2 / 3), trainee cards show name, days at current level, manager, status badge.
- **Filter** by manager (dropdown built from unique managers) + status filter.
- **Overdue review badge** (amber) on cards where days at current level > 30 and status = Active.
- No edit controls visible.

## Level reference panel

Collapsible card on the dashboard:
- L0 — Pre-onboarding, video training, ₹0/mo
- L1 — ₹8,000/mo, client calls & supporting visits
- L2 — ₹10,000/mo, solo client visits, owns small clients
- L3 — ₹12,000/mo, complex clients

## Design

- Corporate, clean. Header with "Okie Dokie Solutions" wordmark + role toggle (segmented control).
- Level color tokens added to `src/styles.css` (semantic, oklch):
  - `--level-0` gray, `--level-1` green, `--level-2` blue, `--level-3` purple (+ matching foreground tokens)
- shadcn components: card, button, dialog, input, select, badge, table, tabs, tooltip, sonner (toasts).
- Responsive: kanban becomes horizontally scrollable on mobile; HR table becomes stacked cards.

## Technical notes

- TanStack Start file routes: `src/routes/index.tsx` (dashboard), `src/routes/levels.tsx`.
- All state via a single `useTrainees()` hook wrapping localStorage (with SSR-safe guard — read in `useEffect`, not at module scope).
- Role state via `useRole()` hook, same SSR pattern.
- Helpers: `daysBetween`, `promotedThisMonth`, `nextLevel`.
- Components: `RoleToggle`, `SummaryCards`, `KanbanBoard`, `TraineeCard`, `HRTable`, `AddTraineeDialog`, `EditTraineeDialog`, `LevelLegend`, `ManagerFilter`.
- Per TanStack Start rules: replace placeholder index, add proper `head()` metadata to both routes, set `notFoundComponent`/`errorComponent` where loaders are used (none here, but keep root 404 intact).
- No backend, no Lovable Cloud — pure frontend with localStorage as requested.

## Out of scope

- Authentication / real role enforcement (toggle is cosmetic per spec)
- Multi-device sync, exports, audit log beyond per-trainee promotion history
