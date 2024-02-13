/* eslint-disable import/no-extraneous-dependencies */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  const { pending } = useFormStatus();

  return (
    <VStack gap="15px">
      <Input
        variant="outline"
        placeholder="Введите email"
        {...register("email")}
      />
      <p className={css({ textStyle: "body.3", color: "neutral.2" })}>
        Введите адрес электронной почты используемый для входа и мы вышлем вам
        письмо со ссылкой для создания нового пароля
      </p>
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        Отправить
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
