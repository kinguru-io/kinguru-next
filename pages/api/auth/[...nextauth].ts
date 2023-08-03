import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
// eslint-disable-next-line no-duplicate-imports
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { Adapter } from "next-auth/src/adapters";
import prisma from "@/server/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
};
export default NextAuth(authOptions);
