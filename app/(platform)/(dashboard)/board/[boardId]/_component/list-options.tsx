"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { Copy, MoreHorizontal, Plus, Trash2, X } from "lucide-react";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@/lib/generated/prisma/client";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const { execute: executeDelete, isLoading: isDeleting } = useAction(deleteList, {
    onSuccess: (deleted) => {
      toast.success(`List "${deleted.title}" deleted`);
      closeRef?.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy, isLoading: isCopying } = useAction(copyList, {
    onSuccess: (copied) => {
      toast.success(`List "${copied.title}" copied`);
      closeRef?.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = () => {
    executeCopy({ id: data.id, boardId: data.boardId });
  };

  const onDelete = () => {
    executeDelete({ id: data.id, boardId: data.boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 flex items-center justify-center cursor-pointer text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-md border border-transparent hover:border-[var(--landing-line)] transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={6}
        collisionPadding={12}
        className="w-56 p-2.5 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-lg shadow-2xl backdrop-blur-md space-y-1.5"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[var(--landing-line)]">
          <span className="text-xs font-semibold text-[var(--landing-text)] font-mono uppercase tracking-wider">
            List actions
          </span>
          <PopoverClose asChild>
            <Button
              ref={closeRef}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </PopoverClose>
        </div>

        <div className="space-y-1 pt-1">
          <Button
            onClick={() => {
              onAddCard();
              closeRef?.current?.click();
            }}
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8 px-2.5 text-xs sm:text-sm font-medium text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-md cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
            Add card...
          </Button>

          <Button
            onClick={onCopy}
            disabled={isCopying}
            variant="ghost"
            size="sm"
            className="w-full justify-start h-8 px-2.5 text-xs sm:text-sm font-medium text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-md cursor-pointer flex items-center gap-2"
          >
            <Copy className="w-3.5 h-3.5 text-blue-400" />
            Copy list...
          </Button>

          <Separator className="my-1.5 bg-[var(--landing-line)]" />

          <ConfirmModal
            header="Delete this list?"
            description="This will permanently delete this list and all cards inside it."
            onConfirm={onDelete}
            disabled={isDeleting}
          >
            <Button
              variant="ghost"
              size="sm"
              disabled={isDeleting}
              className="w-full justify-start h-8 px-2.5 text-xs sm:text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md cursor-pointer flex items-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete list
            </Button>
          </ConfirmModal>
        </div>
      </PopoverContent>
    </Popover>
  );
};
