import { AuditLog } from "@/lib/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  switch (action) {
    case "CREATE":
      return `created ${entityType.toLowerCase()} "${entityTitle}"`;
    case "UPDATE":
      return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
    case "DELETE":
      return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
    default:
      return `unknown action on ${entityType.toLowerCase()} "${entityTitle}"`;
  }
};

interface ActivityItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2.5">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={data.userImage} />
        <AvatarFallback className="text-xs font-semibold bg-[var(--landing-panel-strong)] text-[var(--landing-text)] border border-[var(--landing-line)]">
          {data.userName?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-[var(--landing-muted)]">
          <span className="font-semibold text-[var(--landing-text)]">
            {data.userName}
          </span>{" "}
          {generateLogMessage(data)}
        </p>
        <p className="text-[11px] font-mono text-[var(--landing-muted)]">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

