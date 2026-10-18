import { z } from "zod";

export const UnassignCardMember = z.object({
  id: z.string(),
  cardId: z.string(),
  boardId: z.string(),
});
