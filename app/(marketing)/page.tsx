
import Link from 'next/link'
import { Medal } from 'lucide-react'

import { Button } from '@/components/ui/button'

const MarketingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase font-black">
                    <Medal className='h-6 w-6 mr-2' />
                    No 1 task management
                </div>
                <h1 className='text-3xl font-semibold md:text-6xl text-center text-neutral-800 mb-6'>Plana helps teams move</h1>
                <div className="text-3xl md:text-6xl text-center bg-linear-to-r from-fuchsia-600 to-pink-600 font-semibold px-4 p-2 rounded-md pb-4 w-fit text-white">work forward.</div>
            </div>
            <div className="text-sm md:text-xl mx-auto max-w-md md:max-w-2xl text-center text-neutral-600 mt-4">
                Collaborate, manage projects, and reach productivity peaks. From high rises to the home office, the way your team works is unique — do it all with Plana.
            </div>
            <Button className='mt-6' size={"lg"} asChild>
                <Link href="/sign-up" >
                    Get Plana for free
                </Link>

            </Button>
        </div>
    )
}

export default MarketingPage