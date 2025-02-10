import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

import { CompanyRegisterLink } from "./company-register-link";
import { HeaderModal } from "./header-modal";
import { LanguageSelector } from "./language-selector";
import { SignOutButton } from "./sign-out-button";
import { UserSection, UserSectionSkeleton } from "./user-section";

import { GoogleTranslateMenu } from "../google-translate/GoogleTranslateMenu";
import { getSession } from "@/auth";
import { Contacts, SocialMediaLinks } from "@/components/brand";
import { Link } from "@/navigation";
import headerLogotype from "~/public/img/logotypes/header-logotype.svg";
import { css, cx } from "~/styled-system/css";
import { Container, HStack, InlineBox, Stack } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";
import { button, header } from "~/styled-system/recipes";

export async function Header() {
  const t = await getTranslations("navbar");

  const classes = header();

  return (
    <header className={classes.header}>
      <Container className={classes.headerWrapper}>
        <InlineBox
          position="relative"
          gridArea="logo"
          flexShrink="0"
          width={{ base: "87px", md: "117px" }}
        >
          <Image
            src={headerLogotype.src}
            alt={t("eventify_logotype")}
            width="117"
            height="43"
            priority
            unoptimized
          />

          <Link href="/" className={linkOverlay()}>
            <span className={css({ srOnly: true })}>{t("home_link")}</span>
          </Link>
        </InlineBox>

        <HStack gap="3">
          <HeaderModal
            content={
              <>
                <ModalContent
                  signOutLabel={t("sign_out")}
                  localeLabel={t("lang_menu")}
                  marketingSlot={<CompanyRegisterLink />}
                />
              </>
            }
          >
            <Suspense
              fallback={
                <UserSectionSkeleton label={t("sign_in_and_sign_up")} />
              }
            >
              <UserSection />
            </Suspense>
          </HeaderModal>
          <GoogleTranslateMenu />
        </HStack>
      </Container>
    </header>
  );
}

async function ModalContent({
  signOutLabel,
  marketingSlot,
}: {
  signOutLabel: string;
  localeLabel: string;
  marketingSlot?: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <Stack css={{ flexDirection: "column", gap: 4, height: "full" }}>
      {!session && marketingSlot}
      <LanguageSelector />

      <Stack marginBlockStart="auto" gap="6">
        <SocialMediaLinks />
        <Contacts />
      </Stack>
      {session && (
        <SignOutButton
          className={cx(
            button({ colorPalette: "dark", rounded: false }),
            css({ justifyContent: "center" }),
          )}
        >
          {signOutLabel}
        </SignOutButton>
      )}
    </Stack>
  );
}
