"use server";

import { addHours, isBefore } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";
import { v4 as uuid } from "uuid";
import { verificationRequestPostfix } from "../config";
import { transporter } from "@/lib/email";
import { logger } from "@/lib/logger";
import prisma from "@/server/prisma";
import { renderResetPasswordEmail } from "~/emails";

const resetPasswordEmailLogger = logger.child({ name: "requestPasswordReset" });

export async function requestPasswordReset({ email }: { email: string }) {
  const t = await getTranslations("auth");
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { ok: false, message: t("reset_form.email_not_found") };
  }

  const identifier = `${user.email}${verificationRequestPostfix.passwordChange}`;

  const request = await prisma.verificationRequest.findFirst({
    where: { identifier },
  });

  const tasks = [];
  const currentTime = new Date();

  if (request && isBefore(request.expires, currentTime)) {
    tasks.push(
      prisma.verificationRequest.deleteMany({ where: { identifier } }),
    );
  }

  const token =
    request && isBefore(currentTime, request.expires)
      ? request.token
      : await getNewRequestToken(identifier);

  tasks.push(sendResetMail({ token, email: user.email }));

  const results = await Promise.all(tasks);

  return results.includes(null)
    ? { ok: false, message: t("error.unknown_error") }
    : { ok: true, message: t("email_sent") };
}

async function getNewRequestToken(identifier: string) {
  const request = await prisma.verificationRequest.create({
    data: {
      identifier,
      token: uuid(),
      expires: addHours(new Date(), 1),
    },
  });

  return request.token;
}

async function sendResetMail({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const [locale, mailT] = await Promise.all([
    getLocale(),
    getTranslations("emails"),
  ]);

  const resetURL = new URL(`${process.env.SITE_URL}/${locale}/reset-password`);
  resetURL.searchParams.set("token", token);

  const mailProps = {
    linkHref: resetURL.toString(),
    t: mailT,
  };

  return transporter
    .sendMail({
      to: email,
      subject: `${mailT("reset_password.heading")} | Eventify`,
      html: await renderResetPasswordEmail(mailProps),
      text: await renderResetPasswordEmail(mailProps, true),
    })
    .catch((error) => {
      resetPasswordEmailLogger.error(error);
      return null;
    });
}
