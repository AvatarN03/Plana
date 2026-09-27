"use client";
import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board"
import { toast } from "sonner"
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
    children: React.ReactNode,
    side?: 'top' | 'bottom' | 'left' | 'right',
    sideOffSet?: number
    align?: 'start' | 'center' | 'end'
}


export const FormPopover = (
    {
        children,
        side = "bottom",
        sideOffSet = 0,
        align = "center"
    }: FormPopoverProps
) => {

    const closeRef = useRef<ElementRef<typeof PopoverClose>>(null);
    const router = useRouter();
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Board created successfully : ${data.title }`)
            closeRef?.current?.click();
            router.push(`/board/${data.id}`)
        },
        onError: (error) => {
            toast.error('Failed to create board', { description: error })
        }
    })

    const onSubmit = async (fromData: FormData) => {

        const title = fromData.get('title') as string
        const image = fromData.get('cover') as string
        await execute({ title, image })
    }
    return (
        <Popover >
            <PopoverTrigger asChild >
                {children}
            </PopoverTrigger>
            <PopoverContent side={side} sideOffset={sideOffSet} align={align} className="w-80 pt-3">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button variant={"ghost"} className="absolute right-3 top-3 cursor-pointer">
                        <X className="h-4 w-4 " />
                    </Button>
                </PopoverClose>
                <form className="space-y-4" action={onSubmit}>
                    <div className="space-y-4">
                        <FormPicker id="cover" errors={fieldErrors} />
                        <FormInput label="Board name" id="title" type="text" placeholder="e.g. Project Alpha" errors={fieldErrors} />
                    </div>
                    <FormSubmit classname="w-full" >
                        Create board
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}
