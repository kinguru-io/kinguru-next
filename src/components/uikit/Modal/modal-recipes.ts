import { cva } from "~/styled-system/css";

export const modalRecipe = cva({
  base: {
    position: "fixed",
    bgColor: "light",
    inset: "0",
    maxWidth: "100vw",
    width: "full",
    md: {
      minWidth: "80",
      maxHeight: "90vh",
      borderRadius: "sm",
    },
    animation: { base: "fade-in", _motionReduce: "none" },
  },
  variants: {
    type: {
      default: {
        maxHeight: "full",
        mdDown: { height: "full" },
        md: { width: "max-content", maxWidth: "breakpoint-md", margin: "auto" },
      },
      "drawer-bottom": {
        marginBlockStart: "auto",
        lgDown: { minHeight: "72" },
      },
      fullscreen: {
        height: "full",
        md: {
          minWidth: "80",
          maxHeight: "100vh",
          borderRadius: "unset",
        },
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});
