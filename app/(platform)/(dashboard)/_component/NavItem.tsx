"use client;"
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
            icon: <Layout className="w-4 h-4 mr-2" />,
            href: `/organization/${organization.id}`,
        },
        {
            name: "Activity",
            icon: <Activity className="w-4 h-4 mr-2" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            name: "Settings",
            icon: <Settings className="w-4 h-4 mr-2" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            name: "Billing",
            icon: <CreditCard className="w-4 h-4 mr-2" />,
            href: `/organization/${organization.id}/billing`,
        },
    ]


    const onClick = (href: string) => {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
            className="border-none"
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn("flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="w-7 h-7 relative">
                        <Image
                            src={organization.imageUrl}
                            alt="org_img"
                            fill
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium">
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>

            <AccordionContent className="pt-1 text-neutral-700 pb-2">
                <div className="flex flex-col gap-1">
                    {routes.map((route) => (
                        <Button
                            className={cn(
                                "w-full font-normal justify-start pl-10 cursor-pointer",
                                pathname == route.href && "bg-sky-500/10 text-sky-700"
                            )}
                            variant={"ghost"}
                            size="sm"
                            key={route.href}
                            onClick={() => onClick(route.href)}
                        >
                            {route.icon}
                            {route.name}
                        </Button>
                    ))}
                </div>
            </AccordionContent>

        </AccordionItem>
    )
}


NavItem.Skeleton = function NavItemSkeleton(){

    return <div className="flex items-center gap-x-2">
        <div className="relative shrink-0 w-10 h-10">
            <Skeleton className="absolute w-full h-full" />
        </div>
        <Skeleton className="h-10 w-full" />
    </div>

}
