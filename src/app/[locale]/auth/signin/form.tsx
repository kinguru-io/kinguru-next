"use client";

import { useSearchParams } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { Button } from "@/components/uikit";
import { VStack } from "~/styled-system/jsx";

export function SigninForm({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || undefined;

  return (
    <VStack>
      {providers &&
        Object.values(providers)
          .filter(({ name }) => name !== "Credentials")
          .map((provider) => (
            <Button
              key={provider.name}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl,
                  redirect: true,
                })
              }
            >
              {provider.name}
            </Button>
          ))}
    </VStack>
  );
}
