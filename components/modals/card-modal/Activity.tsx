"use client";

import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditLog } from "@/lib/generated/prisma/client";
import { ActivityIcon } from "lucide-react";

interface ActivityProps {
  items: AuditLog[];
}

export const Activity = ({ items }: ActivityProps) => {
  return (
    <div className="flex items-start gap-x-2.5 sm:gap-x-3.5 w-full pt-2">
      <div className="p-1.5 rounded-lg bg-[var(--landing-orange)]/15 border border-[var(--landing-orange)]/30 mt-0.5 shrink-0">
        <ActivityIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--landing-orange)]" />
      </div>
      <div className="w-full min-w-0 space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-xs sm:text-sm font-semibold text-slate-200">Activity</p>
          {items && items.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300">
              {items.length}
            </span>
          )}
        </div>
        <ol className="space-y-3 min-w-0">
          {items && items.length > 0 ? (
            items.map((item) => <ActivityItem key={item.id} data={item} />)
          ) : (
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <p className="text-xs text-slate-500 italic font-mono">No activity recorded for this card yet.</p>
            </div>
          )}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-2.5 sm:gap-x-3.5 w-full pt-2">
      <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 border border-slate-800 shrink-0" />
      <div className="w-full min-w-0 space-y-2">
        <Skeleton className="w-24 h-5 rounded-md bg-slate-900 border border-slate-800" />
        <Skeleton className="w-full h-12 rounded-lg bg-slate-900 border border-slate-800" />
      </div>
    </div>
  );
};