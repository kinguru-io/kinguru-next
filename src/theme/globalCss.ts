// eslint-disable-next-line import/no-extraneous-dependencies
import { defineGlobalStyles } from "@pandacss/dev";

export const additionalGlobalCss = defineGlobalStyles({
  html: {
    scrollBehavior: {
      base: "smooth",
      _motionReduce: "auto",
    },
  },
  body: {
    color: "dark",
  },
  address: { fontStyle: "normal" },
  button: {
    cursor: {
      base: "pointer",
      _disabled: "not-allowed",
    },
  },
  ".rdp-caption_label": { textTransform: "capitalize" },
});
