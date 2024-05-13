"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type RichTranslationValues, useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { type UseFormRegister, useForm } from "react-hook-form";
import { Button, Input, InputPassword } from "@/components/uikit";
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
  const {
    register,
    formState: { isValid },
  } = useForm<SignupFormInput>({
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
  });
  const [_state, formAction] = useFormState(signUp, null);

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
    <Stack gap="0">
      <fieldset className={stack({ gap: "15px" })} disabled={pending}>
        <Input
          type="text"
          variant="outline"
          placeholder={t("name_placeholder")}
          {...register("name")}
        />
        <Input
          type="email"
          inputMode="numeric"
          variant="outline"
          placeholder={t("email_placeholder")}
          {...register("email")}
        />
        <InputPassword
          placeholder={t("password_placeholder")}
          {...register("password")}
        />
        <InputPassword
          placeholder={t("password_confirm_placeholder")}
          {...register("confirmPassword")}
        />
      </fieldset>
      <Button
        type="submit"
        size="md"
        isLoading={pending}
        disabled={!isValid}
        centered
      >
        {t("submit")}
      </Button>
      <p>{t.rich("helper", translationValues)}</p>
    </Stack>
  );
}
