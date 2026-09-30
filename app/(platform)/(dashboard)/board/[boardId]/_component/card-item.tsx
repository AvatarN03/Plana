"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Card } from "@/lib/generated/prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { format, isPast, isToday } from "date-fns";
import { AlignLeft, Clock, Flag } from "lucide-react";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();

  const dueDate = data.dueDate ? new Date(data.dueDate) : null;
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate);
  const isDueToday = dueDate && isToday(dueDate);

  const hasBadges =
    data.description ||
    data.dueDate ||
    (data.priority && data.priority !== "MEDIUM");

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={() => cardModal.onOpen(data.id)}
          role="button"
          className="rounded-none text-sm p-3 bg-[var(--landing-panel)] border border-[var(--landing-line)] hover:border-[var(--landing-orange)] shadow-2xs transition-all space-y-2 cursor-pointer"
        >
          <p className="font-medium text-[var(--landing-text)] leading-snug break-words">
            {data.title}
          </p>

          {hasBadges && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono">
              {/* Priority badge */}
              {data.priority === "URGENT" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none bg-red-500/15 text-red-400 border border-red-500/30 font-medium">
                  <Flag className="w-2.5 h-2.5 text-red-400" />
                  Urgent
                </span>
              )}
              {data.priority === "HIGH" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none bg-amber-500/15 text-amber-400 border border-amber-500/30 font-medium">
                  <Flag className="w-2.5 h-2.5 text-amber-400" />
                  High
                </span>
              )}
              {data.priority === "LOW" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none bg-slate-500/15 text-slate-300 border border-slate-500/30 font-medium">
                  <Flag className="w-2.5 h-2.5 text-slate-400" />
                  Low
                </span>
              )}

              {/* Due Date badge */}
              {dueDate && (
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none border font-medium ${
                    isOverdue
                      ? "bg-red-500/15 text-red-400 border-red-500/30"
                      : isDueToday
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-[var(--landing-panel-strong)] text-[var(--landing-muted)] border-[var(--landing-line)]"
                  }`}
                >
                  <Clock className="w-2.5 h-2.5" />
                  {format(dueDate, "MMM d")}
                </span>
              )}

              {/* Description indicator */}
              {data.description && (
                <span
                  title="This card has a description"
                  className="text-[var(--landing-muted)] p-0.5"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
