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

  const { title, image, isPinned, id } = data;
  
  let board;
  
  try {
    const updateData: {
      title?: string;
      imageId?: string;
      imageUrl?: string;
      imageUrlFull?: string;
      isPinned?: boolean;
    } = {};

    if (title !== undefined) {
      const trimmed = title.trim();
      if (trimmed.length < 3) {
        return {
          error: "Title must be at least 3 characters long",
        };
      }
      updateData.title = trimmed;
    }

    if (image !== undefined) {
      const [imageId, imageUrl, imageUrlFull] = image.split("|");
      if (!imageId || !imageUrl) {
        return {
          error: "Invalid image format",
        };
      }
      updateData.imageId = imageId;
      updateData.imageUrl = imageUrl;
      updateData.imageUrlFull = imageUrlFull || imageUrl;
    }

    if (isPinned !== undefined) {
      updateData.isPinned = isPinned;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        error: "No changes provided",
      };
    }

    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: updateData,
    });

    await createAuditLogs({
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "failed to update",
    };
  }

  revalidatePath(`/board/${board.id}`);
  revalidatePath(`/organization/${orgId}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
