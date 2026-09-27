import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "./generated/prisma/enums";
import db from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
  entityTitle: string;
}

export const createAuditLogs = async (props: Props) => {
  try {
    const { orgId } = await auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found");
    }

    const { entityId, entityTitle, entityType, action } = props;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityTitle,
        entityType,
        action,
        userId: user.id,
        userName: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || "User",
        userImage: user.imageUrl,
      },
    });
  } catch (error) {
    console.log("Audit log", error);
  }
};
