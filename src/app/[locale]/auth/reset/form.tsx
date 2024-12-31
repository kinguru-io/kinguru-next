"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button, Input } from "@/components/uikit";
import { requestPasswordReset } from "@/lib/actions/auth/reset";
import { useRouter } from "@/navigation";
import { stack } from "~/styled-system/patterns";

const emailSchema = z.object({
  email: z.string().email(),
});

type EmailSchema = z.infer<typeof emailSchema>;

export function ResetForm() {
  const router = useRouter();
  const methods = useForm<EmailSchema>({
    mode: "all",
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (input: EmailSchema) => {
    const result = await requestPasswordReset(input);

    if (result.ok) {
      toast.success(result.message);
      return router.replace("/auth/signin");
    }

    if (!result.ok) {
      toast.error(result.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ResetFormInner />
      </form>
    </FormProvider>
  );
}

function ResetFormInner() {
  const t = useTranslations("auth.reset_form");
  const { formState, register } = useFormContext<EmailSchema>();

  return (
    <fieldset className={stack({ gap: "4" })} disabled={formState.isSubmitting}>
      <Input
        type="email"
        inputMode="email"
        placeholder={t("email_placeholder")}
        {...register("email")}
      />
      <Button type="submit" isLoading={formState.isSubmitting} contentCentered>
        {t("submit")}
      </Button>
    </fieldset>
  );
}
