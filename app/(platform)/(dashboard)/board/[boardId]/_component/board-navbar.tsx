import { Board } from "@/lib/generated/prisma/client"
import { BoardTitleForm } from "./board-title-form"
import { BoardOptions } from "./board-options"
import { BoardFilter } from "./board-filter"

interface BoardNavbarProps {
  data: Board
}


export const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="fixed inset-x-0 h-14 z-40 bg-black/60 backdrop-blur-md top-16 flex items-center w-full px-6 gap-x-4 text-white border-b border-white/10 shadow-sm">
      <BoardTitleForm data={data} />
      <div className="ml-auto flex items-center gap-x-2">
        <BoardFilter />
        <BoardOptions data={data} />
      </div>
    </div>
  );
};
