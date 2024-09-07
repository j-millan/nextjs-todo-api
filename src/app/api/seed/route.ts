import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  await prisma.todoItem.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@email.com',
      password: bcrypt.hashSync('123456'),
      roles: ['User', 'Admin', 'SuperUser'],
      todos: {
        create: [
          { description: 'Todo 1', completed: true },
          { description: 'Todo 2', completed: false },
          { description: 'Todo 3', completed: true },
          { description: 'Todo 4', completed: false },
        ]
      }
    },
  })

  return NextResponse.json({
    message: "seed executed",
    // response: newTodo,
  });
};
