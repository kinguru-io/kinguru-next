import { NextRequest } from "next/server";
import NextAuth, { AuthOptions } from "next-auth";
import { adapterOptions } from "@/lib/nextauth/adapterOptions.ts";
import { callbacks } from "@/lib/nextauth/callbacks.ts";
import { events } from "@/lib/nextauth/events.ts";
import { jwt } from "@/lib/nextauth/jwt.ts";
import { providers } from "@/lib/nextauth/providers.ts";
import { PrismaAdapter } from "@/server/adapters/auth-prisma.ts";
import prisma from "@/server/prisma.ts";

interface Context {
  params: { nextauth: string[] };
}

const adapter = PrismaAdapter(prisma);

export const authOptionsWrapper = (request: NextRequest, context: Context) => {
  const { params } = context;
  return [
    request,
    context,
    {
      providers: providers(adapter),
      callbacks: callbacks(request, params),
      jwt: jwt(request, params),
      events,
      ...adapterOptions,
      pages: {
        signIn: `/auth/signin`,
      },
    } as AuthOptions,
  ] as const;
};

export async function handler(request: NextRequest, context: Context) {
  return NextAuth(...authOptionsWrapper(request, context));
}
