import { z } from "zod";

export const UpdateBoard = z.object({
  title: z.optional(
    z
      .string()
      .trim()
      .min(3, "Character must be at least 3 characters long")
      .max(50, "Character must be less than 50 characters long")
  ),
  image: z.optional(z.string()),
  isPinned: z.optional(z.boolean()),
  id: z.string(),
});


