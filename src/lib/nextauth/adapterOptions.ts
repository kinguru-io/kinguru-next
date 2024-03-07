import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@/server/adapters/auth-prisma.ts";
import prisma from "@/server/prisma.ts";

export const adapterOptions: Pick<
  NextAuthOptions,
  "secret" | "adapter" | "callbacks"
> = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (!session?.user) {
        return session;
      }

      const { id, role, speaker, organizations, stripeCustomerId } = user;
      return {
        ...session,
        user: {
          ...session.user,
          id,
          role,
          speaker,
          organizations,
          stripeCustomerId,
          image:
            role === "organization"
              ? organizations.at(0)?.logotype
              : user.image,
        },
      };
    },
  },
};
