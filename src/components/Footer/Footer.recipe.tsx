// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const footerSlot = defineSlotRecipe({
  className: "footer",
  slots: ["footer", "footerWrapper", "additionalText", "contentWrapper"],
  base: {
    footer: {
      height: "fit-content",
      bgColor: "dark",
      color: "light",
      width: "full",
      paddingBlock: "8",
      md: { paddingBlockStart: "12" },
    },
    additionalText: {
      color: "secondary",
      fontSize: "px13",
      lineHeight: "1",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: { base: "column", sm: "row" },
      justifyContent: "space-between",
      gap: "8",
      width: "full",
      marginBlockEnd: "8",
    },
  },
});
