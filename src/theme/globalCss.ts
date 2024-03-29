// eslint-disable-next-line import/no-extraneous-dependencies
import { defineGlobalStyles } from "@pandacss/dev";

export const additionalGlobalCss = defineGlobalStyles({
  // TODO ? Consider adding conditional `textStyle: ["body.X"]`
  html: {
    fontSize: "16px",
    height: "full",
    minHeight: "full",
  },
  body: {
    minHeight: "100vh",
    color: "neutral.1",
    lineHeight: "1.25",
  },
  h1: { textStyle: "heading.1" },
  h2: { textStyle: "heading.2" },
  h3: { textStyle: "heading.3" },
  h4: { textStyle: "heading.4" },
  h5: { textStyle: "heading.5" },
});
