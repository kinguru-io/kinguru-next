// eslint-disable-next-line import/no-extraneous-dependencies
import { defineTextStyles } from "@pandacss/dev";

export const additionalTextStyles = defineTextStyles({
  heading: {
    hero: {
      value: {
        fontSize: { base: "2xl", md: "5xl" },
        fontWeight: "bold",
        lineHeight: "1",
      },
    },
    section: {
      value: {
        fontSize: { base: "2xl", md: "4xl" },
        fontWeight: "bold",
        lineHeight: "1.15",
      },
    },
    page: {
      value: {
        fontSize: "3xl",
        fontWeight: "bold",
        md: { fontSize: "5xl" },
      },
    },
  },
});
