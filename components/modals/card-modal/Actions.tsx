"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { ConfirmModal } from "@/components/modals/confirm-modal";
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

    const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" deleted`);
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    })
    const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" copied`);
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
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold text-[var(--landing-text)]">Actions</p>

            <Button
                className="w-full flex items-center justify-start cursor-pointer border-[var(--landing-line)] bg-[var(--landing-panel)] hover:bg-[var(--landing-panel-strong)] text-[var(--landing-text)] rounded-none"
                variant={"outline"}
                size={"sm"}
                onClick={onCopy}
                disabled={isLoadingCopy}
            >
                <Copy className="w-4 h-4 mr-2 text-[var(--landing-orange)]" />
                Copy
            </Button>
            <ConfirmModal
                header="Delete this card?"
                description="This will permanently delete this card and its activity history."
                onConfirm={onDelete}
                disabled={isLoadingDelete}
            >
                <Button
                    className="w-full flex items-center justify-start cursor-pointer rounded-none"
                    variant={"destructive"}
                    size={"sm"}
                    disabled={isLoadingDelete}
                >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </ConfirmModal>
        </div>
    )
}


Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="w-full space-y-2 mt-2">
            <Skeleton className="w-24 h-7 rounded-sm border border-[var(--landing-line)]" />
            <Skeleton className="w-full h-7 rounded-sm border border-[var(--landing-line)]" />
            <Skeleton className="w-full h-7 rounded-sm border border-[var(--landing-line)]" />
        </div>
    )
}
