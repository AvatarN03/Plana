"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { InputType, ReturnType } from "./type";
import { DeleteChecklistItem } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId, boardId } = data;
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

    checklistItem = await db.checklistItem.delete({
      where: {
        id,
        cardId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to delete checklist item",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checklistItem };
};

export const deleteChecklistItem = createSafeAction(DeleteChecklistItem, handler);
