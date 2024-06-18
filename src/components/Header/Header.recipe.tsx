// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const headerSlot = defineSlotRecipe({
  className: "header",
  slots: ["header", "headerWrapper"],
  base: {
    header: {
      zIndex: "1",
      width: "full",
      paddingBlock: { base: "2", md: "4" },
      backgroundColor: "neutral.5",
      boxShadow: "header",
    },
    headerWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "6",
      justifyContent: "space-between",
    },
  },
});
