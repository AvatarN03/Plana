

import { notFound, redirect } from "next/navigation";


import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { BoardNavbar } from "./_component/board-navbar";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ boardId: string }>;
}) {
    const { boardId } = await params;

    const board = await db.board.findFirst({
        where: { id: boardId },
    });

    if (!board) {
        return {
            title: "Board",
        };
    }

    return {
        title: board.title,
    };
}


const BoardIdLayout = async ({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ boardId: string }>;
}) => {
    const { orgId } = await auth();

    if (!orgId) {
        redirect("/select-org");
    }

    const resolvedParams = await params;
    const boardId = resolvedParams.boardId;

    if (!boardId) {
        notFound();
    }

    const board = await db.board.findFirst({
        where: {
            id: boardId,
            orgId,
        }
    })

    if (!board) {
        notFound();
    }


    return (
        <div className="h-screen relative bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${board.imageUrlFull})` }}
        >
            <BoardNavbar data={board} />
            <div className="absolute inset-0 bg-black/15"/>
            <main className="pt-28 relative h-full" >
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout;