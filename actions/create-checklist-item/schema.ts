import { z } from "zod";

export const CreateChecklistItem = z.object({
  title: z.string().min(1, "Title is required").max(120),
  cardId: z.string(),
  boardId: z.string(),
});
