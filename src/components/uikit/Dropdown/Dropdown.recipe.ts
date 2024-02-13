// eslint-disable-next-line import/no-extraneous-dependencies
import { defineRecipe } from "@pandacss/dev";

export const dropdownRecipe = defineRecipe({
  className: "dropdown",
  base: {
    display: "flex",
    gap: "5px",
    padding: "10px",
    borderRadius: "6px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    flexDirection: "column",
    position: "absolute",
    top: "calc(100% + 5px)",
    right: "0",
    zIndex: "token(zIndex.dropdown)",
    "&[data-hidden=true]": { display: "none" },
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
