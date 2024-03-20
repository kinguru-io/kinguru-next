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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _focusVisible: {
        outline: "none",
        border: "1px solid token(colors.focus)",
      },
    },
    sliderOptions: {
      position: "relative",
      display: "flex",
      overflow: "auto",
      scrollSnapType: "x mandatory",
      h: "100%",
      borderRadius: "12px",
      _scrollbar: {
        display: "none",
      },
    },
    item: {
      scrollSnapAlign: "start",
    },
  },
  variants: {
    buttonPosition: {
      inner: {
        sliderButton: {
          bg: "token(colors.neutral.5)",
          _hover: {
            bg: "token(colors.neutral.4)",
          },
        },
        prevButton: {
          left: "6px",
        },
        nextButton: {
          right: "6px",
        },
        item: {
          flexShrink: "0",
          w: "100%",
          h: "100%",
        },
      },
      outer: {
        prevButton: {
          left: "-35px",
        },
        nextButton: {
          right: "-35px",
        },
        item: {
          w: "max-content",
        },
        sliderOptions: {
          gap: "10px",
        },
      },
    },
  },
});
