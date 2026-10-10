import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export const Navbar = async () => {
    const { userId, orgId } = await auth();

    return (
        <header className="fixed top-0 inset-x-0 h-16 z-50 bg-[var(--landing-bg)]/60 backdrop-blur-md px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl xl:max-w-[1400px] mx-auto h-full flex justify-between items-center relative">
                {/* Brand / Logo */}
                <Link href="/" className="group flex items-center gap-2.5 text-sm font-bold tracking-[0.08em] text-[var(--landing-text)] hover:opacity-90 transition-opacity">
                    <Image src="/plana-icon.svg" alt="Plana" width={20} height={20} className="project-logo h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                    <span>PLANA</span>
                </Link>

                {/* Center Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2 text-xs lg:text-sm font-medium text-[var(--landing-muted)]">
                    <a href="#product" className="hover:text-[var(--landing-text)] transition-colors duration-200">
                        Boards
                    </a>
                    <a href="#workflow" className="hover:text-[var(--landing-text)] transition-colors duration-200">
                        Workflow
                    </a>
                    <a href="#activity" className="hover:text-[var(--landing-text)] transition-colors duration-200">
                        Activity
                    </a>
                    <a href="#workspaces" className="hover:text-[var(--landing-text)] transition-colors duration-200">
                        Workspaces
                    </a>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-x-2">
                    <ThemeToggle />
                    {userId ? (
                        <>
                            <Button size="sm" className="hidden sm:inline-flex cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90 rounded-none font-semibold text-xs transition-all duration-200 hover:shadow-[0_0_16px_rgba(255,118,25,0.25)]" asChild>
                                <Link href={orgId ? `/organization/${orgId}` : "/select-org"}>
                                    Go to Workspace
                                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                </Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (
                        <div className="hidden sm:flex items-center gap-1.5">
                            <Button size="sm" variant="ghost" className="cursor-pointer text-xs font-semibold text-[var(--landing-text)]/80 hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel)] rounded-none transition-colors duration-200 px-3" asChild>
                                <Link href="/sign-in">
                                    Log in
                                </Link>
                            </Button>
                            <Button size="sm" className="cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90 rounded-none text-xs font-bold transition-all duration-200 hover:shadow-[0_0_16px_rgba(255,118,25,0.3)] px-3.5" asChild>
                                <Link href="/sign-up">
                                    Get Plana Free
                                </Link>
                            </Button>
                        </div>
                    )}
                    <MobileNav userId={userId} orgId={orgId} />
                </div>
            </div>
        </header>
    );
};

