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
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-[var(--landing-orange)]" />
      <div className="w-full">
        <p className="font-semibold text-[var(--landing-text)] mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items && items.length > 0 ? (
            items.map((item) => <ActivityItem key={item.id} data={item} />)
          ) : (
            <p className="text-xs text-[var(--landing-muted)] italic font-mono">No activity recorded for this card yet.</p>
          )}
        </ol>
      </div>
    </div>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 rounded-sm border border-[var(--landing-line)]" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 rounded-sm border border-[var(--landing-line)]" />
        <Skeleton className="w-full h-10 rounded-sm border border-[var(--landing-line)]" />
      </div>
    </div>
  );
};