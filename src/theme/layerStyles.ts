/* eslint-disable import/no-extraneous-dependencies */
import { defineLayerStyles } from "@pandacss/dev";
import { LayerStyle } from "~/styled-system/types/composition";

const outlineWrapperBaseStyles: LayerStyle = {
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "10px",
  backgroundColor: "light",
};

export const layerStyles = defineLayerStyles({
  outlinePrimaryWrapper: {
    value: {
      ...outlineWrapperBaseStyles,
      borderColor: "primary",
      paddingInline: "38px",
      paddingBlock: "35px",
    },
  },
  outlineSecondaryWrapper: {
    value: {
      ...outlineWrapperBaseStyles,
      borderColor: "tertiary",
      paddingBlockStart: "50px",
      paddingBlockEnd: "60px",
    },
  },
  dashedWrapper: {
    value: {
      borderWidth: "2px",
      borderStyle: "dashed",
      borderColor: "tertiary",
      borderRadius: "10px",
    },
  },
});
