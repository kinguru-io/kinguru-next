"use client";
import { usePathname, useRouter } from "next/navigation";
import { BsChevronDown, BsGlobe } from "react-icons/bs";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";
import { languages } from "@/navigation";
import { Flex } from "~/styled-system/jsx";

type LanguageDropdownProps = {
  locale: string;
};

export function LanguageDropdown({ locale }: LanguageDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = languages[locale as keyof typeof languages];

  const onToggleLanguageClick = (newLocale: string) => {
    const pathArr = pathname?.split("/");
    if (pathArr) pathArr[1] = newLocale;

    const newPathname = pathArr?.join("/");

    router.push(newPathname || "/");
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
        {Object.keys(languages)
          .filter((code) => code !== locale)
          .map((code) => (
            <span key={code} onClick={() => onToggleLanguageClick(code)}>
              {languages[code as keyof typeof languages]}
            </span>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
