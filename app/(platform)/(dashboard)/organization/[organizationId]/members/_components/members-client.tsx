"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { useOrganization } from "@clerk/nextjs";
import { OrganizationProfile } from "@clerk/nextjs";
import {
  AlertCircle,
  Calendar,
  CheckSquare,
  Clock,
  Filter,
  Kanban,
  Search,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

import { useCardModal } from "@/hooks/use-card-modal";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CardAssignee, CardLabel, ChecklistItem, PRIORITY } from "@/lib/generated/prisma/client";

export interface PlanningCard {
  id: string;
  title: string;
  order: number;
  description: string | null;
  priority: PRIORITY;
  dueDate: Date | null;
  isArchived: boolean;
  listId: string;
  list: {
    id: string;
    title: string;
    board: {
      id: string;
      title: string;
      imageUrl: string;
    };
  };
  assignees: CardAssignee[];
  labels: CardLabel[];
  checklists: ChecklistItem[];
}

export interface BoardOption {
  id: string;
  title: string;
}

interface MembersClientProps {
  boards: { id: string; title: string }[];
  cards: PlanningCard[];
}

const PRIORITY_CONFIG: Record<
  PRIORITY,
  { label: string; bg: string; text: string; border: string }
> = {
  URGENT: {
    label: "Urgent",
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  HIGH: {
    label: "High",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  MEDIUM: {
    label: "Medium",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  LOW: {
    label: "Low",
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
    border: "border-zinc-500/30",
  },
};

export const MembersClient = ({ boards, cards }: MembersClientProps) => {
  const { memberships } = useOrganization({
    memberships: {
      infinite: true,
      keepPreviousData: true,
    },
  });

  const cardModal = useCardModal();

  const [activeTab, setActiveTab] = useState<"planning" | "manage">("planning");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBoardId, setSelectedBoardId] = useState<string>("ALL");
  const [selectedPriority, setSelectedPriority] = useState<string>("ALL");

  // Derive unique members from Clerk memberships merged with any historical assignees in DB
  const memberList = useMemo(() => {
    const memberMap = new Map<
      string,
      {
        id: string;
        name: string;
        image: string | null;
        role: string;
      }
    >();

    // 1. Populate from Clerk memberships if loaded
    if (memberships?.data) {
      memberships.data.forEach((mem) => {
        const u = mem.publicUserData;
        if (!u?.userId) return;
        const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ");
        memberMap.set(u.userId, {
          id: u.userId,
          name: fullName || u.identifier || "Team Member",
          image: u.imageUrl || null,
          role: mem.role === "org:admin" ? "Admin" : "Member",
        });
      });
    }

    // 2. Fallback / supplement with any assigned members found in DB cards
    cards.forEach((card) => {
      card.assignees.forEach((assignee) => {
        if (!memberMap.has(assignee.userId)) {
          memberMap.set(assignee.userId, {
            id: assignee.userId,
            name: assignee.userName,
            image: assignee.userImage || null,
            role: "Member",
          });
        }
      });
    });

    return Array.from(memberMap.values());
  }, [memberships, cards]);

  // Map each member to their assigned cards
  const memberWorkload = useMemo(() => {
    return memberList.map((member) => {
      const assignedCards = cards.filter((card) =>
        card.assignees.some((a) => a.userId === member.id)
      );

      const filteredCards = assignedCards.filter((card) => {
        if (selectedBoardId !== "ALL" && card.list.board.id !== selectedBoardId) {
          return false;
        }
        if (selectedPriority !== "ALL" && card.priority !== selectedPriority) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = card.title.toLowerCase().includes(q);
          const matchesMember = member.name.toLowerCase().includes(q);
          const matchesBoard = card.list.board.title.toLowerCase().includes(q);
          return matchesTitle || matchesMember || matchesBoard;
        }
        return true;
      });

      return {
        member,
        totalTasks: assignedCards.length,
        filteredCards,
      };
    });
  }, [memberList, cards, selectedBoardId, selectedPriority, searchQuery]);

  // Unassigned cards
  const unassignedCards = useMemo(() => {
    return cards
      .filter((card) => card.assignees.length === 0)
      .filter((card) => {
        if (selectedBoardId !== "ALL" && card.list.board.id !== selectedBoardId) {
          return false;
        }
        if (selectedPriority !== "ALL" && card.priority !== selectedPriority) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = card.title.toLowerCase().includes(q);
          const matchesBoard = card.list.board.title.toLowerCase().includes(q);
          return matchesTitle || matchesBoard;
        }
        return true;
      });
  }, [cards, selectedBoardId, selectedPriority, searchQuery]);

  // Overall workspace stats
  const totalAssignedCards = cards.filter((c) => c.assignees.length > 0).length;
  const urgentOrHighCount = cards.filter(
    (c) => c.priority === "URGENT" || c.priority === "HIGH"
  ).length;
  const dueSoonOrOverdueCount = cards.filter((c) => {
    if (!c.dueDate) return false;
    const d = new Date(c.dueDate);
    return isPast(d) || isToday(d) || isTomorrow(d);
  }).length;

  const formatDueStatus = (dateStr: Date | string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isPast(date) && !isToday(date)) {
      return { text: `Overdue (${format(date, "MMM d")})`, color: "text-red-400 bg-red-500/10 border-red-500/30" };
    }
    if (isToday(date)) {
      return { text: "Due Today", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
    }
    if (isTomorrow(date)) {
      return { text: "Due Tomorrow", color: "text-[var(--landing-orange)] bg-[var(--landing-orange)]/10 border-[var(--landing-orange)]/30" };
    }
    return { text: format(date, "MMM d"), color: "text-[var(--landing-muted)] bg-[var(--landing-panel-strong)] border-[var(--landing-line)]" };
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Mode Navigation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[var(--landing-line)]">
        <div>
          <h2 className="text-lg font-semibold text-[var(--landing-text)] flex items-center gap-2">
            <Users className="size-5 text-[var(--landing-orange)]" />
            <span>Team & Workload Planning</span>
          </h2>
          <p className="text-xs text-[var(--landing-muted)] mt-0.5">
            Plan team capacity, review workload distribution across boards, and manage member invitations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex items-center p-1 rounded-sm bg-[var(--landing-panel)] border border-[var(--landing-line)] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("planning")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer",
              activeTab === "planning"
                ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border border-[var(--landing-orange)]/60 shadow-2xs"
                : "text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
            )}
          >
            <Kanban className="size-3.5 text-[var(--landing-orange)]" />
            <span>Planning & Workload</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("manage")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer",
              activeTab === "manage"
                ? "bg-[var(--landing-panel-strong)] text-[var(--landing-text)] font-semibold border border-[var(--landing-orange)]/60 shadow-2xs"
                : "text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
            )}
          >
            <UserPlus className="size-3.5" />
            <span>Invite & Manage Roles</span>
          </button>
        </div>
      </div>

      {activeTab === "planning" ? (
        <div className="space-y-6">
          {/* Workload Metric Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--landing-muted)] flex items-center gap-1.5">
                <Users className="size-3 text-[var(--landing-orange)]" />
                Team Members
              </span>
              <p className="text-2xl font-bold font-mono text-[var(--landing-text)]">
                {memberList.length}
              </p>
              <p className="text-[11px] text-[var(--landing-muted)]">Active in workspace</p>
            </div>

            <div className="p-4 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--landing-muted)] flex items-center gap-1.5">
                <UserCheck className="size-3 text-emerald-400" />
                Assigned Tasks
              </span>
              <p className="text-2xl font-bold font-mono text-[var(--landing-text)]">
                {totalAssignedCards}
              </p>
              <p className="text-[11px] text-[var(--landing-muted)]">Across {boards.length} boards</p>
            </div>

            <div className="p-4 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--landing-muted)] flex items-center gap-1.5">
                <AlertCircle className="size-3 text-red-400" />
                High / Urgent
              </span>
              <p className="text-2xl font-bold font-mono text-red-400">
                {urgentOrHighCount}
              </p>
              <p className="text-[11px] text-[var(--landing-muted)]">Priority items</p>
            </div>

            <div className="p-4 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--landing-muted)] flex items-center gap-1.5">
                <Clock className="size-3 text-amber-400" />
                Due Soon / Overdue
              </span>
              <p className="text-2xl font-bold font-mono text-amber-400">
                {dueSoonOrOverdueCount}
              </p>
              <p className="text-[11px] text-[var(--landing-muted)]">Require attention</p>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-3.5 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--landing-muted)]" />
              <Input
                placeholder="Search by member name, task title, or board..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8.5 h-8.5 text-xs bg-[var(--landing-panel-strong)] border-[var(--landing-line)] text-[var(--landing-text)] placeholder:text-[var(--landing-muted)] rounded-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Board Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="size-3 text-[var(--landing-muted)]" />
                <select
                  value={selectedBoardId}
                  aria-label="Filter tasks by board"
                  onChange={(e) => setSelectedBoardId(e.target.value)}
                  className="h-8.5 px-2.5 text-xs bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] text-[var(--landing-text)] rounded-sm outline-hidden cursor-pointer"
                >
                  <option value="ALL">All Boards ({boards.length})</option>
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Selector */}
              <div className="flex items-center gap-1 text-xs">
                {(["ALL", "URGENT", "HIGH", "MEDIUM", "LOW"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedPriority(p)}
                    className={cn(
                      "px-2 py-1 text-[11px] font-mono rounded-sm transition-colors cursor-pointer border",
                      selectedPriority === p
                        ? "bg-[var(--landing-panel-strong)] text-[var(--landing-orange)] border-[var(--landing-orange)]/60 font-semibold"
                        : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] border-[var(--landing-line)] bg-[var(--landing-panel)]"
                    )}
                  >
                    {p === "ALL" ? "All" : p.charAt(0) + p.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Member Workload Roster */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--landing-muted)] font-semibold">
                Member Capacity & Assigned Workload
              </span>
              <span className="text-xs font-mono text-[var(--landing-muted)]">
                {memberWorkload.length} Members Listed
              </span>
            </div>

            {memberWorkload.length === 0 ? (
              <div className="p-8 text-center rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)]">
                <Users className="size-8 mx-auto text-[var(--landing-muted)]/50 mb-2" />
                <p className="text-sm font-semibold text-[var(--landing-text)]">No members found</p>
                <p className="text-xs text-[var(--landing-muted)] mt-1">
                  Invite teammates from the &quot;Invite & Manage Roles&quot; tab to start assigning tasks.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {memberWorkload.map(({ member, totalTasks, filteredCards }) => {
                  const isAvailable = totalTasks === 0;
                  const isHeavyLoad = totalTasks >= 5;

                  return (
                    <div
                      key={member.id}
                      className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 space-y-3 shadow-2xs"
                    >
                      {/* Member Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--landing-line)]">
                        <div className="flex items-center gap-3">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={36}
                              height={36}
                              className="w-9 h-9 rounded-full object-cover border border-[var(--landing-line)]"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30 text-[var(--landing-orange)] font-bold text-xs flex items-center justify-center">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-[var(--landing-text)]">
                                {member.name}
                              </h3>
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] text-[var(--landing-muted)]">
                                {member.role}
                              </span>
                            </div>
                            <p className="text-[11px] font-mono text-[var(--landing-muted)]">
                              ID: {member.id.slice(0, 12)}...
                            </p>
                          </div>
                        </div>

                        {/* Capacity Status Pill */}
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {isAvailable ? (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                              Available for Tasks
                            </span>
                          ) : isHeavyLoad ? (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-amber-500/10 border border-amber-500/30 text-amber-400">
                              High Workload ({totalTasks} tasks)
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] text-[var(--landing-text)]">
                              {totalTasks} Active {totalTasks === 1 ? "Task" : "Tasks"}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Member Assigned Task Cards */}
                      {filteredCards.length === 0 ? (
                        <div className="py-4 text-center text-xs text-[var(--landing-muted)] bg-[var(--landing-panel-strong)]/40 rounded-sm border border-[var(--landing-line)]/50">
                          {totalTasks === 0
                            ? "No tasks currently assigned to this member. Capacity is fully open."
                            : "No tasks matching the selected filters for this member."}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                          {filteredCards.map((card) => {
                            const pConfig = PRIORITY_CONFIG[card.priority];
                            const dueStatus = formatDueStatus(card.dueDate);
                            const completedChecklists = card.checklists.filter(
                              (c) => c.isCompleted
                            ).length;

                            return (
                              <div
                                key={card.id}
                                onClick={() => cardModal.onOpen(card.id)}
                                className="group p-3 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel-strong)]/60 hover:bg-[var(--landing-panel-strong)] hover:border-[var(--landing-orange)]/60 transition-all cursor-pointer flex flex-col justify-between gap-2.5 shadow-2xs"
                              >
                                <div className="space-y-1.5">
                                  {/* Top Badges: Priority + Board */}
                                  <div className="flex items-center justify-between gap-2">
                                    <span
                                      className={cn(
                                        "text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded-sm border",
                                        pConfig.bg,
                                        pConfig.text,
                                        pConfig.border
                                      )}
                                    >
                                      {pConfig.label}
                                    </span>

                                    <Link
                                      href={`/board/${card.list.board.id}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-[10px] font-mono text-[var(--landing-muted)] hover:text-[var(--landing-orange)] truncate max-w-[120px] transition-colors"
                                      title={card.list.board.title}
                                    >
                                      {card.list.board.title}
                                    </Link>
                                  </div>

                                  {/* Task Title */}
                                  <h4 className="text-xs font-medium text-[var(--landing-text)] line-clamp-2 group-hover:text-[var(--landing-orange)] transition-colors">
                                    {card.title}
                                  </h4>
                                </div>

                                {/* Bottom Metadata: List, Due Date, Checklists */}
                                <div className="pt-2 border-t border-[var(--landing-line)]/60 flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)]">
                                  <span className="truncate max-w-[100px]">
                                    List: {card.list.title}
                                  </span>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {card.checklists.length > 0 && (
                                      <span className="flex items-center gap-1">
                                        <CheckSquare className="size-3" />
                                        <span>
                                          {completedChecklists}/{card.checklists.length}
                                        </span>
                                      </span>
                                    )}

                                    {dueStatus && (
                                      <span
                                        className={cn(
                                          "flex items-center gap-1 px-1.5 py-0.5 rounded-sm border",
                                          dueStatus.color
                                        )}
                                      >
                                        <Calendar className="size-2.5" />
                                        <span>{dueStatus.text}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Unassigned Backlog Section */}
            {unassignedCards.length > 0 && (
              <div className="mt-8 rounded-sm border border-dashed border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                    <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--landing-text)]">
                      Unassigned Tasks ({unassignedCards.length})
                    </h3>
                  </div>
                  <span className="text-[11px] text-[var(--landing-muted)]">
                    Click any task to assign a team member
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {unassignedCards.map((card) => {
                    const pConfig = PRIORITY_CONFIG[card.priority];
                    const dueStatus = formatDueStatus(card.dueDate);

                    return (
                      <div
                        key={card.id}
                        onClick={() => cardModal.onOpen(card.id)}
                        className="group p-3 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel-strong)]/40 hover:bg-[var(--landing-panel-strong)] hover:border-[var(--landing-orange)]/60 transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              "text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded-sm border",
                              pConfig.bg,
                              pConfig.text,
                              pConfig.border
                            )}
                          >
                            {pConfig.label}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--landing-muted)] truncate">
                            {card.list.board.title}
                          </span>
                        </div>
                        <h4 className="text-xs font-medium text-[var(--landing-text)] group-hover:text-[var(--landing-orange)] transition-colors">
                          {card.title}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)] pt-1.5 border-t border-[var(--landing-line)]/50">
                          <span>{card.list.title}</span>
                          {dueStatus && (
                            <span className={cn("px-1.5 py-0.5 rounded-sm border", dueStatus.color)}>
                              {dueStatus.text}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Manage Members & Invitations Tab */
        <div className="space-y-4">
          <div className="p-4 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] space-y-1">
            <h3 className="text-sm font-semibold text-[var(--landing-text)]">
              Workspace Access & Role Management
            </h3>
            <p className="text-xs text-[var(--landing-muted)]">
              Send email invitations to new team members, grant or revoke Administrator permissions, and audit active memberships.
            </p>
          </div>

          <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] overflow-hidden shadow-2xs">
            <OrganizationProfile
              appearance={{
                variables: {
                  colorPrimary: "#ff7619",
                  colorText: "var(--landing-text)",
                  colorTextSecondary: "var(--landing-muted)",
                  colorBackground: "var(--landing-panel)",
                  colorInputBackground: "var(--landing-panel-strong)",
                  colorInputText: "var(--landing-text)",
                },
                elements: {
                  rootBox: {
                    boxShadow: "none",
                    width: "100%",
                  },
                  cardBox: {
                    boxShadow: "none",
                    width: "100%",
                  },
                  card: "!bg-[var(--landing-panel)] !border-none !shadow-none !rounded-sm w-full",
                  navbar: "!border-b !border-[var(--landing-line)]",
                  navbarButton: "!text-[var(--landing-muted)] hover:!text-[var(--landing-text)]",
                  navbarButtonActive: "!text-[var(--landing-orange)]",
                  headerTitle: "!text-[var(--landing-text)]",
                  headerSubtitle: "!text-[var(--landing-muted)]",
                  profileSectionTitleText: "!text-[var(--landing-text)]",
                  profileSectionSubtitleText: "!text-[var(--landing-muted)]",
                  formFieldLabel: "!text-[var(--landing-text)]",
                  formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-sm !text-[var(--landing-text)]",
                  formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-sm hover:!brightness-110",
                  formButtonReset: "!border-[var(--landing-line)] !text-[var(--landing-text)] !rounded-sm hover:!bg-[var(--landing-panel-strong)]",
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
