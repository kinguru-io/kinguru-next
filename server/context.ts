import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import prisma from "./prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = req && res && (await getServerSession(req, res, authOptions));
  const acceptLanguage = req.headers["accept-language"];
  const locale = acceptLanguage?.includes("pl") ? "pl" : "en";
  const i18n = await serverSideTranslations(locale, ["common"]);
  return {
    req,
    res,
    session,
    prisma,
    locale,
    i18n,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
