import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const { orgId } = await auth();

    if (!orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const boards = await db.board.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(boards);
  } catch {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
