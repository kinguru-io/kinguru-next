// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const sliderSlot = defineSlotRecipe({
  className: "slider",
  slots: [
    "slider",
    "sliderOptions",
    "prevButton",
    "nextButton",
    "sliderButton",
    "item",
  ],
  base: {
    slider: {
      position: "relative",
      h: "100%",
    },
    sliderButton: {
      position: "absolute",
      transition: "0.5s",
      top: "50%",
      transform: "translateY(-50%)",
      h: "35px",
      w: "35px",
      borderRadius: "50%",
      cursor: "pointer",
      bg: "token(colors.neutral.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _hover: {
        bg: "token(colors.neutral.4)",
      },
      _focus: {
        outline: "none",
        border: "1px solid token(colors.focus)",
      },
    },
    prevButton: {
      left: "6px",
    },
    nextButton: {
      right: "6px",
    },
    sliderOptions: {
      position: "relative",
      display: "flex",
      overflow: "auto",
      scrollSnapType: "x mandatory",
      h: "100%",
      w: "auto",
      borderRadius: "12px",
      _scrollbar: {
        display: "none",
      },
    },
    item: {
      flexShrink: 0,
      w: "100%",
      h: "100%",
      scrollSnapAlign: "start",
    },
  },
});
