import { Icon, type IconProps } from "./icon";
import { cva, cx, type RecipeVariantProps } from "~/styled-system/css";

const arrowIconRecipe = cva({
  variants: {
    direction: {
      up: { rotate: "90deg" },
      down: { rotate: "-90deg" },
      right: { rotate: "180deg" },
      left: {},
    },
  },
  defaultVariants: { direction: "left" },
});

/**
 * @description `direction="left"` is default
 */
export function ArrowIcon({
  direction,
  className,
  ...restProps
}: Omit<IconProps, "name"> & RecipeVariantProps<typeof arrowIconRecipe>) {
  return (
    <Icon
      name="action/arrow"
      className={cx(arrowIconRecipe({ direction }), className)}
      {...restProps}
    />
  );
}
