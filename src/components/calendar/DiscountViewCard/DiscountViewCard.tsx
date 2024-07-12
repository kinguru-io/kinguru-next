import type { PremiseDiscount } from "@prisma/client";
import { useTranslations } from "next-intl";
import { hoursFormatter } from "@/lib/utils";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { stack } from "~/styled-system/patterns";

export function DiscountViewCard({
  discounts,
  locale,
}: {
  discounts: PremiseDiscount[];
  locale: Locale;
}) {
  const t = useTranslations("discount_info");
  const formatter = hoursFormatter(locale);

  if (discounts.length === 0) return null;

  return (
    <section
      className={stack({
        gap: "4",
        padding: "6",
        fontSize: "sm",
        borderRadius: "lg",
        borderWidth: "1px",
        borderColor: "primary.lighter",
      })}
    >
      <h3 className={css({ fontWeight: "bold" })}>{t("card_heading")}</h3>
      <ul className={stack({ gap: "1" })}>
        {discounts.map(({ id, duration, discountPercentage }) => {
          const relativeHours = t("duration", {
            hours: formatter.format(duration),
          });

          return (
            <li key={id}>
              {relativeHours} - {discountPercentage}%
            </li>
          );
        })}
      </ul>
      <span className={css({ color: "secondary" })}>{t("per_day_notice")}</span>
    </section>
  );
}
