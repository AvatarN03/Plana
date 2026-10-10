"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/forms/form-submit";
import { FormTextArea } from "@/components/forms/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing
}, ref) => {
    const params = useParams();
    const boardId = params.boardId as string;

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" created successfully`);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const formRef = useRef<HTMLFormElement>(null!);

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    const onTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef?.current?.requestSubmit();
        }
    };

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const targetListId = formData.get("listId") as string;
        await execute({ title, boardId, listId: targetListId });
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    if (isEditing) {
        return (
            <form 
                ref={formRef} 
                action={onSubmit}
                className="m-1 py-1 px-1 space-y-3"
            >
                <FormTextArea
                    id="title"
                    errors={fieldErrors}
                    onKeyDown={onTextAreaKeyDown}
                    ref={ref}
                    placeholder="Enter card title..."
                />
                <input 
                    type="text"
                    hidden
                    id="listId"
                    name="listId"
                    defaultValue={listId}
                />
                <div className="flex items-center gap-x-1.5">
                    <FormSubmit classname="bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 rounded-sm text-xs font-semibold h-8 px-3">
                        Add Card
                    </FormSubmit>
                    <Button 
                        type="button"
                        variant="ghost" 
                        size="sm"
                        onClick={disableEditing}
                        className="h-8 w-8 p-0 rounded-sm text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <div className="px-2 pt-1 pb-1">
            <Button
                onClick={enableEditing}
                variant="ghost"
                size="sm"
                className="h-8 w-full flex justify-start items-center px-2 text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:bg-[var(--landing-panel-strong)] text-xs rounded-sm transition font-normal"
            >
                <Plus className="w-3.5 h-3.5 mr-1.5 text-[var(--landing-orange)]" />
                Add a card...
            </Button>
        </div>
    );
});

CardForm.displayName = "CardForm";
