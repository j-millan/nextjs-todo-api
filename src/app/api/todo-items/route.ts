import prisma from "@/lib/prisma";
import { PaginationEnum } from "@/shared";
import { TodoItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;
  const offset = parseInt(query.get("offset") as string);
  const limit = parseInt(query.get("limit") as string);

  if (isNaN(offset) || isNaN(limit)) {
    return NextResponse.json(
      {
        error: 'Parameters "offset" and "limit" must be numbers.',
      },
      { status: 400, statusText: "Bad Request" }
    );
  }

  const todoItems = await prisma.todoItem.findMany({
    skip: offset || PaginationEnum.DEFAULT_OFFSET,
    take: limit || PaginationEnum.DEFAULT_LIMIT,
  });

  const totalCount = await prisma.todoItem.count();

  return NextResponse.json({
    totalCount,
    count: todoItems.length,
    results: todoItems,
  });
};

const postSchema = yup
  .object({
    description: yup.string().required().min(3),
    completed: yup.boolean().optional().default(false),
  })
  .noUnknown()
  .strict();

export const POST = async (req: NextRequest) => {
  try {
    const body = await postSchema.validate(await req.json());
    const item = await prisma.todoItem.create({
      data: body,
    });

    return NextResponse.json(item, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 400, statusText: "Bad Request" }
    );
  }
};
