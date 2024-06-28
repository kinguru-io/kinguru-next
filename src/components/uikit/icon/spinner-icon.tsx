import { Icon, type IconProps } from "./icon";
import { css, cx } from "~/styled-system/css";

export function SpinnerIcon({
  className,
  ...restProps
}: Omit<IconProps, "name">) {
  return (
    <Icon
      name="common/spinner"
      className={cx(css({ animation: "spin" }), className)}
      {...restProps}
    />
  );
}
