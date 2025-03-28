"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { CompanySignupFormInner } from "@/components/sign-up";
import type { CompanySignUpAction } from "@/lib/actions";
import { type SignupFormInput, signupFormSchema } from "@/lib/validations";

export function CompanySignUpForm({ signUp }: { signUp: CompanySignUpAction }) {
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
        <CompanySignupFormInner isPending={isPending} />
      </form>
    </FormProvider>
  );
}
