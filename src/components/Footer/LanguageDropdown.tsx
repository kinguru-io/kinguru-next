"use client";
import { usePathname, useRouter } from "next/navigation";
import { BsChevronDown, BsGlobe } from "react-icons/bs";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";
import { footer } from "~/styled-system/recipes";

type LanguageDropdownProps = {
  langOptions: Array<any>;
  locale: string;
};

export function LanguageDropdown({
  langOptions,
  locale,
}: LanguageDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();

  const classes = footer();

  const currentLang =
    langOptions[langOptions.findIndex((elem) => locale === elem.code)].text;

  const onToggleLanguageClick = (newLocale: string) => {
    const pathArr = pathname?.split("/");
    if (pathArr) pathArr[1] = newLocale;

    const newPathname = pathArr?.join("/");

    router.push(newPathname || "/");
  };

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        <div className={classes.languageDropdownInitiator}>
          <BsGlobe />
          {currentLang}
          <BsChevronDown />
        </div>
      </DropdownInitiator>
      <DropdownMenu>
        {langOptions
          .filter(({ code }) => code !== locale)
          .map(({ code, text }) => (
            <span key={code} onClick={() => onToggleLanguageClick(code)}>
              {text}
            </span>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
