"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCompletedTodoItems = async (): Promise<void> => {
  await prisma.todoItem.deleteMany({ where: { completed: true } });
  revalidatePath("/dashboard/server-actions");
};

export const deleteTodoItem = async (id: string): Promise<void> => {
  await prisma.todoItem.delete({ where: { id } }).catch((_) => {
    throw new Error("Todo item to delete does not exist.");
  });

  revalidatePath("/dashboard/server-actions");
};
