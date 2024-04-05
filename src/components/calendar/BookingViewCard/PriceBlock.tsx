import { useTranslations } from "next-intl";
import { priceFormatter } from "@/lib/utils";
import type { PriceInfo } from "@/lib/utils/price";
import { Box, Flex } from "~/styled-system/jsx";

export function PriceBlock({ priceInfo }: { priceInfo: PriceInfo }) {
  const t = useTranslations("price");

  const { fullPrice, totalPrice, discountsMeta } = priceInfo;

  return (
    <Box
      alignSelf="stretch"
      marginBlockStart="auto"
      borderBlockStart="1px solid"
      borderColor="neutral.2"
      textStyle="body.3"
    >
      <Flex flexDirection="column" gap="3px">
        {fullPrice !== totalPrice && (
          <PricingRow label={t("full_price")} amount={fullPrice} />
        )}
        {Object.entries(discountsMeta).map(([percentage, discountAmount]) => {
          if (!discountAmount) return null;

          return (
            <PricingRow
              key={percentage}
              label={t("discount", { percentage })}
              amount={discountAmount * -1}
            />
          );
        })}
      </Flex>
      <PricingRow label={t("total")} amount={totalPrice} isTotal />
    </Box>
  );
}

function PricingRow({
  label,
  amount,
  isTotal = false,
}: {
  label: string;
  amount: number;
  isTotal?: boolean;
}) {
  return (
    <Flex
      justifyContent="space-between"
      css={{
        "&[data-total=true]": {
          textStyle: "heading.4",
          marginBlockStart: "10px",
        },
        _first: {
          marginBlockStart: "10px",
        },
      }}
      data-total={isTotal}
    >
      <span>{label}</span>
      <span>{priceFormatter.format(amount)}</span>
    </Flex>
  );
}
