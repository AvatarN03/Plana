"use client";

import Link from "next/link";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { NavItem, OrganizationProps } from "./NavItem";

import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";


type SidebarProps = {
  storageKey?: string
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

  const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });

  const defaultAccordianValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key);
    }

    return acc;
  }, [])

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id]

    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-4 w-24 rounded-sm" />
          <Skeleton className="h-6 w-6 rounded-sm" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between space-y-6">
      <div>
        <div className="font-medium text-xs flex items-center mb-2 px-2 text-[var(--landing-muted)]">
          <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Workspaces</span>
          <Button
            asChild
            variant={"ghost"}
            size={"icon"}
            className="ml-auto h-6 w-6 rounded-sm text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)]"
          >
            <Link href="/select-org">
              <Plus className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
        <Accordion
          type="multiple"
          className="space-y-1.5"
          defaultValue={defaultAccordianValue}
        >
          {userMemberships.data.map(({ organization }) => (
            <NavItem
              key={organization.id}
              isExpanded={expanded[organization.id]}
              onExpand={onExpand}
              organization={organization as OrganizationProps}
              isActive={activeOrganization?.id === organization.id}
            />
          ))}
        </Accordion>
      </div>

      <div className="pt-4 border-t border-[var(--landing-line)]">
        <div className="p-3 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-[var(--landing-text)] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--landing-orange)] animate-pulse" />
              Free Plan
            </span>
            <span className="text-[10px] font-mono text-[var(--landing-muted)]">Active</span>
          </div>
          <div className="w-full bg-[var(--landing-panel-strong)] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[var(--landing-orange)] h-full rounded-full w-2/5" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-[var(--landing-muted)]">
            <span>5 boards max</span>
            <Link 
              href={activeOrganization ? `/organization/${activeOrganization.id}/billing` : "/select-org"}
              className="text-[var(--landing-orange)] hover:underline font-medium"
            >
              Manage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar
