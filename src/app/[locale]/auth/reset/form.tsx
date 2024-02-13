/* eslint-disable import/no-extraneous-dependencies */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, type UseFormRegister } from "react-hook-form";
import { Button, Input } from "@/components/uikit";
import {
  resetFormSchema,
  resetPassword,
  type ResetPasswordState,
  type ResetFormInput,
} from "@/lib/actions/auth";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";

function ResetFormInner({
  register,
  isValid,
}: {
  register: UseFormRegister<ResetFormInput>;
  isValid: boolean;
}) {
  const t = useTranslations();
  const { pending } = useFormStatus();

  return (
    <VStack gap="0">
      <Input
        variant="outline"
        placeholder={t("auth.reset_form.email_placeholder")}
        disabled={pending}
        {...register("email")}
      />
      <p
        className={css({
          textStyle: "body.3",
          color: "neutral.2",
        })}
      >
        {t("auth.reset_form.helper")}
      </p>
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("auth.reset_form.submit")}
      </Button>
    </VStack>
  );
}

export function ResetForm() {
  const {
    register,
    formState: { isValid },
  } = useForm<ResetFormInput>({
    mode: "onBlur",
    resolver: zodResolver(resetFormSchema),
  });
  const [_state, formAction] = useFormState<ResetPasswordState, FormData>(
    resetPassword,
    null,
  );

  return (
    <form action={formAction}>
      <ResetFormInner register={register} isValid={isValid} />
    </form>
  );
}
