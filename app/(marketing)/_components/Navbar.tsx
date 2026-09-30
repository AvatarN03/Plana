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
        <header className="fixed top-0 inset-x-0 h-16 z-50 border-b border-[var(--landing-line)] bg-[var(--landing-bg)]/85 backdrop-blur-md px-4 sm:px-6">
            <div className="max-w-6xl mx-auto h-full flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[0.08em] text-[var(--landing-text)]"><Image src="/plana-icon.svg" alt="Plana" width={18} height={18} className="project-logo h-[18px] w-[18px]" /> PLANA</Link>
                <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono text-[var(--landing-muted)]"><a href="#product" className="hover:text-[var(--landing-orange)] transition-colors">Product</a><a href="#workflow" className="hover:text-[var(--landing-orange)] transition-colors">Workflow</a><a href="#activity" className="hover:text-[var(--landing-orange)] transition-colors">Activity</a></nav>
                <div className="flex items-center gap-x-3">
                    <ThemeToggle />
                    {userId ? (
                        <>
                            <Button size="sm" className="hidden sm:inline-flex cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90" asChild>
                                <Link href={orgId ? `/organization/${orgId}` : "/select-org"}>
                                    Go to Workspace
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (
                        <>
                            <Button size="sm" variant="ghost" className="cursor-pointer text-[var(--landing-muted)] hover:text-[var(--landing-text)]" asChild>
                                <Link href="/sign-in">
                                    Log in
                                </Link>
                            </Button>
                            <Button size="sm" className="cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:bg-[var(--landing-orange)]/90" asChild>
                                <Link href="/sign-up">
                                    Get Plana Free
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
