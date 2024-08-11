import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await prisma.todoItem.deleteMany();

  const newTodo = await prisma.todoItem.createMany({
    data: [
      { description: 'Item 1' },
      { description: 'Item 2' },
      { description: 'Item 3' },
      { description: 'Item 4' },
      { description: 'Item 5' },
      { description: 'Item 6' },
      { description: 'Item 7' },
      { description: 'Item 8' },
      { description: 'Item 9' },
    ],
  });

  return NextResponse.json({
    message: "seed executed",
    // response: newTodo,
  });
};
