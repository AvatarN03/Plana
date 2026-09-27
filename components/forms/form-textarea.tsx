"use client";

import { forwardRef, KeyboardEventHandler } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { defaultImages } from "@/constant/image";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextAreaProps {
    id: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    disabled?: boolean,
    classname?: string,
    defaultValue?: string,
    onBlur?: () => void,
    onClick?: () => void,
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined,
    errors?: Record<string, string[] | undefined>

}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(({
    id,
    label,
    errors,
    onBlur,
    onClick,
    onKeyDown,
    classname,
    defaultValue,
    required,
    disabled,
    placeholder
}, ref) => {


    const {pending} = useFormStatus();

    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {
                    label && (
                        <Label htmlFor={id} className="text-xs font-semibold text-neutral-700" >
                            {label}
                        </Label>
                    )
                }

                <Textarea
                    id={id}
                    name={id}
                    ref={ref}
                    onBlur={onBlur}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    className={cn("resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm", classname)}
                    defaultValue={defaultValue}
                    required={required}
                    disabled={pending || disabled}
                    placeholder={placeholder}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors id={id} errors={errors} />
        </div>
    )
})


FormTextArea.displayName = "FormTextArea"