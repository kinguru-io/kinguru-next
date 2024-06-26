"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import {
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
  ArrowIcon,
  Icon,
} from "@/components/uikit";
import { locales, useRouter, usePathname, type Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";

export function LanguageDropdown() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onToggleLanguageClick = (newLocale: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <Dropdown size="lg">
      <DropdownInitiator>
        <HStack gap="1" padding="2">
          <span
            className={css({
              textTransform: "uppercase",
              fontSize: "px13",
              fontWeight: "bold",
              lineHeight: "1",
            })}
          >
            {isPending ? (
              <Icon
                name="common/spinner"
                className={css({ animation: "spin" })}
              />
            ) : (
              locale
            )}
          </span>
          <ArrowIcon direction="down" className={css({ fontSize: "0.5em" })} />
        </HStack>
      </DropdownInitiator>
      <DropdownMenu>
        {locales
          .filter((code) => code !== locale)
          .map((code) => (
            <button
              key={code}
              className={css({
                textTransform: "uppercase",
                textAlign: "left",
              })}
              type="button"
              onClick={() => onToggleLanguageClick(code)}
            >
              {code}
            </button>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
