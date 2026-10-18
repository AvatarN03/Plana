import { z } from "zod";

export const CreateCardLabel = z.object({
  name: z.string().min(1, "Label name is required").max(30),
  color: z.string().min(1, "Color is required"),
  cardId: z.string(),
  boardId: z.string(),
});
