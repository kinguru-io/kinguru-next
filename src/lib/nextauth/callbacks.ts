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
    async signIn({ user, account }) {
      if (account && account.type === "oauth" && !user.confirmed) {
        await prisma.user.update({
          where: { id: user.id },
          data: { confirmed: true, emailVerified: new Date() },
        });
      }

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
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  }) as Partial<CallbacksOptions<Profile, Account>>;
