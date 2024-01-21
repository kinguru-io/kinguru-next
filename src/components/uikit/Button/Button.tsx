import * as stylex from "@stylexjs/stylex";
import { ComponentProps, FC } from "react";

export type Button = {
  variant?: "primary" | "danger";
} & ComponentProps<"button">;

const BUTTON_STYLES = stylex.create({
  base: {
    padding: "10px",
    border: 0,
    cursor: "pointer",
  },
  primary: {
    background: "blue",
  },
  danger: {
    background: "red",
  },
});

export const Button: FC<Button> = ({ children, variant = "primary" }) => {
  return (
    <button {...stylex.props(BUTTON_STYLES.base, BUTTON_STYLES[variant])}>
      {children}
    </button>
  );
};
