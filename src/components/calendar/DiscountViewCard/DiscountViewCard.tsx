import type { PremiseDiscount } from "@prisma/client";
import { useTranslations } from "next-intl";
import { Card, CardHeading, CardInner } from "@/components/uikit";
import { hoursFormatter } from "@/lib/utils";
import type { Locale } from "@/navigation";
import { Flex } from "~/styled-system/jsx";

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
    <Card border="1px solid" borderColor="primary" color="neutral.0">
      <CardInner padding="15px 33px" gap="15px">
        <CardHeading
          alignSelf="center"
          backgroundColor="primary"
          borderRadius="4px"
          padding="2px 5px"
          color="neutral.1"
        >
          <h4>{t("card_heading")}</h4>
        </CardHeading>
        <Flex gap="0" flexDirection="column">
          {discounts.map(({ id, duration, discountPercentage }) => {
            const relativeHours = t("duration", {
              hours: formatter.format(duration),
            });

            return (
              <span key={id}>
                {relativeHours} - {discountPercentage}%
              </span>
            );
          })}
        </Flex>
        <span>{t("per_day_notice")}</span>
      </CardInner>
    </Card>
  );
}
