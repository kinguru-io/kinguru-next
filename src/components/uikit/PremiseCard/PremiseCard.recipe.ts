// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const premiseCardSlot = defineSlotRecipe({
  className: "premise",
  slots: ["premise", "premiseSlider", "premiseContent"],
  base: {
    premise: {
      padding: "23px 30px",
      border: "1px solid token(colors.neutral.3)",
      w: "100%",
      h: "100%",
      borderRadius: "27px",
      bg: "token(colors.neutral.5)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    premiseSlider: {
      position: "relative",
    },
    premiseContent: {
      display: "flex",
      w: "100%",
      h: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  },
});
