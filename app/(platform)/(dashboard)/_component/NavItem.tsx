"use client";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export type OrganizationProps = {
    id: string,
    slug: string,
    imageUrl: string,
    name: string
}

interface NavItemProps {

    isExpanded: boolean,
    isActive: boolean,
    onExpand: (is: string) => void,
    organization: OrganizationProps,

}


export const NavItem = ({
    isExpanded,
    isActive,
    onExpand,
    organization
}: NavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            name: "Boards",
            icon: <Layout className="w-3.5 h-3.5 mr-2 shrink-0" />,
            href: `/organization/${organization.id}`,
        },
        {
            name: "Activity",
            icon: <Activity className="w-3.5 h-3.5 mr-2 shrink-0" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            name: "Settings",
            icon: <Settings className="w-3.5 h-3.5 mr-2 shrink-0" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            name: "Billing",
            icon: <CreditCard className="w-3.5 h-3.5 mr-2 shrink-0" />,
            href: `/organization/${organization.id}/billing`,
        },
    ];

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <AccordionItem
            value={organization.id}
            className="border-none"
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "flex items-center gap-x-2 px-2 py-1.5 text-[var(--landing-muted)] rounded-sm hover:bg-[var(--landing-panel-strong)] hover:text-[var(--landing-text)] transition text-start no-underline hover:no-underline font-medium text-sm",
                    isActive && !isExpanded && "bg-[var(--landing-orange-soft)] text-[var(--landing-orange)] font-semibold"
                )}
            >
                <div className="flex items-center gap-x-2.5 truncate">
                    <div className="w-6 h-6 relative shrink-0">
                        <Image
                            src={organization.imageUrl}
                            alt={organization.name}
                            fill
                            className="rounded-sm object-cover border border-[var(--landing-line)]"
                        />
                    </div>
                    <span className="text-sm font-medium truncate">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>

            <AccordionContent className="pt-1 text-[var(--landing-muted)] pb-2">
                <div className="flex flex-col gap-1 pl-2 border-l border-[var(--landing-line)] ml-3">
                    {routes.map((route) => {
                        const isRouteActive = pathname === route.href;
                        return (
                            <Button
                                className={cn(
                                    "w-full font-normal justify-start px-2.5 h-8 text-xs cursor-pointer rounded-sm transition-all",
                                    isRouteActive
                                        ? "bg-[var(--landing-orange-soft)] text-[var(--landing-orange)] font-medium border-l-2 border-[var(--landing-orange)] shadow-2xs"
                                        : "text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)]"
                                )}
                                variant={"ghost"}
                                size="sm"
                                key={route.href}
                                onClick={() => onClick(route.href)}
                            >
                                {route.icon}
                                <span>{route.name}</span>
                            </Button>
                        );
                    })}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};

NavItem.Skeleton = function NavItemSkeleton() {
    return (
        <div className="flex items-center gap-x-2.5 p-1.5">
            <div className="relative shrink-0 w-6 h-6">
                <Skeleton className="w-full h-full rounded-sm" />
            </div>
            <Skeleton className="h-6 w-full rounded-sm" />
        </div>
    );
};
