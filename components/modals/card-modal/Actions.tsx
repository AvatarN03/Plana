"use client";

import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { updateCard } from "@/actions/update-card";
import { Archive, Copy, Trash } from "lucide-react";
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
    const { execute: executeArchive, isLoading: isLoadingArchive } = useAction(updateCard, {
        onSuccess: (updated) => {
            toast.success(updated.isArchived ? "Card archived" : "Card restored");
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
    const onArchive = () => {
        executeArchive({ id: data.id, boardId, isArchived: !data.isArchived })
    }


    return (
        <div className="space-y-2.5">
            <p className="text-[11px] font-semibold font-mono uppercase tracking-wider text-slate-400">
                Actions
            </p>

            <div className="flex flex-col gap-2">
                <Button
                    className="w-full flex items-center justify-start cursor-pointer border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg h-9 px-3 text-xs sm:text-sm font-medium transition shadow-2xs"
                    variant={"outline"}
                    size={"sm"}
                    onClick={onCopy}
                    disabled={isLoadingCopy}
                >
                    <Copy className="w-4 h-4 mr-2.5 text-[var(--landing-orange)]" />
                    Copy Card
                </Button>

                <Button
                    className="w-full flex items-center justify-start cursor-pointer border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-lg h-9 px-3 text-xs sm:text-sm font-medium transition shadow-2xs"
                    variant={"outline"}
                    size={"sm"}
                    onClick={onArchive}
                    disabled={isLoadingArchive}
                >
                    <Archive className="w-4 h-4 mr-2.5 text-slate-400" />
                    {data.isArchived ? "Restore Card" : "Archive Card"}
                </Button>

                <ConfirmModal
                    header="Delete this card?"
                    description="This will permanently delete this card, subtasks, and its activity history."
                    onConfirm={onDelete}
                    disabled={isLoadingDelete}
                >
                    <Button
                        className="w-full flex items-center justify-start cursor-pointer rounded-lg h-9 px-3 text-xs sm:text-sm font-medium bg-red-500/15 hover:bg-red-500/25 text-red-400 hover:text-red-300 border border-red-500/30 transition shadow-2xs"
                        variant={"destructive"}
                        size={"sm"}
                        disabled={isLoadingDelete}
                    >
                        <Trash className="w-4 h-4 mr-2.5" />
                        Delete Card
                    </Button>
                </ConfirmModal>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-2 hidden md:block">
                <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold">
                    Shortcuts
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Close modal</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 shadow-2xs">
                        Esc
                    </kbd>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Save edit</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300 shadow-2xs">
                        Enter
                    </kbd>
                </div>
            </div>
        </div>
    )
}


Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="w-full space-y-2.5">
            <Skeleton className="w-20 h-4 rounded-md bg-slate-900 border border-slate-800" />
            <Skeleton className="w-full h-9 rounded-lg bg-slate-900 border border-slate-800" />
            <Skeleton className="w-full h-9 rounded-lg bg-slate-900 border border-slate-800" />
            <Skeleton className="w-full h-9 rounded-lg bg-slate-900 border border-slate-800" />
        </div>
    )
}
