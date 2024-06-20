// eslint-disable-next-line import/no-extraneous-dependencies
import { defineSlotRecipe } from "@pandacss/dev";

export const sliderSlot = defineSlotRecipe({
  className: "slider",
  slots: [
    "slider",
    "buttonGroup",
    "sliderOptions",
    "prevButton",
    "nextButton",
    "sliderButton",
    "item",
  ],
  base: {
    slider: {
      position: "relative",
      height: "full",
    },
    buttonGroup: {
      position: "absolute",
      display: "flex",
      gap: "2",
      padding: "clamp(0.75rem, 0.3rem + 1.5vw, 1.5rem)",
    },
    sliderButton: {
      display: "grid",
      placeItems: "center",
      color: "#8B8B8B",
      transition: "colors",
      height: "clamp(3rem, 2.4rem + 2vw, 4rem)", //since container queries feature is almost brand new feature for potential user agents
      width: "clamp(3rem, 2.4rem + 2vw, 4rem)",
      borderRadius: "50%",
      bgColor: {
        base: "rgba(255, 255, 255, 0.8)",
        _hover: "neutral.5",
        _focusVisible: "neutral.5",
      },
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
      scrollbarWidth: "none",
      _scrollbar: { display: "none" },
    },
    item: {
      scrollSnapAlign: "start",
      width: "full",
      flexShrink: "0",
    },
  },
  variants: {
    buttonPosition: {
      inner: {},
      outer: {},
      "bottom-right": {
        buttonGroup: {
          insetInlineEnd: "0",
          insetBlockEnd: "0",
        },
      },
      center: {
        buttonGroup: {
          width: "full",
          justifyContent: "space-between",
          insetBlockStart: "50%",
          transform: "translateY(-50%)",
        },
      },
    },
  },
  defaultVariants: {
    buttonPosition: "bottom-right",
  },
});
