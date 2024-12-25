"use server";

import { getTranslations } from "next-intl/server";
import { Argon2id } from "oslo/password";
import { sendVerificationEmail } from "./email";
import { randomNumbers } from "@/lib/shared/utils";
import type { UserSignupFormInput } from "@/lib/validations";
import prisma from "@/server/prisma";

export async function quickUserSignUp({
  email,
  password,
}: UserSignupFormInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  const t = await getTranslations("auth.error");

  if (user) {
    return {
      status: "error",
      message: t("email_exists"),
    };
  }

  const hashedPassword = await new Argon2id().hash(password);

  const { email: userEmail } = await prisma.user.create({
    data: {
      email,
      role: "user",
      accounts: {
        create: [
          {
            type: "credentials",
            provider: "credentials",
            providerAccountId: hashedPassword,
          },
        ],
      },
    },
  });

  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);

  const request = await prisma.verificationRequest.create({
    data: {
      identifier: userEmail,
      token: randomNumbers(6),
      expires: date,
    },
  });

  await sendVerificationEmail({
    email: request.identifier,
    token: request.token,
    isCode: true,
  });

  return null;
}
