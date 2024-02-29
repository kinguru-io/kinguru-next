// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const premiseCardSlot = defineSlotRecipe({
  className: "premise",
  slots: ["premise", "premiseSlider", "premiseContent"],
  base: {
    premise: {
      padding: "23px 30px",
      border: "1px solid token(colors.neutral.3)",
      maxHeight: "272px",
      borderRadius: "27px",
      bg: "token(colors.neutral.5)",
      display: "grid",
      gap: "1.25rem",
      gridTemplateColumns: "repeat(6, 1fr)",
    },
    premiseContent: {
      gridColumn: "1 / 4",
      marginInlineEnd: "-2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    premiseSlider: {
      gridColumn: "-1 / -3",
      alignSelf: "center",
      marginInlineStart: "-2rem",
      position: "relative",
    },
  },
});
