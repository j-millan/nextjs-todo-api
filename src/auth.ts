import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signIn as signInAction } from "./app/auth";

const credentialsProvider = Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async ({ email, password }) => {
    return signInAction(email as string, password as string);
  },
}); 

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github, Google, credentialsProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // signIn: async ({ user }) => {
    //   console.debug('Logged in: ', user);
    //   return true;
    // },

    jwt: async ({ token }) => {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      token.id = dbUser?.id ?? "Unauthenticated";
      token.roles = dbUser?.roles ?? ["no-roles"];
      token.isActive = !!dbUser?.isActive;

      return token;
    },

    session: async ({ session, token }) => {
      if (session && session.user) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.isActive = token.isActive;
      }

      return session;
    },
  },
});