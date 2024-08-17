import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  await prisma.todoItem.deleteMany();

  const newTodo = await prisma.todoItem.create({
    data: { description: "Seed item.", completed: true },
  });

  return NextResponse.json({
    message: "seed executed",
    // response: newTodo,
  });
};
