import { z } from "zod";

export const CreateBoard = z.object({
  title: z.string().min(3, "Character must be at least 3 characters long").max(50, "Character must be less than 50 characters long"),
  image: z.string("Image is required"),
  template: z.optional(z.enum(["BLANK", "SOFTWARE", "PERSONAL"])),
});


