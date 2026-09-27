import { FormPopover } from '@/components/forms/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { HelpCircle, User2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const BoardList = async () => {

    const { orgId } = await auth();

    if (!orgId) {
        redirect(`/select-org`)
    }

    const boards = await db.board.findMany({
        where: {
            orgId
        }
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className='w-6 h-6 mr-2' />
                Your boards
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    boards.map(board => (
                        <Link
                            key={board.id}
                            href={`/board/${board.id}`}
                            className='relative aspect-video rounded-md object-cover bg-no-repeat bg-center bg-cover w-full h-full p-2 group overflow-hidden bg-sky-700'
                            style={{ backgroundImage: `url(${board.imageUrl})` }}
                        >
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 w-full h-full" />
                            <p className='text-white font-bold absolute inset-2 z-10'>

                                {
                                    board.title
                                }
                            </p>

                        </Link>
                    ))
                }
                <FormPopover align='center' side='right' >

                    <div role="button" className="aspect-video flex flex-col gap-y-1 bg-muted rounded-sm w-full h-full relative justify-center hover:opacity-85  transition items-center cursor-pointer">
                        <p className='text-sm'>Create a board</p>
                        <span className='text-xs '>5 remaining</span>
                        <Hint
                            sideOffSet={40}
                            description='You can create up to 5 boards for free. Upgrade to Pro for unlimited boards and more features.'>
                            <HelpCircle className='absolute bottom-4 right-4 h-3.5 w-3.5' />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}


BoardList.Skeleton = function BoardList_loading() {
    return(

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
            <Skeleton className='aspect-video w-full h-full px-2 py-1' />
        </div>
    )
}
