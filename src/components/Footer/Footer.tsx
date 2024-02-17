import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LanguageDropdown } from "./LanguageDropdown";
import { Link, locales } from "@/navigation";
import facebookIcon from "~/public/img/footerIcons/FaceBook.svg";
import instagramIcon from "~/public/img/footerIcons/Instagram.svg";
import linkedinIcon from "~/public/img/footerIcons/LinkedIn.svg";
import { css } from "~/styled-system/css";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const navigation = [
    { name: t("events"), href: "/events" },
    { name: t("speakers"), href: "/speakers" },
    { name: t("places"), href: "/places" },
    { name: t("price"), href: "/price" },
  ];

  const policies = [
    { name: t("privacy_policy"), href: "/legal/privacy-policy" },
    {
      name: t("terms_and_conditions"),
      href: "/legal/terms-and-conditions",
    },
    { name: t("cookie_policy"), href: "/legal/cookie-policy" },
    { name: t("faq"), href: "/#" },
  ];

  const languageOptions = locales.map((code) => ({
    code: code,
    text: t(`lang_${code}`),
  }));

  return (
    <footer
      className={css({
        bg: "token(colors.neutral.1)",
        height: "256px",
        width: "100%",
        color: "token(colors.neutral.5)",
        textStyle: "body.2",
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
          position: "relative",
        })}
      >
        <div
          className={css({
            color: "token(colors.neutral.2)",
            position: "absolute",
            bottom: "20px",
          })}
        >
          {t("all_rights_reserved", { year: new Date().getFullYear() })}
        </div>
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
              <Link key={name} href={href}>
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
              <Link key={name} href={href}>
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
            <div
              className={css({
                display: "flex",
                gap: "10px",
              })}
            >
              <a href="#">
                <Image
                  src={instagramIcon.src}
                  alt="instagram icon"
                  role="link"
                  width={22}
                  height={22}
                />
              </a>
              <a href="#">
                <Image
                  src={facebookIcon.src}
                  alt="facebook icon"
                  role="link"
                  width={22}
                  height={22}
                />
              </a>
              <a href="#">
                <Image
                  src={linkedinIcon.src}
                  alt="linkedin icon"
                  role="link"
                  width={22}
                  height={22}
                />
              </a>
            </div>
            <Link href={"tel:+48792665092"}>+48792665092</Link>
            <LanguageDropdown locale={locale} langOptions={languageOptions} />
          </div>
        </div>
      </div>
    </footer>
  );
}
