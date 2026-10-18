import { z } from "zod";
import { CardAssignee } from "@/lib/generated/prisma/client";
import { ActionState } from "@/lib/create-safe-actions";
import { UnassignCardMember } from "./schema";

export type InputType = z.infer<typeof UnassignCardMember>;
export type ReturnType = ActionState<InputType, CardAssignee>;
