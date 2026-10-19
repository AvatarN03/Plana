import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    showTextOnMobile?: boolean;
}

const Logo = ({ className, showTextOnMobile = true }: LogoProps) => {
    return (
        <Link
            href="/"
            className={cn("flex items-center gap-2 group transition-opacity hover:opacity-90", className)}
        >
            <Image
                src="/plana-icon.svg"
                alt="Plana logo"
                width={20}
                height={20}
                className="project-logo h-5 w-5 object-contain transition-transform group-hover:scale-105 shrink-0"
            />
            <span
                className={cn(
                    "text-sm font-bold tracking-[0.08em] text-[var(--landing-text)]",
                    !showTextOnMobile && "hidden md:inline"
                )}
            >
                PLANA
            </span>
        </Link>
    );
};

export default Logo;

