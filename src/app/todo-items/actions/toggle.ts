"use server";

import prisma from "@/lib/prisma";
import { TodoItem } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodoItem = async (
  id: string,
  completed: boolean
): Promise<TodoItem> => {
  await prisma.todoItem
    .findFirstOrThrow({ where: { id } })
    .catch((_err) => {
      throw new Error(`Todo item with id ${id} not found.`);
    });

  const updatedItem = await prisma.todoItem.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/dashboard/server-actions");
  return updatedItem;
};
