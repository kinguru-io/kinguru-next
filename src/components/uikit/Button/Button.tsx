import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

export const button = cva({
  base: {
    fontWeight: "medium",
    borderRadius: "md",
  },
  variants: {
    status: {
      default: {
        color: "white",
        bg: "gray.500",
      },
      success: {
        color: "white",
        bg: "green.500",
      },
    },
  },
});

export const Button = styled("button", button);
