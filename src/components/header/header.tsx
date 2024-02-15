import { useTranslations } from "next-intl";
import { Links } from "./headerLinks";
import { Avatar } from "../uikit";
import { css } from "~/styled-system/css";

const Header = () => {
  const t = useTranslations();
  const navigation = [
    { name: t("navbar.events"), href: "/events" },
    { name: t("navbar.speakers"), href: "/speakers" },
    { name: t("navbar.places"), href: "/places" },
    { name: t("navbar.price"), href: "/price" },
    { name: "Как это работает?", href: "/#" },
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
          gap: "131px",
          alignItems: "center",
          px: "370px",
        })}
      >
        <div>Logo</div>
        <nav>
          <ul
            className={css({
              display: "flex",
              gap: "65px",
              paddingRight: "60px",
            })}
          >
            <Links navigation={navigation} />
          </ul>
        </nav>
        <Avatar
          image="https://loremflickr.com/320/240"
          name="random pic"
          size="sm"
        />
      </div>
    </header>
  );
};

export default Header;
