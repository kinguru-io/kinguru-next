"use server";

import bcrypt from "bcrypt";
import { AuthFormState, createFormAction } from "@/lib/utils";
import { SignupFormInput, signupFormSchema } from "@/lib/validations";
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

  await prisma.user.create({
    data: {
      email,
      accounts: {
        create: [
          {
            type: "credentials",
            provider: "credentials",
            providerAccountId: await bcrypt.hash(password, 10),
          },
        ],
      },
    },
  });

  return {
    status: "success",
    message: "OK",
  };
};

export const signUp = createFormAction(signUpHandler, signupFormSchema);
export type SignUpAction = typeof signUp;
