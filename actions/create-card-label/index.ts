"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";
import { InputType, ReturnType } from "./type";
import { CreateCardLabel } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, color, cardId, boardId } = data;
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

    label = await db.cardLabel.create({
      data: {
        name,
        color,
        cardId,
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
      error: "Failed to create label",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: label };
};

export const createCardLabel = createSafeAction(CreateCardLabel, handler);
