import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";

const Footer = () => {
  // to-do move select and icon from ui kit
  const t = useTranslations();

  const navigation = [
    { name: t("navbar.events"), href: "/events" },
    { name: t("navbar.speakers"), href: "/speakers" },
    { name: t("navbar.places"), href: "/places" },
    { name: t("navbar.price"), href: "/price" },
  ];

  const policies = [
    { name: t("footer.privacy_policy"), href: "/" },
    { name: t("footer.terms_and_conditions"), href: "/" },
    { name: t("footer.cookie_policy"), href: "/" },
    { name: t("footer.faq"), href: "/" },
  ];

  const languageOptions = [
    {
      code: "en",
      text: t("navbar.lang_en"),
    },
    {
      code: "pl",
      text: t("navbar.lang_pl"),
    },
    {
      code: "ru",
      text: t("navbar.lang_ru"),
    },
  ];

  return (
    <footer
      className={css({
        bg: "token(colors.neutral.1)",
        height: "256px",
        width: "100%",
        color: "token(colors.neutral.5)",
      })}
    >
      <div
        className={css({
          maxWidth: "1920px",
          margin: "auto",
          height: "100%",
          px: "486px 435px",
          display: "flex",
          gap: "107px",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <div>Logo</div>
        <div
          className={css({
            display: "flex",
            gap: "155px",
          })}
        >
          <div
            className={css({
              display: "flex",
              gap: "5px",
              flexDirection: "column",
            })}
          >
            {navigation.map(({ href, name }) => (
              <Link
                key={name}
                href={href}
                className={css({
                  textStyle: "body.2",
                })}
              >
                {name}
              </Link>
            ))}
          </div>
          <div
            className={css({
              display: "flex",
              gap: "5px",
              flexDirection: "column",
            })}
          >
            {policies.map(({ href, name }) => (
              <Link
                key={name}
                href={href}
                className={css({
                  textStyle: "body.2",
                })}
              >
                {name}
              </Link>
            ))}
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            })}
          >
            <ul
              className={css({
                display: "flex",
                gap: "10px",
              })}
            >
              <li>inst</li>
              <li>fb</li>
              <li>ln</li>
            </ul>
            <Link href={"tel:+48792665092"}>+48792665092</Link>
            <select>
              {languageOptions.map(({ code, text }) => (
                <option value={code} key={code} style={{ color: "black" }}>
                  {text}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
