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
- `npm run build` → **Not yet run** (Phase 7.2)

---

## 8. Remaining Work

### Phase 7 (In Progress)
- [ ] **7.2**: Run `npm run build` and fix any build errors.
- [ ] **7.3**: Update `AGENTS.md` to reflect new components, hooks, and schema changes.
- [ ] Run `prisma db push` or `prisma migrate dev` when database is available.
