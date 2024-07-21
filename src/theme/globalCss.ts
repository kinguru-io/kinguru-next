// eslint-disable-next-line import/no-extraneous-dependencies
import { defineGlobalStyles } from "@pandacss/dev";

export const additionalGlobalCss = defineGlobalStyles({
  html: {
    scrollBehavior: {
      base: "smooth",
      _motionReduce: "auto",
    },
    scrollbarGutter: "stable",
  },
  body: {
    lineHeight: "1.25",
    color: "dark",
    "&:has(dialog[open])": { overflow: "hidden" },
  },
  address: { fontStyle: "normal" },
  button: {
    cursor: {
      base: "pointer",
      _disabled: "not-allowed",
    },
  },
  ".rdp-caption_label": { textTransform: "capitalize" },
  ".rdp-root": { padding: "2" },
});
