import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
            <Image src="/plana-icon.svg" alt="Plana logo" width={20} height={20} className="project-logo h-5 w-5 object-contain transition-transform group-hover:scale-105" />
            <span className="hidden md:inline text-sm font-bold tracking-[0.08em] text-[var(--landing-text)]">PLANA</span>
        </Link>
    );
};

export default Logo;
