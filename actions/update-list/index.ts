"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";

import { auth } from "@clerk/nextjs/server";

import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";

import { InputType, ReturnType } from "./type";
import { UpdateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, boardId } = data;
  
  let list;
  
  try {
    list = await db.list.update({
      where:{
        id,
        boardId,
        board: {
          orgId
        }
      },
      data: {
        title,
      },
    });

    await createAuditLogs({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    console.log(error)
    return {
      error: "failed to update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
