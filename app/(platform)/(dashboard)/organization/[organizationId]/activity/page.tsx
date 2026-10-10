import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/Info";
import { ActivityList } from "./_components/activity-list";

const ActivityPage = () => {
  return (
    <div className="w-full pb-16 space-y-6">
      <Info />
      <Separator className="bg-[var(--landing-line)]" />
      <div>
        <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
        </Suspense>
      </div>
    </div>
  );
};

export default ActivityPage;
