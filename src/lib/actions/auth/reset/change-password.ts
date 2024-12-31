"use server";

import { getTranslations } from "next-intl/server";
import { Argon2id } from "oslo/password";
import { verificationRequestPostfix } from "../config";
import { checkResetToken } from "./check-reset-token";

export async function changePassword({
  password,
  token,
}: {
  password: string;
  token: string;
}) {
  const checkResult = await checkResetToken(token, true);

  if (!checkResult.ok || !checkResult.request) {
    return { ok: false, message: checkResult.message };
  }

  const userEmail = checkResult.request.identifier.replace(
    verificationRequestPostfix.passwordChange,
    "",
  );

  const t = await getTranslations("auth.change_password");
  const user = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!user) {
    return {
      ok: false,
      message: t("unknown_error"),
    };
  }

  const hashedPassword = await new Argon2id().hash(password);

  await prisma.$transaction([
    prisma.verificationRequest.deleteMany({
      where: { identifier: checkResult.request.identifier },
    }),
    prisma.session.deleteMany({ where: { userId: user.id } }),
    prisma.account.deleteMany({
      where: { userId: user.id, type: "credentials" },
    }),
  ]);

  await prisma.account.create({
    data: {
      userId: user.id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: hashedPassword,
    },
  });

  return {
    ok: true,
    message: t("password_changed"),
    email: user.email,
  };
}
