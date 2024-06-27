"use client";

import { useSearchParams } from "next/navigation";
import { type ClientSafeProvider, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button, Input } from "@/components/uikit";
import { Stack } from "~/styled-system/jsx";

export function SigninForm({ providers }: { providers: ClientSafeProvider[] }) {
  const t = useTranslations("auth.signin_form");
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");

  const callbackUrl = searchParams.get("callbackUrl") || undefined;

  return (
    <Stack gap="4">
      {providers.map((provider) => (
        <Stack key={provider.id}>
          {provider.name === "Email" && (
            <Input
              type="email"
              placeholder={t("email")}
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
        </Stack>
      ))}
    </Stack>
  );
}
