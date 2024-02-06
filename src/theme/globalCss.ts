// eslint-disable-next-line import/no-extraneous-dependencies
import { defineGlobalStyles } from "@pandacss/dev";

export const additionalGlobalCss = defineGlobalStyles({
  // TODO ? Consider adding conditional `textStyle: ["body.X"]`
  "html, body": {
    color: "neutral.1",
    lineHeight: "1.25",
  },
  h1: { textStyle: "heading.h1" },
  h2: { textStyle: "heading.h2" },
  h3: { textStyle: "heading.h3" },
  h4: { textStyle: "heading.h4" },
  h5: { textStyle: "heading.h5" },
});
