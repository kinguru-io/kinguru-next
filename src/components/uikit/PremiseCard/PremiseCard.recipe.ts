// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const premiseCardSlot = defineSlotRecipe({
  className: "premise",
  slots: ["premise", "premiseSlider"],
  base: {
    premise: {
      bgColor: "light",
      display: "flex",
      flexDirection: "column",
      gap: "2",
      animation: "fade-in",
      borderRadius: "lg",
    },
    premiseSlider: {
      bgImage: "{gradients.darken-to-bottom-lighter}",
      width: "full",
      borderRadius: "lg",
      overflow: "hidden",
      order: "-1",
    },
  },
});
