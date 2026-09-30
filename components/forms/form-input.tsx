"use client";

import { useFormStatus } from "react-dom";
import { forwardRef } from "react";

import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { FormErrors } from "./form-errors";

export interface FormInputProps {
    id: string,
    label?: string,
    type?: string,
    required?: boolean,
    disabled?: boolean,
    classname?: string,
    placeholder?: string,
    errors?: Record<string, string[] | undefined>,
    defaultValue?: string,
    onBlur?: () => void

}



export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    required,
    placeholder,
    classname,
    errors,
    defaultValue = "",
    onBlur,
    type,
    disabled
}, ref) => {
    const { pending } = useFormStatus();
    return (
        <div className="space-y-2">
            <div className="space-y-1">

                {
                    label &&
                    <Label htmlFor={id} className="text-xs font-semibold text-[var(--landing-text)] leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label} {required && <span className="text-red-500">*</span>}
                    </Label>
                }
                <Input
                    ref={ref}
                    id={id}
                    name={id}
                    type={type}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    disabled={pending || disabled}
                    placeholder={placeholder}
                    className={cn("h-8 rounded-none px-2 text-sm bg-[var(--landing-panel-strong)] border-[var(--landing-line)] text-[var(--landing-text)] focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)]", classname)}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors id={id} errors={errors} />
        </div>
    )
})


FormInput.displayName = "FormInput";
