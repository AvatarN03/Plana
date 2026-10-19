
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckSquare, Plus, Trash2, X } from "lucide-react";

import { ChecklistItem } from "@/lib/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createChecklistItem } from "@/actions/create-checklist-item";
import { updateChecklistItem } from "@/actions/update-checklist-item";
import { deleteChecklistItem } from "@/actions/delete-checklist-item";
import { cn } from "@/lib/utils";

interface ChecklistProps {
  cardId: string;
  items?: ChecklistItem[];
}

export const Checklist = ({ cardId, items = [] }: ChecklistProps) => {
  const params = useParams();
  const boardId = params.boardId as string;
  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const refreshCard = () => {
    queryClient.invalidateQueries({ queryKey: ["card", cardId] });
    queryClient.invalidateQueries({ queryKey: ["card-log", cardId] });
  };

  const { execute: executeCreate, isLoading: isCreating } = useAction(createChecklistItem, {
    onSuccess: () => {
      toast.success("Checklist item added");
      setTitle("");
      setIsAdding(false);
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const { execute: executeUpdate } = useAction(updateChecklistItem, {
    onSuccess: () => {
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const { execute: executeDelete } = useAction(deleteChecklistItem, {
    onSuccess: () => {
      toast.success("Item removed");
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    executeCreate({ title: title.trim(), cardId, boardId });
  };

  const onToggle = (item: ChecklistItem) => {
    executeUpdate({
      id: item.id,
      cardId,
      boardId,
      isCompleted: !item.isCompleted,
    });
  };

  const onDelete = (id: string) => {
    executeDelete({ id, cardId, boardId });
  };

  const total = items.length;
  const completed = items.filter((i) => i.isCompleted).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full space-y-3.5 pt-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-semibold text-slate-200 flex-wrap">
          <div className="p-1.5 rounded-lg bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30 shrink-0">
            <CheckSquare className="w-4 h-4 text-[var(--landing-orange)]" />
          </div>
          <span>Checklist</span>
          {total > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300">
              {completed}/{total} • {percentage}%
            </span>
          )}
        </div>
        {!isAdding && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAdding(true)}
            className="h-7 px-2.5 text-xs text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-850 border-slate-800 rounded-md cursor-pointer transition shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5 mr-1 text-[var(--landing-orange)]" />
            Add item
          </Button>
        )}
      </div>

      {total > 0 && (
        <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden border border-slate-800/80 p-[1px]">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              percentage === 100
                ? "bg-emerald-500 shadow-xs shadow-emerald-500/50"
                : "bg-gradient-to-r from-[var(--landing-orange)] to-amber-500 shadow-xs shadow-amber-500/30"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      {/* Items List */}
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between gap-2.5 p-2 rounded-lg bg-slate-900/30 hover:bg-slate-900/70 transition-all border border-transparent hover:border-slate-800/90"
          >
            <label className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => onToggle(item)}
                className="w-4 h-4 shrink-0 rounded-md border-slate-700 bg-slate-900 accent-[var(--landing-orange)] cursor-pointer transition-colors"
              />
              <span
                className={cn(
                  "text-xs sm:text-sm text-slate-200 break-words select-none leading-relaxed min-w-0 flex-1",
                  item.isCompleted && "line-through text-slate-500 opacity-60"
                )}
              >
                {item.title}
              </span>
            </label>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all cursor-pointer shrink-0"
              title="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Inline Add Item Form */}
      {isAdding && (
        <form onSubmit={onAdd} className="space-y-2.5 pt-1">
          <input
            type="text"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add an item to the checklist..."
            className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[var(--landing-orange)] focus:ring-1 focus:ring-[var(--landing-orange)]/40 shadow-inner"
          />
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={isCreating || !title.trim()}
              className="h-7.5 px-3.5 text-xs font-medium bg-[var(--landing-orange)] text-white hover:bg-[var(--landing-orange)]/90 rounded-md cursor-pointer shadow-xs"
            >
              Add item
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAdding(false);
                setTitle("");
              }}
              className="h-7.5 px-2.5 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-md cursor-pointer"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
