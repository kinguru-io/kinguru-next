// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const premiseMyBookingCardSlot = defineSlotRecipe({
  className: "premiseMyBookingCard",
  slots: ["premise"],
  base: {
    premise: {
      bgColor: "light",
      gap: "6",
      animation: "fade-in",
      borderRadius: "lg",
      marginBlockEnd: "2",
      flexDirection: "column",
      md: {
        flexDirection: "row",
      },
    },
  },
});
