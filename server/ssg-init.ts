import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SuperJSON from "superjson";
import { createInnerTRPCContext } from "./context";
import { appRouter } from "./routers/_app";
import { i18n } from "next-i18next.config";

export async function ssgInit<TParams extends { locale?: string }>(
  opts: GetStaticPropsContext<TParams>,
) {
  const locale = opts.params?.locale ?? opts?.locale ?? i18n.defaultLocale;
  const _i18n = await serverSideTranslations(locale, ["common"]);

  const ssg = createServerSideHelpers<typeof appRouter>({
    router: appRouter,
    ctx: await createInnerTRPCContext({
      locale,
      session: null,
      i18n: _i18n,
    }),
    transformer: SuperJSON,
  });

  await ssg.i18n.fetch();

  return ssg;
}
