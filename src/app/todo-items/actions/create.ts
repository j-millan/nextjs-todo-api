'use server';

import prisma from "@/lib/prisma";
import { TodoItem } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface CreateTodoItemInterface {
  description: string;
  completed?: boolean;
}

export const createTodoItem = async (
  data: CreateTodoItemInterface
): Promise<TodoItem> => {
  const newItem = await prisma.todoItem
    .create({ data })
    .catch((_err) => {
      throw new Error('Error trying to create new todo item.');
    })
  
    return newItem;
};
