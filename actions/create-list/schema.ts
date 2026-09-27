import { z } from "zod";

export const CreateList = z.object({
  title: z.string().min(3, "Character must be at least 3 characters long").max(50, "Character must be less than 50 characters long"),
  boardId: z.string()
});


