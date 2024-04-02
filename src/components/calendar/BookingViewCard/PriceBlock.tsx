"use client";

import { useTranslations } from "next-intl";
import { priceFormatter } from "@/lib/utils";
import { Box, Flex } from "~/styled-system/jsx";

// TODO initial implementation
type PriceBlockProps = {
  price: {
    total: number;
  };
};
export function PriceBlock({ price }: PriceBlockProps) {
  const t = useTranslations("price");

  const { total } = price;

  return (
    <Box
      alignSelf="stretch"
      paddingBlockStart="10px"
      marginBlockStart="auto"
      borderBlockStart="1px solid"
      borderColor="neutral.2"
      textStyle="body.3"
      css={{ "& > [data-total=true]": { textStyle: "heading.4" } }}
    >
      <Flex justifyContent="space-between" data-total={true}>
        <span>{t("total")}</span>
        <span>{priceFormatter.format(total)}</span>
      </Flex>
    </Box>
  );
}
