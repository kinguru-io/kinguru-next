"use client";

import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "@/components/uikit";

type SignOutButtonProps = Omit<ButtonProps, "variant">;

export function SignOutButton({ children, ...props }: SignOutButtonProps) {
  return (
    <Button {...props} onClick={() => signOut()}>
      {children}
    </Button>
  );
}
