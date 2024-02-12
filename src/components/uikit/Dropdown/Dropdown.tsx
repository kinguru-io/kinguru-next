import { css } from "~/styled-system/css";
import { Divider } from "~/styled-system/jsx";
import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[] | React.ReactNode;
  hidden?: boolean;
} & DropdownVariantProps;

export function Dropdown({ children }: DropdownProps) {
  return <div className={css({ position: "relative" })}>{children}</div>;
}

export function DropdownMenu({ children, hidden, size }: DropdownProps) {
  const child =
    children instanceof Array
      ? children!.flatMap((elem) => [
          elem,
          <Divider color={"token(colors.neutral.4)"} />,
        ])
      : [];
  const dividedChildren = child.slice(0, child.length - 1);
  return (
    <div className={dropdown({ size })} data-hidden={hidden}>
      {dividedChildren}
    </div>
  );
}

export function DropdownInitiator({ children }: DropdownProps) {
  return <>{children}</>;
}
