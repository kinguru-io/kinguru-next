"use client";

import { type ForwardedRef, forwardRef, useState } from "react";
import { Icon, Input, type InputProps } from "@/components/uikit";

export const InputPassword = forwardRef(function InputPassword(
  props: Omit<InputProps, "type" | "suffix">,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [passwordShown, setPasswordShownState] = useState(false);

  function onIconClick() {
    setPasswordShownState((prevState) => !prevState);
  }

  return (
    <Input
      type={passwordShown ? "text" : "password"}
      ref={ref}
      suffix={
        <Icon
          name={passwordShown ? "action/view" : "action/view-off"}
          onClick={onIconClick}
        />
      }
      {...props}
    />
  );
});
