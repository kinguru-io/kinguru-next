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
      height: "full",
    },
    sliderButton: {
      position: "absolute",
      display: "grid",
      placeItems: "center",
      color: "secondary",
      transition: "colors",
      height: "clamp(3rem, 2.4rem + 2vw, 4rem)", //since container queries feature is almost brand new feature for potential user agents
      width: "clamp(3rem, 2.4rem + 2vw, 4rem)",
      borderRadius: "full",
      bgColor: "rgba(255, 255, 255, 0.8)",
      _hoverOrFocusVisible: { color: "dark", bgColor: "light" },
      _focusVisible: {
        outline: "1px solid transparent",
        boxShadow: "focus",
      },
    },
    sliderOptions: {
      position: "relative",
      display: "flex",
      overflow: "auto",
      scrollSnapType: "x mandatory",
      height: "full",
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
      "bottom-end": {
        sliderButton: { insetBlockEnd: "2" },
        nextButton: {
          insetInlineEnd: "2",
        },
        prevButton: {
          insetInlineEnd: "calc(clamp(3rem, 2.4rem + 2vw, 4rem) + {spacing.4})", // spacing.2 + button width + spacing.2
        },
      },
      center: {
        sliderButton: { insetBlockStart: "50%", transform: "translateY(-50%)" },
        prevButton: { insetInlineStart: "2" },
        nextButton: { insetInlineEnd: "2" },
      },
      hidden: { sliderButton: { display: "none" } },
    },
  },
  defaultVariants: {
    buttonPosition: "bottom-end",
  },
});
