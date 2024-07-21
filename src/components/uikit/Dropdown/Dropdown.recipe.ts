// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const dropdownSlot = defineSlotRecipe({
  className: "dropdown",
  slots: ["menu", "dropdown"],
  base: {
    menu: {
      display: "flex",
      borderRadius: "sm",
      boxShadow: "dropdown",
      flexDirection: "column",
      position: "absolute",
      insetBlockStart: "full",
      bgColor: "light",
      minW: "28",
      color: "dark",
      zIndex: "token(zIndex.dropdown)",
      width: "max-content",
      cursor: "pointer",
      overflow: "hidden",
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
      full: { menu: { width: "full" }, dropdown: { width: "full" } },
      auto: {},
    },
    anchor: {
      end: { menu: { insetInlineEnd: "0" } },
      start: { menu: { insetInlineStart: "0" } },
    },
  },
  defaultVariants: { anchor: "end" },
});
