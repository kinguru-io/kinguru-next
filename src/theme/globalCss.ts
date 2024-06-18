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
    color: "neutral.1",
  },
  address: { fontStyle: "normal" },
  ".rdp-caption_label": { textTransform: "capitalize" },
});
