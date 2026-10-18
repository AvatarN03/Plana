import { z } from "zod";

export const DeleteCardLabel = z.object({
  id: z.string(),
  cardId: z.string(),
  boardId: z.string(),
});
