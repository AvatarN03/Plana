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
      <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[50%]"/>
        <Skeleton className="h-10 w-10"/>
      </div>
      <div className="space-y-2 mt-4">
        <NavItem.Skeleton />
        <NavItem.Skeleton />
        <NavItem.Skeleton />
        <NavItem.Skeleton />
      </div>
      </>
    )
  }


  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">WorkSpaces</span>
        <Button
          asChild
          variant={"ghost"}
          size={"icon"}
          className="ml-auto"
        >
          <Link
            href="/select-org"
          >
            <Plus
              className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        className="space-y-2"
        defaultValue={defaultAccordianValue}
      >
        {
          userMemberships.data.map(({ organization }) => (
            <NavItem
              key={organization.id}
              isExpanded={expanded[organization.id]}
              onExpand={onExpand}
              organization={organization as OrganizationProps}
              isActive={activeOrganization?.id == organization.id}
            />

          ))
        }
      </Accordion>
    </>
  )
}

export default Sidebar