"use server";

import { isBefore } from "date-fns";
import { getTranslations } from "next-intl/server";
import { verificationRequestPostfix } from "../config";
import { getSession } from "@/auth";
import { updateUserConfirmation } from "@/lib/actions/auth";
import prisma from "@/server/prisma";

export async function verifyCode(token: string) {
  const t = await getTranslations("verification");
  const session = await getSession();

  if (!session || !session.user || !session.user.email) {
    return { ok: false, message: t("bad_token") };
  }

  if (session.user.confirmed) {
    return { ok: true, message: t("email_verified") };
  }

  if (Number.isNaN(Number(token)))
    return { ok: false, message: t("incorrect_code") };

  const identifier = `${session.user.email}${verificationRequestPostfix.emailVerification}`;

  const request = await prisma.verificationRequest.findUnique({
    where: {
      identifier_token: {
        identifier,
        token,
      },
    },
  });

  if (!request) {
    return { ok: false, message: t("incorrect_code") };
  }

  const deleteTokensPromise = prisma.verificationRequest.deleteMany({
    where: { identifier },
  });

  if (isBefore(request.expires, new Date())) {
    await deleteTokensPromise;

    return { ok: false, message: t("code_expired") };
  }

  await Promise.all([
    updateUserConfirmation(session.user),
    deleteTokensPromise,
  ]);

  return { ok: true, message: t("email_verified") };
}
