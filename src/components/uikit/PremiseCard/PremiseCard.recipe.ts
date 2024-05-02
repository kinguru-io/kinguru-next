// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const premiseCardSlot = defineSlotRecipe({
  className: "premise",
  slots: ["premise", "premiseSlider", "premiseContent"],
  base: {
    premise: {
      padding: "23px 30px",
      border: "1px solid token(colors.neutral.3)",
      borderRadius: "27px",
      bg: "token(colors.neutral.5)",
      display: "flex",
      flexWrap: "wrap-reverse",
      gap: "2rem",
    },
    premiseContent: {
      flex: "1",
      display: "flex",
      minWidth: "195px",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "1.5rem",
    },
    premiseSlider: {
      flexBasis: "391px",
      alignSelf: "center",
      position: "relative",
      marginInline: "auto",
    },
  },
});
