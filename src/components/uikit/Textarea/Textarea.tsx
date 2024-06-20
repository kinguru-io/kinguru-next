import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { css, cx } from "~/styled-system/css";

type TextareaProps = ComponentProps<"textarea">;

const textAreaClassName = css({
  width: "full",
  minHeight: "calc(1lh + 2.625rem)", // 1lh + (2 * border width) + (2 * paddingBlock)
  paddingBlock: "5",
  paddingInline: "4",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "sm",
  fontSize: "px15",
  fontWeight: "500",
  transition: "colors",
  borderColor: "neutral.4",
  bgColor: "neutral.4",
  outline: "1px solid transparent",
  _placeholder: { fontWeight: "normal" },
  _placeholderHidden: {
    borderColor: "neutral.1!",
    bgColor: "neutral.5!",
  },
  _focusVisible: {
    bgColor: "#FBFBFB",
    borderColor: "focus!",
  },
  _hoverEnabled: {
    bgColor: "#FBFBFB",
    borderColor: "#FBFBFB",
  },
  _disabled: { opacity: "0.4", cursor: "not-allowed" },
  _invalid: { borderColor: "danger!" },
});

export const Textarea = forwardRef(function Textarea(
  { children, className, rows = 9, ...restProps }: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <textarea
      ref={ref}
      className={cx(className, textAreaClassName)}
      rows={rows}
      {...restProps}
    >
      {children}
    </textarea>
  );
});
