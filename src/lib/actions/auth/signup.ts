"use server";

import { Argon2id } from "oslo/password";
import { FormActionState, createFormAction } from "@/lib/utils";
import { SignupFormInput, signupFormSchema } from "@/lib/validations";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

const signUpHandler = async ({
  name,
  email,
  password,
}: SignupFormInput): Promise<FormActionState> => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ email }, { company: name }] },
  });

  if (user) {
    return {
      status: "error",
      message: "Email or company name is already registered",
    };
  }

  const hashedPassword = await new Argon2id().hash(password);

  await prisma.user.create({
    data: {
      email,
      role: "organization",
      company: name,
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

  redirect(`/auth/signin/company?callbackUrl=/profile/edit`);

  return null;
};

export const signUp = createFormAction(signUpHandler, signupFormSchema);
export type SignUpAction = typeof signUp;
