"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@/lib/generated/prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
    data: Board
}

export const BoardTitleForm = ({
    data
}: BoardTitleFormProps) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);

    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board updated: ${data.title}`);
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef?.current?.focus();
            inputRef?.current?.select();
        })

    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        try {
            execute({title, id: data.id})

        } catch {
            console.log("board update failed")
        } finally {
            disableEditing();
        }

    }

    const onBlur = () => {
        formRef?.current?.requestSubmit();
    }

    if (isEditing) {
        return (
            <form action={onSubmit} ref={formRef}>
                <FormInput id={"title"}
                    ref={inputRef}
                    defaultValue={data.title}
                    onBlur={onBlur}
                    classname="text-lg! font-bold  bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none h-7"
                />
            </form>
        )
    }


    return (
        <Button
            onClick={enableEditing}
            variant={"transparent"}
            className="w-auto h-auto cursor-pointer font-bold text-lg" >
            {data.title}
        </Button>
    )
}
