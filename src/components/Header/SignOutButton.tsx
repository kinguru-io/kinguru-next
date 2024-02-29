"use client";

import { signOut } from "next-auth/react";
import { ComponentProps } from "react";
import { css } from "~/styled-system/css";

export type SignOutButtonProps = ComponentProps<"button">;

export function SignOutButton({ children, ...props }: SignOutButtonProps) {
  return (
    <button
      className={css({ w: "fit-content", cursor: "pointer" })}
      onClick={() => signOut()}
      {...props}
    >
      {children}
    </button>
  );
}
