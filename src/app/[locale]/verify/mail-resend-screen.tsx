"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/uikit";
import { sendVerificationEmail } from "@/lib/actions/auth/email";
import { css } from "~/styled-system/css";

export function MailResendScreen({ email }: { email: string }) {
  const [pending, startTransition] = useTransition();
  const t = useTranslations("verification");

  const resendButtonClicked = () => {
    startTransition(async () => {
      const { ok, message } = await sendVerificationEmail({ email });

      if (ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <>
      <span className={css({ maxWidth: "md", textAlign: "center" })}>
        {t("email_was_sent_notice")}
      </span>
      <Button type="button" isLoading={pending} onClick={resendButtonClicked}>
        {t("resend_btn_label")}
      </Button>
    </>
  );
}
