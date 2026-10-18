import { z } from "zod";

export const UpdateChecklistItem = z.object({
  id: z.string(),
  cardId: z.string(),
  boardId: z.string(),
  isCompleted: z.optional(z.boolean()),
  title: z.optional(z.string().min(1).max(120)),
});
