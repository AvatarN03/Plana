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
    labelClassname?: string,
    placeholder?: string,
    errors?: Record<string, string[] | undefined>,
    defaultValue?: string,
    onBlur?: () => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    required,
    placeholder,
    classname,
    labelClassname,
    errors,
    defaultValue = "",
    onBlur,
    onKeyDown,
    type,
    disabled
}, ref) => {
    const { pending } = useFormStatus();
    return (
        <div className="space-y-1.5">
            {
                label &&
                <Label htmlFor={id} className={cn("text-xs font-semibold text-[var(--landing-text)] leading-5 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70", labelClassname)}>
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
                onKeyDown={onKeyDown}
                disabled={pending || disabled}
                placeholder={placeholder}
                className={cn("h-9 rounded-md px-3 text-sm bg-[var(--landing-panel-strong)] border-[var(--landing-line)] text-[var(--landing-text)] focus-visible:ring-1 focus-visible:ring-[var(--landing-orange)]", classname)}
                aria-describedby={`${id}-error`}
            />
            <FormErrors id={id} errors={errors} />
        </div>
    )
})


FormInput.displayName = "FormInput";
