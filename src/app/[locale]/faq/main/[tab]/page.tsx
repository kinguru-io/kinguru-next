import Image from "next/image";
import { type RichTranslationValues, useTranslations } from "next-intl";
import { type FAQLink, faqLinks } from "../faq-links";
import { Link, type Locale, redirect } from "@/navigation";
import { aspectRatio } from "~/styled-system/patterns";

const doesTabExist = (tab?: string): tab is FAQLink["labelIntlCode"] => {
  return faqLinks.some((link) => link.segment === tab);
};

export default function TabPage({
  params: { locale, tab },
}: {
  params: { locale: Locale; tab?: string };
}) {
  if (!doesTabExist(tab)) {
    return redirect(`/faq/main/site-registration`);
  }

  return <StepList tab={tab} locale={locale} />;
}

const contentRich: RichTranslationValues = {
  bookingLink: (chunks) => (
    <Link href="/faq/main/bookings-and-payments" className="anchor">
      {chunks}
    </Link>
  ),
  homeLink: (chunks) => (
    <Link href="/" className="anchor">
      {chunks}
    </Link>
  ),
};

function StepList({ tab }: { tab: FAQLink["labelIntlCode"]; locale: Locale }) {
  const t = useTranslations(`faq.main.${tab}`);

  return Array.from({ length: parseInt(t("count")) }, (_, i) => {
    const stepKey = `step_${i + 1}`;
    // due to different steps amount
    // @ts-expect-error
    const content = t.rich(stepKey, contentRich);

    return (
      <li key={i}>
        {content}
        <span
          className={aspectRatio({
            ratio: 21 / 9,
            display: "block",
            marginBlock: "8",
          })}
        >
          <Image
            className="faq-image"
            alt=""
            src={`https://kinguru-storage.s3.pl-waw.scw.cloud/faq/main/${tab}/ru/${stepKey}.jpg`}
            fill
            sizes="95vw"
          />
        </span>
      </li>
    );
  });
}
