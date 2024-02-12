import { dropdown, DropdownVariantProps } from "~/styled-system/recipes";

type DropdownProps = {
  children: React.ReactNode[];
  visible: boolean;
} & DropdownVariantProps;

export function Dropdown({
  size = "sm",
  visible = true,
  children,
}: DropdownProps) {
  return (
    <div className={dropdown({ size })} data-hidden={visible}>
      {children}
    </div>
  );
}
