"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import formConfig from "./formConfig.json";
import { BaseForm, Button } from "@/components/uikit";
import type { RevalidateAll } from "@/lib/actions/auth";
import { type SigninFormInput, signinFormSchema } from "@/lib/validations";
import { Link, useRouter } from "@/navigation";
import { HStack, Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export function SigninForm({
  revalidateAll,
}: {
  revalidateAll: RevalidateAll;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      router.replace(searchParams.get("callbackUrl") || "/");
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
  const t = useTranslations("auth");
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Stack gap="4">
      <fieldset className={stack({ gap: "1" })} disabled={isSubmitting}>
        <BaseForm<SigninFormInput>
          config={formConfig.main}
          schema={signinFormSchema}
          translationsKey="auth.signin_form"
        />
      </fieldset>
      <HStack
        css={{
          gap: "2",
          flexWrap: "wrap-reverse",
          "& > a, & > button": {
            justifyContent: "center",
            flexBasis: "44",
            flexGrow: "1",
          },
        }}
      >
        <Link
          href="/auth/signup/company"
          className={button({ colorPalette: "secondary" })}
        >
          {t("sign_up_label")}
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          {t("sign_in_label")}
        </Button>
      </HStack>
    </Stack>
  );
}
