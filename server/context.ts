import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getServerSession(req, res, authOptions);
  return {
    req,
    res,
    session,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
