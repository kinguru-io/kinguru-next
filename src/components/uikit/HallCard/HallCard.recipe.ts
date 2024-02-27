// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const hallCardSlot = defineSlotRecipe({
  className: "hall",
  slots: ["hall", "hallSlider", "hallContent"],
  base: {
    hall: {
      w: "1120px",
      padding: "23px 30px",
      border: "1px solid token(colors.neutral.3)",
      borderRadius: "27px",
      h: "272px",
      bg: "token(colors.neutral.5)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    hallSlider: {
      w: "391px",
      h: "220px",
    },
    hallContent: {
      display: "flex",
      maxW: "600px",
      h: "100%",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  },
});
