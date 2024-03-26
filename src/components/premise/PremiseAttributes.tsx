"use client";

import { useTranslations } from "next-intl";
import { useSearchBoxResponse } from "@/components/common/maps/MapboxResponseProvider";
import { priceFormatter } from "@/lib/utils";
import { HStack } from "~/styled-system/jsx";

type PremiseAttributesProps = {
  price?: number;
};

export function PremiseAttributes({ price }: PremiseAttributesProps) {
  const t = useTranslations("premise");
  const mapboxPremiseData = useSearchBoxResponse();

  if (!mapboxPremiseData) {
    return (
      <HStack textStyle="heading.extra.1">
        {price && (
          <span>
            {t("from", {
              price: priceFormatter.format(price),
            })}
          </span>
        )}
      </HStack>
    );
  }

  const {
    properties: { full_address: placeAddress },
  } = mapboxPremiseData;

  return (
    <HStack textStyle="heading.extra.1">
      <address>{placeAddress}</address>
      <span>|</span>
      {price && (
        <span>
          {t("from", {
            price: priceFormatter.format(price),
          })}
        </span>
      )}
    </HStack>
  );
}
