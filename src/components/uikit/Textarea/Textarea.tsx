import { ComponentProps } from "react";
import { css } from "~/styled-system/css";

type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ children, ...restProps }: TextareaProps) {
  return (
    <textarea
      className={css({
        fontSize: "16px",
        lineHeight: "1.25",
        p: "10px",
        bg: "neutral.5",
        border: "1px solid token(colors.secondary)",
        borderRadius: "6px",
        transition: "colors",
        _placeholder: {
          color: "neutral.3",
        },
        _hoverEnabled: {
          borderColor: "primary",
        },
        _focusVisible: {
          outline: "none",
          borderColor: "primary",
        },
        _disabled: {
          color: "neutral.3",
          borderColor: "neutral.3",
          cursor: "not-allowed",
        },
      })}
      {...restProps}
    >
      {children}
    </textarea>
  );
}
