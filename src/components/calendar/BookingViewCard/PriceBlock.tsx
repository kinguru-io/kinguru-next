import { useTranslations } from "next-intl";
import { useBookingView } from "../BookingViewContext";
import { priceFormatter } from "@/lib/utils";
import type { PriceInfo } from "@/lib/utils/price";
import { Box, Flex, Stack } from "~/styled-system/jsx";

export function PriceBlock({ priceInfo }: { priceInfo: PriceInfo }) {
  const t = useTranslations("price");
  const { priceMode } = useBookingView();

  const { fullPrice, totalPrice, discountsMeta } = priceInfo;
  const fromLabel =
    priceMode === "donation" ? `${t("donation_from_label")} ` : "";

  return (
    <Box fontSize="sm">
      <Stack gap="1">
        {fullPrice !== totalPrice && (
          <PricingRow
            label={t("full_price")}
            priceLabel={priceFormatter.format(fullPrice)}
          />
        )}
        {Object.entries(discountsMeta).map(([percentage, discountAmount]) => {
          if (!discountAmount) return null;

          return (
            <PricingRow
              key={percentage}
              label={t("discount", { percentage })}
              priceLabel={priceFormatter.format(discountAmount * -1)}
            />
          );
        })}

        <PricingRow
          label={t("total")}
          priceLabel={`${fromLabel}${priceFormatter.format(totalPrice)}`}
          isTotal
        />
      </Stack>
    </Box>
  );
}

function PricingRow({
  label,
  priceLabel,
  isTotal,
}: {
  label: string;
  priceLabel: string;
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
      <span>{priceLabel}</span>
    </Flex>
  );
}
