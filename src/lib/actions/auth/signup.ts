"use server";

import { Argon2id } from "oslo/password";
import { AuthFormState, createFormAction } from "@/lib/utils";
import { SignupFormInput, signupFormSchema } from "@/lib/validations";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

const signUpHandler = async ({
  email,
  password,
}: SignupFormInput): Promise<AuthFormState> => {
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

  redirect("/profile/organization-register");

  return {
    status: "success",
    message: "OK",
  };
};

export const signUp = createFormAction(signUpHandler, signupFormSchema);
export type SignUpAction = typeof signUp;
