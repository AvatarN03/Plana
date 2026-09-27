"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

import { Menu } from "lucide-react";

export const MobileSidebar = () => {
    const pathname = usePathname();
    const { isOpen, onOpen, onClose } = useMobileSidebar();

    useEffect(() => {
        onClose()
    }, [pathname, onClose]) // whenever our url changes then the sidebar is closed;




    return (
        <div className="relative">
            <Sheet open={isOpen} onOpenChange={onClose}  >
                <Button
                    size={"sm"}
                    className="block md:hidden"
                    variant={"ghost"}
                    onClick={onOpen}
                >
                    <Menu className="w-4 h-4" />
                </Button>

                <SheetContent
                    side="left"
                    className="p-2 pt-10 transform transition-all duration-300 ease-in-out"

                >
                    <Sidebar
                        storageKey="t-sidebar-mobile-state"
                    />
                </SheetContent>
            </Sheet>
        </div>
    )
}
