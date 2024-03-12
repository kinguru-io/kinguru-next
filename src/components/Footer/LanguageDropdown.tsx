"use client";

import { useTransition } from "react";
import { BsChevronDown, BsGlobe } from "react-icons/bs";
import { RiLoader2Fill } from "react-icons/ri";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";
import { languageFormatter } from "@/lib/utils";
import { locales, useRouter, usePathname, type Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

type LanguageDropdownProps = {
  locale: Locale;
};

export function LanguageDropdown({ locale }: LanguageDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const formatLanguage = languageFormatter(locale);

  const onToggleLanguageClick = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        <Flex gap="8px" alignItems="center">
          {isPending ? <RiLoader2Fill /> : <BsGlobe />}
          <span
            className={css({ textTransform: "capitalize" })}
            suppressHydrationWarning
          >
            {formatLanguage.of(locale)}
          </span>
          <BsChevronDown />
        </Flex>
      </DropdownInitiator>
      <DropdownMenu>
        {locales
          .filter((code) => code !== locale)
          .map((code) => (
            <button
              className={css({
                textTransform: "capitalize",
                cursor: "pointer",
                textAlign: "left",
              })}
              type="button"
              key={code}
              onClick={() => onToggleLanguageClick(code)}
              suppressHydrationWarning
            >
              {formatLanguage.of(code)}
            </button>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
