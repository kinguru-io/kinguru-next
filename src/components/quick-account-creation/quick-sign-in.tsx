"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SigninFormInner } from "@/components/sign-in";
import { revalidateAll } from "@/lib/actions";
import { type SigninFormInput, signinFormSchema } from "@/lib/validations";

export function QuickSignIn() {
  const methods = useForm<SigninFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signinFormSchema),
  });
  const t = useTranslations("auth.error");

  const onSubmit = async ({ email, password }: SigninFormInput) => {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response && response.ok) {
      await revalidateAll();
      return;
    }

    toast.error(
      t(response?.status === 401 ? "invalid_credentials" : "unknown_error"),
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SigninFormInner hideRegister />
      </form>
    </FormProvider>
  );
}
