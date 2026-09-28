# AGENTS.md — Plana 2.0 Architectural Reference

## 1. Product Overview

Plana is a **Kanban project management application** for teams and individuals.

**Hierarchy**: `Organization → Board → List → Card`

**Philosophy**: Simple project management. Clear workflows. Fast execution.

**Do NOT add**: AI assistants, CRM, chat, document editors, full calendars, social features.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16.1.4 (App Router, Turbopack) | `proxy.ts` for edge middleware (not `middleware.ts`) |
| Language | TypeScript 5 | Strict mode |
| UI | React 19 + Tailwind CSS v4 | `@tailwindcss/postcss` |
| Auth | Clerk v6 | Multi-tenant orgs, `clerkMiddleware` |
| Database | PostgreSQL + Prisma 7 | `@prisma/adapter-pg`, custom output path |
| State | Zustand 5 | Modal state, board filters |
| Data Fetching | TanStack React Query 5 | Client-side card/audit-log queries |
| DnD | `@hello-pangea/dnd` | Horizontal lists, vertical cards, cross-list moves |
| Toasts | Sonner | `toast.success()`, `toast.error()` |
| Dates | date-fns | `format`, `isPast`, `isToday` |
| Validation | Zod | All server action inputs |
| UI Primitives | Radix UI (via shadcn/ui) | Dialog, AlertDialog, Popover, Avatar, etc. |

---

## 3. Project Structure

```
plana/
├── app/
│   ├── (marketing)/          # High-converting SaaS landing page (hero, mockup, bento, comparison, CTA, footer)
│   ├── (platform)/
│   │   ├── (clerk)/          # /sign-in, /sign-up, /select-org
│   │   └── (dashboard)/
│   │       ├── board/[boardId]/
│   │       │   ├── layout.tsx        # Board background, navbar
│   │       │   ├── page.tsx          # Fetches lists+cards, renders ListContainer
│   │       │   └── _component/
│   │       │       ├── board-navbar.tsx     # Title form + filter bar + options
│   │       │       ├── board-filter.tsx     # Search input + filter popover
│   │       │       ├── board-options.tsx    # Delete board (with ConfirmModal)
│   │       │       ├── board-title-form.tsx # Inline board title editing
│   │       │       ├── list-container.tsx   # DragDropContext, filtering logic
│   │       │       ├── list-item.tsx        # Individual list column
│   │       │       ├── list-form.tsx        # "Add a list" form
│   │       │       ├── list-header.tsx      # List title editing
│   │       │       ├── list-options.tsx     # Copy/delete list (with ConfirmModal)
│   │       │       ├── card-form.tsx        # "Add a card" form
│   │       │       └── card-item.tsx        # Card preview with priority/due/desc badges
│   │       └── organization/[organizationId]/
│   │           ├── page.tsx          # Org dashboard with board list
│   │           ├── activity/         # Org-wide activity timeline
│   │           ├── billing/          # Billing page
│   │           └── settings/         # Org settings (Clerk)
│   └── api/
│       └── cards/[cardId]/
│           ├── route.ts              # GET card with list name
│           └── log/route.ts          # GET audit logs for card
├── actions/                          # Server actions (3-file pattern each)
│   ├── create-board/
│   ├── update-board/
│   ├── delete-board/
│   ├── create-list/
│   ├── update-list/
│   ├── delete-list/
│   ├── copy-list/
│   ├── create-card/
│   ├── update-card/
│   ├── delete-card/
│   ├── copy-card/
│   ├── update-list-order/
│   └── update-card-order/
├── components/
│   ├── modals/
│   │   ├── card-modal/
│   │   │   ├── index.tsx             # Card modal shell (queries + layout)
│   │   │   ├── Header.tsx            # Inline title editing
│   │   │   ├── Description.tsx       # Click-to-edit description
│   │   │   ├── Actions.tsx           # Copy/delete card (with ConfirmModal)
│   │   │   ├── Activity.tsx          # Audit log feed
│   │   │   └── card-meta.tsx         # Priority selector + due date picker
│   │   └── confirm-modal.tsx         # Reusable destructive action dialog
│   ├── forms/
│   │   ├── form-input.tsx
│   │   ├── form-textarea.tsx
│   │   ├── form-picker.tsx           # Unsplash image picker
│   │   ├── form-popover.tsx          # Board creation with template selector
│   │   ├── form-submit.tsx
│   │   └── form-errors.tsx
│   ├── activity-item.tsx             # Reusable audit log entry
│   ├── providers/                    # QueryProvider, ModalProvider
│   └── ui/                           # shadcn/ui primitives
├── hooks/
│   ├── use-action.ts                 # Safe action executor
│   ├── use-card-modal.ts             # Zustand: card modal open/close
│   ├── use-board-filters.ts          # Zustand: search, priority, due filters
│   └── use-mobile.ts                 # Mobile breakpoint detection
├── lib/
│   ├── db.ts                         # Prisma client singleton
│   ├── fetcher.ts                    # Generic fetch wrapper
│   ├── create-safe-actions.ts        # Action wrapper with Zod validation
│   ├── create-audit-logs.ts          # Audit log creation helper
│   ├── unsplash.ts                   # Unsplash API client
│   ├── utils.ts                      # cn() utility
│   └── generated/prisma/             # Generated Prisma client (DO NOT EDIT)
├── prisma/
│   └── schema.prisma                 # Data model
├── proxy.ts                          # Edge middleware (Clerk auth + routing)
├── types.ts                          # CardWithList type
├── TASK.md                           # Phased task tracker
└── MEMORY.md                         # Architectural decisions & session log
```

---

## 4. Key Conventions

### 4.1 Server Actions (3-File Pattern)

Every mutation in `actions/<action-name>/`:

| File | Purpose |
|---|---|
| `schema.ts` | Zod schema defining input validation |
| `type.ts` | `InputType = z.infer<typeof Schema>`, `ReturnType = ActionState<InputType, OutputModel>` |
| `index.ts` | `"use server"` handler wrapped in `createSafeAction(Schema, handler)` |

**Rules**:
- Always call `createAuditLogs()` after successful mutations.
- Always validate `orgId` from `await auth()`. If null, return `{ error: "Unauthorized" }`.
- Always `revalidatePath()` after mutations.
- Client components consume actions via `useAction(actionFn, { onSuccess, onError })`.

### 4.2 Route Parameters (Next.js 16)

```ts
// Layout / Page
export default async function Page({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const { boardId } = await params;
  // ...
}

// Route Handler
export async function GET(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const { cardId } = await params;
  // ...
}
```

### 4.3 Multi-Tenant Isolation

Every database query MUST include `orgId` filtering:
```ts
const { orgId } = await auth();
if (!orgId) redirect("/select-org");

await db.board.findMany({ where: { orgId } });
```

### 4.4 Prisma Client Imports

```ts
// Models and types
import { Board, Card, List, AuditLog } from "@/lib/generated/prisma/client";

// Enums
import { ACTION, ENTITY_TYPE, PRIORITY } from "@/lib/generated/prisma/enums";

// Database instance
import db from "@/lib/db";
```

---

## 5. Data Model

### Core Entities

```
Board (id, title, orgId, imageId, imageUrl, imageUrlFull)
  └── List (id, title, order, boardId)
       └── Card (id, title, description?, order, priority, dueDate?, listId)

AuditLog (id, orgId, action, entityId, entityType, entityTitle, userId, userImage, userName)
```

### PRIORITY Enum
`LOW` | `MEDIUM` (default) | `HIGH` | `URGENT`

### Card Fields Added in 2.0
- `priority PRIORITY @default(MEDIUM)` — Task priority level
- `dueDate DateTime?` — Optional due date

---

## 6. Component Patterns

### Card Modal (`components/modals/card-modal/`)
- **index.tsx**: Shell with two React Query calls (`card` and `card-log`), renders Header → CardMeta → Description → Activity + Actions sidebar
- **card-meta.tsx**: Priority popover (4 levels with color dots) and due date picker (native date input in popover, with "Remove" option)
- **Activity.tsx**: Maps `AuditLog[]` to `ActivityItem` components

### Board Filtering (`list-container.tsx`)
- `useBoardFilters()` Zustand store provides `searchQuery`, `priorityFilter`, `dueFilter`
- `displayData = useMemo(...)` filters `orderedData` by title match, priority, and due date status
- DnD operates on `orderedData` (unfiltered) to preserve order integrity; rendering uses `displayData`

### ConfirmModal (`components/modals/confirm-modal.tsx`)
- Wraps children as `AlertDialogTrigger`
- Props: `onConfirm`, `header`, `description`, `confirmText`, `variant`
- Used for: delete board, delete list, delete card

### Board Templates (`form-popover.tsx` + `create-board/index.ts`)
- Template options: `BLANK`, `SOFTWARE` (5 lists), `PERSONAL` (4 lists)
- Server action creates board then seeds lists via `db.list.createMany()`

---

## 7. Before Making Changes

1. Read this file (`AGENTS.md`).
2. Check `TASK.md` for current phase and progress.
3. Inspect the relevant existing implementation.
4. Understand the data flow (server action → Prisma → revalidate → UI).
5. Make the smallest sensible change.
6. Reuse existing utilities and patterns.
7. Maintain TypeScript type safety.
8. Run `npx tsc --noEmit` and `npm run lint` after each task.
9. Do not leave dead code, unused imports, or `console.log` statements.
10. Do not modify unrelated parts of the application.

---

## 8. Verification Commands

```powershell
npx tsc --noEmit      # TypeScript: must be 0 errors
npm run lint           # ESLint: must be 0 errors, 0 warnings
npm run build          # Production build: must succeed
npx prisma generate    # After schema changes
npx prisma db push     # Apply schema to database (when DB available)
```
