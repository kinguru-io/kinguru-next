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
      left: { transform: "rotate(-135deg)" },
      right: { transform: "rotate(45deg)" },
      up: { transform: "rotate(315deg)" },
      down: { transform: "rotate(135deg)" },
    },
  },
  defaultVariants: {
    direction: "left",
  },
  staticCss: [{ direction: ["*"] }],
});
