// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const arrowIconRecipe = defineRecipe({
  className: "arrowIcon",
  base: {
    position: "relative",
    display: "inline-block",
    width: "0.5em",
    height: "0.5em",
    borderTop: "2px solid token(colors.neutral.1)",
    borderRight: "2px solid token(colors.neutral.1)",
  },
  variants: {
    direction: {
      left: { transform: "rotate(-135deg)" },
      right: { transform: "rotate(45deg)" },
      up: { transform: "rotate(315deg) translateX(-4px)" },
      down: { transform: "rotate(135deg) translateY(4px)" },
    },
  },
  defaultVariants: {
    direction: "left",
  },
  staticCss: [{ direction: ["*"] }],
});
