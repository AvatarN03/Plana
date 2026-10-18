"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ImageIcon, MoreHorizontal, Pin, PinOff, Trash, X } from "lucide-react";

import { deleteBoard } from "@/actions/delete-board";
import { updateBoard } from "@/actions/update-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Board } from "@/lib/generated/prisma/client";
import { BoardCoverModal } from "./board-cover-modal";

interface BoardOptionsProps {
  id?: string;
  data: Board;
}

export const BoardOptions = ({ data }: BoardOptionsProps) => {
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isPinned = data.isPinned;

  const { execute: executeUpdatePin } = useAction(updateBoard, {
    onSuccess: (updated) => {
      toast.success(updated.isPinned ? "Board pinned to sidebar" : "Board unpinned from sidebar");
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error("Failed to delete board", { description: error });
    },
  });

  const onTogglePin = () => {
    executeUpdatePin({ id: data.id, isPinned: !isPinned });
  };

  const onDelete = () => {
    execute({ id: data.id });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="transparent"
            className="cursor-pointer hover:bg-white/10 rounded-md h-9 w-9 p-0 flex items-center justify-center transition border border-transparent hover:border-white/15"
          >
            <MoreHorizontal className="w-4 h-4 text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 p-3.5 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-lg shadow-2xl backdrop-blur-md"
          side="bottom"
          align="end"
          sideOffset={8}
          collisionPadding={16}
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-[var(--landing-line)]">
            <span className="text-sm font-semibold text-[var(--landing-text)]">
              Board actions
            </span>
            <PopoverClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-[var(--landing-muted)] hover:text-[var(--landing-text)] rounded-md cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </PopoverClose>
          </div>

          <div className="py-2.5 space-y-1.5">
            {/* Pin / Unpin Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePin}
              className="w-full justify-start h-9 px-3 text-xs sm:text-sm font-medium text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-md cursor-pointer"
            >
              {isPinned ? (
                <>
                  <PinOff className="w-4 h-4 mr-2.5 text-[var(--landing-orange)]" />
                  Unpin from sidebar
                </>
              ) : (
                <>
                  <Pin className="w-4 h-4 mr-2.5 text-[var(--landing-muted)]" />
                  Pin to sidebar
                </>
              )}
            </Button>

            {/* Change Cover Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCoverModalOpen(true)}
              className="w-full justify-start h-9 px-3 text-xs sm:text-sm font-medium text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-md cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 mr-2.5 text-blue-400" />
              Change cover image
            </Button>

            {/* Delete Board Destructive */}
            <div className="pt-2 mt-1 border-t border-[var(--landing-line)]">
              <ConfirmModal
                header="Delete this board?"
                description="This will permanently delete the board, along with all lists and cards inside it."
                onConfirm={onDelete}
                disabled={isLoading}
              >
                <Button
                  variant="destructive"
                  disabled={isLoading}
                  size="sm"
                  className="w-full justify-start h-9 px-3 text-xs sm:text-sm font-medium rounded-md cursor-pointer"
                >
                  <Trash className="w-4 h-4 mr-2.5" />
                  Delete board
                </Button>
              </ConfirmModal>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Cover Image Dialog */}
      <BoardCoverModal
        boardId={data.id}
        currentImageId={data.imageId}
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
      />
    </>
  );
};
