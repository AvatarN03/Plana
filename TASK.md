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
| **Phase 9** | Modern Dashboard Shell, Pinned Boards & Date-Grouped Activity | ✅ Completed | 100% |
| **Phase 10** | Bundle Minification, Schema Expansion & 2-Column Card Modal | ✅ Completed | 100% |
| **Phase 11** | Dark Theme Sidebar Harmonization & Team Planning Mode | ✅ Completed | 100% |
| **Phase 12** | Mobile Responsiveness, Smooth Sidebar Motion & Brand Integration | ✅ Completed | 100% |

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

### Phase 9: Modern Dashboard Shell, Pinned Boards & Date-Grouped Activity
- [x] **9.1 Full-Height Desktop Sidebar & Layout Restructure**
  - Fixed full-height sidebar spanning top-to-bottom on desktop with anchored `PLANA` logo.
  - Workspace menu: `Boards`, `Activity`, `Team Members`, `Settings`, `Billing`.
  - Dynamic `Pinned Boards` section with custom color dots powered by `GET /api/boards`.
  - Bottom `Free tier usage` progress widget (`X of 5 boards`).
- [x] **9.2 Top Navigation & Clerk Dark Mode Fix**
  - Desktop inline quick-search bar (`⌘K`) and `+ Create Board` primary orange button.
  - Fully custom-themed Clerk `OrganizationSwitcher` variables and CSS overrides matching dark panel tokens.
- [x] **9.3 Full-Width Boards Dashboard**
  - Workspace header with `Verified team` badge and member avatar stack (`+X`).
  - Removed live activity column from main board list for clean full-width 3-4 column grid.
- [x] **9.4 Date-Grouped Activity Timeline**
  - Grouped audit log items by date: `Today`, `Yesterday`, and formatted dates.
- [x] **9.5 Team Members & Collaboration View**
  - Dedicated `/organization/[id]/members` page for managing and inviting collaborators.

---

### Phase 10: Bundle Minification, Schema Expansion & 2-Column Card Modal
- [x] **10.1 Bundle Minification & Pruning**
  - Pruned unused dependencies (`recharts`, `react-resizable-panels`, `@base-ui/react`, `dns`, `embla-carousel-react`, `input-otp`).
  - Replaced `lodash` with lightweight native string utility in `organization/[id]/layout.tsx`, removed `lodash` & `@types/lodash`.
  - Configured `optimizePackageImports` in `next.config.ts` for `lucide-react`, `date-fns`, `radix-ui`.
  - Converted `CardModal` in `modal-provider.tsx` to dynamic client-only import (`next/dynamic`), removing it from the critical initial render path.
- [x] **10.2 Prisma Schema Extensions**
  - Added `CardLabel`, `ChecklistItem`, and `CardAssignee` models with cascade deletion.
  - Added `isArchived` Boolean flag to `Card`.
  - Regenerated custom Prisma Client via `npx prisma generate`.
- [x] **10.3 Mutating Server Actions & Audit Trail**
  - Implemented 3-file pattern actions: `create-checklist-item`, `update-checklist-item`, `delete-checklist-item`.
  - Implemented `create-card-label` and `delete-card-label`.
  - Implemented `assign-card-member` and `unassign-card-member`.
  - Updated `update-card` and `copy-card` to support archiving, labels, and subtasks.
- [x] **10.4 2-Column Card Modal & Rich Kanban Badges**
  - Built interactive `Checklist` with progress bar, custom checkbox styling, item counter (`X/Y`), and inline creation.
  - Built `CardLabels` popover with 8 curated preset colors and tag chip removal.
  - Built `CardAssignees` popover with one-click "Assign to me" and member chips.
  - Added `Archive / Restore` button in Card Actions sidebar.
  - Enriched `CardItem` with colored label badges, checklist progress ratio (`3/5`), and assignee avatar stacks.
  - Upgraded board search filter in `list-container.tsx` to match card titles, labels, and descriptions.
- [x] **10.5 Board Navbar, Title Form Fixes, Pinning & Cover Image Customizer**
  - Fixed title editing space/whitespace glitch in `board-title-form.tsx`: trims input, blocks redundant database mutations when unchanged or whitespace.
  - Added `.trim()` and image payload handling to `actions/update-board`.
  - Added Pin / Unpin option in `BoardOptions` synchronized with `plana-pinned-boards` localStorage.
  - Built `BoardCoverModal` with curated Unsplash wallpaper selector and custom client image upload (with canvas compression).
  - Redesigned `BoardFilter`: dark theme styling, viewport collision handling (`align="end"`, `sideOffset={8}`, `collisionPadding={16}`), increased padding, typography, and `rounded-md`/`rounded-lg` corners.
- [x] **10.6 List Menu & Board Cards Dark Theme Contrast**
  - Eliminated white hover flashes and transparent menu gaps in `list-options.tsx` with dark glass styling and rounded-md corners.
  - Elevated board card items with `slate-950/85` background and `hover:bg-slate-900 border-slate-800/80` for crisp visual hierarchy.
  - Upgraded list container with `rounded-lg bg-[var(--landing-panel)]/95 shadow-md`.
- [x] **10.7 Card Detail Modal Complete Layout & Productivity Overhaul**
  - Modernized `CardModal` shell into a 2-column productivity layout (`md:grid-cols-7`, 70% main column, 30% action sidebar).
  - Built Metadata HUD in `card-meta.tsx` (Priority, Due Date, Assignees, Labels) with rounded-lg containers and dark popovers.
  - Standardized section icon badges (`bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30`) across Header, Description, Checklist, and Activity.
  - Polished `Checklist` with dynamic gradient progress bar, percentage pill badge, custom checkbox accent, and inline subtask creation.
  - Enhanced `Actions` dock with Copy, Archive/Restore, and Delete buttons, plus integrated keyboard shortcut reminders (`Esc`, `Enter`).
- [x] **10.8 Clerk User Avatar & Popover Dark Theme Polish**
  - Configured dark theme appearance variables, popover card tokens, and action button hover states on `UserButton` in `Navbar.tsx`.
  - Added `userProfileProps` with dark theme styling so the "Manage account" profile modal opens in dark mode.
  - Added global dark appearance variables to root `<ClerkProvider>` in `app/layout.tsx`.
  - Added global CSS overrides in `app/globals.css` targeting `.cl-userButtonPopover*` and `.cl-userProfile*` to eliminate all white-mode background/text leakage.
- [x] **10.9 Database-Backed Pinned Boards & Sidebar Refactor**
  - Added `isPinned Boolean @default(false)` to `Board` model in Prisma schema and synced via `prisma db push`.
  - Updated `actions/update-board` (schema & handler) to validate and update `isPinned` with safe multi-path cache revalidation.
  - Refactored `Sidebar.tsx`: removed `useLocalStorage` and mock data fallback (`boards.slice(0, 5)`). Sidebar now queries and renders strictly real database-pinned boards.
  - Added clean empty state placeholder for pinned boards when none are pinned.
  - Updated `BoardOptions` and `BoardCardOptions` to toggle board pins via database mutations, eliminating client localStorage dependencies.
  - Elevated sidebar typography, icons, rounded-lg navigation links, and dark slate styling tokens.
- [x] **10.10 Billing Deletion & Sidebar Active State Typography Polish**
  - Completely removed the `/billing` page, related pricing components, and billing route from the application.
  - Refined the active UI across navigation routes and pinned board items: styled with a lighter, less dark background (`bg-slate-800`), crisp full orange border (`border border-[var(--landing-orange)]`), glowing orange icon shadow, and `text-white font-semibold`.
  - Polished sidebar typography: uppercase tracking headers (`tracking-[0.1em] text-slate-400 font-semibold`), proportioned line heights (`h-9.5 text-[13px] font-medium`), and renamed the bottom widget to Workspace Boards.

---

### Phase 11: Dark Theme Sidebar Harmonization & Team Planning Mode
- [x] **11.1 Sidebar Dark Theme & Active Menu Harmonization**
  - Replaced hardcoded slate classes (`bg-slate-950`, `bg-slate-900`, `bg-slate-800`, `text-slate-400`) in `Sidebar.tsx` with Plana's warm charcoal theme tokens (`bg-[var(--landing-bg)]`, `bg-[var(--landing-panel-strong)]`, `border-[var(--landing-line)]`, `text-[var(--landing-text)]`, `text-[var(--landing-muted)]`).
  - Active menu items and pinned boards now use `bg-[var(--landing-panel-strong)]` with `border border-[var(--landing-orange)]/60`, orange drop-shadow icon, and crisp `text-[var(--landing-text)]` for seamless dark mode cohesion.
  - Skeletons, empty pinned boards state, and workspace progress widget updated to match the warm dark surface palette.
  - Eliminated duplicate border wrapper in `organization/layout.tsx`.
- [x] **11.2 Workspace Settings Page Refinement**
  - Re-anchored `/organization/[organizationId]/settings` as dedicated Workspace Settings & Administration hub with clear header and icons.
- [x] **11.3 Team Members & Planning Hub (`members/page.tsx`)**
  - Built an interactive **Team & Workload Planning Mode** featuring:
    - Overview metrics: Active Members, Total Assigned Tasks, Urgent/High Priority Items, and Due Soon/Overdue Deadlines.
    - Search & filter toolbar: search by member/task/board, filter by board, and filter by priority (`URGENT`, `HIGH`, `MEDIUM`, `LOW`).
    - Member Workload Roster: capacity status (`Available`, `High Workload`, or active task count), assigned task cards with priority badge, board badge, list name, and due date.
    - Direct integration with Plana's card modal (`useCardModal().onOpen()`) on task click.
    - Unassigned tasks backlog section for easy task triage.
    - Integrated "Invite & Manage Roles" tab with Clerk's `<OrganizationProfile />` styled to Plana's dark theme.

---

### Phase 12: Mobile Responsiveness, Smooth Sidebar Motion & Brand Integration
- [x] **12.1 Card Details Modal Mobile Responsiveness & Y-Overflow Fix**
  - Resolved mobile vertical Y-overflow by restructuring `DialogContent` with `flex flex-col max-h-[85dvh] sm:max-h-[88vh] overflow-hidden` and an internal scrollable body (`flex-1 overflow-y-auto`).
  - Pinned the top Header (`shrink-0`) so card title editing and the Radix `X` close button remain visible and accessible at all times without scrolling away.
  - Implemented responsive mobile segmented tab switcher (`[ Details ]` | `[ Activity (count) ]`):
    - **Details Tab**: Houses Description, Checklist, and Action buttons (Copy, Archive, Delete), eliminating endless scrolling past audit logs on mobile.
    - **Activity Tab**: Provides dedicated, distraction-free space for audit log timeline with activity count badge.
  - Preserved standard 2-column productivity workspace on desktop (`md:` breakpoint and above).
  - Added `pr-9 sm:pr-8` to `Header.tsx` to eliminate overlap with the modal close button on mobile, scaled title fonts, and truncated list name badge.
  - Added `collisionPadding={12}` and `max-w-[calc(100vw-2rem)]` on Popovers (Priority, Due Date, Labels, Assignees) to guarantee viewport fit.
  - Made checklist delete action visible on touch screens (`opacity-100 sm:opacity-0 sm:group-hover:opacity-100`) and wrapped checklist header.
  - Added word breaks and `min-w-0` to Description and Activity items to prevent horizontal layout expansion on mobile.
- [x] **12.2 Smooth Hardware-Accelerated Sidebar Motion**
  - Added GPU-accelerated (`will-change: transform`, `translate3d`) 60fps/120fps CSS keyframes (`sheet-slide-in-left`, `sheet-slide-out-left`, `sheet-overlay-in`, `sheet-overlay-out`) with fluid spring curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Added `data-side={side}` attribute in `sheet.tsx` for clean CSS selector targeting.
- [x] **12.3 Elimination of Duplicate Sidebar Right Border**
  - Accepted `className?: string` on `Sidebar.tsx` and updated `MobileSidebar.tsx` to use `p-0` on `SheetContent` and pass `<Sidebar className="border-r-0" />`.
  - Removed inner border overlap, leaving a single clean border on the mobile drawer edge.
  - Added `<SheetTitle className="sr-only">Navigation Menu</SheetTitle>` for Radix accessibility.
- [x] **12.4 Brand Logo & Name on Mobile**
  - Updated `Logo.tsx` to accept `showTextOnMobile` (default `true`), ensuring both the Plana icon and "PLANA" brand text display across mobile viewports.
  - Explicitly passed `showTextOnMobile={true}` to `Logo` in `Sidebar.tsx` for immediate brand visibility in the mobile navigation drawer.

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
