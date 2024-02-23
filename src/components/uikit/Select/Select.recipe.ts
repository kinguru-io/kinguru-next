// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const selectSlot = defineSlotRecipe({
  className: "select",
  slots: ["outerWrapper", "selectRoot"],
  base: {
    outerWrapper: {
      position: "relative",
      _after: {
        content: "''",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "0",
        borderStyle: "solid",
        borderWidth: "5px 6px 0 6px",
        borderColor:
          "token(colors.neutral.2) transparent transparent transparent",
        pointerEvents: "none",
      },
    },
    selectRoot: {
      appearance: "none",
      borderRadius: "0",
      cursor: "pointer",
      paddingInlineEnd: "20px", //safe space for icon
      _disabled: {
        cursor: "not-allowed",
      },
      '&:has(option[value=""]:checked)': {
        color: "neutral.2",
      },
    },
  },
});
