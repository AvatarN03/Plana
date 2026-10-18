"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { InputType, ReturnType } from "./type";
import { UpdateChecklistItem } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId, boardId, ...values } = data;
  let checklistItem;

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!card) {
      return {
        error: "Card not found",
      };
    }

    const updateData: { isCompleted?: boolean; title?: string } = {};
    if (values.isCompleted !== undefined) updateData.isCompleted = values.isCompleted;
    if (values.title !== undefined) updateData.title = values.title;

    checklistItem = await db.checklistItem.update({
      where: {
        id,
        cardId,
      },
      data: updateData,
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to update checklist item",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checklistItem };
};

export const updateChecklistItem = createSafeAction(UpdateChecklistItem, handler);
