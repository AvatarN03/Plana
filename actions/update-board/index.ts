"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";

import { auth } from "@clerk/nextjs/server";

import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";

import { InputType, ReturnType } from "./type";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;
  
  let board;
  
  try {
    board = await db.board.update({
      where:{
        id,
        orgId
      },
      data: {
        title,
      },
    });

    await createAuditLogs({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    console.log(error)
    return {
      error: "failed to update",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
