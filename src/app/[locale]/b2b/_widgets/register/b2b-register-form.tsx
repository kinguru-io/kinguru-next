"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { CompanySignupFormInner, SignUpHelper } from "@/components/sign-up";
import type { CompanySignUpAction } from "@/lib/actions";
import { type SignupFormInput, signupFormSchema } from "@/lib/validations";
import { css } from "~/styled-system/css";

export function B2BRegisterForm({ signUp }: { signUp: CompanySignUpAction }) {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<SignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signupFormSchema),
  });
  const [response, formAction] = useFormState(signUp, null);

  const onSubmit: SubmitHandler<SignupFormInput> = useCallback(
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
        <CompanySignupFormInner
          isPending={isPending}
          actionSlot={<SignUpHelper darkBackground />}
          actionSlotClassName={css({
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "6",
            md: { flexDirection: "row" },
            "&>p": { md: { fontSize: "sm" } },
          })}
          fieldSetClassName={css({
            flexDirection: "row",
            flexWrap: "wrap",
            "&>div": { flexGrow: "1", flexBasis: "sm" },
          })}
        />
      </form>
    </FormProvider>
  );
}
