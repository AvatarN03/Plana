"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";
import { createAuditLogs } from "@/lib/create-audit-logs";
import { ACTION, ENTITY_TYPE } from "@/lib/generated/prisma/enums";
import { InputType, ReturnType } from "./type";
import { AssignCardMember } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId: currentUserId, orgId } = await auth();
  if (!currentUserId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { userId: targetUserId, userName, userImage, cardId, boardId } = data;
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

    assignee = await db.cardAssignee.upsert({
      where: {
        cardId_userId: {
          cardId,
          userId: targetUserId,
        },
      },
      update: {
        userName,
        userImage,
      },
      create: {
        userId: targetUserId,
        userName,
        userImage,
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
      error: "Failed to assign member",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: assignee };
};

export const assignCardMember = createSafeAction(AssignCardMember, handler);
