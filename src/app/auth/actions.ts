import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export const signIn = async (
  email: string,
  password: string
): Promise<User | null> => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return await signUp(email, password);
  } 
  
  if (bcrypt.compareSync(password, user.password || "")) {
    return user;
  }

  return null;
};

export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  const user = prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
    },
  });

  return user;
};
