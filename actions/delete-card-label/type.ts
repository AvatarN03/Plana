import { z } from "zod";
import { CardLabel } from "@/lib/generated/prisma/client";
import { ActionState } from "@/lib/create-safe-actions";
import { DeleteCardLabel } from "./schema";

export type InputType = z.infer<typeof DeleteCardLabel>;
export type ReturnType = ActionState<InputType, CardLabel>;
