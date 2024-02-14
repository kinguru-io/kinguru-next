// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const dropdownSlot = defineSlotRecipe({
  className: "dropdown",
  slots: ["menu", "dropdown"],
  base: {
    menu: {
      display: "flex",
      gap: "10px",
      padding: "10px",
      borderRadius: "6px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      flexDirection: "column",
      position: "absolute",
      top: "calc(100% + 5px)",
      bg: "token(color.neutral.5)",
      right: "0",
      minW: "110px",
      zIndex: "token(zIndex.dropdown)",
      "&[data-hidden=true]": { display: "none" },
    },
    dropdown: {
      position: "relative",
    },
  },
  variants: {
    size: {
      sm: { menu: { maxW: "110px" } },
      md: { menu: { maxW: "157px" } },
      lg: { menu: { maxW: "259px" } },
    },
  },
  staticCss: [{ size: ["*"] }],
});
