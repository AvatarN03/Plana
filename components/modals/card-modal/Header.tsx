"use client";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/forms/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types"
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
    data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
    const [title, setTitle] = useState(data?.title);
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const params = useParams();

    const  boardId  = params.boardId as string

    const { execute } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:["card", data.id]
            })
            toast.success(`Card renamed to : ${data.title}`)
        },
        onError: (error) => toast.error(error)
    })

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        if(title.trim() === data.title) return

        execute({ id:data.id, boardId, title })
        setTitle(title);
    }

    return (
        <div className="flex items-center gap-x-3 mb-6 w-full">
            <Layout className="w-8 h-8 mr-1 text-neutral-600" />
            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput
                        ref={inputRef}
                        id="title"
                        onBlur={onBlur}
                        defaultValue={title}
                        classname="font-semibold text-xl px-1 bg-transparent border-transparent border relative mb-0.5 -left-1.5 w-[95%] text-neutral-700 focus-visible:bg-white focus-visible:border-black" />
                        <input type="submit" hidden />
                </form>
                <p className="text-sm text-foreground">in list <span className="underline">{data.list.title}</span></p>
            </div>
        </div>
    )
}


Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="flex items-start gap-x-3 mb-8">
            <Skeleton className="w-12 h-12 rounded-md bg-neutral-200" />
            <div className="flex flex-col gap-2">
                <Skeleton className="w-24 h-7 rounded-md bg-neutral-200" />
                <Skeleton className="w-16 h-6 rounded-md bg-neutral-200" />
            </div>
        </div>
    )
}