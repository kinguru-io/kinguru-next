"use client";
import { usePathname } from "next/navigation";
import { BsChevronDown, BsGlobe } from "react-icons/bs";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";
import { locales, useRouter } from "@/navigation";
import { Flex } from "~/styled-system/jsx";

type LanguageDropdownProps = {
  locale: string;
};

export function LanguageDropdown({ locale }: LanguageDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();

  const lang = new Intl.DisplayNames(locales, { type: "language" });

  const currentLang = lang.of(locale);

  const onToggleLanguageClick = (newLocale: string) => {
    router.replace(pathname!, { locale: newLocale });
  };

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        <Flex gap="8px" alignItems="center">
          <BsGlobe />
          {currentLang}
          <BsChevronDown />
        </Flex>
      </DropdownInitiator>
      <DropdownMenu>
        {locales
          .filter((code) => code !== locale)
          .map((code) => (
            <span key={code} onClick={() => onToggleLanguageClick(code)}>
              {lang.of(code)}
            </span>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
