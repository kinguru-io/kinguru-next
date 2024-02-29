import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@/server/adapters/auth-prisma.ts";
import prisma from "@/server/prisma.ts";

export const adapterOptions: Pick<NextAuthOptions, "secret" | "adapter"> = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
};
