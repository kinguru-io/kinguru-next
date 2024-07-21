"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import formConfig from "./form-config.json";
import { BaseForm, Button } from "@/components/uikit";
import type { RevalidateAll } from "@/lib/actions/auth";
import { checkEmailByRole } from "@/lib/actions/auth/check-email-by-role";
import { type SigninFormInput, signinFormSchema } from "@/lib/validations";
import { Link, useRouter } from "@/navigation";
import { HStack, Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export function SignInForm({
  revalidateAll,
  isCompany,
}: {
  revalidateAll: RevalidateAll;
  isCompany?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<SigninFormInput>({
    mode: "onBlur",
    resolver: zodResolver(signinFormSchema),
  });
  const t = useTranslations("auth.error");

  const onSubmit = async ({ email, password }: SigninFormInput) => {
    const doExist = await checkEmailByRole(email, isCompany);

    if (!doExist) {
      toast.error(t("invalid_credentials"));
      return;
    }

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

    toast.error(
      t(response?.status === 401 ? "invalid_credentials" : "unknown_error"),
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <SigninFormInner isCompany={isCompany} />
      </form>
    </FormProvider>
  );
}

function SigninFormInner({ isCompany }: { isCompany?: boolean }) {
  const t = useTranslations("auth");
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const href = `/auth/signup/${isCompany ? "company" : "user"}`;

  return (
    <Stack gap="4">
      <fieldset className={stack({ gap: "2" })} disabled={isSubmitting}>
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
          "& > *": {
            justifyContent: "center",
            flexBasis: "44",
            flexGrow: "1",
          },
        }}
      >
        <Link href={href} className={button({ colorPalette: "secondary" })}>
          {t("sign_up_label")}
        </Link>
        <Button type="submit" isLoading={isSubmitting}>
          {t("sign_in_label")}
        </Button>
      </HStack>
    </Stack>
  );
}
