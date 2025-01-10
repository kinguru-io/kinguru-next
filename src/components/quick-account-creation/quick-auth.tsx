"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { css } from "~/styled-system/css";

type QuickAuthProps = {
  signInSlot: React.ReactNode;
  signUpSlot: React.ReactNode;
};

export function QuickAuth({ signInSlot, signUpSlot }: QuickAuthProps) {
  const t = useTranslations("auth");
  const [tab, setTab] = useState<"sign-in" | "sign-up">("sign-up");

  return (
    <>
      <h3 className={css({ fontWeight: "bold" })}>
        {tab === "sign-in" ? t("quick_signin_title") : t("quick_signup_title")}
      </h3>
      {tab === "sign-in" && signInSlot}
      {tab === "sign-up" && signUpSlot}
      <button
        type="button"
        className={css({
          fontSize: "sm",
          color: "secondary",
          _hoverOrFocusVisible: { textDecoration: "underline" },
        })}
        onClick={() => setTab(tab === "sign-in" ? "sign-up" : "sign-in")}
      >
        {tab === "sign-in" ? t("quick_signup_label") : t("quick_signin_label")}
      </button>
    </>
  );
}
