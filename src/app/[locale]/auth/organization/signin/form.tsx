"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import formConfig from "./formConfig.json";
import { BaseForm, Button } from "@/components/uikit";
import type { RevalidateAll } from "@/lib/actions/auth";
import { type SigninFormInput, signinFormSchema } from "@/lib/validations";
import { Link, useRouter } from "@/navigation";
import { VStack } from "~/styled-system/jsx";
import { vstack } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export function SigninForm({
  callbackUrl,
  revalidateAll,
}: {
  callbackUrl?: string;
  revalidateAll: RevalidateAll;
}) {
  const router = useRouter();
  const methods = useForm<SigninFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signinFormSchema),
  });

  const onSubmit = async ({ email, password }: SigninFormInput) => {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response && response.ok) {
      await revalidateAll();
      router.replace(callbackUrl || "/");
      return;
    }

    toast.error(response?.error || "");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SigninFormInner />
      </form>
    </FormProvider>
  );
}

function SigninFormInner() {
  const t = useTranslations("auth.signin_form");
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <VStack gap="0">
      <fieldset className={vstack({ gap: "15px" })} disabled={isSubmitting}>
        <BaseForm<SigninFormInput>
          config={formConfig.main}
          schema={signinFormSchema}
          outlinedFields={true}
          translationsKey="auth.signin_form"
          variant="outline"
        />
      </fieldset>
      <Button type="submit" size="md" isLoading={isSubmitting}>
        {t("submit")}
      </Button>
      <Link
        className={button({ size: "sm", variant: "ghost" })}
        href="/auth/reset"
      >
        {t("forgot_password")}
      </Link>
    </VStack>
  );
}
