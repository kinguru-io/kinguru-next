// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const dropdownRecipe = defineSlotRecipe({
  className: "dropdown",
  slots: ["menu", "dropdown"],
  base: {
    menu: {
      display: "flex",
      gap: "5px",
      padding: "10px",
      borderRadius: "6px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      flexDirection: "column",
      position: "absolute",
      top: "calc(100% + 5px)",
      bg: "token(color.neutral.5)",
      right: "0",
      zIndex: "token(zIndex.dropdown)",
      "&[data-hidden=true]": { display: "none" },
    },
    dropdown: {
      position: "relative",
    },
  },
  variants: {
    size: {
      sm: { menu: { w: "110px" } },
      md: { menu: { w: "157px" } },
      lg: { menu: { w: "259px" } },
    },
  },
  staticCss: [{ size: ["*"] }],
});
