import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { css } from "~/styled-system/css";

type TextareaProps = ComponentProps<"textarea">;

export const Textarea = forwardRef(function Textarea(
  { children, ...restProps }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <textarea
      ref={ref}
      className={css({
        "&[rows]": { width: "full" },
        minHeight: "calc(1.25rem + 22px)", // (line-height) + (padding-inline) + (border-width * 2)
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
});
