"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, type UseFormRegister } from "react-hook-form";
import { Button, Input } from "@/components/uikit";
import {
  resetFormSchema,
  resetPassword,
  type AuthFormState,
  type ResetFormInput,
} from "@/lib/actions/auth";
import { VStack } from "~/styled-system/jsx";

export function ResetForm() {
  const {
    register,
    formState: { isValid },
  } = useForm<ResetFormInput>({
    mode: "onBlur",
    resolver: zodResolver(resetFormSchema),
  });
  // TODO `state` might be used for notifications?
  const [_state, formAction] = useFormState<AuthFormState, FormData>(
    resetPassword,
    null,
  );

  return (
    <form action={formAction}>
      <ResetFormInner register={register} isValid={isValid} />
    </form>
  );
}

function ResetFormInner({
  register,
  isValid,
}: {
  register: UseFormRegister<ResetFormInput>;
  isValid: boolean;
}) {
  const t = useTranslations("auth.reset_form");
  const { pending } = useFormStatus();

  return (
    <VStack gap="0">
      <Input
        variant="outline"
        placeholder={t("email_placeholder")}
        disabled={pending}
        {...register("email")}
      />
      <p>{t("helper")}</p>
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit")}
      </Button>
    </VStack>
  );
}
