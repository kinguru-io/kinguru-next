import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { Account, CallbacksOptions, Profile } from "next-auth";
import { isCredentialsCallback } from "@/lib/nextauth/helpers.ts";
import prisma from "@/server/prisma.ts";

export const callbacks = (
  request: NextRequest,
  params: { nextauth: string[] },
) =>
  ({
    session({ session, user }) {
      if (session?.user) {
        session.user.role = user.role;
        session.user.id = user.id;
        session.user.speaker = user.speaker;
        session.user.stripeCustomerId = user.stripeCustomerId;
      }
      return session;
    },
    async signIn({ user }) {
      if (isCredentialsCallback(request, params)) {
        if (user) {
          const sessionToken = randomUUID();
          const sessionExpiry = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

          await prisma.session.create({
            data: {
              sessionToken,
              userId: user.id,
              expires: sessionExpiry,
            },
          });

          cookies().set("next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
          });
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  }) as Partial<CallbacksOptions<Profile, Account>>;
