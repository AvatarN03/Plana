"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/forms/form-submit";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@/lib/generated/prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List,
    onAddCard: () => void
}

export const ListOptions = ({
    data, onAddCard
}: ListOptionsProps) => {

    const closeRef = useRef<HTMLButtonElement | null>(null);


    const {execute: executeDelete} = useAction(deleteList, {
        onSuccess : (data)=>{
            toast.success(`List ${data.title} deleted`);
            closeRef?.current?.click();
        },
        onError: (error)=>{
            toast.error(error);
        }
    })
    const {execute: executeCopy} = useAction(copyList, {
        onSuccess : (data)=>{
            toast.success(`List ${data.title} copied`);
            closeRef?.current?.click();
        },
        onError: (error)=>{
            toast.error(error);
        }
    })

    const onDelete = (formData:FormData)=>{
        const id  = formData.get("id") as string;
        const boardId  = formData.get("boardId") as string;
        executeDelete({id, boardId})
    }
    const onCopy = (formData:FormData)=>{
        const id  = formData.get("id") as string;
        const boardId  = formData.get("boardId") as string;
        executeCopy({id, boardId})
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="p-1.5 w-auto h-auto cursor-pointer hover:bg-white/80 rounded-sm hover:border border-[0.2px] hover:border-slate-800" variant={"ghost"}
                    size="sm"
                >
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="py-3 px-2 space-y-2">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4 ">
                    List Options
                </div>
                <PopoverClose asChild>
                    <Button ref={closeRef} variant="ghost"
                        className="w-auto h-auto p-1.5 cursor-pointer absolute top-2 right-2"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                    variant={"ghost"}
                    className="w-full h-auto px-5 py-2 justify-start text-center font-normal text-sm rounded-none"
                >
                    Add List
                </Button>
                <form action={onCopy}>
                    <input type="text"
                    hidden
                    name="id"
                    id="id"
                    defaultValue={data.id} />
                    <input type="text"
                    name="boardId"
                    id="boardId"
                    hidden
                    defaultValue={data.boardId} />
                    <FormSubmit classname="w-full h-auto px-5 py-2 justify-start text-center font-normal text-sm rounded-none" variant="ghost">
                        Copy List ...
                    </FormSubmit>
                </form>
                <Separator className="my-2" />
                <form action={onDelete}>
                    <input type="text"
                    hidden
                    name="id"
                    id="id"
                    defaultValue={data.id} />
                    <input type="text"
                    name="boardId"
                    id="boardId"
                    hidden
                    defaultValue={data.boardId} />
                    <FormSubmit classname="w-full h-auto px-5 py-2 justify-start text-center font-normal text-sm rounded-sm" variant="destructive">
                        Delete List
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}
