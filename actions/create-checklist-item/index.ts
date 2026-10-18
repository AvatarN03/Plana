"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";
import { InputType, ReturnType } from "./type";
import { CreateChecklistItem } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, cardId, boardId } = data;
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

    const lastItem = await db.checklistItem.findFirst({
      where: { cardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastItem ? lastItem.order + 1 : 1;

    checklistItem = await db.checklistItem.create({
      data: {
        title,
        cardId,
        order: newOrder,
      },
    });

    await createAuditLogs({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create checklist item",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: checklistItem };
};

export const createChecklistItem = createSafeAction(CreateChecklistItem, handler);
