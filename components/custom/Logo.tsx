import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center justify-center gap-1 group">
                <Image src="/plana-logo.svg" alt="Plana logo" width={30} height={30} className="object-contain group-hover:opacity-75" />
                <span className="hidden md:block text-xl font-bold text-gray-700">Plana</span>
            </div>
        </Link>
    )
}

export default Logo