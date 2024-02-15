/* eslint-disable import/no-extraneous-dependencies */
import { defineLayerStyles } from "@pandacss/dev";
import { LayerStyle } from "~/styled-system/types/composition";

const outlineWrapperBaseStyles: LayerStyle = {
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "10px",
  backgroundColor: "neutral.5",
  paddingInline: "38px",
};

export const layerStyles = defineLayerStyles({
  outlinePrimaryWrapper: {
    value: {
      ...outlineWrapperBaseStyles,
      borderColor: "primary",
      paddingBlock: "35px",
    },
  },
  outlineSecondaryWrapper: {
    value: {
      ...outlineWrapperBaseStyles,
      borderColor: "neutral.3",
      paddingBlockStart: "51px",
      paddingBlockEnd: "72px",
    },
  },
});
