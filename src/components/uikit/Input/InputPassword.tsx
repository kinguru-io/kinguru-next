"use client";

import { ForwardedRef, forwardRef, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Input, InputProps } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";

export const InputPassword = forwardRef(function InputPassword(
  { variant, type, ...restProps }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [passwordShown, setPasswordShownState] = useState(false);

  function onIconClick() {
    setPasswordShownState((prevState) => !prevState);
  }

  return (
    <Box
      position="relative"
      css={{ "& input[type=password]": { color: "neutral.2" } }}
    >
      <Input
        type={passwordShown ? "text" : "password"}
        variant="outline"
        ref={ref}
        {...restProps}
      />
      <button
        type="button"
        className={css({
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          // right + padding = 13px (ui-kit design, inline-end padding)
          right: "4px",
          padding: "9px",
          cursor: "pointer",
          fontSize: "12px",
        })}
        onClick={onIconClick}
      >
        {passwordShown ? <RiEyeLine /> : <RiEyeOffLine />}
      </button>
    </Box>
  );
});
