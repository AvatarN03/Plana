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
        const template = (fromData.get('template') as "BLANK" | "SOFTWARE" | "PERSONAL") || undefined
        await execute({ title, image, template })
    }
    return (
        <Popover >
            <PopoverTrigger asChild >
                {children}
            </PopoverTrigger>
            <PopoverContent side={side} sideOffset={sideOffSet} align={align} className="w-80 p-4 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-none shadow-2xl">
                <div className="text-xs font-mono uppercase tracking-wider text-center text-[var(--landing-muted)] pb-3 border-b border-[var(--landing-line)]">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button variant={"ghost"} size="sm" className="absolute right-2 top-2 h-7 w-7 p-0 cursor-pointer text-[var(--landing-muted)] hover:text-[var(--landing-text)]">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form className="space-y-4 pt-3" action={onSubmit}>
                    <div className="space-y-4">
                        <FormPicker id="cover" errors={fieldErrors} />
                        <FormInput label="Board name" id="title" type="text" placeholder="e.g. Project Alpha" errors={fieldErrors} />
                        <div className="space-y-1.5">
                            <label htmlFor="template" className="text-xs font-semibold text-[var(--landing-text)]">
                                Starter Template
                            </label>
                            <select
                                name="template"
                                id="template"
                                defaultValue="BLANK"
                                className="w-full text-xs p-2 border border-[var(--landing-line)] rounded-none bg-[var(--landing-panel-strong)] text-[var(--landing-text)] focus:outline-none focus:border-[var(--landing-orange)] cursor-pointer"
                            >
                                <option value="BLANK" className="bg-[var(--landing-panel)] text-[var(--landing-text)]">Blank Board (Start from scratch)</option>
                                <option value="SOFTWARE" className="bg-[var(--landing-panel)] text-[var(--landing-text)]">Software Kanban (5 lists)</option>
                                <option value="PERSONAL" className="bg-[var(--landing-panel)] text-[var(--landing-text)]">Personal Tasks (4 lists)</option>
                            </select>
                        </div>
                    </div>
                    <FormSubmit classname="w-full cursor-pointer bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] hover:brightness-110 rounded-none text-xs font-bold" >
                        Create board
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}
