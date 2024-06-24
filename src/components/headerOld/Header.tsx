import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HeaderLinks } from "./HeaderLinks";
import { UserSection } from "./UserSection";
import { Link } from "@/navigation";
import headerLogotype from "~/public/img/logotypes/header-logotype.svg";
import { css, cx } from "~/styled-system/css";
import { Container, GridItem } from "~/styled-system/jsx";
import { header } from "~/styled-system/recipes";

export function Header() {
  const t = useTranslations("navbar");

  const classes = header();

  const navigation = [
    { name: t("events"), href: "/events" },
    { name: t("speakers"), href: "/speakers" },
    { name: t("venues"), href: "/venues" },
    { name: t("price"), href: "/price" },
    { name: t("how_it_works"), href: "/#" },
  ];

  return (
    <header className={classes.header}>
      <Container className={classes.headerWrapper}>
        <Link
          href="/"
          className={css({
            gridArea: "logo",
            justifySelf: "center",
            display: "flex",
            w: "95px",
            h: "35px",
          })}
        >
          <Image
            className={css({ flexShrink: 0 })}
            src={headerLogotype.src}
            alt={t("eventify_logotype")}
            width="95"
            height="35"
          />
        </Link>
        <HeaderNav>
          <HeaderLinks links={navigation} />
        </HeaderNav>
        <GridItem gridArea="user">
          <UserSection />
        </GridItem>
      </Container>
    </header>
  );
}

function HeaderNav({ children }: { children: React.ReactNode }) {
  const t = useTranslations("navbar");
  const navigationId = useId() + "navigation";

  return (
    <GridItem gridArea="nav">
      <label
        className={css({
          cursor: "pointer",
          "@media (min-width: 900px)": {
            display: "none",
          },
        })}
        htmlFor={navigationId}
      >
        <RxHamburgerMenu size={32} />
        <span className={css({ srOnly: true })}>{t("toggle_nav")}</span>
      </label>
      <input
        id={navigationId}
        className={cx(
          "peer",
          css({
            display: "block",
            appearance: "none",
            "@media (min-width: 900px)": {
              display: "none",
            },
          }),
        )}
        type="checkbox"
      />
      <nav
        className={css({
          "@media (max-width: 900px)": {
            position: "fixed",
            top: "-100%",
            _peerChecked: {
              inset: "0",
              top: "85px",
              bgColor: "light",
            },
          },
        })}
      >
        {children}
      </nav>
    </GridItem>
  );
}
