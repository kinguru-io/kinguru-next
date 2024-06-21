import type { NestedKeyOf } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { Flex } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

type FAQLink = {
  href: string;
  labelIntlCode: NestedKeyOf<IntlMessages["profile"]["faq_link_labels"]>;
};

const faqLinks: readonly FAQLink[] = [
  {
    href: "/faq",
    labelIntlCode: "add_venue",
  },
  {
    href: "/faq",
    labelIntlCode: "add_event",
  },
  {
    href: "/faq",
    labelIntlCode: "change_profile_photo",
  },
  {
    href: "/faq",
    labelIntlCode: "cooperation",
  },
];

export async function ProfileFAQ() {
  const t = await getTranslations("profile.faq_link_labels");

  return (
    <>
      <Flex colorPalette="primary" flexWrap="wrap" gap="10px">
        {faqLinks.map(({ href, labelIntlCode }) => (
          <Link key={labelIntlCode} className={button()} href={href}>
            {t(labelIntlCode)}
          </Link>
        ))}
      </Flex>
      <Flex
        justifyContent="space-between"
        fontSize="10px"
        lineHeight="1.5"
        color="secondary"
      >
        <Link href="/faq">{t("see_more")}</Link>
        <Link href="/faq">{t("ask")}</Link>
      </Flex>
    </>
  );
}
