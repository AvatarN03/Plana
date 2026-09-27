"use client";

import { Skeleton } from "@/components/ui/skeleton";


export const Activity = () => {
    return (
        <div>Activity</div>
    )
}


Activity.Skeleton = function ActivitySkeleton() {
    return (
        <div className="flex items-center gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 " />
                <Skeleton className="w-full h-10 " />
            </div>
        </div>
    )
}