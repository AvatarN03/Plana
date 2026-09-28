"use client";

import { updateCard } from "@/actions/update-card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { format, isPast, isToday } from "date-fns";
import { AlertCircle, Calendar as CalendarIcon, Check, Clock, Flag } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface CardMetaProps {
  data: CardWithList;
}

const priorities = [
  { value: "LOW", label: "Low", color: "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300" },
  { value: "MEDIUM", label: "Medium", color: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200" },
  { value: "HIGH", label: "High", color: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200" },
  { value: "URGENT", label: "Urgent", color: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200" },
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
    <div className="flex flex-wrap items-center gap-4 text-xs mt-1 mb-4">
      {/* Priority Selector */}
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">
          Priority
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`h-7 px-2.5 font-medium border cursor-pointer ${currentPriority.color}`}
            >
              <Flag className="w-3.5 h-3.5 mr-1.5" />
              {currentPriority.label}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-44 p-1.5" align="start">
            <div className="space-y-1">
              {priorities.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onPriorityChange(item.value)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md hover:bg-neutral-100 transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.value === "URGENT"
                          ? "bg-red-500"
                          : item.value === "HIGH"
                          ? "bg-amber-500"
                          : item.value === "MEDIUM"
                          ? "bg-blue-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {item.label}
                  </span>
                  {data.priority === item.value && <Check className="w-3.5 h-3.5 text-neutral-700" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Due Date Selector */}
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px]">
          Due Date
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={`h-7 px-2.5 font-medium border cursor-pointer ${
                isOverdue
                  ? "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                  : isDueToday
                  ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                  : dueDate
                  ? "bg-neutral-50 text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-red-600" />
              ) : isDueToday ? (
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              ) : (
                <CalendarIcon className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
              )}
              {dueDate ? format(dueDate, "MMM d, yyyy") : "Add due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-neutral-700">Set due date</p>
              <input
                type="date"
                defaultValue={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  onDateChange(val || null);
                }}
                className="w-full text-xs p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              {dueDate && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDateChange(null)}
                  className="w-full text-xs text-red-600 hover:text-red-700 hover:bg-red-50 h-7 cursor-pointer"
                >
                  Remove due date
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
