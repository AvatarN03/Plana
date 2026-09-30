import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full border-t border-[var(--landing-line)] bg-[var(--landing-bg)] py-10 px-5 mt-auto text-[var(--landing-muted)]">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                    <Image src="/plana-icon.svg" alt="Plana logo" width={18} height={18} className="project-logo h-[18px] w-[18px]" />
                    <Link href="/" className="text-sm font-bold tracking-[0.08em] text-[var(--landing-text)]">■ PLANA</Link>
                    <span className="hidden sm:inline text-[var(--landing-line)]">|</span>
                    <p className="text-xs text-[var(--landing-muted)]">
                        Simple project management. Clear workflows. Fast execution.
                    </p>
                </div>

                <div className="flex items-center gap-x-4 text-xs text-[var(--landing-muted)]">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-[var(--landing-line)] mt-6 pt-6 text-center text-xs text-[var(--landing-muted)]">
                © {new Date().getFullYear()} Plana. Built with Next.js 16, React 19, Prisma &amp; Clerk.
            </div>
        </footer>
    );
};
