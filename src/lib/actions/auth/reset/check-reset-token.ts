import { isBefore } from "date-fns";
import { getTranslations } from "next-intl/server";
import prisma from "@/server/prisma";

export async function checkResetToken(token: string, addRequest?: boolean) {
  const t = await getTranslations("reset_process");
  const request = await prisma.verificationRequest.findFirst({
    where: { token },
  });

  if (!request) {
    return {
      ok: false,
      message: t("bad_token"),
    };
  }

  if (isBefore(request.expires, new Date())) {
    await prisma.verificationRequest.deleteMany({
      where: { identifier: request.identifier },
    });

    return {
      ok: false,
      message: t("expired_link"),
    };
  }

  return addRequest ? { ok: true, request } : { ok: true };
}
