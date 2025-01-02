// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const inputSlot = defineSlotRecipe({
  className: "input",
  slots: ["label", "input", "placeholder"],
  base: {
    label: {
      position: "relative",
      display: "flex",
      gap: "2",
      width: "full",
      fontSize: "px15",
      fontWeight: "medium",
      lineHeight: "0.75",
      borderWidth: "1px",
      borderStyle: "solid",
      color: "secondary",
      borderColor: "secondary.lighter",
      bgColor: "secondary.lighter",
      borderRadius: "sm",
      transition: "colors",
      padding: "4",
      _invalid: { borderColor: "danger!" },
      _focusWithin: {
        bgColor: "secondary.lightest",
        borderColor: "focus!",
      },
      _hover: {
        bgColor: "secondary.lightest",
        borderColor: "secondary.lightest",
      },
      "&:has(input:not(:placeholder-shown))": {
        bgColor: "light",
        borderColor: "dark",
        color: "dark",
      },
      "&[data-disabled=true]": { opacity: "0.4", cursor: "not-allowed" },
      "& > svg": { fontSize: "2xl" },
    },
    placeholder: {
      display: "none",
      position: "absolute",
      insetBlockStart: "-1",
      insetInlineStart: "3",
      fontWeight: "normal",
      fontSize: "sm",
      color: "secondary",
      bgColor: "light",
      borderRadius: "xs",
      paddingInline: "1",
      ".peer:is(:not(:placeholder-shown)) + &": {
        display: "inline-block",
      },
      _peerInvalid: {
        color: "danger",
      },
    },
    input: {
      display: "inline-block",
      minWidth: "0",
      width: "full",
      outline: "1px solid transparent",
      _placeholder: {
        color: "secondary",
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
