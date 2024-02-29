"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { UseFormRegister, useForm } from "react-hook-form";
import { Button, Input, InputPassword } from "@/components/uikit";
import { SigninFormInput, signinFormSchema } from "@/lib/validations";
import { Link } from "@/navigation";
import { VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export function SigninForm() {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<SigninFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signinFormSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || undefined;

  const onSubmit = ({ email, password }: SigninFormInput) => {
    void signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SigninFormInner register={register} isValid={isValid} />
    </form>
  );
}

function SigninFormInner({
  register,
  isValid,
}: {
  register: UseFormRegister<SigninFormInput>;
  isValid: boolean;
}) {
  const t = useTranslations("auth.signin_form");
  const { pending } = useFormStatus();

  return (
    <VStack gap="0">
      <VStack gap="15px">
        <Input
          variant="outline"
          placeholder={t("email_placeholder")}
          disabled={pending}
          {...register("email")}
        />
        <InputPassword
          placeholder={t("password_placeholder")}
          disabled={pending}
          {...register("password")}
        />
      </VStack>
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit")}
      </Button>
      <Link
        className={button({ size: "sm", variant: "ghost" })}
        href="/auth/reset"
      >
        {t("forgot_password")}
      </Link>
    </VStack>
  );
}
