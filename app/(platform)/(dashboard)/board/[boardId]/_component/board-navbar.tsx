import { Board } from "@/lib/generated/prisma/client"
import { BoardTitleForm } from "./board-title-form"
import { BoardOptions } from "./board-options"
import { BoardFilter } from "./board-filter"

interface BoardNavbarProps {
  data: Board
}


export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="fixed inset-0 h-14 z-40 bg-black/50 top-14 flex items-center w-full px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <div className="ml-auto flex items-center gap-x-2">
        <BoardFilter />
        <BoardOptions id={data.id} />
      </div>
    </div>
  )
}
