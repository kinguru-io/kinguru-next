// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const checkboxSlot = defineSlotRecipe({
  className: "input_checkbox",
  slots: ["root", "checkbox", "label"],
  base: {
    root: {
      cursor: "pointer",
      display: "inline-flex",
      gap: "10px",
      "& input[type=checkbox]": {
        srOnly: true,
      },
      "& input[type=checkbox]:disabled ~ *": {
        cursor: "not-allowed",
      },
    },
    checkbox: {
      flexShrink: "0",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "dark",
      borderRadius: "3px",
      transition: "colors",
      backgroundColor: "light",
      _peerFocusVisible: {
        borderColor: "focus",
      },
      _peerInvalid: {
        borderColor: "danger",
      },
      _peerChecked: {
        backgroundColor: "primary",
        _after: {
          display: "block",
        },
      },
      _peerCheckedAndDisabled: {
        backgroundColor: "primary.lightest",
      },
      _peerDisabled: {
        borderColor: "tertiary",
      },
      // checkmark icon [✓]
      _after: {
        content: "''",
        position: "absolute",
        display: "none",
        width: "0.3em",
        height: "0.6em",
        borderWidth: "1px",
        borderColor: "dark",
        borderInlineStart: "none",
        borderBlockStart: "none",
        rotate: "45deg",
        transformOrigin: "0.25em 0.25em",
        _peerDisabled: {
          borderColor: "tertiary",
        },
      },
    },
    label: {
      _peerDisabled: {
        color: "tertiary",
      },
    },
  },
  variants: {
    size: {
      default: {
        checkbox: {
          width: "1.125em",
          height: "1.125em",
        },
      },
    },
  },
  defaultVariants: { size: "default" },
});
