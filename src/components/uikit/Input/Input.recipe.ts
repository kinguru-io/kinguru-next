// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const inputSlot = defineSlotRecipe({
  className: "input",
  slots: ["label", "input"],
  base: {
    label: {
      display: "inline-flex",
      gap: "2",
      width: "full",
      fontSize: "px15",
      fontWeight: "500",
      color: "neutral.2",
      lineHeight: "0.75",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "neutral.4",
      bgColor: "neutral.4",
      borderRadius: "sm",
      transition: "colors",
      padding: "4",
      _invalid: { borderColor: "danger!" },
      _focusWithin: {
        bgColor: "#FBFBFB",
        borderColor: "focus!",
      },
      _hover: {
        bgColor: "#FBFBFB",
        borderColor: "#FBFBFB",
      },
      "&:has(input:not(:placeholder-shown))": {
        bgColor: "neutral.5",
        borderColor: "neutral.1",
        color: "neutral.1",
      },
      "&[data-disabled=true]": { opacity: "0.4", cursor: "not-allowed" },
      "& > svg": { fontSize: "2xl" },
      "& > svg:last-of-type": { marginInlineStart: "auto" },
    },
    input: {
      display: "inline-block",
      minWidth: "0",
      width: "full",
      outline: "1px solid transparent",
      _placeholder: {
        color: "neutral.2",
        fontWeight: "normal",
      },
    },
  },
  variants: {
    variant: { default: {}, outline: {} },
    rounded: { true: { label: { borderRadius: "full" } } },
    textCentered: { true: { input: { textAlign: "center" } } },
  },
});
