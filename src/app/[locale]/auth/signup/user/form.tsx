"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { UserSignupFormInner } from "@/components/sign-up";
import type { UserSignUpAction } from "@/lib/actions";
import {
  type UserSignupFormInput,
  userSignupFormSchema,
} from "@/lib/validations";

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
        <UserSignupFormInner isPending={isPending} />
      </form>
    </FormProvider>
  );
}
