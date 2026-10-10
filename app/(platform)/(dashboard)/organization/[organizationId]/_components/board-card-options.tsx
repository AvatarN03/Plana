"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Pin, PinOff, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/forms/form-input";
import { FormSubmit } from "@/components/forms/form-submit";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import { deleteBoard } from "@/actions/delete-board";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface BoardCardOptionsProps {
  id: string;
  title: string;
}

export const BoardCardOptions = ({ id, title }: BoardCardOptionsProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [pinnedIds, setPinnedIds] = useLocalStorage<string[]>("plana-pinned-boards", []);

  const router = useRouter();
  const queryClient = useQueryClient();

  const isPinned = pinnedIds.includes(id);

  const { execute: executeUpdate, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board renamed to "${data.title}"`);
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setRenameOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeDelete, isLoading: isDeleting } = useAction(deleteBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" deleted`);
      // Also unpin if deleted
      setPinnedIds((prev) => prev.filter((boardId) => boardId !== id));
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      setPopoverOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const togglePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPinned) {
      setPinnedIds((prev) => prev.filter((boardId) => boardId !== id));
      toast.success("Board unpinned from sidebar");
    } else {
      setPinnedIds((prev) => [...prev, id]);
      toast.success("Board pinned to sidebar");
    }
    setPopoverOpen(false);
  };

  const onRenameSubmit = async (formData: FormData) => {
    const newTitle = formData.get("title") as string;
    if (!newTitle || newTitle === title) {
      setRenameOpen(false);
      return;
    }
    await executeUpdate({ id, title: newTitle });
  };

  const onDelete = async () => {
    await executeDelete({ id });
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="relative z-20"
      >
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPopoverOpen((prev) => !prev);
              }}
              className="h-7 w-7 p-0 rounded-sm bg-black/40 backdrop-blur-xs text-white/80 hover:text-white hover:bg-black/70 border border-white/10 transition cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            side="bottom"
            className="w-48 p-1.5 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-sm shadow-xl space-y-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--landing-muted)] font-semibold border-b border-[var(--landing-line)]">
              Board Options
            </div>

            {/* Edit / Rename option */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPopoverOpen(false);
                setRenameOpen(true);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-sm transition cursor-pointer font-medium"
            >
              <Pencil className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
              <span>Edit board name</span>
            </button>

            {/* Pin / Unpin option */}
            <button
              type="button"
              onClick={togglePin}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] rounded-sm transition cursor-pointer font-medium"
            >
              {isPinned ? (
                <>
                  <PinOff className="w-3.5 h-3.5 text-amber-500" />
                  <span>Unpin from sidebar</span>
                </>
              ) : (
                <>
                  <Pin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pin to sidebar</span>
                </>
              )}
            </button>

            {/* Delete option */}
            <ConfirmModal
              header="Delete this board?"
              description="This will permanently delete this board, all lists, and cards."
              onConfirm={onDelete}
              disabled={isDeleting}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled={isDeleting}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-500 hover:bg-red-500/10 rounded-sm transition cursor-pointer font-medium"
              >
                <Trash className="w-3.5 h-3.5" />
                <span>Delete board</span>
              </button>
            </ConfirmModal>
          </PopoverContent>
        </Popover>
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent
          className="w-full max-w-sm p-5 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader className="pb-2 border-b border-[var(--landing-line)]">
            <DialogTitle className="text-xs font-mono uppercase tracking-wider text-[var(--landing-muted)]">
              Rename Board
            </DialogTitle>
          </DialogHeader>

          <form action={onRenameSubmit} className="space-y-4 pt-2">
            <FormInput
              id="title"
              label="Board title"
              defaultValue={title}
              errors={fieldErrors}
              placeholder="Enter new board name..."
              required
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setRenameOpen(false)}
                className="h-8 text-xs rounded-sm text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
              >
                Cancel
              </Button>
              <FormSubmit classname="h-8 px-3 text-xs rounded-sm bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] font-semibold hover:brightness-110">
                Save
              </FormSubmit>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
