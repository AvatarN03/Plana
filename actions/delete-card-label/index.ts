"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { InputType, ReturnType } from "./type";
import { DeleteCardLabel } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId, boardId } = data;
  let label;

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

    label = await db.cardLabel.delete({
      where: {
        id,
        cardId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to delete label",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: label };
};

export const deleteCardLabel = createSafeAction(DeleteCardLabel, handler);
