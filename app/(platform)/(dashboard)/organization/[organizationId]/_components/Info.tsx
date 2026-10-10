"use client";

import Link from "next/link";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { CheckCircle2, CreditCard, Settings, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const Info = () => {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return <Info.Skeleton />;
    }

    return (
        <div className="p-4 sm:p-5 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="w-14 h-14 relative shrink-0">
                        <Image
                            fill
                            src={organization?.imageUrl || "/org"}
                            alt={organization?.name || "Workspace"}
                            className="rounded-sm object-cover border border-[var(--landing-line)]"
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-x-2">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--landing-text)]">
                                {organization?.name}
                            </h1>
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--landing-muted)] font-mono">
                            <span className="flex items-center gap-1">
                                <CreditCard className="w-3.5 h-3.5 text-[var(--landing-orange)]" />
                                Free Workspace
                            </span>
                            <span>•</span>
                            <span>{organization?.membersCount ?? 1} {(organization?.membersCount ?? 1) === 1 ? "member" : "members"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs rounded-sm border-[var(--landing-line)] bg-[var(--landing-panel-strong)] text-[var(--landing-text)] hover:border-[var(--landing-orange)] hover:text-[var(--landing-orange)]"
                    >
                        <Link href={`/organization/${organization?.id}/activity`}>
                            <Activity className="w-3.5 h-3.5 mr-1.5" />
                            Activity
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs rounded-sm border-[var(--landing-line)] bg-[var(--landing-panel-strong)] text-[var(--landing-text)] hover:border-[var(--landing-orange)] hover:text-[var(--landing-orange)]"
                    >
                        <Link href={`/organization/${organization?.id}/settings`}>
                            <Settings className="w-3.5 h-3.5 mr-1.5" />
                            Settings
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

Info.Skeleton = function InfoSkeleton() {
    return (
        <div className="p-4 sm:p-5 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <Skeleton className="w-14 h-14 rounded-sm" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48 rounded-sm" />
                        <Skeleton className="h-4 w-32 rounded-sm" />
                    </div>
                </div>
                <div className="hidden sm:flex gap-2">
                    <Skeleton className="h-8 w-20 rounded-sm" />
                    <Skeleton className="h-8 w-20 rounded-sm" />
                </div>
            </div>
        </div>
    );
};
