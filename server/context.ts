import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession, Session } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import prisma from "./prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export interface CreateInnerContextOptions
  extends Partial<CreateNextContextOptions> {
  session: Session | null;
  locale: string;
  i18n: inferAsyncReturnType<typeof serverSideTranslations>;
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
  const acceptLanguage = req.headers["accept-language"];
  const locale = acceptLanguage?.includes("pl")
    ? "pl"
    : acceptLanguage?.includes("ru")
      ? "ru"
      : "en";
  const i18n = await serverSideTranslations(locale, ["common"]);

  const innerContext = await createInnerTRPCContext({
    req,
    locale,
    i18n,
    session,
  });

  return {
    ...innerContext,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
