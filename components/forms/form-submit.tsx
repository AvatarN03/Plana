"use client";

import React from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '../ui/button'

export const FormSubmit = ({
    children,
    variant,
    classname,
    disabled
}: {
    children: React.ReactNode,
    variant?: "destructive" | "outline" | "secondary" | "ghost" | "link",
    classname?: string,
    disabled?: boolean
}) => {

    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant={variant}
            className={classname}
            disabled={pending || disabled}
        >
            {children}
        </Button>
    )
}
