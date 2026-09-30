import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex flex-col items-center justify-center p-8 text-center border border-[var(--landing-line)] bg-[var(--landing-panel)] mt-4">
        <p className="text-sm font-medium text-[var(--landing-text)]">No activity recorded yet</p>
        <p className="text-xs text-[var(--landing-muted)] mt-1">Actions performed on boards, lists, and cards will appear here.</p>
      </div>
    );
  }

  return (
    <ol className="space-y-4 mt-4">
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[85%] h-12 rounded-sm border border-[var(--landing-line)]" />
      <Skeleton className="w-[60%] h-12 rounded-sm border border-[var(--landing-line)]" />
      <Skeleton className="w-[75%] h-12 rounded-sm border border-[var(--landing-line)]" />
      <Skeleton className="w-[65%] h-12 rounded-sm border border-[var(--landing-line)]" />
      <Skeleton className="w-[80%] h-12 rounded-sm border border-[var(--landing-line)]" />
    </ol>
  );
};

