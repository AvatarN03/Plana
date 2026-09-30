import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center justify-center gap-1 group">
                <Image src="/plana-icon.svg" alt="Plana logo" width={20} height={20} className="project-logo h-5 w-5 object-contain group-hover:opacity-75" />
                <span className="hidden md:block text-xl font-bold text-[var(--landing-text)]">Plana</span>
            </div>
        </Link>
    )
}

export default Logo
