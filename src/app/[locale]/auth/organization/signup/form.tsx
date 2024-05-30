"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type RichTranslationValues, useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import formConfig from "./formConfig.json";
import { BaseForm, Button } from "@/components/uikit";
import type { SignUpAction } from "@/lib/actions";
import { type SignupFormInput, signupFormSchema } from "@/lib/validations";
import { Link } from "@/navigation";
import { Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";

const translationValues: RichTranslationValues = {
  partnerAgreement: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataPolicy: (chunks) => <Link href="#">{chunks}</Link>,
  personalDataProcess: (chunks) => <Link href="#">{chunks}</Link>,
};

export function SignupForm({ signUp }: { signUp: SignUpAction }) {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<SignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signupFormSchema),
  });
  const [response, formAction] = useFormState(signUp, null);

  const onSubmit: SubmitHandler<SignupFormInput> = useCallback(
    (data) => {
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
    <Stack gap="0">
      <fieldset className={stack({ gap: "15px" })} disabled={isPending}>
        <BaseForm<SignupFormInput>
          config={formConfig.main}
          schema={signupFormSchema}
          translationsKey="auth.signup_form"
          // variant="outline"
        />
      </fieldset>
      <Button type="submit" size="md" isLoading={isPending} centered>
        {t("submit")}
      </Button>
      <p>{t.rich("helper", translationValues)}</p>
    </Stack>
  );
}
