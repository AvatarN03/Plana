# PLANA 2.0 — MEMORY & DECISIONS LOG (`MEMORY.md`)

This document serves as the persistent memory, architectural registry, and operational log for the Plana 2.0 project. It preserves critical context across development sessions to ensure careful, error-free progression.

---

## 1. Project Invariants & Non-Negotiable Rules

1. **Product Identity**:
   - Plana is a focused, high-performance Kanban project and task management workspace:
     `Organization → Workspace → Board → List → Card → Task`
   - Philosophy: *"Simple project management. Clear workflows. Fast execution."*
   - **No AI feature bloat**: Do not introduce AI assistants, automated chat summaries, or complex sidecars. Plana's strength is its pure engineering, UX, and workflow speed.
   - **No overbuilding**: Do not introduce CRM, team chat, full document editors, or complex calendars.

2. **Multi-Tenant Isolation**:
   - All tenant resources (`Board`, `List`, `Card`, `AuditLog`) are partitioned by Clerk's `orgId`.
   - Never query or mutate any entity using only an ID without joining or asserting that `board.orgId === currentOrgId`.
   - If `!orgId`, immediately redirect to `/select-org` or return an unauthorized response.

3. **Prisma Client Location**:
   - The generator in `prisma/schema.prisma` is configured with `output = "../lib/generated/prisma"`.
   - Always import types, models, and enums from `@/lib/generated/prisma/client` or `@/lib/generated/prisma/enums`.
   - Client instance is configured with `@prisma/adapter-pg` in `@/lib/db`.

4. **Next.js 15/16 App Router Conventions**:
   - Dynamic route handlers and layouts/pages receive `params` as a `Promise<{ [key: string]: string }>`.
   - Always declare `{ params }: { params: Promise<{ ... }> }` and `const resolved = await params;` before reading parameter values.
   - Edge middleware must be named `proxy.ts` in the project root (Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`).

5. **Safe Server Action Pattern**:
   - Every mutation in `actions/` follows the 3-file pattern:
     - `schema.ts`: Zod validation schema.
     - `type.ts`: `InputType` and `ReturnType` (`ActionState<InputType, TOutput>`).
     - `index.ts`: The `"use server"` handler wrapped in `createSafeAction(Schema, handler)`.
   - Handlers must call `createAuditLogs` for all state mutations.
   - Client components consume actions via the `useAction` hook (`@/hooks/use-action`).

---

## 2. Technical Stack Snapshot

| Technology | Version | Purpose & Gotchas |
|---|---|---|
| **Next.js** | `16.1.4` (App Router) | Requires Promise params on dynamic routes and layouts. |
| **React** | `19.2.3` | React 19 compatibility. Use `@hello-pangea/dnd` (not `react-beautiful-dnd`). |
| **TypeScript** | `^5` | Strict null checks enabled. Be mindful of nullable Clerk `auth()` returns. |
| **Clerk** | `^6.36.8` | Multi-tenancy with Organizations (`auth()`, `<OrganizationProfile />`, `clerkMiddleware`). |
| **Prisma** | `^7.4.0` | PostgreSQL with `@prisma/adapter-pg`. Custom generated client path. |
| **Tailwind CSS** | `^4` | Tailwind v4 with `@tailwindcss/postcss`. |
| **TanStack Query**| `^5.90.21` | Client data fetching (Card Modal details and audit logs). |
| **Zustand** | `^5.0.11` | Modal state (`useCardModal`), board filters (`useBoardFilters`). |
| **Sonner** | `^2.0.7` | Toast feedback. |
| **date-fns** | (installed) | Timestamp formatting, `isPast`, `isToday` for due date logic. |

---

## 3. Schema State

### Card Model (as of Phase 4)
```prisma
model Card {
  id          String    @id @default(uuid())
  title       String
  order       Int
  description String?   @db.Text
  priority    PRIORITY  @default(MEDIUM)
  dueDate     DateTime?
  listId      String
  list        List      @relation(fields: [listId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum PRIORITY {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

> **⚠️ DB Migration**: `prisma generate` has run, but `prisma db push` or `prisma migrate dev` must be run against the live database before these fields are queryable at runtime.

---

## 4. Discovered Vulnerabilities & Fix Log

### Discovered Issues (all resolved ✅)
| Issue | Location | Root Cause | Status |
|---|---|---|---|
| Route handler compilation failure | `app/api/cards/[cardId]/log/route.ts` | `params` not typed as `Promise`; route never returned | ✅ Fixed |
| Unhandled null `orgId` | `board/[boardId]/layout.tsx` & `page.tsx` | `orgId` can be null, violating Prisma filter | ✅ Fixed |
| Inactive middleware | Root directory (`proxy.ts`) | Named `proxy.ts` instead of `middleware.ts` | ✅ Fixed |
| Incomplete Audit Logging | 9 of 10 Server Actions | `createAuditLogs` only wired into `createCard` | ✅ Fixed |
| Inverted Card Modal Activity | `components/modals/card-modal/index.tsx` | Ternary inverted | ✅ Fixed |
| Stubbed Activity Component | `components/modals/card-modal/Activity.tsx` | Stub returning `<div>Activity</div>` | ✅ Fixed |
| Blank Org Activity Page | `organization/[id]/activity/page.tsx` | Static heading with no queries | ✅ Fixed |
| Missing Confirmation Dialogs | Board, List, Card deletes | Direct execution on click | ✅ Fixed |
| Hardcoded Board Limit UI | `board-list.tsx` | Hardcoded `"5 remaining"` with no real calculation | ✅ Fixed |
| Pre-existing lint errors/warnings | Multiple files | `any` types, unused imports, impure render | ✅ All 14 fixed |

---

## 5. Work Log & Changelog

### Session 1: Baseline & Planning (2026-09-27)
- Performed deep inspection of entire project structure, actions, components, models, and types.
- Generated `AGENTS.md`, `TASK.md`, `MEMORY.md`.

### Session 2: Phase 1–3 Implementation (2026-09-27)
- **Phase 1**: Fixed route handler types, `orgId` guards, activated middleware.
- **Phase 2**: Wired audit logging across all 10 server actions, built card modal activity feed, built org activity page.
- **Phase 3**: Created `ConfirmModal`, safeguarded all destructive actions, fixed UI bugs in list-options and card-modal Actions.
- All phases verified with `npx tsc --noEmit` → 0 errors.

### Session 3: Phase 4–6 + Lint Cleanup (2026-09-28)
- **Phase 4**: Extended Prisma schema with `PRIORITY` enum + `dueDate`. Updated `update-card` schema/action, `copy-card` action. Created `CardMeta` component (priority popover + due date picker). Rewrote `card-item.tsx` with visual badges.
- **Phase 5**: Created `useBoardFilters` Zustand store. Built `BoardFilter` component (search + filter popover). Wired filtering into `list-container.tsx` via `displayData` memo.
- **Phase 6**: Added template selector to board creation (Blank / Software Kanban / Personal). Updated `create-board` action to seed starter lists. Polished `board-list.tsx` with empty states and dynamic counts. Added empty board prompt in `list-container.tsx`.
- **Lint cleanup**: Fixed all 14 lint issues (2 errors, 12 warnings → 0 errors, 0 warnings).
  - Replaced `Record<string, any>` with typed `FormPickerImage` interface
  - Made `SidebarMenuSkeleton` deterministic (no `Math.random` in render)
  - Lazy-initialized `useIsMobile` state
  - Removed 6 unused imports across `Footer.tsx`, `form-textarea.tsx`, `platform/layout.tsx`, `card-modal/index.tsx`
  - Removed unused `onDelete` from `list-options.tsx`
  - Removed unused `data` callback params in `list-container.tsx`
  - Removed debug `console.log` calls in `form-popover.tsx` and `form-picker.tsx`
  - Explicitly typed `board: Board` in `create-board/index.ts`
- **Proxy rename**: Renamed `middleware.ts` back to `proxy.ts` to align with Next.js 16 convention (eliminates deprecation warning in build output).

### Session 4: Phase 8 Landing Page Redesign (2026-09-28)
- **Navbar & Layout**: Glassmorphic sticky header with Clerk session detection (`Go to Workspace →` button for logged-in users). Replaced fixed-overlay footer with standard responsive page footer.
- **Hero & Mockup**: High-impact SaaS headline and subheadline with dual CTAs. Created `board-mockup.tsx` rendering an authentic 3-column Kanban board with real task badges (Urgent flag, due dates, description indicator).
- **Features Bento & Comparison**: 4-card `features-bento.tsx` highlighting drag-and-drop, priorities/due dates, audit logging, and starter templates. Created `comparison-section.tsx` contrasting Plana vs bloated legacy PM tools.
- **CTA Banner**: Dark conversion card `cta-banner.tsx` with glow effect and friction-free signup.

---

## 6. New Files Created

| File | Purpose |
|---|---|
| `proxy.ts` | Edge middleware — Clerk auth + routing (renamed from `middleware.ts` to match Next.js 16) |
| `components/activity-item.tsx` | Reusable audit log entry with avatar + timestamp |
| `components/modals/confirm-modal.tsx` | Reusable destructive action confirmation dialog |
| `components/modals/card-modal/card-meta.tsx` | Priority selector + due date picker for Card Modal |
| `app/.../activity/_components/activity-list.tsx` | RSC for org-wide activity feed |
| `hooks/use-board-filters.ts` | Zustand store for board-level search/filter state |
| `app/.../board/[boardId]/_component/board-filter.tsx` | Search input + filter popover in board navbar |
| `app/(marketing)/_components/hero-section.tsx` | Landing page hero with modern typography & dual CTAs |
| `app/(marketing)/_components/board-mockup.tsx` | Interactive, stylized Kanban board preview |
| `app/(marketing)/_components/features-bento.tsx` | 4-card feature bento grid |
| `app/(marketing)/_components/comparison-section.tsx` | Plana 2.0 vs legacy PM tools comparison |
| `app/(marketing)/_components/cta-banner.tsx` | High-conversion bottom signup banner |

---

## 7. Standard Verification Commands

Before declaring any task or phase complete, run:
```powershell
# 1. Typecheck entire project
npx tsc --noEmit

# 2. Linter check
npm run lint

# 3. Production build check
npm run build
```

### Current Verification Status
- `npx tsc --noEmit` → **0 errors** ✅
- `npm run lint` → **0 errors, 0 warnings** ✅
- `npm run build` → **exit code 0, compiled successfully, zero warnings** ✅

---

## 8. Session 4 Changelog (Phase 10: Optimization & Schema/UI Expansion)

1. **Bundle & Dependency Minification**:
   - Pruned dead dependencies: `recharts`, `react-resizable-panels`, `@base-ui/react`, `dns`, `embla-carousel-react`, `input-otp`.
   - Replaced `lodash` with native helper `toStartCase()` in `organization/[organizationId]/layout.tsx` and uninstalled `lodash` and `@types/lodash`.
   - Tuned `next.config.ts` with `experimental.optimizePackageImports` for `lucide-react`, `date-fns`, and `radix-ui`.
   - Implemented dynamic client loading (`next/dynamic`) for `CardModal` in `modal-provider.tsx`.

2. **Database Schema Expansion**:
   - Added `isArchived Boolean @default(false)` to `Card`.
   - Created `CardLabel` model for customizable, color-coded tag pills (`name`, `color`, `cardId`).
   - Created `ChecklistItem` model for subtasks (`title`, `isCompleted`, `order`, `cardId`).
   - Created `CardAssignee` model for workspace member card assignments (`userId`, `userName`, `userImage`, `cardId`).
   - Regenerated Prisma client to `./lib/generated/prisma`.

3. **Server Actions (3-File Architecture)**:
   - `create-checklist-item`, `update-checklist-item`, `delete-checklist-item` with audit trail and safe revalidation.
   - `create-card-label`, `delete-card-label` with audit trail.
   - `assign-card-member`, `unassign-card-member` with audit trail.
   - Enhanced `update-card` and `copy-card` to support archiving, label cloning, and checklist cloning.

4. **Card Modal & Kanban UI Overhaul**:
   - Built `Checklist` component (`checklist.tsx`) with dynamic gradient progress bar, count ratio, custom checkbox styling, and inline creation form.
   - Built `CardLabels` component (`card-labels.tsx`) with 8 curated color tokens and quick tag deletion.
   - Built `CardAssignees` component (`card-assignees.tsx`) with one-click "Assign to me" and member chips.
   - Added "Archive / Restore" action button in `Actions.tsx`.
   - Enhanced `CardItem` with tag badges, checklist progress indicator (`3/5`), and assignee avatar stack.
   - Enhanced board search filter in `list-container.tsx` to match card titles, labels, and descriptions.

5. **Board Navbar, Title Glitch Fix, Pinning & Cover Image Modal**:
   - Fixed space/trim title editing glitch in `BoardTitleForm`: trims title input, checks equality against current title, cancels without sending mutation if unchanged or whitespace.
   - Enhanced `update-board` schema and handler to trim title and accept custom/Unsplash image payload.
   - Added Pin / Unpin option in `BoardOptions` synced with `useLocalStorage("plana-pinned-boards")`.
   - Created `BoardCoverModal` with 2 tabs: Curated Unsplash Gallery (with random shuffle) and Custom Image Upload (with client-side canvas compression).
   - Redesigned `BoardFilter`: dark glass styling, `align="end"`, `sideOffset={8}`, `collisionPadding={16}` for viewport safety, larger readable labels, generous padding, and `rounded-md`/`rounded-lg` corners.

6. **List Menu & Board Card Dark Theme Polish**:
   - Fixed list menu in `list-options.tsx`: resolved white hover flashes, transparent popover gaps, and added dark glass tokens with `rounded-md` buttons.
   - Enhanced board card item contrast with `bg-slate-950/85` and `hover:bg-slate-900 border-slate-800/80` to stand out clearly from list backgrounds.
   - Upgraded badge borders and pills across all cards to `rounded-md`.

7. **Card Detail Modal 2-Column Productivity Redesign**:
   - Transformed `CardModal` shell into a 2-column productivity workspace (`md:max-w-4xl`, `md:grid-cols-7` with 70% left content and 30% right action dock).
   - Structured Metadata HUD in `card-meta.tsx` (Priority, Due Date, Assignees, Labels) with rounded-lg containers and dark popovers.
   - Standardized section icon badge containers (`bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30`) across Header, Description, Checklist, and Activity.
   - Enhanced `Checklist` with dynamic gradient progress bar, percentage badge pill, custom checkbox styling, and inline creation.
   - Polished `Actions` sidebar with Copy, Archive/Restore, Delete actions, and integrated keyboard shortcut reminders (`Esc` to close, `Enter` to save).
   - Added hidden `DialogTitle` for Radix accessibility compliance.

8. **Clerk User Avatar & Popover Dark Theme Polish**:
   - Configured dark appearance variables, dark card background (`var(--landing-panel)`), dark border (`var(--landing-line)`), and hover states on `UserButton` in `Navbar.tsx` and marketing navbar.
   - Added `userProfileProps` with dark theme tokens for the "Manage account" profile modal.
   - Added global appearance variables to root `<ClerkProvider>` in `app/layout.tsx`.
   - Added global CSS overrides in `app/globals.css` targeting `.cl-userButtonPopover*` and `.cl-userProfile*` to eliminate white mode leakage when the user avatar menu is clicked.

9. **Database-Backed Pinned Boards & Sidebar Refactor**:
   - Added `isPinned Boolean @default(false)` to `Board` model in Prisma schema and synced to database via `prisma db push`.
   - Extended `update-board` action to accept and update `isPinned` in the database, with cache revalidation on `/board/[id]` and `/organization/[orgId]`.
   - Refactored `Sidebar.tsx`: removed `useLocalStorage` dependency and eliminated mock fallback `boards.slice(0, 5)`. Now displays strictly boards where `isPinned === true`.
   - Added clean empty state placeholder for pinned boards when none are pinned.
   - Migrated `BoardOptions` (board page) and `BoardCardOptions` (organization page) to toggle pins via server action, removing client-side localStorage.
   - Polished sidebar typography, navigation links with `rounded-lg`, and quota widget tokens.

10. **Billing Removal & Sidebar Active State Typography Polish**:
   - Deleted `organization/[organizationId]/billing/page.tsx` and removed billing from the `routes` array in `Sidebar.tsx`.
   - Refined the active UI across navigation routes and pinned board links: elevated with lighter dark background (`bg-slate-800`), crisp full orange border (`border border-[var(--landing-orange)]`), glowing icon accent, and `text-white font-semibold`.
   - Elevated typography with uppercase mono headers (`tracking-[0.1em] text-slate-400 font-semibold`), proportioned line heights (`h-9.5 text-[13px] font-medium`), and renamed the bottom widget to Workspace Boards.

11. **Dark Theme Sidebar Harmonization & Team Planning Mode**:
   - Replaced hardcoded Tailwind `slate` palette classes in `Sidebar.tsx` with Plana's warm charcoal theme tokens (`bg-[var(--landing-bg)]`, `bg-[var(--landing-panel-strong)]`, `border-[var(--landing-line)]`, `text-[var(--landing-text)]`, `text-[var(--landing-muted)]`).
   - Active menu items and pinned boards now use `bg-[var(--landing-panel-strong)]` with `border border-[var(--landing-orange)]/60`, glowing orange icon accent, and `text-[var(--landing-text)]` for seamless dark mode cohesion.
   - Skeletons, empty pinned boards state, and workspace progress widget updated to match the warm dark surface palette.
   - Eliminated duplicate border wrapper in `organization/layout.tsx`.
   - Differentiated `/organization/[organizationId]/settings` as dedicated Workspace Settings & Administration hub with clear headers and icons.
   - Differentiated `/organization/[organizationId]/members` by building an interactive **Team & Workload Planning Mode**:
     - Overview metrics: Active Members, Total Assigned Tasks, Urgent/High Priority Items, and Due Soon/Overdue Deadlines.
     - Search & filter toolbar: search by member/task/board, filter by board, and filter by priority (`URGENT`, `HIGH`, `MEDIUM`, `LOW`).
     - Member Workload Roster: capacity status (`Available`, `High Workload`, or active task count), assigned task cards with priority badge, board badge, list name, and due date.
     - Direct integration with Plana's card modal (`useCardModal().onOpen()`) on task click.
     - Unassigned tasks backlog section for easy task triage.
     - Integrated "Invite & Manage Roles" tab with Clerk's `<OrganizationProfile />` styled to Plana's dark theme.
