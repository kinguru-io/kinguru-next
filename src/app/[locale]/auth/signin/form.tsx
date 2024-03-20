"use client";

import { useSearchParams } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Input } from "@/components/uikit";
import { VStack } from "~/styled-system/jsx";

export function SigninForm({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}) {
  const t = useTranslations("auth.signin_form");
  const [email, setEmail] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || undefined;

  return (
    <VStack gap="20px">
      {providers &&
        Object.values(providers)
          .filter(({ name }) => name !== "Credentials")
          .map((provider) => (
            <VStack key={provider.name} gap="5px">
              {provider.name === "Email" && (
                <Input
                  type="email"
                  variant="outline"
                  placeholder={t("email_placeholder")}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              <Button
                onClick={() =>
                  signIn(provider.id, {
                    email: provider.id === "email" ? email : undefined,
                    callbackUrl,
                    redirect: true,
                  })
                }
              >
                {provider.id === "email" ? t("submit") : provider.name}
              </Button>
            </VStack>
          ))}
    </VStack>
  );
}
