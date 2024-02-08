/* eslint-disable import/no-extraneous-dependencies */
import { defineLayerStyles } from "@pandacss/dev";

export const layerStyles = defineLayerStyles({
  authContainer: {
    value: {
      border: "2px solid token(colors.primary)",
      borderRadius: "10px",
      backgroundColor: "neutral.5",
      paddingInline: "37px",
      paddingBlockStart: "38px",
      paddingBlockEnd: "19px",
    },
  },
});
