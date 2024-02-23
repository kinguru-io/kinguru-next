// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const footerSlot = defineSlotRecipe({
  className: "footer",
  slots: ["footer", "footerWrapper", "additionalText", "contentWrapper"],
  base: {
    footer: {
      bg: "token(colors.neutral.1)",
      py: "70px 20px",
      width: "100%",
      maxHeight: "256px",
      color: "token(colors.neutral.5)",
      textStyle: "body.2",
    },
    footerWrapper: {
      height: "100%",
      display: "flex",
      gap: "30px",
      flexDirection: "column",
      alignItems: "center",
    },
    additionalText: {
      color: "token(colors.neutral.2)",
    },
    contentWrapper: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
  },
});
