"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import { priceFormatter } from "@/lib/utils";
import { HStack } from "~/styled-system/jsx";

type PremiseAttributesProps = {
  mapboxId: string;
  price?: number;
};

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function PremiseAttributes({ mapboxId, price }: PremiseAttributesProps) {
  const [placeAddress, setPlaceAddress] = useState("");
  const { retrieve } = useSearchBoxCore({ accessToken });
  const t = useTranslations("premise");

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, (data) => {
      const { address } = data.features[0].properties;
      setPlaceAddress(address);
    });
  }, [mapboxId]);

  return (
    <HStack textStyle="heading.extra.1">
      {placeAddress && <address>{placeAddress}</address>}
      {placeAddress && price && <span>|</span>}
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
