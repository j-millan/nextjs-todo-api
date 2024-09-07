'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { TodoItem } from "@prisma/client";

export interface CreateTodoItemInterface {
  description: string;
  completed?: boolean;
}

export const createTodoItem = async (
  data: CreateTodoItemInterface
): Promise<TodoItem> => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Not authenticated.');
  }

  const newItem = await prisma.todoItem
    .create({ 
      data: { ...data, userId: session.user.id! } 
    })
    .catch((_err) => {
      throw new Error('Error trying to create new todo item.');
    })
  
    return newItem;
};
