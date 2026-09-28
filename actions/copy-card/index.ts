"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";

import { auth } from "@clerk/nextjs/server";

import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";

import { InputType, ReturnType } from "./type";
import { CopyCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let card;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return {
        error: "card not found",
      };
    }

    const lastcardOrder = await db.card.findFirst({
      where: {
        list: {
          board: {
            orgId,
          },
        },
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastcardOrder ? lastcardOrder.order + 1 : 1;

    card = await db.card.create({
      data: {
        listId: cardToCopy.listId,
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        priority: cardToCopy.priority,
        dueDate: cardToCopy.dueDate,
        order: newOrder,
      }
    });

    await createAuditLogs({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "failed to copy the card",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
