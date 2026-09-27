"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-actions";
import db from "@/lib/db";

import { auth } from "@clerk/nextjs/server";

import { InputType, ReturnType } from "./type";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;
  console.log("DATA", data)

  
  let board;
  
  try {
    board = await db.board.update({
      where:{
        id,
        orgId
      },
      data: {
        title,

      },
    });
  } catch (error) {
    console.log(error)
    return {
      error: "failed to update",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
