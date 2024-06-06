"use client";

import { StackDivider } from "@chakra-ui/react";
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
        <>
          <VStack key={provider.id} gap="15px">
            {provider.name === "Email" && (
              <Input
                type="email"
                placeholder={t("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <Button
              size={provider.name === "Email" ? "md" : "sm"}
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
          <StackDivider borderColor="gray.200" />
        </>
      ))}
    </VStack>
  );
}
