"use server";

import { getTranslations } from "next-intl/server";
import { Argon2id } from "oslo/password";
import { sendVerificationEmail } from "./email";
import { FormActionState, createFormAction } from "@/lib/utils";
import {
  type UserSignupFormInput,
  userSignupFormSchema,
} from "@/lib/validations";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";

const userSignUpHandler = async ({
  email,
  password,
}: UserSignupFormInput): Promise<FormActionState> => {
  const user = await prisma.user.findUnique({ where: { email } });
  const t = await getTranslations("auth.error");

  if (user) {
    return {
      status: "error",
      message: t("email_exists"),
    };
  }

  const hashedPassword = await new Argon2id().hash(password);

  const { accounts } = await prisma.user.create({
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
    include: { accounts: { select: { emailToken: true } } },
  });

  const token = accounts.at(0)?.emailToken || "";
  await sendVerificationEmail({ email, token });

  redirect(`/auth/signin?callbackUrl=/profile/edit`);

  return null;
};

export const userSignUp = createFormAction(
  userSignUpHandler,
  userSignupFormSchema,
);
export type UserSignUpAction = typeof userSignUp;
