"use client";

import { signOut } from "next-auth/react";
import type { ComponentPropsWithoutRef } from "react";

export function SignOutButton({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button {...props} onClick={() => signOut()}>
      {children}
    </button>
  );
}
