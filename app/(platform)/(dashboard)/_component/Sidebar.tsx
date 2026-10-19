"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Board } from "@/lib/generated/prisma/client";
import Logo from "@/components/custom/Logo";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  LayoutGrid,
  Pin,
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

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  const { organization, isLoaded } = useOrganization();

  // Clean up legacy localStorage item if previously stored
  useEffect(() => {
    try {
      localStorage.removeItem("plana-pinned-boards");
    } catch {
      // no-op
    }
  }, []);

  const orgId = organization?.id;

  const { data: boards, isLoading: isLoadingBoards } = useQuery<Board[]>({
    queryKey: ["boards", orgId],
    queryFn: () => fetcher("/api/boards"),
    enabled: !!orgId,
  });

  // Only display boards that are actually marked as isPinned in the database
  const pinnedBoards = boards?.filter((b) => b.isPinned) || [];

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
  ];

  const boardCount = boards?.length ?? 0;
  const maxFreeBoards = 5;
  const percentage = Math.min(100, Math.round((boardCount / maxFreeBoards) * 100));

  if (!isLoaded) {
    return (
      <div className="flex flex-col h-full p-4 space-y-6">
        <div className="h-10 w-32">
          <Skeleton className="h-full w-full rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-9.5 w-full rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)]" />
          <Skeleton className="h-9.5 w-full rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)]" />
          <Skeleton className="h-9.5 w-full rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)]" />
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "w-full h-full bg-[var(--landing-bg)] border-r border-[var(--landing-line)] flex flex-col justify-between py-5 px-4 select-none",
        className
      )}
    >
      {/* Top Branding & Main Menus */}
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="px-2">
          <Logo showTextOnMobile={true} />
        </div>

        {/* Primary Create Board Action */}
        <div className="px-1">
          <FormPopover>
            <Button
              size="sm"
              className="w-full flex items-center justify-center gap-2 h-9.5 bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90 font-semibold text-xs rounded-sm shadow-sm cursor-pointer transition-all hover:shadow-[0_0_16px_rgba(255,118,25,0.3)]"
            >
              <Plus className="size-4" />
              <span>Create Board</span>
            </Button>
          </FormPopover>
        </div>

        {/* Workspace Menu */}
        <div className="space-y-1.5">
          <div className="px-2 pb-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--landing-muted)] font-semibold">
              Workspace
            </span>
          </div>
          <nav className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.href;
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  href={orgId ? route.href : "/select-org"}
                  className={cn(
                    "flex items-center gap-3 px-3 h-9.5 text-[13px] font-medium rounded-sm transition-all group",
                    isActive
                      ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border border-[var(--landing-orange)]/60 shadow-xs shadow-[var(--landing-orange)]/15"
                      : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel)] border border-transparent"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive
                        ? "text-[var(--landing-orange)] drop-shadow-[0_0_8px_rgba(255,118,25,0.4)]"
                        : "text-[var(--landing-muted)] group-hover:text-[var(--landing-text)]"
                    )}
                  />
                  <span className="truncate">{route.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Pinned Boards Section */}
        <div className="space-y-2">
          <div className="px-2 flex items-center justify-between pb-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-[var(--landing-muted)] font-semibold">
              Pinned Boards
            </span>
            {pinnedBoards.length > 0 && (
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] text-[var(--landing-text)]">
                {pinnedBoards.length}
              </span>
            )}
          </div>

          {isLoadingBoards ? (
            <div className="space-y-2 px-1">
              <Skeleton className="h-8 w-full rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)]" />
              <Skeleton className="h-8 w-full rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)]" />
            </div>
          ) : (
            <div className="space-y-1">
              {pinnedBoards.length > 0 ? (
                pinnedBoards.map((board, idx) => {
                  const colorClass = PIN_COLORS[idx % PIN_COLORS.length];
                  const isBoardActive = pathname === `/board/${board.id}`;

                  return (
                    <Link
                      key={board.id}
                      href={`/board/${board.id}`}
                      className={cn(
                        "flex items-center gap-2.5 px-3 h-8.5 text-xs font-medium rounded-sm transition-all group",
                        isBoardActive
                          ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border border-[var(--landing-orange)]/60 shadow-xs shadow-[var(--landing-orange)]/15"
                          : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel)] border border-transparent"
                      )}
                    >
                      <span className={cn("w-2 h-2 rounded-full shrink-0 shadow-xs", colorClass)} />
                      <span className="truncate group-hover:translate-x-0.5 transition-transform">
                        {board.title}
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="px-3 py-3.5 rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)] text-center space-y-1.5">
                  <Pin className="w-3.5 h-3.5 text-[var(--landing-muted)]/70 mx-auto" />
                  <p className="text-xs font-medium text-[var(--landing-text)]">No pinned boards</p>
                  <p className="text-[11px] text-[var(--landing-muted)] font-mono">
                    Pin boards from board options
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Board Usage Progress Widget */}
      <div className="pt-4 border-t border-[var(--landing-line)] space-y-2.5 px-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--landing-text)] font-medium">Workspace Boards</span>
          <span className="font-mono text-[11px] text-[var(--landing-orange)] font-semibold px-2 py-0.5 rounded-sm bg-[var(--landing-orange-soft)]/60 border border-[var(--landing-orange)]/30">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-[var(--landing-panel)] h-2 rounded-full overflow-hidden border border-[var(--landing-line)] p-[1px]">
          <div
            className="bg-gradient-to-r from-[var(--landing-orange)] to-amber-500 h-full rounded-full transition-all duration-300 shadow-xs shadow-amber-500/30"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-[11px] font-mono text-[var(--landing-muted)]">
          Progress: {boardCount} of {maxFreeBoards} boards
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
