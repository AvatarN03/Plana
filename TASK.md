# PLANA 2.0 — TASK TRACKER (`TASK.md`)

This task tracker governs the phased evolution of Plana into a production-grade, polished Kanban project management platform. Work proceeds incrementally and methodically, with verification after each item to guarantee zero regressions.

---

## Progress Overview

| Phase | Description | Status | Progress |
|---|---|---|---|
| **Phase 0** | Project Audit, Documentation & Baselines | ✅ Completed | 100% |
| **Phase 1** | P0: Compilation, Middleware & Critical Bug Fixes | ✅ Completed | 100% |
| **Phase 2** | P0: Complete Audit Logging Engine & Activity Views | ✅ Completed | 100% |
| **Phase 3** | P0: Destructive Action Safety & UI Polish | ✅ Completed | 100% |
| **Phase 4** | P1: Enhanced Card Management (Priorities, Due Dates, Badges) | ✅ Completed | 100% |
| **Phase 5** | P1: Board Search, Filtering & Productivity | ✅ Completed | 100% |
| **Phase 6** | P1: Board Starter Templates & Empty States | ✅ Completed | 100% |
| **Phase 7** | Quality Assurance, Verification & Documentation | ✅ Completed | 100% |
| **Phase 8** | High-Converting SaaS Landing Page Redesign | ✅ Completed | 100% |

---

## Detailed Task Breakdown

### Phase 1: P0 Compilation, Middleware & Critical Bug Fixes
- [x] **1.1 Fix Route Handler Signature & Return in `/api/cards/[cardId]/log`**
- [x] **1.2 Fix Nullable `orgId` & Type Inconsistencies in Board Layout & Page**
- [x] **1.3 Activate Edge Middleware**

---

### Phase 2: P0 Complete Audit Logging Engine & Activity Views
- [x] **2.1 Wire Up `createAuditLogs` Across All 10 Mutating Server Actions**
- [x] **2.2 Implement Card Modal Activity Feed**
- [x] **2.3 Build Organization Activity Page**

---

### Phase 3: P0 Destructive Action Safety & UI Polish
- [x] **3.1 Create Reusable `ConfirmModal` Component**
- [x] **3.2 Safeguard Board, List, and Card Deletions**
- [x] **3.3 Fix List Options & Card Modal Action Bugs**

---

### Phase 4: P1 Enhanced Card Management (Priorities, Due Dates, Badges)
- [x] **4.1 Extend Schema for Card Metadata**
  - Added `PRIORITY` enum (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) and `priority`/`dueDate` fields to `Card` model.
  - `npx prisma generate` succeeded. DB migration pending (`prisma db push`).
- [x] **4.2 Update Card Server Actions & Schemas**
  - Updated `actions/update-card/schema.ts` with `priority` (enum) and `dueDate` (nullable string).
  - Updated `actions/update-card/index.ts` to parse dueDate string → Date and build explicit updateData.
  - Updated `actions/copy-card/index.ts` to clone `priority` and `dueDate` when copying cards.
- [x] **4.3 Add Priority & Due Date Selectors in Card Modal**
  - Created `components/modals/card-modal/card-meta.tsx` with priority popover and due date picker.
  - Integrated `CardMeta` into `card-modal/index.tsx` above Description.
- [x] **4.4 Enrich Board Card Item Preview Badges**
  - Rewrote `card-item.tsx` with priority badge, due date badge (with overdue/today styling), and description indicator.

---

### Phase 5: P1 Board Search, Filtering & Productivity
- [x] **5.1 Implement Board Search & Filter State Management**
  - Created `hooks/use-board-filters.ts` — Zustand store with `searchQuery`, `priorityFilter`, `dueFilter`, and `resetFilters`.
- [x] **5.2 Add Board Filter Bar to Board Navbar**
  - Created `board-filter.tsx` — search input + filter popover with priority and due-date sections.
  - Integrated `BoardFilter` into `board-navbar.tsx`.
  - Wired filtering logic into `list-container.tsx` via `useMemo` over `displayData`.

---

### Phase 6: P1 Board Starter Templates & Empty States
- [x] **6.1 Add Starter Templates to Board Creation**
  - Updated `actions/create-board/schema.ts` with optional `template` enum (`BLANK`, `SOFTWARE`, `PERSONAL`).
  - Updated `actions/create-board/index.ts` to seed starter lists based on template.
  - Added template selector `<select>` in `components/forms/form-popover.tsx`.
- [x] **6.2 Build Polished Empty States**
  - Rewrote `board-list.tsx` with dynamic board count, free board remaining, modern create card, and empty org state.
  - Added empty board prompt in `list-container.tsx` when `orderedData.length === 0`.

---

### Phase 7: Quality Assurance, Verification & Documentation
- [x] **7.1 Full TypeScript & Linter Verification**
  - `npx tsc --noEmit` → **0 errors** ✅
  - `npm run lint` → **0 errors, 0 warnings** ✅
- [x] **7.2 Build Verification**
  - `npm run build` → **exit code 0, compiled in 52s, zero warnings** ✅
  - Renamed `middleware.ts` → `proxy.ts` to align with Next.js 16 convention (eliminated deprecation warning).
- [x] **7.3 Update Documentation**
  - `AGENTS.md` — Complete rewrite reflecting Plana 2.0 architecture, all new components, hooks, and schema.
  - `MEMORY.md` — Updated with full session 3 changelog, schema state, verification status.
  - `TASK.md` — All phases marked complete.

---

### Phase 8: High-Converting SaaS Landing Page Redesign
- [x] **8.1 Navbar & Layout Polish**
  - Sticky glassmorphic navbar with backdrop-blur, active Clerk user/org link ("Go to Workspace →").
  - Fixed-height footer changed to natural flex page footer with branding, policies, and copyright.
- [x] **8.2 Hero Section & Stylized Kanban Mockup**
  - Headline, subheadline, dual CTAs ("Get Plana for free", "Sign in to workspace").
  - Rich `BoardMockup` component showing 3 columns, realistic task badges (Urgent flag, due dates, description indicator).
- [x] **8.3 Feature Bento Grid & Comparison**
  - 4-card `FeaturesBento` highlighting Fluid Drag & Drop, Priorities/Due Dates, Audit Trails, and Starter Templates.
  - `ComparisonSection` comparing Plana's focused execution vs bloated enterprise PM tools.
- [x] **8.4 Conversion Banner & Final QA**
  - Sleek dark `CtaBanner` with glow accent and direct sign-up link.
  - Verification: `npx tsc --noEmit` (0 errors), `npm run lint` (0 errors, 0 warnings), `npm run build` (compiled in 34.8s, 0 errors).

---

## Lint Cleanup (completed alongside phases)

All pre-existing and introduced lint issues were fixed:

| File | Issue | Fix |
|---|---|---|
| `form-picker.tsx` | `Record<string, any>` (2x `no-explicit-any`) | Replaced with `FormPickerImage` interface |
| `sidebar.tsx` | `Math.random()` in `useMemo` (react-hooks/purity) | Static `"70%"` width |
| `use-mobile.ts` | `setState` in effect body | Lazy initializer, removed sync setState |
| `Footer.tsx` | Unused `Link` import | Removed |
| `form-textarea.tsx` | Unused `defaultImages` import | Removed |
| `(platform)/layout.tsx` | Unused `ClerkProvider` import + commented JSX | Removed |
| `card-modal/index.tsx` | Unused `Suspense` import | Removed |
| `list-container.tsx` | Unused `data` param in callbacks | Changed to `()` |
| `list-options.tsx` | Unused `onDelete` function | Removed |
| `form-popover.tsx` | Debug `console.log` | Removed |
| `form-picker.tsx` | Debug `console.log` | Removed |
