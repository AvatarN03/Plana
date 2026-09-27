"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextArea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
    data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const formRef = useRef<HTMLFormElement>(null!);
    const queryClient = useQueryClient();
    const [description, setDescription] = useState(data?.description)

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef?.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const params = useParams();

    const boardId = params.boardId as string

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            })
            toast.success(`Card description updated`)
        },
        onError: (error) => toast.error(error)
    })


    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        if (description.trim() === data.description) return

        execute({ id: data.id, boardId, description })
        setDescription(description);
        disableEditing();
    }


    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {
                    isEditing ? (
                        <div className="">
                            <form action={onSubmit} ref={formRef}>
                                <FormTextArea
                                errors={fieldErrors}
                                    ref={textAreaRef}
                                    id="description"
                                    placeholder="Add more detail to description ..."
                                    classname="w-full mt-2 "
                                    defaultValue={description || undefined}
                                />
                                <div className="flex items-center gap-x-4 mt-4">
                                    <FormSubmit>
                                        Save
                                    </FormSubmit>
                                    <Button
                                        type="button"
                                        variant={"ghost"}
                                        size={"sm"}
                                        onClick={disableEditing}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div onClick={enableEditing} role="button" className="bg-neutral-200 min-h-24 text-sm font-medium p-3 rounded-md">
                            {description || "Add more detail to your card...."}
                        </div>
                    )
                }

            </div>
        </div >
    )
}



Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <Skeleton className=" w-24 h-7 rounded-md bg-neutral-200" />
            <Skeleton className=" w-full h-36 rounded-md bg-neutral-200" />
        </div>
    )
}