"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowIcon,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
} from "@/components/uikit";
import { Link, usePathname } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { input } from "~/styled-system/recipes";

const buttonClassName = cx(
  input().label,
  css({ whiteSpace: "nowrap", justifyContent: "space-between" }),
);

const sortItems = ["asc", "desc"] satisfies Array<
  keyof IntlMessages["filters"]["sorting"]
>;

export function SortToggler({ replace }: { replace?: boolean }) {
  const t = useTranslations("filters");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortKey =
    (searchParams.get("sort") as keyof IntlMessages["filters"]["sorting"]) ||
    ("label" as const);
  const searchRecord = Object.fromEntries(searchParams.entries());

  return (
    <Dropdown size="auto" className={css({ flexGrow: "1" })}>
      <DropdownInitiator>
        <button className={buttonClassName} type="button">
          {t(`sorting.${sortKey}`)}
          <ArrowIcon direction="down" className={css({ fontSize: "xs" })} />
        </button>
      </DropdownInitiator>
      <DropdownMenu>
        {sortItems.map((key) => (
          <Link
            key={key}
            href={{
              pathname,
              query: {
                ...searchRecord,
                sort: key,
              },
            }}
            replace={replace}
          >
            {t(`sorting.${key}`)}
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
