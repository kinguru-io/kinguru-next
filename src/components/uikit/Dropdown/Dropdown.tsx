import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[];
} & DropdownVariantProps;

export const Dropdown = ({
  size = "sm",
  visibility = "hidden",
  children,
}: DropdownProps) => {
  return <div className={dropdown({ size, visibility })}>{children}</div>;
};
