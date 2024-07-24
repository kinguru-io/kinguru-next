"use server";

import { getTranslations } from "next-intl/server";
import { Argon2id } from "oslo/password";
import { sendVerificationEmail } from "@/lib/actions/auth/email";
import { FormActionState, createFormAction } from "@/lib/utils";
import { SignupFormInput, signupFormSchema } from "@/lib/validations";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";

const companySignUpHandler = async ({
  name,
  email,
  password,
}: SignupFormInput): Promise<FormActionState> => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ email }, { company: name }] },
  });
  const t = await getTranslations("auth.error");

  if (user) {
    return {
      status: "error",
      message: t("email_or_name_exist"),
    };
  }

  const hashedPassword = await new Argon2id().hash(password);

  const { accounts } = await prisma.user.create({
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
    include: { accounts: { select: { emailToken: true } } },
  });

  const token = accounts.at(0)?.emailToken || "";

  await sendVerificationEmail({ email, token });

  redirect(`/auth/signin/company?callbackUrl=/profile/edit`);

  return null;
};

export const companySignUp = createFormAction(
  companySignUpHandler,
  signupFormSchema,
);
export type CompanySignUpAction = typeof companySignUp;
