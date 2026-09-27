"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
    data: CardWithList,
}


export const Actions = ({
    data
}: ActionsProps) => {

    const params = useParams();
    const boardId = params.boardId as string;

    const {onClose} = useCardModal();

    const { execute: executeDelete } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card ${data.title} deleted`);
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })
    const { execute: executeCopy } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`List ${data.title} copied`);
            onClose();

        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onDelete = () => {

        executeDelete({ id: data.id, boardId })
    }
    const onCopy = () => {

        executeCopy({ id: data.id, boardId })
    }


    return (
        <div className="space-y-4 mt-2">
            <p className="text-xs font-semibold">Actions</p>

            <Button
                className="flex items-center justify-start "
                variant={"primary"}
                size={"sm"}
                onClick={onCopy}
            >
                <Copy className="w-5 h-5 mr-1" />
                Copy
            </Button>
            <Button
                className="flex items-center justify-start "
                variant={"destructive"}
                size={"sm"}
                onClick={onDelete}
            >
                <Trash className="w-5 h-5 mr-1" />
                Delete
            </Button>
        </div>
    )
}


Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="w-full space-y-2 mt-2">
            <Skeleton className="w-24 h-7 rounded-md bg-neutral-200" />
            <Skeleton className="w-full h-7 rounded-md bg-neutral-200" />
            <Skeleton className="w-full h-7 rounded-md bg-neutral-200" />
        </div>
    )
}
