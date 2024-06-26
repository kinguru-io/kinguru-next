"use client";

import { useLocale } from "next-intl";
import { useId, useTransition } from "react";
import { tagStyles } from "@/components/uikit/Tag/Tag";
import { locales, useRouter, usePathname, isLocale } from "@/navigation";
import { css, cx } from "~/styled-system/css";

const tagStyleObject = tagStyles.raw({ variant: "solid" });

export function LanguageSelector({ label }: { label?: string }) {
  const radioName = useId();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const localeChanged = (node: EventTarget) => {
    if (!(node instanceof HTMLInputElement)) return;

    const nextLocale = node.value;

    if (isLocale(nextLocale)) {
      startTransition(async () => {
        await new Promise((res) => setTimeout(res, 500));
        router.replace(pathname, { locale: nextLocale });
      });
    }
  };

  return (
    <fieldset
      className={cx("group", css({ display: "flex", gap: "1" }))}
      onChange={({ target }) => localeChanged(target)}
      disabled={isPending}
    >
      {label && (
        <legend
          className={css({
            color: "secondary",
            fontSize: "sm",
            marginBlockEnd: "1",
          })}
        >
          {label}
        </legend>
      )}
      {locales.map((code) => (
        <label
          key={code}
          className={css(tagStyleObject, {
            cursor: "pointer",
            fontSize: "sm",
            fontWeight: "bold",
            textTransform: "uppercase",
            colorPalette: "tertiary",
            transition: "opacity",
            _selected: { colorPalette: "primary" },
            _groupDisabled: { opacity: "0.4", cursor: "not-allowed" },
            "& > input": { srOnly: true },
          })}
          aria-selected={code === locale}
        >
          {code}
          <input type="radio" name={radioName} value={code} />
        </label>
      ))}
    </fieldset>
  );
}
