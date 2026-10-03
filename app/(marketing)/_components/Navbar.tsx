import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = async () => {
    const { userId, orgId } = await auth();

    return (
        <header className="fixed top-0 inset-x-0 h-16 z-50 border-b border-[var(--landing-line)] bg-[var(--landing-bg)]/92 backdrop-blur-xl px-4 sm:px-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto h-full flex justify-between items-center relative">
                {/* Brand / Logo */}
                <Link href="/" className="flex items-center gap-2.5 text-base font-extrabold tracking-wider text-[var(--landing-text)] hover:opacity-90 transition-opacity">
                    <Image src="/plana-icon.svg" alt="Plana" width={22} height={22} className="project-logo h-[22px] w-[22px]" />
                    <span>PLANA</span>
                </Link>

                {/* Dead-center Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-[var(--landing-text)]/80">
                    <a href="#product" className="hover:text-[var(--landing-orange)] transition-colors duration-200">
                        Product
                    </a>
                    <a href="#workflow" className="hover:text-[var(--landing-orange)] transition-colors duration-200">
                        Workflow
                    </a>
                    <a href="#activity" className="hover:text-[var(--landing-orange)] transition-colors duration-200">
                        Activity
                    </a>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-x-2">
                    <ThemeToggle />
                    {userId ? (
                        <>
                            <Button size="sm" className="hidden sm:inline-flex cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90 rounded-lg font-semibold text-xs transition-all duration-200 hover:shadow-[0_0_16px_rgba(255,118,25,0.25)]" asChild>
                                <Link href={orgId ? `/organization/${orgId}` : "/select-org"}>
                                    Go to Workspace
                                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                                </Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <Button size="sm" variant="ghost" className="cursor-pointer text-xs font-semibold text-[var(--landing-text)]/80 hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel)] rounded-lg transition-colors duration-200 px-3" asChild>
                                <Link href="/sign-in">
                                    Log in
                                </Link>
                            </Button>
                            <Button size="sm" className="cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90 rounded-lg text-xs font-bold transition-all duration-200 hover:shadow-[0_0_16px_rgba(255,118,25,0.3)] px-3.5" asChild>
                                <Link href="/sign-up">
                                    Get Plana Free
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

