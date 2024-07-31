import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { SocialMediaLinks, Contacts } from "@/components/brand";
import { Link } from "@/navigation";
import footerLogo from "~/public/img/logotypes/footer-logotype.svg";
import { css } from "~/styled-system/css";
import { Container, Flex } from "~/styled-system/jsx";
import { footer } from "~/styled-system/recipes";

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();

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
        {
          name: t("about_us_pdf"),
          href: `https://kinguru-storage.s3.pl-waw.scw.cloud/about/eventify_${locale}.pdf`,
          asFile: "pdf",
        },
        { name: t("privacy_policy"), href: "/legal/privacy-policy" },
        {
          name: t("terms_and_conditions"),
          href: "/legal/terms-and-conditions",
        },
        { name: t("cookie_policy"), href: "/legal/cookie-policy" },
        { name: t("faq"), href: "/faq/main" },
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
                    {children.map(({ href, name, asFile }) => {
                      return (
                        <li key={name}>
                          <Link
                            href={href}
                            target={asFile ? "_blank" : undefined}
                          >
                            {name}
                            {asFile && (
                              <span
                                className={css({
                                  color: "secondary",
                                  marginInlineStart: "1",
                                })}
                              >
                                [{asFile}]
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </Flex>
          <Flex gap="6" flexDirection="column">
            <SocialMediaLinks />
            <Contacts />
          </Flex>
        </div>
        <span className={classes.additionalText}>
          {t("all_rights_reserved", { year: new Date().getFullYear() })}
        </span>
      </Container>
    </footer>
  );
}
