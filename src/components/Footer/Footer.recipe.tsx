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
      // `expanded` stands for keeping copyright visible due to fixed button position somewhere (e.g. mobile profile)
      // TODO may be adjusted but I didn't manage to find correct way to load a button at the bottom of the footer
      _expanded: { paddingBlockEnd: "14" },
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
