import { z } from "zod";
import { CardLabel } from "@/lib/generated/prisma/client";
import { ActionState } from "@/lib/create-safe-actions";
import { CreateCardLabel } from "./schema";

export type InputType = z.infer<typeof CreateCardLabel>;
export type ReturnType = ActionState<InputType, CardLabel>;
