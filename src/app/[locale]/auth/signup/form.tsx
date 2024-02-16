"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RichTranslationValues, useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { UseFormRegister, useForm } from "react-hook-form";
import { InputPassword } from "@/components/common/form/input-password";
import { Button, Input } from "@/components/uikit";
import {
  signupFormSchema,
  type SignupFormInput,
  AuthFormState,
  signUp,
} from "@/lib/actions/auth";
import { Link } from "@/navigation";
import { VStack } from "~/styled-system/jsx";

const translationValues: RichTranslationValues = {
  partnerAgreement: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataPolicy: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataProcess: (chunks) => <Link href="#">{chunks}</Link>,
};

export function SignupForm() {
  const {
    register,
    formState: { isValid },
  } = useForm<SignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signupFormSchema),
  });
  // TODO `state` might be used for notifications?
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
        <InputPassword
          placeholder={t("password_placeholder")}
          disabled={pending}
          {...register("password")}
        />
        <InputPassword
          placeholder={t("password_confirm_placeholder")}
          disabled={pending}
          {...register("confirmPassword")}
        />
      </VStack>
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit")}
      </Button>
      <p>{t.rich("helper", translationValues)}</p>
    </VStack>
  );
}
