"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button, ErrorField, InputPassword } from "@/components/uikit";
import { revalidateAll } from "@/lib/actions";
import { changePassword } from "@/lib/actions/auth/reset";
import { useRouter } from "@/navigation";
import { stack } from "~/styled-system/patterns";

const changePasswordSchema = z
  .object({
    password: z.string().min(1),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "do_not_match" as const,
    path: ["confirmPassword"],
  });

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const methods = useForm<ChangePasswordSchema>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (input: ChangePasswordSchema) => {
    const result = await changePassword({ password: input.password, token });

    if (!result.ok) {
      toast.error(result.message || "");
      return;
    }

    const signinResponse = await signIn("credentials", {
      email: result.email,
      password: input.password,
      redirect: false,
    });

    if (!signinResponse?.ok) {
      toast.error(signinResponse?.error || "");
      return;
    }

    await revalidateAll();

    toast.success(result.message || "");
    router.replace("/");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={stack({ gap: "4" })}
      >
        <ChangePasswordFormInner />
      </form>
    </FormProvider>
  );
}

function ChangePasswordFormInner() {
  const t = useTranslations("auth.change_password");
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<ChangePasswordSchema>();

  return (
    <>
      <fieldset className={stack({ gap: 2, minWidth: "82" })}>
        <InputPassword
          {...register("password")}
          placeholder={t("password")}
          data-invalid={!!errors.password}
        />
        <span>
          <InputPassword
            {...register("confirmPassword")}
            placeholder={t("confirmPassword")}
            data-invalid={!!errors.confirmPassword}
          />
          <ErrorField error={errors.confirmPassword} />
        </span>
      </fieldset>
      <Button type="submit" contentCentered isLoading={isSubmitting}>
        {t("submit")}
      </Button>
    </>
  );
}
