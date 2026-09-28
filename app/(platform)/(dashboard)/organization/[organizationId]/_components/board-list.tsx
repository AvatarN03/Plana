import { FormPopover } from '@/components/forms/form-popover'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { HelpCircle, LayoutGrid, Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const MAX_FREE_BOARDS = 5;

export const BoardList = async () => {
    const { orgId } = await auth();

    if (!orgId) {
        redirect(`/select-org`)
    }

    const boards = await db.board.findMany({
        where: {
            orgId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const remaining = Math.max(0, MAX_FREE_BOARDS - boards.length);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center font-semibold text-lg text-neutral-800">
                    <LayoutGrid className='w-5 h-5 mr-2 text-neutral-600' />
                    Your boards ({boards.length})
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    boards.map(board => (
                        <Link
                            key={board.id}
                            href={`/board/${board.id}`}
                            className='relative aspect-video rounded-md object-cover bg-no-repeat bg-center bg-cover w-full h-full p-2.5 group overflow-hidden bg-sky-700 shadow-2xs hover:shadow-xs transition'
                            style={{ backgroundImage: `url(${board.imageUrl})` }}
                        >
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors w-full h-full" />
                            <p className='text-white font-semibold text-sm relative z-10 break-words'>
                                {board.title}
                            </p>
                        </Link>
                    ))
                }

                <FormPopover align='center' side='right'>
                    <div 
                        role="button" 
                        className="aspect-video flex flex-col gap-y-1.5 bg-neutral-100 hover:bg-neutral-200/80 rounded-md border border-dashed border-neutral-300 w-full h-full relative justify-center transition items-center cursor-pointer p-4 text-center"
                    >
                        <div className="w-7 h-7 rounded-full bg-white shadow-2xs flex items-center justify-center text-neutral-700">
                            <Plus className="w-4 h-4" />
                        </div>
                        <p className='text-xs font-medium text-neutral-700'>Create a board</p>
                        <span className='text-[10px] text-neutral-500'>{remaining} free boards remaining</span>
                        <Hint
                            sideOffSet={40}
                            description={`Free workspaces include up to ${MAX_FREE_BOARDS} active boards.`}>
                            <HelpCircle className='absolute bottom-3 right-3 h-3.5 w-3.5 text-neutral-400' />
                        </Hint>
                    </div>
                </FormPopover>
            </div>

            {boards.length === 0 && (
                <div className="p-6 text-center border rounded-lg bg-neutral-50/50 mt-4">
                    <p className="text-sm font-medium text-neutral-700">No boards created yet</p>
                    <p className="text-xs text-neutral-500 mt-1">Click &quot;Create a board&quot; above to launch your first project workflow.</p>
                </div>
            )}
        </div>
    )
}

BoardList.Skeleton = function BoardList_loading() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Skeleton className='aspect-video w-full h-full rounded-md' />
                <Skeleton className='aspect-video w-full h-full rounded-md' />
                <Skeleton className='aspect-video w-full h-full rounded-md' />
                <Skeleton className='aspect-video w-full h-full rounded-md' />
            </div>
        </div>
    )
}
