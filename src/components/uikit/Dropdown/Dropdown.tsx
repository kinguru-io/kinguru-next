import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode;
  hidden: boolean;
} & DropdownVariantProps;

export function Dropdown({
  size = "sm",
  hidden = false,
  children,
}: DropdownProps) {
  return (
    <div className={dropdown({ size })} data-hidden={hidden}>
      {children}
    </div>
  );
}
