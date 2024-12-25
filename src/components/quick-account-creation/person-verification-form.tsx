"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { Timer } from "@/components/common/timer";
import { helperClassName } from "@/components/sign-up/signup-helper";
import { Button, ErrorField, Input } from "@/components/uikit";
import { revalidateAll } from "@/lib/actions";
import { verifyCode } from "@/lib/actions/auth/account-verification";
import { resendCodeMail } from "@/lib/actions/auth/email";
import { stack } from "~/styled-system/patterns";

export function PersonVerificationForm() {
  const t = useTranslations("verification");
  const [pending, startTransition] = useTransition();
  const [digits, setDigits] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    startTransition(async () => {
      const { ok, message } = await verifyCode(digits);
      setDigits("");

      if (ok) {
        setError("");
        await revalidateAll();

        return;
      }

      setError(message);
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <fieldset
        className={stack({ gap: "4", md: { maxWidth: "72" } })}
        disabled={pending}
      >
        <span>
          <Input
            placeholder={t("code_placeholder")}
            value={digits}
            onFocus={() => setError("")}
            onChange={({ target }) => {
              setDigits(target.value.replace(/\D/g, ""));
            }}
            data-invalid={!!error}
          />
          <ErrorField error={{ message: error }} />
        </span>
        <Button type="submit" contentCentered>
          {t("verify_label")}
        </Button>
        <span className={helperClassName}>{t("code_was_sent_notice")}</span>
        <span className={helperClassName}>
          {t("code_was_not_sent_notice")} <ResendButton />
        </span>
      </fieldset>
    </form>
  );
}

function ResendButton() {
  const t = useTranslations("verification");
  const [pending, startTransition] = useTransition();
  const [sent, setSendState] = useState(true);

  const resendButtonClicked = () => {
    startTransition(async () => {
      setSendState(true);
      await resendCodeMail();
    });
  };

  return (
    <button
      type="button"
      disabled={pending || sent}
      onClick={resendButtonClicked}
    >
      {t("resend_label")}
      {sent && (
        <>
          {" "}
          (
          <Timer
            key={String(sent)}
            minutes={1}
            callback={() => setSendState(false)}
          />
          )
        </>
      )}
    </button>
  );
}
