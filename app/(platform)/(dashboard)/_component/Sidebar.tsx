"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { fetcher } from "@/lib/fetcher";
import { Board } from "@/lib/generated/prisma/client";
import Logo from "@/components/custom/Logo";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  CreditCard,
  LayoutGrid,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormPopover } from "@/components/forms/form-popover";

const PIN_COLORS = [
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-emerald-500",
  "bg-purple-500",
  "bg-blue-500",
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { organization, isLoaded } = useOrganization();
  const [pinnedIds] = useLocalStorage<string[]>("plana-pinned-boards", []);

  const orgId = organization?.id;

  const { data: boards, isLoading: isLoadingBoards } = useQuery<Board[]>({
    queryKey: ["boards", orgId],
    queryFn: () => fetcher("/api/boards"),
    enabled: !!orgId,
  });

  const pinnedBoards = boards?.filter((b) => pinnedIds.includes(b.id)) || [];
  const displayPinned = pinnedBoards.length > 0 ? pinnedBoards : (boards?.slice(0, 5) || []);

  const routes = [
    {
      label: "Boards",
      icon: LayoutGrid,
      href: `/organization/${orgId}`,
    },
    {
      label: "Activity",
      icon: Activity,
      href: `/organization/${orgId}/activity`,
    },
    {
      label: "Team Members",
      icon: Users,
      href: `/organization/${orgId}/members`,
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/organization/${orgId}/settings`,
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: `/organization/${orgId}/billing`,
    },
  ];

  const boardCount = boards?.length ?? 0;
  const maxFreeBoards = 5;
  const percentage = Math.min(100, Math.round((boardCount / maxFreeBoards) * 100));

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-full p-4 space-y-6">
        <div className="h-10 w-32">
          <Skeleton className="h-full w-full rounded-sm" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-full rounded-sm" />
          <Skeleton className="h-8 w-full rounded-sm" />
          <Skeleton className="h-8 w-full rounded-sm" />
        </div>
      </div>
    );
  }

  return (
    <aside className="w-64 h-full bg-[var(--landing-bg)] flex flex-col justify-between py-5 px-4 select-none">
      {/* Top Branding & Main Menus */}
      <div className="space-y-6">
        {/* Brand Logo matching concept image */}
        <div className="px-2">
          <Logo />
        </div>

        {/* Primary Create Board Action above Workspace session */}
        <div className="px-2">
          <FormPopover>
            <Button
              size="sm"
              className="w-full flex items-center justify-center gap-2 h-9 bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 font-bold text-xs rounded-[6px] shadow-sm cursor-pointer transition-all hover:shadow-[0_0_16px_rgba(255,118,25,0.3)]"
            >
              <Plus className="size-4" />
              <span>Create Board</span>
            </Button>
          </FormPopover>
        </div>

        {/* Workspace Menu */}
        <div className="space-y-1">
          <div className="px-2 pb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--landing-muted)] font-semibold">
              Workspace
            </span>
          </div>
          <nav className="space-y-0.5">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  href={orgId ? route.href : "/select-org"}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-sm transition-all",
                    isActive
                      ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border-l-2 border-[var(--landing-orange)] shadow-2xs"
                      : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel)]"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-[var(--landing-orange)]" : "text-[var(--landing-muted)]")} />
                  <span className="truncate">{route.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pinned Boards Section matching concept image */}
        <div className="space-y-2">
          <div className="px-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--landing-muted)] font-semibold">
              Pinned Boards
            </span>
          </div>

          {isLoadingBoards ? (
            <div className="space-y-2 px-2">
              <Skeleton className="h-6 w-full rounded-sm" />
              <Skeleton className="h-6 w-full rounded-sm" />
            </div>
          ) : (
            <div className="space-y-1">
              {displayPinned && displayPinned.length > 0 ? (
                displayPinned.map((board, idx) => {
                  const colorClass = PIN_COLORS[idx % PIN_COLORS.length];
                  return (
                    <Link
                      key={board.id}
                      href={`/board/${board.id}`}
                      className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel)] rounded-sm transition group"
                    >
                      <span className={cn("w-2.5 h-2.5 rounded-xs shrink-0 shadow-xs", colorClass)} />
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">{board.title}</span>
                    </Link>
                  );
                })
              ) : (
                <p className="px-3 text-[11px] text-[var(--landing-muted)] font-mono italic">
                  No boards pinned yet
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Quota / Storage Progress Widget matching concept image */}
      <div className="pt-4 border-t border-[var(--landing-line)] space-y-2 px-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[var(--landing-muted)] font-medium">Free tier usage</span>
          <span className="font-mono text-[10px] text-[var(--landing-orange)] font-semibold">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-[var(--landing-panel-strong)] h-1.5 rounded-full overflow-hidden border border-[var(--landing-line)]">
          <div
            className="bg-[var(--landing-orange)] h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-[10px] font-mono text-[var(--landing-muted)]">
          Progress : {boardCount} of {maxFreeBoards} boards
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
