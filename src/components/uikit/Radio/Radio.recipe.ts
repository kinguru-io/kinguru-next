// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const radioSlot = defineSlotRecipe({
  className: "input_radio",
  slots: ["root", "radio", "label"],
  base: {
    root: {
      cursor: "pointer",
      display: "inline-flex",
      gap: "10px",
      alignItems: "center",
      "& input[type=radio]": {
        srOnly: true,
      },
      "& input[type=radio]:disabled ~ *": {
        cursor: "not-allowed",
      },
    },
    radio: {
      flexShrink: "0",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "neutral.1",
      borderRadius: "full",
      transition: "colors",
      backgroundColor: "neutral.5",
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
        backgroundColor: "primary.disabled",
      },
      _peerDisabled: {
        borderColor: "neutral.3",
      },
      _after: {
        content: "''",
        position: "absolute",
        display: "none",
        width: "0.5em",
        height: "0.5em",
        borderWidth: "1px",
        borderColor: "neutral.1",
        borderRadius: "full",
        _peerDisabled: {
          borderColor: "neutral.3",
        },
      },
    },
    label: {
      _peerDisabled: {
        color: "neutral.3",
      },
    },
  },
  variants: {
    size: {
      default: {
        radio: {
          width: "1.125em",
          height: "1.125em",
        },
      },
    },
  },
  defaultVariants: { size: "default" },
});
