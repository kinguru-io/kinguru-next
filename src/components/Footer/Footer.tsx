import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LanguageDropdown } from "./LanguageDropdown";
import { Link } from "@/navigation";
import facebookIcon from "~/public/img/footerIcons/FaceBook.svg";
import instagramIcon from "~/public/img/footerIcons/Instagram.svg";
import linkedinIcon from "~/public/img/footerIcons/LinkedIn.svg";
import footerLogotype from "~/public/img/logotypes/footer-logo.png";
import { css } from "~/styled-system/css";
import { Container, Flex } from "~/styled-system/jsx";
import { footer } from "~/styled-system/recipes";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const classes = footer();

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

  const socialMedia = [
    {
      name: "Instagram",
      src: instagramIcon.src,
      link: "https://www.instagram.com/eventify.today/",
    },
    {
      name: "Facebook",
      src: facebookIcon.src,
      link: "https://www.facebook.com/eventify.today",
    },
    {
      name: "Linkedin",
      src: linkedinIcon.src,
      link: "https://www.linkedin.com/company/eventifytoday/",
    },
  ];

  return (
    <footer className={classes.footer}>
      <Container className={classes.footerWrapper}>
        <div className={classes.contentWrapper}>
          <Link href="/" className={css({ flexShrink: 0 })}>
            <Image
              src={footerLogotype.src}
              alt={"Eventify logotype"}
              width="115"
              height="115"
            />
          </Link>
          <Flex gap="5px" direction="column">
            {navigation.map(({ href, name }) => (
              <Link key={name} href={href}>
                {name}
              </Link>
            ))}
          </Flex>
          <Flex gap="5px" direction="column">
            {policies.map(({ href, name }) => (
              <Link key={name} href={href}>
                {name}
              </Link>
            ))}
          </Flex>
          <Flex gap="5px" direction="column">
            <Flex gap="10px">
              {socialMedia.map(({ name, src, link }) => (
                <Link key={name} href={link}>
                  <Image
                    src={src}
                    alt={t("follow_us", { social: name })}
                    width={22}
                    height={22}
                  />
                </Link>
              ))}
            </Flex>
            <Link href={"tel:+48792665092"}>+48792665092</Link>
            <LanguageDropdown locale={locale} />
          </Flex>
        </div>
        <div className={classes.additionalText}>
          {t("all_rights_reserved", { year: new Date().getFullYear() })}
        </div>
      </Container>
    </footer>
  );
}
