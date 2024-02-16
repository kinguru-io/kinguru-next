"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { UseFormRegister, useForm } from "react-hook-form";
import { Button, Input, InputPassword } from "@/components/uikit";
import {
  signinFormSchema,
  type SigninFormInput,
  AuthFormState,
  signIn,
} from "@/lib/actions/auth";
import { Link } from "@/navigation";
import { VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export function SigninForm() {
  const {
    register,
    formState: { isValid },
  } = useForm<SigninFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signinFormSchema),
  });
  // TODO `state` might be used for notifications?
  const [_state, formAction] = useFormState<AuthFormState, FormData>(
    signIn,
    null,
  );

  return (
    <form action={formAction}>
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
