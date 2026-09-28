import { z } from "zod";

export const UpdateCard = z.object({
  description: z.optional(
    z.string().min(3, "Description must be more than 3 chars")
  ),
  title: z.optional(
    z
      .string()
      .min(3, "Character must be at least 3 characters long")
      .max(50, "Character must be less than 50 characters long")
  ),
  priority: z.optional(z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"])),
  dueDate: z.optional(z.string().nullable()),
  id: z.string(),
  boardId: z.string(),
});
