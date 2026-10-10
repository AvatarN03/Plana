import { FormPopover } from "@/components/forms/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BoardCardOptions } from "./board-card-options";

const MAX_FREE_BOARDS = 5;

export const BoardList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    include: {
      lists: {
        select: {
          _count: {
            select: { cards: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const remaining = Math.max(0, MAX_FREE_BOARDS - boards.length);

  return (
    <div className="space-y-6 pt-4">
      {/* Full-Width Boards Grid matching concept mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {boards.map((board) => {
          const listCount = board.lists.length;
          const cardCount = board.lists.reduce((acc, list) => acc + list._count.cards, 0);

          return (
            <Link
              key={board.id}
              href={`/board/${board.id}`}
              className="group relative aspect-[16/10] rounded-sm overflow-hidden border border-[var(--landing-line)] hover:border-[var(--landing-orange)] shadow-2xs transition-all flex flex-col justify-between p-4"
            >
              {/* Background Cover Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${board.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30 group-hover:from-black/95 transition-colors" />

              {/* Card Top Row: 3-dot options menu with stopped propagation */}
              <div className="relative z-10 flex items-center justify-end">
                <BoardCardOptions id={board.id} title={board.title} />
              </div>

              {/* Card Bottom Content: Title, Task Count chip, and Category tags */}
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-white font-semibold text-sm line-clamp-1 drop-shadow-xs">
                    {board.title}
                  </h3>
                  <span className="shrink-0 px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-xs text-[11px] font-mono text-white/90 border border-white/15">
                    {cardCount} / {Math.max(cardCount, listCount * 4)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-sm bg-white/10 backdrop-blur-xs text-[10px] font-medium text-white/85 border border-white/10">
                    {board.title.slice(0, 14)}
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-white/10 backdrop-blur-xs text-[10px] font-medium text-white/70 border border-white/10">
                    {listCount} {listCount === 1 ? "list" : "lists"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Dashed Create Board Card matching concept mockup */}
        <FormPopover align="center" side="right">
          <div
            role="button"
            className="aspect-[16/10] rounded-sm flex flex-col gap-y-2 bg-[var(--landing-panel)] hover:bg-[var(--landing-panel-strong)] border border-dashed border-[var(--landing-line)] hover:border-[var(--landing-orange)] w-full h-full relative justify-center transition items-center cursor-pointer p-6 text-center group shadow-2xs"
          >
            <div className="w-9 h-9 rounded-sm bg-[var(--landing-panel-strong)] group-hover:bg-[var(--landing-orange-soft)] border border-[var(--landing-line)] group-hover:border-[var(--landing-orange)] flex items-center justify-center transition-colors">
              <Plus className="w-5 h-5 text-[var(--landing-orange)]" />
            </div>
            <div className="space-y-0.5 pt-1">
              <p className="text-xs font-semibold text-[var(--landing-text)]">Create new board</p>
              <p className="text-[10px] text-[var(--landing-muted)] font-mono">{remaining} slots available</p>
            </div>
            <Hint
              sideOffSet={40}
              description={`Workspaces include up to ${MAX_FREE_BOARDS} active boards.`}
            >
              <HelpCircle className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 text-[var(--landing-muted)] hover:text-[var(--landing-text)] transition" />
            </Hint>
          </div>
        </FormPopover>
      </div>

      {boards.length === 0 && (
        <div className="p-8 text-center rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] mt-6">
          <p className="text-sm font-semibold text-[var(--landing-text)]">No boards created yet</p>
          <p className="text-xs text-[var(--landing-muted)] mt-1 max-w-sm mx-auto">
            Click &quot;Create new board&quot; above to launch your project workflow.
          </p>
        </div>
      )}
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        <Skeleton className="aspect-[16/10] w-full rounded-sm border border-[var(--landing-line)]" />
        <Skeleton className="aspect-[16/10] w-full rounded-sm border border-[var(--landing-line)]" />
        <Skeleton className="aspect-[16/10] w-full rounded-sm border border-[var(--landing-line)]" />
      </div>
    </div>
  );
};
