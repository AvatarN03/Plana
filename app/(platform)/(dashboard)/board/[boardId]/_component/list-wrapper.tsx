"use client";



export const ListWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <li className="shrink-0 h-full w-68  select-none  ">
            {children}
        </li>
    )
}
