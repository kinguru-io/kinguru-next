"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { UseFormRegister, useForm } from "react-hook-form";
import { Button, Input } from "@/components/uikit";
import {
  signupFormSchema,
  type SignupFormInput,
  AuthFormState,
  signUp,
} from "@/lib/actions/auth";
import { Link } from "@/navigation";
import { VStack } from "~/styled-system/jsx";

export function SignupForm() {
  const {
    register,
    formState: { isValid },
  } = useForm<SignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signupFormSchema),
  });

  const [_state, formAction] = useFormState<AuthFormState, FormData>(
    signUp,
    null,
  );

  return (
    <form action={formAction}>
      <SignupFormInner register={register} isValid={isValid} />
    </form>
  );
}

function SignupFormInner({
  register,
  isValid,
}: {
  register: UseFormRegister<SignupFormInput>;
  isValid: boolean;
}) {
  const t = useTranslations("auth.signup_form");
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
        <Input
          type="password"
          variant="outline"
          placeholder={t("password_placeholder")}
          disabled={pending}
          {...register("password")}
        />
        <Input
          type="password"
          variant="outline"
          placeholder={t("password_confirm_placeholder")}
          disabled={pending}
          {...register("confirmPassword")}
        />
      </VStack>
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit")}
      </Button>
      <p>
        {t("helper_part_1")} <Link href="#">{t("helper_link_agreement")}</Link>
        {t("helper_part_2")}
        <Link href="#">{t("helper_link_data")}</Link>
        {t("helper_part_3")}
      </p>
    </VStack>
  );
}
