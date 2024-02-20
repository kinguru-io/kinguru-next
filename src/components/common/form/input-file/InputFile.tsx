import { ComponentProps } from "react";
import { css } from "~/styled-system/css";

export type InputFileProps = Omit<ComponentProps<"input">, "type" | "hidden">;

//TODO maybe worth adding styles when navigate from keyboard?
export function InputFile({
  children,
  onChange,
  disabled,
  ...props
}: InputFileProps) {
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
      })}
    >
      <input type="file" onChange={onChange} hidden {...props} />
      {children}
    </label>
  );
}
