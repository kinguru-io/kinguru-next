import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LanguageDropdown } from "./language-dropdown";
import { UserSection } from "./UserSection";
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
          width={{ base: "87px", md: "108px" }}
        >
          <Image
            src={headerLogotype.src}
            alt={t("eventify_logotype")}
            width="108"
            height="40"
            unoptimized
          />
          <Link href="/" className={linkOverlay()}>
            <span className={css({ srOnly: true })}>{t("home_link")}</span>
          </Link>
        </InlineBox>
        <HStack gap="3">
          <UserSection />
          <LanguageDropdown />
        </HStack>
      </Container>
    </header>
  );
}
