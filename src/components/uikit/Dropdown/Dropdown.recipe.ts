// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const dropdownRecipe = defineRecipe({
  className: "dropdown",
  base: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    borderRadius: "6px",
    boxShadow: "0 4px 4px 0 #00000040",
    flexDirection: "column",
    position: "relative",
    "& > *:not(:last-child)": {
      position: "relative",
    },
    "& > *:not(:last-child)::after": {
      content: '""',
      display: "block",
      height: "1px",
      backgroundColor: "token(colors.neutral.4)",
      bottom: "-5px",
      position: "absolute",
      width: "100%",
    },
  },
  variants: {
    size: {
      sm: { w: "110px" },
      md: { w: "157px" },
      lg: { w: "259px" },
    },
  },
  staticCss: [{ size: ["*"] }],
});
