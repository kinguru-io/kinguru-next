import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { LanguageDropdown } from "./language-dropdown";
import { UserSection } from "./UserSection";
import { Button } from "@/components/uikit";
import { Link } from "@/navigation";
import headerLogotype from "~/public/img/logotypes/header-logotype.svg";
import { css } from "~/styled-system/css";
import { Container, HStack, InlineBox } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";
import { header } from "~/styled-system/recipes";

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
          <Suspense
            fallback={
              <Button colorPalette="secondary" isLoading>
                {t("sign_in_and_sign_up")}
              </Button>
            }
          >
            <UserSection />
          </Suspense>
          <LanguageDropdown />
        </HStack>
      </Container>
    </header>
  );
}
