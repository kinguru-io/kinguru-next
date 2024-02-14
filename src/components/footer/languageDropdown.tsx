"use client";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";

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
  const onToggleLanguageClick = (newLocale: string) => {
    const pathArr = pathname?.split("/");
    console.log(pathArr, pathname);
    pathArr![1] = newLocale;
    const newPathname = pathArr?.join("/");
    console.log(pathArr, newPathname);
    router.push(newPathname!);
  };

  return (
    <Dropdown size={"sm"}>
      <DropdownInitiator>
        <>languaage</>
      </DropdownInitiator>
      <DropdownMenu>
        {langOptions
          .filter(({ code }) => code !== locale)
          .map(({ code, text }) => (
            <span
              key={code}
              style={{ color: "black" }}
              onClick={() => onToggleLanguageClick(code)}
            >
              {text}
            </span>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
