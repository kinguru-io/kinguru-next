import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { LanguageDropdown } from "./LanguageDropdown";
import { Link } from "@/navigation";
import facebookIcon from "~/public/img/footerIcons/FaceBook.svg";
import instagramIcon from "~/public/img/footerIcons/Instagram.svg";
import linkedinIcon from "~/public/img/footerIcons/LinkedIn.svg";
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

  return (
    <footer className={classes.footer}>
      <div className={classes.footerWrapper}>
        <div className={classes.contentWrapper}>
          <div>Logo</div>
          <div className={classes.links}>
            {navigation.map(({ href, name }) => (
              <Link key={name} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div className={classes.links}>
            {policies.map(({ href, name }) => (
              <Link key={name} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div className={classes.links}>
            <div className={classes.socialLinks}>
              <Link href="https://www.instagram.com/eventify.today/">
                <Image
                  src={instagramIcon.src}
                  alt="instagram icon"
                  role="link"
                  width={22}
                  height={22}
                />
              </Link>
              <Link href="#">
                <Image
                  src={facebookIcon.src}
                  alt="facebook icon"
                  role="link"
                  width={22}
                  height={22}
                />
              </Link>
              <Link href="#">
                <Image
                  src={linkedinIcon.src}
                  alt="linkedin icon"
                  role="link"
                  width={22}
                  height={22}
                />
              </Link>
            </div>
            <Link href={"tel:+48792665092"}>+48792665092</Link>
            <LanguageDropdown locale={locale} />
          </div>
        </div>
        <div className={classes.additionalText}>
          {t("all_rights_reserved", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
