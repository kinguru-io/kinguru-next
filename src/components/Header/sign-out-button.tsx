"use client";

import { signOut } from "next-auth/react";
import type { ComponentPropsWithoutRef } from "react";

const signOutClicked = () => signOut();

export function SignOutButton({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button {...props} onClick={signOutClicked}>
      {children}
    </button>
  );
}
