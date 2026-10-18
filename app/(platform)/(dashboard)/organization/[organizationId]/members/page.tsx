import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { Info } from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import { MembersClient, PlanningCard, BoardOption } from "./_components/members-client";

export default async function MembersPage() {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const [boards, rawCards] = await Promise.all([
    db.board.findMany({
      where: {
        orgId,
      },
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: "asc",
      },
    }),
    db.card.findMany({
      where: {
        list: {
          board: {
            orgId,
          },
        },
        isArchived: false,
      },
      include: {
        assignees: true,
        labels: true,
        checklists: {
          orderBy: {
            order: "asc",
          },
        },
        list: {
          include: {
            board: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: [
        { dueDate: "asc" },
        { priority: "desc" },
        { order: "asc" },
      ],
    }),
  ]);

  const cards: PlanningCard[] = rawCards.map((card) => ({
    id: card.id,
    title: card.title,
    order: card.order,
    description: card.description,
    priority: card.priority,
    dueDate: card.dueDate,
    isArchived: card.isArchived,
    listId: card.listId,
    list: {
      id: card.list.id,
      title: card.list.title,
      board: {
        id: card.list.board.id,
        title: card.list.board.title,
      },
    },
    assignees: card.assignees,
    labels: card.labels,
    checklists: card.checklists,
  }));

  const boardOptions: BoardOption[] = boards.map((b) => ({
    id: b.id,
    title: b.title,
  }));

  return (
    <div className="w-full pb-16 space-y-6">
      <Info />
      <Separator className="bg-[var(--landing-line)]" />
      <MembersClient boards={boardOptions} cards={cards} />
    </div>
  );
}
