"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";

import { auth } from "@clerk/nextjs/server";

import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";

import { InputType, ReturnType } from "./type";
import { CreateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageUrl, imageUrlFull] = image.split("|");
  if (!imageId || !imageUrl ) {
    return {
      error: "Missing field values",
    };
  }
  let board;
  
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageUrl,
        imageUrlFull : imageUrlFull || imageUrl
      },
    });

    await createAuditLogs({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log(error)
    return {
      error: "failed to create",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
