import { useTranslations } from "next-intl";
import { priceFormatter } from "@/lib/utils";
import type { PriceInfo } from "@/lib/utils/price";
import { Box, Flex, Stack } from "~/styled-system/jsx";

export function PriceBlock({ priceInfo }: { priceInfo: PriceInfo }) {
  const t = useTranslations("price");

  const { fullPrice, totalPrice, discountsMeta } = priceInfo;

  return (
    <Box fontSize="sm">
      <Stack gap="1">
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

        <PricingRow label={t("total")} amount={totalPrice} isTotal />
      </Stack>
    </Box>
  );
}

function PricingRow({
  label,
  amount,
  isTotal,
}: {
  label: string;
  amount: number;
  isTotal?: boolean;
}) {
  return (
    <Flex
      css={{
        justifyContent: "space-between",
        "&[data-total]": { fontWeight: "bold", fontSize: "px17" },
      }}
      data-total={isTotal || undefined}
    >
      <span>{label}</span>
      <span>{priceFormatter.format(amount)}</span>
    </Flex>
  );
}
