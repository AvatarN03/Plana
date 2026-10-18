import { z } from "zod";

export const AssignCardMember = z.object({
  userId: z.string().min(1),
  userName: z.string().min(1),
  userImage: z.string().min(1),
  cardId: z.string(),
  boardId: z.string(),
});
