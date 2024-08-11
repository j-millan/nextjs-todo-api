import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

interface TodoItemsSegments {
  params: {
    id: string;
  };
}

export const GET = async (req: NextRequest, { params }: TodoItemsSegments) => {
  const todoItem = await prisma.todoItem.findFirst({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(todoItem);
};

const putSchema = yup
  .object({
    description: yup.string().optional(),
    completed: yup.boolean().optional(),
  })
  .noUnknown()
  .strict();

export const PUT = async (req: Request, { params }: TodoItemsSegments) => {
  try {
    const body = await putSchema.validate(await req.json());
    const item =await prisma.todoItem.update({
      where: {
        id: params.id,
      },
      data: {
        ...body,
      },
    });
  
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 400, statusText: "Bad Request" }
    );
  }
};
