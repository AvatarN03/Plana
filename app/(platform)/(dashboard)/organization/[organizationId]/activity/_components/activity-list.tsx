import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isToday, isYesterday } from "date-fns";
import { AuditLog } from "@/lib/generated/prisma/client";
import { Activity } from "lucide-react";

function getDateLabel(date: Date): string {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMMM d, yyyy");
}

export const ActivityList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (auditLogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] mt-4">
        <div className="w-10 h-10 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] flex items-center justify-center mb-3 text-[var(--landing-orange)]">
          <Activity className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-[var(--landing-text)]">No activity recorded yet</p>
        <p className="text-xs text-[var(--landing-muted)] mt-1 max-w-sm">
          Actions performed on boards, lists, and cards in this workspace will automatically appear here grouped by date.
        </p>
      </div>
    );
  }

  // Group audit logs by date (Today, Yesterday, or formatted date)
  const groupMap = new Map<string, AuditLog[]>();
  for (const log of auditLogs) {
    const label = getDateLabel(new Date(log.createdAt));
    if (!groupMap.has(label)) {
      groupMap.set(label, []);
    }
    groupMap.get(label)!.push(log);
  }

  const groupedLogs = Array.from(groupMap.entries()).map(([label, logs]) => ({
    label,
    logs,
  }));

  return (
    <div className="space-y-6 mt-4">
      {groupedLogs.map(({ label, logs }) => (
        <div key={label} className="space-y-3">
          {/* Date group badge */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--landing-orange)] px-2.5 py-1 rounded-sm bg-[var(--landing-panel-strong)] border border-[var(--landing-line)] shadow-2xs">
              {label}
            </span>
            <div className="flex-1 h-px bg-[var(--landing-line)]" />
          </div>

          {/* Activity items for this date */}
          <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 shadow-2xs">
            <ol className="space-y-4">
              {logs.map((log) => (
                <ActivityItem key={log.id} data={log} />
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <div className="space-y-6 mt-4">
      <div className="space-y-3">
        <Skeleton className="w-24 h-6 rounded-sm border border-[var(--landing-line)]" />
        <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 space-y-4">
          <Skeleton className="w-[85%] h-10 rounded-sm" />
          <Skeleton className="w-[65%] h-10 rounded-sm" />
          <Skeleton className="w-[75%] h-10 rounded-sm" />
        </div>
      </div>
    </div>
  );
};
