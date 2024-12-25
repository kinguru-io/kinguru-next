"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { SignUpHelper, UserSignupFormInner } from "@/components/sign-up";
import { revalidateAll, type quickUserSignUp } from "@/lib/actions";
import {
  type UserSignupFormInput,
  userSignupFormSchema,
} from "@/lib/validations";
import { Stack } from "~/styled-system/jsx";

export function QuickAccountCreation({
  quickSignUp,
}: {
  quickSignUp: typeof quickUserSignUp;
}) {
  const methods = useForm<UserSignupFormInput>({
    mode: "onBlur",
    resolver: zodResolver(userSignupFormSchema),
  });

  const onSubmit = async (input: UserSignupFormInput) => {
    const response = await quickSignUp(input);

    if (!response) {
      await signIn("credentials", {
        email: input.email,
        password: input.password,
        redirect: false,
      });
      await revalidateAll();
      return;
    }

    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <Stack css={{ gap: 4, md: { maxWidth: "sm" } }}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UserSignupFormInner isPending={methods.formState.isSubmitting} />
        </form>
        <SignUpHelper />
      </Stack>
    </FormProvider>
  );
}
