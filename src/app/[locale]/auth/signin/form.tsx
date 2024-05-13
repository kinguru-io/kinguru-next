"use client";

import { type ClientSafeProvider, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Input } from "@/components/uikit";
import { VStack } from "~/styled-system/jsx";

export function SigninForm({
  providers,
  callbackUrl,
}: {
  providers: ClientSafeProvider[];
  callbackUrl?: string;
}) {
  const t = useTranslations("auth.signin_form");
  const [email, setEmail] = useState("");

  return (
    <VStack gap="20px">
      {providers.map((provider) => (
        <VStack key={provider.id} gap="5px">
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
