import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"


interface HintProps {
    children: React.ReactNode,
    description: string,
    side?: 'top' | 'bottom' | 'left' | 'right',
    sideOffSet?: number
}

export const Hint = ({
    children,
    description,
    side = "left",
    sideOffSet = 0
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0} >
                <TooltipTrigger >
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} sideOffset={sideOffSet} className="text-xs max-w-55  wrap-break-word">
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
} 