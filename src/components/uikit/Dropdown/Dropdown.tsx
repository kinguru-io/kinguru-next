import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[];
} & DropdownVariantProps;

export const Dropdown = ({ size, children }: DropdownProps) => {
  return <div className={dropdown({ size })}>{children}</div>;
};
