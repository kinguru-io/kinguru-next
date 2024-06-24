// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const toggleSlot = defineSlotRecipe({
  className: "input_toggle",
  slots: ["root", "toggle", "label"],
  base: {
    root: {
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "2",
      fontSize: "sm",
      "& .peer": { srOnly: true },
      "& .peer:disabled ~ *": { cursor: "not-allowed" },
    },
    toggle: {
      flexShrink: "0",
      width: "4",
      height: "4",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "secondary",
      transition: "colors",
      bgColor: "light",
      _peerFocusVisible: {
        borderColor: "focus",
      },
      _peerInvalid: {
        borderColor: "danger",
      },
      _peerChecked: {
        borderColor: "primary",
        _after: {
          bgColor: "primary",
        },
      },
      _peerCheckedAndDisabled: {
        _after: {
          bgColor: "primary.lighter",
        },
      },
      _peerDisabled: {
        borderColor: "tertiary",
      },
      _after: {
        content: "''",
        display: "inline-block",
        width: "2",
        height: "2",
        bgColor: "light",
        transition: "colors",
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
    rounded: {
      true: {
        toggle: {
          borderRadius: "full",
          _after: { borderRadius: "full" },
        },
      },
    },
  },
});
