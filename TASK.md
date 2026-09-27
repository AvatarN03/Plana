# PLANA 2.0 — TASK TRACKER (`TASK.md`)

This task tracker governs the phased evolution of Plana into a production-grade, polished Kanban project management platform. Work proceeds incrementally and methodically, with verification after each item to guarantee zero regressions.

---

## Progress Overview

| Phase | Description | Status | Progress |
|---|---|---|---|
| **Phase 0** | Project Audit, Documentation & Baselines | Completed | 100% |
| **Phase 1** | P0: Compilation, Middleware & Critical Bug Fixes | In Progress | 0% |
| **Phase 2** | P0: Complete Audit Logging Engine & Activity Views | Pending | 0% |
| **Phase 3** | P0: Destructive Action Safety & UI Polish | Pending | 0% |
| **Phase 4** | P1: Enhanced Card Management (Priorities, Due Dates, Badges) | Pending | 0% |
| **Phase 5** | P1: Board Search, Filtering & Productivity | Pending | 0% |
| **Phase 6** | P1: Board Starter Templates & Empty States | Pending | 0% |
| **Phase 7** | Quality Assurance, Verification & Documentation | Pending | 0% |

---

## Detailed Task Breakdown

### Phase 1: P0 Compilation, Middleware & Critical Bug Fixes
- [ ] **1.1 Fix Route Handler Signature & Return in `/api/cards/[cardId]/log`**
  - **Files**: `app/api/cards/[cardId]/log/route.ts`
  - **Objective**: Change `params: { cardId: string }` to `params: Promise<{ cardId: string }>` to comply with Next.js 15/16. Ensure `const { cardId } = await params;` is awaited and `NextResponse.json(auditLogs)` is returned with proper try/catch error handling.
  - **Verification**: Run `npx tsc --noEmit` and verify route handler type error is resolved.

- [ ] **1.2 Fix Nullable `orgId` & Type Inconsistencies in Board Layout & Page**
  - **Files**: 
    - `app/(platform)/(dashboard)/board/[boardId]/layout.tsx`
    - `app/(platform)/(dashboard)/board/[boardId]/page.tsx`
  - **Objective**: Ensure `orgId` from `await auth()` is validated. If null or undefined, perform `redirect("/select-org")`. Ensure query parameters match Prisma types and resolve `ListWithCards` type mismatch without losing card relations.
  - **Verification**: Run `npx tsc --noEmit` and verify zero errors in `board/[boardId]`.

- [ ] **1.3 Activate Edge Middleware**
  - **Files**: `proxy.ts` → `middleware.ts`
  - **Objective**: Move `proxy.ts` to `middleware.ts` at project root so Next.js actively executes Clerk route protection, public route matcher, and redirect logic for unauthenticated users and org switching.
  - **Verification**: Test Next.js build recognizes `middleware.ts`.

---

### Phase 2: P0 Complete Audit Logging Engine & Activity Views
- [ ] **2.1 Wire Up `createAuditLogs` Across All Mutating Server Actions**
  - **Files**: 
    - `actions/create-board/index.ts`
    - `actions/update-board/index.ts`
    - `actions/delete-board/index.ts`
    - `actions/create-list/index.ts`
    - `actions/update-list/index.ts`
    - `actions/delete-list/index.ts`
    - `actions/copy-list/index.ts`
    - `actions/update-card/index.ts`
    - `actions/delete-card/index.ts`
    - `actions/copy-card/index.ts`
  - **Objective**: Ensure every mutation calls `createAuditLogs` with correct `action` (`CREATE`, `UPDATE`, `DELETE`), `entityType` (`BOARD`, `LIST`, `CARD`), and `entityTitle`.
  - **Verification**: Inspect each action for `createAuditLogs` call and verify type correctness.

- [ ] **2.2 Implement Card Modal Activity Feed**
  - **Files**: 
    - `components/modals/card-modal/Activity.tsx`
    - `components/modals/card-modal/index.tsx`
  - **Objective**: Fix inverted skeleton logic in `CardModal`. Pass `cardAuditLogs` data to `Activity`. Render each audit log entry with user avatar (`Avatar`), user name, action description, and formatted relative timestamp (`date-fns`).
  - **Verification**: Verify modal renders audit logs and loading skeleton properly.

- [ ] **2.3 Build Organization Activity Page**
  - **Files**: `app/(platform)/(dashboard)/organization/[organizationId]/activity/page.tsx`
  - **Objective**: Query organization-wide audit logs (`db.auditLog.findMany({ where: { orgId } })`) and render a clean, chronological workspace activity timeline with filter or limit. Include empty state when no activity exists.
  - **Verification**: Check organization activity page renders with proper multi-tenant isolation.

---

### Phase 3: P0 Destructive Action Safety & UI Polish
- [ ] **3.1 Create Reusable `ConfirmModal` Component**
  - **Files**: `components/modals/confirm-modal.tsx`
  - **Objective**: Implement an accessible confirmation modal using Radix `AlertDialog` to prompt users before dangerous operations (deleting boards, lists, or cards) with customized title, description, and destructive button styling.
  - **Verification**: Component compiles and supports async callbacks with loading state.

- [ ] **3.2 Safeguard Board, List, and Card Deletions**
  - **Files**: 
    - `app/(platform)/(dashboard)/board/[boardId]/_component/board-options.tsx`
    - `app/(platform)/(dashboard)/board/[boardId]/_component/list-options.tsx`
    - `components/modals/card-modal/Actions.tsx`
  - **Objective**: Wrap delete triggers inside `ConfirmModal`. Prevent accidental data loss.
  - **Verification**: Test deletion flow triggers confirmation dialog first.

- [ ] **3.3 Fix List Options & Card Modal Action Bugs**
  - **Files**: 
    - `app/(platform)/(dashboard)/board/[boardId]/_component/list-options.tsx`
    - `components/modals/card-modal/Actions.tsx`
  - **Objective**: Fix button in `list-options.tsx` to read "Add card..." and trigger `onAddCard`. Fix copy toast in `Actions.tsx` from "List X copied" to "Card X copied".
  - **Verification**: Check UI text and handler invocations.

---

### Phase 4: P1 Enhanced Card Management (Priorities, Due Dates, Badges)
- [ ] **4.1 Extend Schema for Card Metadata**
  - **Files**: `prisma/schema.prisma`
  - **Objective**: Add `priority` enum (`LOW`, `MEDIUM`, `HIGH`, `URGENT`, default `MEDIUM`) and optional `dueDate DateTime?` to `Card` model. Run migration / client generation.
  - **Verification**: Run `npx prisma generate` and verify `@/lib/generated/prisma` updates.

- [ ] **4.2 Update Card Server Actions & Schemas**
  - **Files**: 
    - `actions/update-card/schema.ts`
    - `actions/update-card/type.ts`
    - `actions/update-card/index.ts`
    - `actions/copy-card/index.ts`
  - **Objective**: Support updating priority and due date via `updateCard` action. Ensure `copyCard` clones priority and due date.
  - **Verification**: Check types and action validation.

- [ ] **4.3 Add Priority & Due Date Selectors in Card Modal**
  - **Files**: 
    - `components/modals/card-modal/index.tsx`
    - `components/modals/card-modal/Actions.tsx` or new subcomponents
  - **Objective**: Add UI controls in Card Modal to select priority badge (with subtle semantic colors) and pick a due date (using `react-day-picker` / popover calendar).
  - **Verification**: Verify modal allows modifying priority and due date and invalidates React Query cache.

- [ ] **4.4 Enrich Board Card Item Preview Badges**
  - **Files**: `app/(platform)/(dashboard)/board/[boardId]/_component/card-item.tsx`
  - **Objective**: Display visual badges on card preview:
    - Due date indicator (neutral if upcoming, red/amber badge if overdue or due today).
    - Priority pill (e.g. High / Urgent).
    - Description icon if card has description.
  - **Verification**: Check Kanban board cards display clean, professional visual indicators without visual clutter.

---

### Phase 5: P1 Board Search, Filtering & Productivity
- [ ] **5.1 Implement Board Search & Filter State Management**
  - **Files**: `hooks/use-board-filters.ts` or board container state
  - **Objective**: Provide lightweight client-side filtering for cards:
    - Search query matching card title.
    - Priority filter (All, Urgent, High, Medium, Low).
    - Due date filter (All, Overdue, Due Today, Due This Week).
  - **Verification**: State updates cleanly and filters cards in memory without full-page reloads.

- [ ] **5.2 Add Board Filter Bar to Board Navbar**
  - **Files**: 
    - `app/(platform)/(dashboard)/board/[boardId]/_component/board-navbar.tsx`
    - `app/(platform)/(dashboard)/board/[boardId]/_component/board-filter-popover.tsx`
  - **Objective**: Place a clean search input and filter toggle button in the board navbar. Show active filter pill count with a one-click "Clear Filters" button.
  - **Verification**: Searching or selecting filter instantly dims or hides non-matching cards.

---

### Phase 6: P1 Board Starter Templates & Empty States
- [ ] **6.1 Add Starter Templates to Board Creation**
  - **Files**: 
    - `components/forms/form-popover.tsx`
    - `actions/create-board/schema.ts`
    - `actions/create-board/index.ts`
  - **Objective**: Allow user to optionally pick a template when creating a board:
    - *Blank Board*
    - *Software Kanban* (Backlog, Todo, In Progress, Review, Done)
    - *Personal Tasks* (To Do, In Progress, Done)
    Server action automatically creates the initial lists for selected template.
  - **Verification**: Create board with a template and verify lists are pre-populated.

- [ ] **6.2 Build Polished Empty States**
  - **Files**: 
    - `app/(platform)/(dashboard)/organization/[organizationId]/_components/board-list.tsx`
    - `app/(platform)/(dashboard)/board/[boardId]/_component/list-container.tsx`
  - **Objective**: Render clean, helpful empty states when an organization has 0 boards or when a board has 0 lists.
  - **Verification**: Inspect empty org and empty board views.

---

### Phase 7: Quality Assurance, Verification & Documentation
- [ ] **7.1 Full TypeScript & Linter Verification**
  - **Command**: `npx tsc --noEmit` & `npm run lint`
  - **Target**: 0 errors, 0 warnings.
- [ ] **7.2 Build Verification**
  - **Command**: `npm run build`
  - **Target**: Production build succeeds cleanly.
- [ ] **7.3 Update Documentation**
  - **Files**: `README.md`, `AGENTS.md`, `MEMORY.md`
  - **Target**: Accurate reflection of Plana 2.0 capabilities, architecture, and commands.
