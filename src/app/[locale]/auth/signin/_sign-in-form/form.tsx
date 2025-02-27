"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SigninFormInner } from "@/components/sign-in";
import type { RevalidateAll } from "@/lib/actions/auth";
import { type SigninFormInput, signinFormSchema } from "@/lib/validations";
import { useRouter } from "@/navigation";

export function SignInForm({
  revalidateAll,
  isCompany,
}: {
  revalidateAll: RevalidateAll;
  isCompany?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      router.replace(searchParams.get("callbackUrl") || "/");
      return;
    }

    toast.error(
      t(response?.status === 401 ? "invalid_credentials" : "unknown_error"),
    );
  };

  useEffect(() => {
    const error = searchParams.get("error");

    if (!error || error.length === 0) return;

    const id = toast.error(
      t(error === "OAuthAccountNotLinked" ? "email_exists" : "unknown_error"),
    );

    return () => toast.remove(id);
  }, [searchParams]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SigninFormInner isCompany={isCompany} />
      </form>
    </FormProvider>
  );
}
