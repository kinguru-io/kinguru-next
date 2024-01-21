import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession, Session } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export interface CreateInnerContextOptions
  extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

export async function createInnerTRPCContext(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    ...opts,
  };
}

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = req && res && (await getServerSession(req, res, authOptions));
  const innerContext = await createInnerTRPCContext({
    req,
    session,
  });

  return {
    ...innerContext,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
