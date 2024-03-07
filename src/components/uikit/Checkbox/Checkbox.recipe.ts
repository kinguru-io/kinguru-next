// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const checkboxSlot = defineSlotRecipe({
  className: "input_checkbox",
  slots: ["root", "checkbox", "label"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      "& input[type=checkbox]": {
        srOnly: true,
      },
    },
    checkbox: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "neutral.1",
      borderRadius: "3px",
      transition: "colors",
      backgroundColor: "neutral.5",
      _peerFocus: {
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
      // checkmark icon [✓]
      _after: {
        content: "''",
        position: "absolute",
        display: "none",
        width: "0.3em",
        height: "0.6em",
        borderWidth: "1px",
        borderColor: "neutral.1",
        borderInlineStart: "none",
        borderBlockStart: "none",
        rotate: "45deg",
        transformOrigin: "center",
      },
    },
    label: {},
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
