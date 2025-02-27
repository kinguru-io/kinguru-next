import { getTranslations } from "next-intl/server";
import { updateUserConfirmation } from "@/lib/actions";
import prisma from "@/server/prisma";

export async function verifyEmail(token: string) {
  const t = await getTranslations("verification");
  const account = await prisma.account.findUnique({
    where: { emailToken: token || "" },
    include: { user: true },
  });

  if (!account) {
    return { ok: false, message: t("bad_token") };
  }

  if (account.user.confirmed) {
    return { ok: true, message: t("email_verified") };
  }

  await updateUserConfirmation(account.user);

  return { ok: true, message: t("email_verified") };
}
