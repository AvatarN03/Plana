import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { ListContainer, ListWithCards } from "./_component/list-container";

interface BoardIdProps {
  params: Promise<{ boardId: string }>
}

const BoardId = async ({
  params
}: BoardIdProps) => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const resolvedParams = await params;
  const boardId = resolvedParams.boardId;

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId
      }
    },
    include: {
      cards: {
        orderBy: {
          order: "asc"
        }
      }
    },
    orderBy: {
      order: "asc"
    }
  })

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId} data={lists as ListWithCards[]} />
    </div>
  )
}

export default BoardId