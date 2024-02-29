import Image from "next/image";
import { useTranslations } from "next-intl";
import { Links } from "./HeaderLinks";
import { UserSection } from "./UserSection";
import { Link } from "@/navigation";
import headerLogotype from "~/public/img/logotypes/header-logo.png";
import { css } from "~/styled-system/css";
import { Container } from "~/styled-system/jsx";
import { header } from "~/styled-system/recipes";

export function Header() {
  const t = useTranslations("navbar");

  const classes = header();

  const navigation = [
    { name: t("events"), href: "/events" },
    { name: t("speakers"), href: "/speakers" },
    { name: t("places"), href: "/places" },
    { name: t("price"), href: "/price" },
    { name: t("how_it_works"), href: "/#" },
  ];
  return (
    <header className={classes.header}>
      <Container className={classes.headerWrapper}>
        <Link
          href="/"
          className={css({ display: "flex", w: "95px", h: "35px" })}
        >
          <Image
            className={css({ flexShrink: 0 })}
            src={headerLogotype.src}
            alt="Eventify logotype"
            width="95"
            height="35"
          />
        </Link>
        <nav>
          <Links navigation={navigation} />
        </nav>
        <UserSection />
      </Container>
    </header>
  );
}
