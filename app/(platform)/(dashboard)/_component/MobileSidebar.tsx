"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
    const pathname = usePathname();
    const { isOpen, onOpen, onClose } = useMobileSidebar();

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    return (
        <div className="relative md:hidden">
            <Sheet open={isOpen} onOpenChange={onClose}>
                <button
                    type="button"
                    onClick={onOpen}
                    aria-label="Toggle navigation menu"
                    className="grid size-9 place-items-center rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] hover:text-[var(--landing-orange)] hover:border-[var(--landing-orange)]/60 transition-colors cursor-pointer"
                >
                    <Menu className="size-4" />
                </button>

                <SheetContent
                    side="left"
                    className="p-2 pt-6 bg-[var(--landing-bg)] text-[var(--landing-text)] border-r border-[var(--landing-line)] overflow-y-auto w-72"
                >
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    );
};
