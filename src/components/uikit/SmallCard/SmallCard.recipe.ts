// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const smallCardRecipe = defineRecipe({
  className: "smallCard",
  base: {
    padding: "10px 10px 7px 10px",
    bg: "token(colors.neutral.4)",
    position: "relative",
  },
  variants: {
    variant: {
      speaker: {
        borderRadius: "10px",
      },
      marker: {
        borderRadius: "20px 20px 0 20px",
      },
    },
  },
});
