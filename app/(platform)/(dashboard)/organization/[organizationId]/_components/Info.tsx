"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react";
import Image from "next/image";



export const Info = () => {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return <Info.Skeleton />
    }
    return (
        <div className="flex gap-x-4 items-center">
            <div className="w-15 h-15 relative">
                <Image
                    fill
                    src={organization?.imageUrl || "/org"}
                    alt="organization"
                    className="rounded-md"
                />
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {organization?.name}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <CreditCard className="w-3 h-3 mr-2" />
                    Free
                </div>
            </div>
        </div>
    )
}


Info.Skeleton = function InfoSkeleton() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-15 h-15 relative">
                <Skeleton className="w-full h-full absolute rounded-md" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-50" />
                <div className="flex items-center ">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    )

}