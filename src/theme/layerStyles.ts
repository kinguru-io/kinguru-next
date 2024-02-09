/* eslint-disable import/no-extraneous-dependencies */
import { defineLayerStyles } from "@pandacss/dev";
import { LayerStyle } from "~/styled-system/types/composition";

const outlineWrapperBaseStyles: LayerStyle = {
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "10px",
  backgroundColor: "neutral.5",
  paddingInline: "25px", // safe space for inners
};

export const layerStyles = defineLayerStyles({
  outlinePrimaryWrapper: {
    value: {
      ...outlineWrapperBaseStyles,
      borderColor: "primary",
      paddingBlockStart: "38px",
      paddingBlockEnd: "19px",
    },
  },
  outlineSecondaryWrapper: {
    value: {
      ...outlineWrapperBaseStyles,
      borderColor: "secondary",
      paddingBlockStart: "51px",
      paddingBlockEnd: "72px",
    },
  },
});
