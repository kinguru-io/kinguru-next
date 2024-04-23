// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const arrowIconRecipe = defineRecipe({
  className: "arrowIcon",
  base: {
    display: "inline-block",
    width: "0.5em",
    height: "0.5em",
    borderWidth: "2px",
    borderStyle: "solid solid none none",
  },
  variants: {
    direction: {
      left: { transform: "rotate(-135deg) translate(0%, 25%)" },
      right: { transform: "rotate(45deg) translate(-25%, 0%)" },
      up: { transform: "rotate(315deg)" },
      down: { transform: "rotate(135deg) translate(-25%, 25%)" },
    },
  },
  defaultVariants: {
    direction: "left",
  },
  staticCss: [{ direction: ["*"] }],
});
