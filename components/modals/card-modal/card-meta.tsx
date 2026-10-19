"use client";

import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { format, isPast, isToday } from "date-fns";
import { AlertCircle, Calendar as CalendarIcon, Check, Clock, Flag } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { CardLabels } from "./card-labels";
import { CardAssignees } from "./card-assignees";

interface CardMetaProps {
  data: CardWithList;
}

const priorities = [
  { value: "LOW", label: "Low", color: "bg-slate-500/15 text-slate-300 hover:bg-slate-500/25 border-slate-500/30", dot: "bg-slate-400" },
  { value: "MEDIUM", label: "Medium", color: "bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border-blue-500/30", dot: "bg-blue-500" },
  { value: "HIGH", label: "High", color: "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border-amber-500/30", dot: "bg-amber-500" },
  { value: "URGENT", label: "Urgent", color: "bg-red-500/15 text-red-400 hover:bg-red-500/25 border-red-500/30", dot: "bg-red-500" },
] as const;

export const CardMeta = ({ data }: CardMetaProps) => {
  const params = useParams();
  const boardId = params.boardId as string;
  const queryClient = useQueryClient();

  const { execute } = useAction(updateCard, {
    onSuccess: (updatedCard) => {
      queryClient.invalidateQueries({
        queryKey: ["card", updatedCard.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-log", updatedCard.id],
      });
      toast.success("Card updated");
    },
    onError: (error) => toast.error(error),
  });

  const onPriorityChange = (priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT") => {
    if (priority === data.priority) return;
    execute({ id: data.id, boardId, priority });
  };

  const onDateChange = (dateString: string | null) => {
    execute({ id: data.id, boardId, dueDate: dateString });
  };

  const currentPriority = priorities.find((p) => p.value === data.priority) || priorities[1];

  const dueDate = data.dueDate ? new Date(data.dueDate) : null;
  const isOverdue = dueDate && isPast(dueDate) && !isToday(dueDate);
  const isDueToday = dueDate && isToday(dueDate);

  return (
    <div className="rounded-xl p-3 sm:p-4 bg-slate-900/40 border border-slate-800/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* Priority Selector */}
      <div className="flex flex-col gap-1.5">
        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] font-mono">
          Priority
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-7.5 px-3 font-medium border rounded-md cursor-pointer text-xs justify-start transition w-fit",
                currentPriority.color
              )}
            >
              <Flag className="w-3.5 h-3.5 mr-1.5" />
              {currentPriority.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-48 max-w-[calc(100vw-2rem)] p-1.5 border-slate-800 bg-slate-950 text-slate-200 rounded-lg shadow-2xl backdrop-blur-md"
            align="start"
            sideOffset={6}
            collisionPadding={12}
          >
            <div className="space-y-1">
              {priorities.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onPriorityChange(item.value)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md hover:bg-slate-900 text-slate-200 transition cursor-pointer font-medium"
                >
                  <span className="flex items-center gap-2">
                    <span className={cn("w-2 h-2 rounded-full", item.dot)} />
                    {item.label}
                  </span>
                  {data.priority === item.value && (
                    <Check className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Due Date Selector */}
      <div className="flex flex-col gap-1.5">
        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px] font-mono">
          Due Date
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-7.5 px-3 font-medium border rounded-md cursor-pointer text-xs justify-start transition w-fit",
                isOverdue
                  ? "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25"
                  : isDueToday
                  ? "bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25"
                  : dueDate
                  ? "bg-slate-900/90 text-slate-200 border-slate-800 hover:border-[var(--landing-orange)]"
                  : "border-dashed border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-[var(--landing-orange)]"
              )}
            >
              {isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-red-400" />
              ) : isDueToday ? (
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              ) : (
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              )}
              {dueDate ? format(dueDate, "MMM d, yyyy") : "Set due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 max-w-[calc(100vw-2rem)] p-3 border-slate-800 bg-slate-950 text-slate-200 rounded-lg shadow-2xl backdrop-blur-md"
            align="start"
            sideOffset={6}
            collisionPadding={12}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-200">Select due date</p>
              <input
                type="date"
                defaultValue={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  onDateChange(val || null);
                }}
                className="w-full text-xs p-2 border border-slate-800 bg-slate-900 text-slate-200 rounded-md focus:outline-none focus:border-[var(--landing-orange)]"
              />
              {dueDate && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDateChange(null)}
                  className="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 h-7.5 cursor-pointer rounded-md"
                >
                  Remove due date
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Assignees Selector */}
      <CardAssignees cardId={data.id} assignees={data.assignees} />

      {/* Labels Selector */}
      <CardLabels cardId={data.id} labels={data.labels} />
    </div>
  );
};
