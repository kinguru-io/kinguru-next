import { ComponentProps } from "react";
import { css } from "~/styled-system/css";

export type InputFileProps = Omit<
  ComponentProps<"input">,
  "type" | "hidden" | "name"
>;

export function InputFile({ children, disabled, ...props }: InputFileProps) {
  return (
    <label
      data-disabled={disabled}
      className={css({
        display: "block",
        width: "min-content",
        position: "relative",
        cursor: "pointer",
        "&[data-disabled=true]": {
          cursor: "not-allowed",
        },
        borderRadius: "full",
        transition: "shadow",
        _focusWithin: {
          boxShadow: "0 0 0 2px token(colors.focus)",
        },
      })}
    >
      <input type="file" className={css({ srOnly: true })} {...props} />
      {children}
    </label>
  );
}
