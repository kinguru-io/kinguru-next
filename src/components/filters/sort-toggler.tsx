import { Dropdown, DropdownInitiator, DropdownMenu } from "@/components/uikit";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { input } from "~/styled-system/recipes";

export function SortToggler<T extends { value: string; label: string }>({
  pathname,
  searchParams,
  items,
  defaultLabel,
}: {
  pathname: string;
  searchParams: Record<string, any>;
  items: T[];
  defaultLabel: string;
}) {
  const btnClassName = cx(
    input(),
    css({ cursor: "pointer", whiteSpace: "nowrap" }),
  );

  return (
    <Dropdown size="lg">
      <DropdownInitiator>
        <button className={btnClassName} type="button">
          {defaultLabel}
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
