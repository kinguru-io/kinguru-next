import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/uikit";
import type { SpritesMap } from "@/components/uikit";
import { Link } from "@/navigation";
import footerLogo from "~/public/img/logotypes/footer-logotype.svg";
import { css } from "~/styled-system/css";
import { Container, Flex, HStack } from "~/styled-system/jsx";
import { footer } from "~/styled-system/recipes";

export async function Footer() {
  const t = await getTranslations("footer");

  const classes = footer();

  const links = [
    // {
    //   heading: t("user_links"),
    //   children: [
    //     { name: t("events"), href: "/events" },
    //     { name: t("speakers"), href: "/speakers" },
    //     { name: t("places"), href: "/places" },
    //   ],
    // },
    {
      heading: t("extra"),
      children: [
        { name: t("privacy_policy"), href: "/legal/privacy-policy" },
        {
          name: t("terms_and_conditions"),
          href: "/legal/terms-and-conditions",
        },
        { name: t("cookie_policy"), href: "/legal/cookie-policy" },
        { name: t("faq"), href: "/#" },
      ],
    },
  ];

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.contentWrapper}>
          <Link href="/" className={css({ flexShrink: 0 })}>
            <Image
              src={footerLogo.src}
              alt={t("eventify_logotype")}
              width="52"
              height="52"
              unoptimized
            />
          </Link>
          <Flex
            flexWrap="wrap"
            gap="6"
            flexGrow="0.75"
            justifyContent={{ sm: "space-between" }}
          >
            {links.map(({ heading, children }) => {
              return (
                <section key={heading} className={css({ flexGrow: "1" })}>
                  <h5
                    className={css({
                      color: "primary",
                      fontSize: "lg",
                      fontWeight: "bold",
                      lineHeight: "1.4",
                      marginBlockEnd: "3",
                    })}
                  >
                    {heading}
                  </h5>
                  <ul
                    className={css({
                      display: "flex",
                      flexDirection: "column",
                      gap: "2",
                      "&  a": {
                        fontSize: "sm",
                        lineHeight: "1.4",
                        _hover: { color: "primary" },
                      },
                    })}
                  >
                    {children.map(({ href, name }) => (
                      <li key={name}>
                        <Link href={href}>{name}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </Flex>
          <Flex gap="6" flexDirection="column">
            <SocialMedia />
            <HStack gap="2">
              <Icon name="common/phone" className={css({ fontSize: "2xl" })} />
              <a
                href="tel:+48792665092"
                className={css({
                  fontSize: "lg",
                  fontWeight: "bold",
                  _hover: { color: "primary" },
                })}
              >
                +48792665092
              </a>
            </HStack>
          </Flex>
        </div>
        <span className={classes.additionalText}>
          {t("all_rights_reserved", { year: new Date().getFullYear() })}
        </span>
      </Container>
    </footer>
  );
}

const socialMedia: Array<{
  iconName: SpritesMap["social"];
  link: string;
  social: string;
}> = [
  {
    iconName: "instagram",
    link: "https://www.instagram.com/eventify.today/",
    social: "Instagram",
  },
  {
    iconName: "facebook",
    link: "https://www.facebook.com/eventify.today",
    social: "Facebook",
  },
  {
    iconName: "linkedin",
    link: "https://www.linkedin.com/company/eventifytoday/",
    social: "LinkedIn",
  },
];

async function SocialMedia() {
  const t = await getTranslations("footer");

  return (
    <Flex gap="2">
      {socialMedia.map(({ iconName, link, social }) => (
        <a
          key={iconName}
          href={link}
          title={t("follow_us", { social })}
          target="_blank"
        >
          <Icon
            className={css({
              width: "10",
              height: "10",
              _hover: { color: "primary" },
            })}
            name={`social/${iconName}`}
          />
        </a>
      ))}
    </Flex>
  );
}
