// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const footerSlot = defineSlotRecipe({
  className: "footer",
  slots: [
    "footer",
    "footerWrapper",
    "additionalText",
    "links",
    "contentWrapper",
    "socialLinks",
    "languageDropdownInitiator",
  ],
  base: {
    footer: {
      bg: "token(colors.neutral.1)",
      py: "70px 20px",
      width: "100%",
      color: "token(colors.neutral.5)",
      textStyle: "body.2",
    },
    footerWrapper: {
      maxWidth: "1920px",
      margin: "auto",
      height: "100%",
      px: "430px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: "50px",
      alignItems: "center",
    },
    additionalText: {
      color: "token(colors.neutral.2)",
    },
    links: {
      display: "flex",
      gap: "5px",
      flexDirection: "column",
    },
    contentWrapper: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
    socialLinks: {
      display: "flex",
      gap: "10px",
    },
    languageDropdownInitiator: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
  },
});
