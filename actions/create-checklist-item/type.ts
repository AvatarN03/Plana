import { z } from "zod";
import { ChecklistItem } from "@/lib/generated/prisma/client";
import { ActionState } from "@/lib/create-safe-actions";
import { CreateChecklistItem } from "./schema";

export type InputType = z.infer<typeof CreateChecklistItem>;
export type ReturnType = ActionState<InputType, ChecklistItem>;
