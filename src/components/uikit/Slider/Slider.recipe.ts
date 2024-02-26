// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const SliderSlot = defineSlotRecipe({
  className: "slider",
  slots: [
    "slider",
    "sliderOptions",
    "prevButton",
    "nextButton",
    "sliderButton",
  ],
  base: {
    slider: {
      position: "relative",
      overflow: "hidden",
      w: "391px",
      h: "220px",
      borderRadius: "12px",
    },
    sliderButton: {
      position: "absolute",
      transition: "0.5s",
      top: "calc(100% / 2 - 18.5px)",
      h: "35px",
      w: "35px",
      borderRadius: "50%",
      zIndex: 20,
      cursor: "pointer",
      bg: "token(colors.neutral.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _hover: {
        bg: "token(colors.neutral.4)",
      },
      _focusVisible: {
        border: "1px solid",
        outline: "none",
        borderColor: "token(colors.blue)",
      },
    },
    prevButton: {
      left: "6px",
    },
    nextButton: {
      right: "6px",
    },
    sliderOptions: {
      transition: "0.5s",
      "& > *": { w: "391px", h: "220px" },
      display: "flex",
      position: "absolute",
    },
  },
});
