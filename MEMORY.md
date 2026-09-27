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
   - Middleware must be named `middleware.ts` in the project root.

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
| **Zustand** | `^5.0.11` | Modal state (`useCardModal`, etc.). |
| **Sonner** | `^2.0.7` | Toast feedback. |

---

## 3. Discovered Vulnerabilities & Fix Log

### Discovered Issues (Baseline Audit)
| Issue | Location | Root Cause | Fix Plan |
|---|---|---|---|
| Route handler compilation failure | `app/api/cards/[cardId]/log/route.ts` | `params` not typed as `Promise`; route fails to return `NextResponse.json()` | Type as `Promise<{ cardId: string }>`, await params, return JSON response |
| Unhandled null `orgId` | `board/[boardId]/layout.tsx` & `page.tsx` | `orgId` can be null/undefined, violating Prisma string filter | Assert `orgId` presence; redirect to `/select-org` if missing |
| Inactive middleware | Root directory (`proxy.ts`) | Named `proxy.ts` instead of `middleware.ts` | Rename to `middleware.ts` |
| Incomplete Audit Logging | 9 of 10 Server Actions | `createAuditLogs` only wired into `createCard` | Add `createAuditLogs` to all board/list/card create/update/delete actions |
| Inverted Card Modal Activity | `components/modals/card-modal/index.tsx` | Ternary inverted: `cardAuditLogs ? Skeleton : Activity` | Invert ternary condition, pass data to `Activity` |
| Stubbed Activity Component | `components/modals/card-modal/Activity.tsx` | Stub returning `<div>Activity</div>` | Build out rich audit log feed with user avatar and relative timestamps |
| Blank Org Activity Page | `organization/[id]/activity/page.tsx` | Static heading with no queries | Fetch and display org-wide audit logs with empty state |
| Missing Confirmation Dialogs | Board, List, Card deletes | Direct execution on click | Introduce accessible `ConfirmModal` for all destructive operations |
| Hardcoded Board Limit UI | `board-list.tsx` | Hardcoded `"5 remaining"` with no real calculation | Count existing boards and render clean count and empty states |

---

## 4. Work Log & Changelog

### Session: Baseline & Planning (2026-09-27)
- Performed deep inspection of entire project structure, actions, components, models, and types.
- Generated `AGENTS.md` specifying complete architecture, conventions, and agent instructions.
- Generated `TASK.md` detailing phased P0, P1, and P2 roadmaps with verification steps.
- Generated `MEMORY.md` to ensure disciplined, steady progression without regressions.

---

## 5. Standard Verification Commands

Before declaring any task or phase complete, run:
```powershell
# 1. Typecheck entire project
npx tsc --noEmit

# 2. Linter check
npm run lint

# 3. Production build check
npm run build
```
