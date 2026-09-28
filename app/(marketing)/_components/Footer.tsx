import Logo from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-neutral-200/80 bg-white py-10 px-4 sm:px-6 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                    <Logo />
                    <span className="hidden sm:inline text-neutral-300">|</span>
                    <p className="text-xs text-neutral-500">
                        Simple project management. Clear workflows. Fast execution.
                    </p>
                </div>

                <div className="flex items-center gap-x-2 text-xs text-neutral-500">
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-500 hover:text-neutral-800 cursor-pointer">
                        Privacy Policy
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-500 hover:text-neutral-800 cursor-pointer">
                        Terms of Service
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-neutral-100 mt-6 pt-6 text-center text-xs text-neutral-400">
                © {new Date().getFullYear()} Plana. Built with Next.js 16, React 19, Prisma &amp; Clerk.
            </div>
        </footer>
    );
};
