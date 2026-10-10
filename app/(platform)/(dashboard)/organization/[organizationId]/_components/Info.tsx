"use client";

import { useOrganization } from "@clerk/nextjs";
import { CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Info = () => {
  const { organization, memberships, isLoaded } = useOrganization({
    memberships: {
      infinite: true,
    },
  });

  if (!isLoaded || !organization) {
    return <Info.Skeleton />;
  }

  const memberList = memberships?.data || [];
  const totalMembers = organization.membersCount ?? memberList.length ?? 1;
  const displayMembers = memberList.slice(0, 3);
  const extraCount = Math.max(0, totalMembers - displayMembers.length);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Left: Organization Title and Verified Badge matching concept mockup */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--landing-text)]">
          {organization.name}
        </h1>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/25 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 fill-blue-400 text-[var(--landing-bg)]" />
          Verified team
        </span>
      </div>

      {/* Right: Team Members Avatar Stack matching concept mockup */}
      <div className="flex items-center -space-x-2">
        {displayMembers.length > 0 ? (
          displayMembers.map((membership) => {
            const user = membership.publicUserData;
            return (
              <Avatar
                key={membership.id}
                className="w-8 h-8 rounded-full border-2 border-[var(--landing-bg)] ring-1 ring-[var(--landing-line)] shrink-0"
              >
                <AvatarImage src={user?.imageUrl} alt={user?.firstName || "Member"} />
                <AvatarFallback className="text-[10px] font-semibold bg-[var(--landing-panel-strong)] text-[var(--landing-text)]">
                  {user?.firstName?.[0] || user?.identifier?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            );
          })
        ) : (
          <Avatar className="w-8 h-8 rounded-full border-2 border-[var(--landing-bg)] ring-1 ring-[var(--landing-line)]">
            <AvatarImage src={organization.imageUrl} />
            <AvatarFallback className="text-[10px] font-semibold bg-[var(--landing-panel-strong)] text-[var(--landing-text)]">
              {organization.name[0]}
            </AvatarFallback>
          </Avatar>
        )}

        {extraCount > 0 && (
          <div className="w-8 h-8 rounded-full bg-[var(--landing-panel-strong)] border-2 border-[var(--landing-bg)] ring-1 ring-[var(--landing-line)] flex items-center justify-center text-[11px] font-semibold text-[var(--landing-muted)] shrink-0 z-10">
            +{extraCount}
          </div>
        )}
      </div>
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center justify-between pb-2">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-52 rounded-sm" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
      <div className="flex items-center -space-x-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};
