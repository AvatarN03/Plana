
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
    listId: string,
    enableEditing: () => void
    disableEditing: () => void
    isEditing: boolean
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
            toast.success(`Card ${data.title} created successfully`);
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
    }

    const onTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef?.current?.requestSubmit();
        }
    }


    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        console.log( {title, boardId, listId })
        await execute({ title, boardId, listId });
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);



    if (isEditing) {
        return (
            <form ref={formRef} action={onSubmit}
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextArea
                    id={"title"}
                    errors={fieldErrors}
                    onKeyDown={onTextAreaKeyDown}
                    ref={ref}
                    placeholder="Enter the card name...."
                />
                <input type="text"
                    hidden
                    id={"listId"}
                    name={"listId"}
                    defaultValue={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add Card
                    </FormSubmit>
                    <Button variant={"ghost"} onClick={disableEditing}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </form>
        )
    }


    return (
        <div className="p-2 pb-0">
            <Button
                onClick={enableEditing}
                variant={"ghost"}
                size="sm"
                className="h-auto w-full flex justify-start items-center px-2 py-1.5 text-muted-foreground text-sm"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add Card...

            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm"
