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
          className="rounded-md text-sm p-3 bg-white border border-neutral-200/80 hover:border-neutral-400 shadow-2xs hover:shadow-xs transition-all space-y-2 cursor-pointer"
        >
          <p className="font-medium text-neutral-800 leading-snug break-words">
            {data.title}
          </p>

          {hasBadges && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              {/* Priority badge */}
              {data.priority === "URGENT" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-medium">
                  <Flag className="w-2.5 h-2.5 text-red-600" />
                  Urgent
                </span>
              )}
              {data.priority === "HIGH" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                  <Flag className="w-2.5 h-2.5 text-amber-600" />
                  High
                </span>
              )}
              {data.priority === "LOW" && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200 font-medium">
                  <Flag className="w-2.5 h-2.5 text-slate-500" />
                  Low
                </span>
              )}

              {/* Due Date badge */}
              {dueDate && (
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border font-medium ${
                    isOverdue
                      ? "bg-red-50 text-red-700 border-red-200"
                      : isDueToday
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-neutral-50 text-neutral-600 border-neutral-200"
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
                  className="text-neutral-400 p-0.5"
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
