"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Tag, X } from "lucide-react";

import { CardLabel } from "@/lib/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { createCardLabel } from "@/actions/create-card-label";
import { deleteCardLabel } from "@/actions/delete-card-label";
import { cn } from "@/lib/utils";

interface CardLabelsProps {
  cardId: string;
  labels?: CardLabel[];
  hideTitle?: boolean;
}

export const LABEL_COLORS = [
  { name: "Emerald", value: "emerald", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dot: "bg-emerald-500" },
  { name: "Blue", value: "blue", badge: "bg-blue-500/15 text-blue-400 border-blue-500/30", dot: "bg-blue-500" },
  { name: "Amber", value: "amber", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30", dot: "bg-amber-500" },
  { name: "Red", value: "red", badge: "bg-red-500/15 text-red-400 border-red-500/30", dot: "bg-red-500" },
  { name: "Purple", value: "purple", badge: "bg-purple-500/15 text-purple-400 border-purple-500/30", dot: "bg-purple-500" },
  { name: "Rose", value: "rose", badge: "bg-rose-500/15 text-rose-400 border-rose-500/30", dot: "bg-rose-500" },
  { name: "Indigo", value: "indigo", badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30", dot: "bg-indigo-500" },
  { name: "Slate", value: "slate", badge: "bg-slate-500/15 text-slate-300 border-slate-500/30", dot: "bg-slate-400" },
] as const;

export function getLabelColorClasses(colorName: string) {
  const match = LABEL_COLORS.find((c) => c.value === colorName.toLowerCase());
  return match?.badge || "bg-slate-500/15 text-slate-300 border-slate-500/30";
}

export const CardLabels = ({ cardId, labels = [], hideTitle = false }: CardLabelsProps) => {
  const params = useParams();
  const boardId = params.boardId as string;
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("emerald");

  const refreshCard = () => {
    queryClient.invalidateQueries({ queryKey: ["card", cardId] });
    queryClient.invalidateQueries({ queryKey: ["card-log", cardId] });
  };

  const { execute: executeCreate, isLoading: isCreating } = useAction(createCardLabel, {
    onSuccess: () => {
      toast.success("Label added");
      setName("");
      setIsOpen(false);
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const { execute: executeDelete } = useAction(deleteCardLabel, {
    onSuccess: () => {
      toast.success("Label removed");
      refreshCard();
    },
    onError: (err) => toast.error(err),
  });

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    executeCreate({
      name: name.trim(),
      color: selectedColor,
      cardId,
      boardId,
    });
  };

  return (
    <div className="flex flex-col gap-1.5">
      {!hideTitle && (
        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] font-mono">
          Labels
        </span>
      )}
      <div className="flex flex-wrap items-center gap-1.5 min-h-7">
        {labels.map((label) => (
          <span
            key={label.id}
            className={cn(
              "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-xs font-medium leading-none transition-colors",
              getLabelColorClasses(label.color)
            )}
          >
            <span>{label.name}</span>
            <button
              type="button"
              onClick={() => executeDelete({ id: label.id, cardId, boardId })}
              className="hover:opacity-75 cursor-pointer ml-1 text-slate-400 hover:text-white"
              title="Remove label"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2.5 text-xs font-medium border border-dashed border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-[var(--landing-orange)] rounded-md cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5 mr-1 text-[var(--landing-orange)]" />
              Add label
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 p-3 border-slate-800 bg-slate-950 text-slate-200 rounded-lg shadow-2xl backdrop-blur-md"
            align="start"
            sideOffset={6}
          >
            <form onSubmit={onAdd} className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                <Tag className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
                <span>Create label</span>
              </div>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Label name..."
                className="w-full text-xs p-2 rounded-md border border-slate-800 bg-slate-900 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-[var(--landing-orange)]"
              />
              <div className="grid grid-cols-4 gap-1.5">
                {LABEL_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setSelectedColor(c.value)}
                    className={cn(
                      "h-7 rounded-md flex items-center justify-center border transition-all cursor-pointer",
                      c.badge,
                      selectedColor === c.value
                        ? "ring-2 ring-[var(--landing-orange)] ring-offset-1 ring-offset-slate-950 scale-105"
                        : "opacity-75 hover:opacity-100"
                    )}
                    title={c.name}
                  >
                    <span className={cn("w-2 h-2 rounded-full", c.dot)} />
                  </button>
                ))}
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={isCreating || !name.trim()}
                className="w-full h-8 text-xs bg-[var(--landing-orange)] text-white hover:bg-[var(--landing-orange)]/90 rounded-md cursor-pointer font-medium"
              >
                Add Label
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
