"use client";
import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner";

export const BoardOptions = ({
    id
}: {
    id: string
}) => {

    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error('Failed to delete board', { description: error })
        }
    })

    const onDelete = async () => {
        try {
            await execute({ id })
        } catch (error) {
            console.log("delete board failed", error)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"transparent"}
                    className="cursor-pointer"
                >
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 py-3" side="bottom" align="start">
                <div className="text-sm text-neutral-600 text-center font-medium">
                    Board actions
                </div>
                <PopoverClose asChild>
                    <Button variant={"ghost"} className="absolute right-3 top-3 cursor-pointer">
                        <X className="h-4 w-4 " />
                    </Button>
                </PopoverClose>
                <div className="px-2 mt-4">
                    <ConfirmModal
                        header="Delete this board?"
                        description="This will permanently delete the board, along with all lists and cards inside it."
                        onConfirm={onDelete}
                        disabled={isLoading}
                    >
                        <Button
                            variant={"destructive"}
                            disabled={isLoading}
                            className="rounded-sm w-full h-auto p-2 justify-start font-normal text-sm cursor-pointer"
                        >
                            Delete board
                        </Button>
                    </ConfirmModal>
                </div>
            </PopoverContent>
        </Popover>
    )
}
