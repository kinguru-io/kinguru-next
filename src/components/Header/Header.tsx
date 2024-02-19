import { useTranslations } from "next-intl";
import { Links } from "./HeaderLinks";
import { UserSection } from "./UserSection";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

export function Header() {
  const t = useTranslations();
  const navigation = [
    { name: t("navbar.events"), href: "/events" },
    { name: t("navbar.speakers"), href: "/speakers" },
    { name: t("navbar.places"), href: "/places" },
    { name: t("navbar.price"), href: "/price" },
    { name: t("navbar.how_it_works"), href: "/#" },
  ];
  return (
    <header
      className={css({
        width: "100%",
        borderBottom: "1px solid token(colors.neutral.3)",
        bg: "token(colors.neutral.5)",
        height: "85px",
      })}
    >
      <div
        className={css({
          height: "100%",
          maxWidth: "1920px",
          margin: "auto",
          display: "flex",
          gap: "62px",
          alignItems: "center",
          px: "370px",
        })}
      >
        <div>Logo</div>
        <nav>
          <Flex gap="65px">
            <Links navigation={navigation} />
          </Flex>
        </nav>
        <UserSection />
      </div>
    </header>
  );
}
