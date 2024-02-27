// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const headerSlot = defineSlotRecipe({
  className: "header",
  slots: ["header", "headerWrapper"],
  base: {
    header: {
      zIndex: "header",
      width: "100%",
      borderBottom: "1px solid token(colors.neutral.3)",
      bg: "token(colors.neutral.5)",
      maxH: "85px",
      py: "22.5px",
      position: "sticky",
      top: "0",
    },
    headerWrapper: {
      display: "grid",
      justifyContent: "space-between",
      alignItems: "center",
      gridTemplateColumns: "auto 1fr auto",
    },
  },
});
