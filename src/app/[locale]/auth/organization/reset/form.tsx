"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, type UseFormRegister } from "react-hook-form";
import { Button, Input } from "@/components/uikit";
import { type ResetPasswordAction } from "@/lib/actions";
import { FormActionState } from "@/lib/utils";
import { resetFormSchema, type ResetFormInput } from "@/lib/validations";
import { VStack } from "~/styled-system/jsx";

export function ResetForm({
  resetPassword,
}: {
  resetPassword: ResetPasswordAction;
}) {
  const {
    register,
    formState: { isValid },
  } = useForm<ResetFormInput>({
    mode: "onBlur",
    resolver: zodResolver(resetFormSchema),
  });
  // TODO `state` might be used for notifications?
  const [state, formAction] = useFormState<FormActionState, FormData>(
    resetPassword,
    null,
  );

  useEffect(() => {
    console.log(state?.message);
  }, [state]);

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
        // variant="outline"
        placeholder={t("email_placeholder")}
        disabled={pending}
        {...register("email")}
      />
      <p>{t("helper")}</p>
      <Button type="submit" isLoading={pending} disabled={!isValid}>
        {t("submit")}
      </Button>
    </VStack>
  );
}
