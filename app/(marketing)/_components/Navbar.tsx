import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Navbar = async () => {
    const { userId, orgId } = await auth();

    return (
        <header className="fixed top-0 inset-x-0 h-16 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6">
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                <Logo />
                <div className="flex items-center gap-x-3">
                    {userId ? (
                        <>
                            <Button size="sm" className="hidden sm:inline-flex cursor-pointer" asChild>
                                <Link href={orgId ? `/organization/${orgId}` : "/select-org"}>
                                    Go to Workspace
                                    <ArrowRight className="w-4 h-4 ml-1.5" />
                                </Link>
                            </Button>
                            <UserButton />
                        </>
                    ) : (
                        <>
                            <Button size="sm" variant="ghost" className="cursor-pointer text-neutral-600 hover:text-neutral-900" asChild>
                                <Link href="/sign-in">
                                    Log in
                                </Link>
                            </Button>
                            <Button size="sm" className="cursor-pointer bg-neutral-900 hover:bg-neutral-800 text-white" asChild>
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
