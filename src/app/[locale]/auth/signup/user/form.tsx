"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import formConfig from "./form-config.json";
import { BaseForm, Button } from "@/components/uikit";
import type { UserSignUpAction } from "@/lib/actions";
import {
  type UserSignupFormInput,
  userSignupFormSchema,
} from "@/lib/validations";
import { css } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";

export function UserSignUpForm({ signUp }: { signUp: UserSignUpAction }) {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<UserSignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(userSignupFormSchema),
  });
  const [response, formAction] = useFormState(signUp, null);

  const onSubmit: SubmitHandler<UserSignupFormInput> = useCallback(
    (data) => {
      // @ts-expect-error
      startTransition(() => formAction(data));
    },
    [formAction],
  );

  useEffect(() => {
    if (!response) return;
    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }
  }, [response]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SignupFormInner isPending={isPending} />
      </form>
    </FormProvider>
  );
}

function SignupFormInner({ isPending }: { isPending: boolean }) {
  const t = useTranslations("auth.signup_form");

  return (
    <Stack gap="4">
      <fieldset className={stack({ gap: "2" })} disabled={isPending}>
        <BaseForm<UserSignupFormInput>
          config={formConfig.main}
          schema={userSignupFormSchema}
          translationsKey="auth.signup_form"
        />
      </fieldset>
      <Button
        type="submit"
        isLoading={isPending}
        className={css({ justifyContent: "center" })}
      >
        {t("submit")}
      </Button>
    </Stack>
  );
}
