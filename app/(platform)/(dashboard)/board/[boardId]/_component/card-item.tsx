"use client";
/* eslint-disable react-hooks/refs */

import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithDetails } from "./list-container";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { format, isPast, isToday } from "date-fns";
import { AlignLeft, CheckSquare, Clock, Flag } from "lucide-react";
import { getLabelColorClasses } from "@/components/modals/card-modal/card-labels";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardItemProps {
  data: CardWithDetails;
  index: number;
  isDragDisabled?: boolean;
  isClone?: boolean;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
}

interface CardContentProps {
  data: CardWithDetails;
  provided: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  isClone?: boolean;
}

export const CardContent = ({
  data,
  provided,
  snapshot,
  isClone,
}: CardContentProps) => {
  const cardModal = useCardModal();

  const dueDate = data.dueDate ? new Date(data.dueDate) : null;
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate);
  const isDueToday = dueDate && isToday(dueDate);

  const labels = data.labels || [];
  const checklists = data.checklists || [];
  const assignees = data.assignees || [];

  const totalChecklists = checklists.length;
  const completedChecklists = checklists.filter((c) => c.isCompleted).length;
  const allChecklistsDone = totalChecklists > 0 && totalChecklists === completedChecklists;

  const hasBadges =
    data.description ||
    data.dueDate ||
    (data.priority && data.priority !== "MEDIUM") ||
    totalChecklists > 0 ||
    assignees.length > 0;

  const isDragging = Boolean(snapshot?.isDragging || isClone);

  return (
    <div
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      style={provided.draggableProps.style}
      onClick={() => {
        if (!isDragging) {
          cardModal.onOpen(data.id);
        }
      }}
      role="button"
      className={cn(
        "rounded-md text-sm p-3.5 border transition-all space-y-2.5 cursor-pointer group select-none",
        isDragging
          ? "bg-slate-950/95 border-[var(--landing-orange)] ring-2 ring-[var(--landing-orange)]/60 shadow-2xl cursor-grabbing rotate-1 scale-[1.02] z-50"
          : "bg-slate-950/85 hover:bg-slate-900 border-slate-800/80 hover:border-[var(--landing-orange)] shadow-xs hover:shadow-md"
      )}
    >
      {/* Label Chips */}
      {labels.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {labels.map((l) => (
            <span
              key={l.id}
              className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded-md border leading-tight",
                getLabelColorClasses(l.color)
              )}
            >
              {l.name}
            </span>
          ))}
        </div>
      )}

      {/* Card Title */}
      <p className="font-medium text-slate-100 leading-snug break-words">
        {data.title}
      </p>

      {/* Card Meta Badges & Assignees */}
      {hasBadges && (
        <div className="flex items-center justify-between gap-1 pt-1 text-[11px] font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Priority badge */}
            {data.priority === "URGENT" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-red-500/15 text-red-400 border border-red-500/30 font-medium">
                <Flag className="w-2.5 h-2.5 text-red-400" />
                Urgent
              </span>
            )}
            {data.priority === "HIGH" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 font-medium">
                <Flag className="w-2.5 h-2.5 text-amber-400" />
                High
              </span>
            )}
            {data.priority === "LOW" && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-500/15 text-slate-300 border border-slate-500/30 font-medium">
                <Flag className="w-2.5 h-2.5 text-slate-400" />
                Low
              </span>
            )}

            {/* Due Date badge */}
            {dueDate && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border font-medium",
                  isOverdue
                    ? "bg-red-500/15 text-red-400 border-red-500/30"
                    : isDueToday
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    : "bg-slate-900 text-slate-300 border-slate-800"
                )}
              >
                <Clock className="w-2.5 h-2.5" />
                {format(dueDate, "MMM d")}
              </span>
            )}

            {/* Checklist Ratio Badge */}
            {totalChecklists > 0 && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border font-medium",
                  allChecklistsDone
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "bg-slate-900 text-slate-300 border-slate-800"
                )}
              >
                <CheckSquare className="w-2.5 h-2.5" />
                {completedChecklists}/{totalChecklists}
              </span>
            )}

            {/* Description indicator */}
            {data.description && (
              <span
                title="This card has a description"
                className="text-slate-400 p-0.5"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          {/* Assignee Avatar Stack */}
          {assignees.length > 0 && (
            <div className="flex items-center -space-x-1.5 overflow-hidden pl-1">
              {assignees.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  className="inline-block rounded-full ring-1 ring-[var(--landing-panel)]"
                  title={a.userName}
                >
                  {a.userImage ? (
                    <Image
                      src={a.userImage}
                      alt={a.userName}
                      width={18}
                      height={18}
                      className="w-4.5 h-4.5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-4.5 h-4.5 rounded-full bg-[var(--landing-orange)]/20 text-[var(--landing-orange)] flex items-center justify-center text-[8px] font-bold">
                      {a.userName.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
              {assignees.length > 3 && (
                <span className="text-[9px] text-[var(--landing-muted)] pl-1">
                  +{assignees.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const CardItem = ({
  data,
  index,
  isDragDisabled,
  isClone,
  provided,
  snapshot,
}: CardItemProps) => {
  if (isClone && provided) {
    return (
      <CardContent
        data={data}
        provided={provided}
        snapshot={snapshot}
        isClone
      />
    );
  }

  return (
    <Draggable draggableId={data.id} index={index} isDragDisabled={isDragDisabled}>
      {(dragProvided, dragSnapshot) => (
        <CardContent
          data={data}
          provided={dragProvided}
          snapshot={dragSnapshot}
        />
      )}
    </Draggable>
  );
};
