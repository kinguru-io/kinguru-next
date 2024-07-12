"use client";

import { useSearchParams } from "next/navigation";
import { type ClientSafeProvider, signIn } from "next-auth/react";
import { Button, Icon, type SpritesMap } from "@/components/uikit";
import { SPRITES_META } from "@/components/uikit/icon/sprite.gen";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";

export function SignInProvidersForm({
  providers,
}: {
  providers: ClientSafeProvider[];
}) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || undefined;

  return (
    <HStack gap="2">
      {providers.map(({ id, name }) => {
        const iconName = name.toLocaleLowerCase();
        const icon = isAuthIcon(iconName) ? (
          <Icon name={`auth/${iconName}`} className={css({ fontSize: "xl" })} />
        ) : null;

        return (
          <Button
            key={id}
            type="button"
            colorPalette="secondary"
            className={css({
              flexBasis: "44",
              flexGrow: "1",
              justifyContent: "center",
              padding: "2",
            })}
            icon={icon}
            onClick={() =>
              signIn(id, {
                callbackUrl,
                redirect: true,
              })
            }
          >
            {name}
          </Button>
        );
      })}
    </HStack>
  );
}

function isAuthIcon(name: string): name is SpritesMap["auth"] {
  return name in SPRITES_META.auth.items;
}
