// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const selectSlot = defineSlotRecipe({
  className: "select",
  slots: ["outerWrapper", "selectRoot", "icon", "arrow"],
  base: {
    outerWrapper: {
      position: "relative",
      display: "inline-block",
      width: "full",
      color: "dark",
      fontWeight: "500",
      '&:has(option[value=""]:checked)': {
        color: "secondary",
        fontWeight: "normal",
      },
    },
    selectRoot: {
      display: "inline-block",
      width: "full",
      appearance: "none",
      cursor: "pointer",
      fontSize: "px15",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "secondary.lighter",
      bgColor: "secondary.lighter",
      borderRadius: "sm",
      outline: "1px solid transparent",
      transition: "colors",
      padding: "4",
      paddingInlineEnd: "12", // 16px padding + 16 icon + 16 safe space = 48 (48 / 4 = spacings.12)
      _invalid: { borderColor: "danger!" },
      _focusWithin: {
        bgColor: "secondary.lightest",
        borderColor: "focus!",
      },
      _hover: {
        bgColor: "secondary.lightest",
        borderColor: "secondary.lightest",
      },
      _disabled: {
        opacity: "0.4",
        cursor: "not-allowed",
      },
      '&:has(option[value=""]:not(:checked))': {
        borderColor: "dark",
        bgColor: "light",
      },
    },
    icon: {
      position: "absolute",
      insetBlockStart: "50%",
      insetInlineStart: "4",
      transform: "translateY(-50%)",
      fontSize: "2xl",
      display: "grid",
      placeItems: "center",
      pointerEvents: "none",
    },
    arrow: {
      position: "absolute",
      insetBlockStart: "50%",
      insetInlineEnd: "4",
      transform: "translateY(-50%) rotate(-90deg)",
      pointerEvents: "none",
      color: "secondary",
    },
  },
  variants: {
    rounded: { true: { selectRoot: { borderRadius: "full" } } },
    withIcon: {
      true: { selectRoot: { paddingInlineStart: "12" } }, // 16 padding + 24 icon + 8 safe space = 48 (48 / 4 = spacings.12)
    },
  },
});
