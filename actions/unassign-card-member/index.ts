"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { InputType, ReturnType } from "./type";
import { UnassignCardMember } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, cardId, boardId } = data;
  let assignee;

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

    assignee = await db.cardAssignee.delete({
      where: {
        id,
        cardId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to remove assigned member",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: assignee };
};

export const unassignCardMember = createSafeAction(UnassignCardMember, handler);
