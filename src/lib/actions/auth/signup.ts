"use server";

import { getLocale } from "next-intl/server";
import { Argon2id } from "oslo/password";
import { FormActionState, createFormAction } from "@/lib/utils";
import { SignupFormInput, signupFormSchema } from "@/lib/validations";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

const signUpHandler = async ({
  email,
  password,
}: SignupFormInput): Promise<FormActionState> => {
  if (
    await prisma.user.findUnique({
      where: { email },
    })
  ) {
    return {
      status: "error",
      message: "You're already registered",
    };
  }

  const hashedPassword = await new Argon2id().hash(password);

  await prisma.user.create({
    data: {
      email,
      role: "organization",
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

  const locale = await getLocale();
  redirect(
    `/auth/organization/signin?callbackUrl=/${locale}/profile/organization/register`,
  );

  return null;
};

export const signUp = createFormAction(signUpHandler, signupFormSchema);
export type SignUpAction = typeof signUp;
