"use client";

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

export function SortToggler({
  searchParams,
  items,
  defaultLabel,
}: {
  searchParams: Record<string, any>;
  items: Array<{ value: string; label: string }>;
  defaultLabel: string;
}) {
  const pathname = usePathname();

  return (
    <Dropdown size="auto" className={css({ flexGrow: "1" })}>
      <DropdownInitiator>
        <button className={buttonClassName} type="button">
          {defaultLabel}
          <ArrowIcon direction="down" className={css({ fontSize: "xs" })} />
        </button>
      </DropdownInitiator>
      <DropdownMenu>
        {items.map(({ value, label }) => (
          <Link
            key={value}
            href={{
              pathname,
              query: { ...searchParams, sort: value },
            }}
          >
            {label}
          </Link>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
