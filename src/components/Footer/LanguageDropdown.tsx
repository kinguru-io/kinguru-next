"use client";

import { useTransition } from "react";
import { BsChevronDown, BsGlobe } from "react-icons/bs";
import { RiLoader2Fill } from "react-icons/ri";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";
import { languageFormatter } from "@/lib/utils";
import { locales, useRouter, usePathname, type Locale } from "@/navigation";
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
          <span>{formatLanguage.of(locale)}</span>
          <BsChevronDown />
        </Flex>
      </DropdownInitiator>
      <DropdownMenu>
        {locales
          .filter((code) => code !== locale)
          .map((code) => (
            <span key={code} onClick={() => onToggleLanguageClick(code)}>
              {formatLanguage.of(code)}
            </span>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
