import { css } from "~/styled-system/css";
import { Divider } from "~/styled-system/jsx";
import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[];
  hidden: boolean;
  parent?: React.ReactNode;
} & DropdownVariantProps;

export function Dropdown({
  size = "sm",
  hidden = false,
  children,
  parent,
}: DropdownProps) {
  const child = children.flatMap((elem) => [
    elem,
    <Divider color={"token(colors.neutral.4)"} />,
  ]);
  const dividedChildren = child.slice(0, child.length - 1);

  return (
    <div className={css({ position: "relative" })}>
      {parent}
      <div className={dropdown({ size })} data-hidden={hidden}>
        {dividedChildren}
      </div>
    </div>
  );
}
