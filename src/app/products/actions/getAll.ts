'use client';

import prisma from "@/lib/prisma";
import { Product } from "@prisma/client";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = prisma.product.findMany();
    return products;
  } catch (error) {
    throw new Error("Failed to get products.");
  }
};