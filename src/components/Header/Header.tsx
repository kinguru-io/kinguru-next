import { useTranslations } from "next-intl";
import { Links } from "./HeaderLinks";
import { UserSection } from "./UserSection";
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
        <div>Logo</div>
        <nav>
          <Links navigation={navigation} />
        </nav>
        <UserSection />
      </Container>
    </header>
  );
}
