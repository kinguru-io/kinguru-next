"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BsGeoAlt } from "react-icons/bs";
import { IoServerOutline } from "react-icons/io5";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import { PremiseAttributesLayout } from "@/layout/block/premise";
import { HStack } from "~/styled-system/jsx";

type PremiseAttributesProps = {
  mapboxId: string;
  price: number;
};

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function PremiseAttributes({ mapboxId, price }: PremiseAttributesProps) {
  const [placeAddress, setPlaceAddress] = useState("");
  const { retrieve } = useSearchBoxCore({ accessToken });
  const t = useTranslations("premise");
  const format = useFormatter();

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, (data) => {
      const { address } = data.features[0].properties;
      setPlaceAddress(address);
    });
  }, [mapboxId]);

  return (
    <PremiseAttributesLayout>
      <HStack gap="20px" borderRadius="76px" bg="neutral.5" p="36.5px 24.5px">
        <IoServerOutline />
        <span>
          {t("from", {
            price: format.number(price, { style: "currency", currency: "PLN" }),
          })}
        </span>
      </HStack>
      <HStack gap="20px" borderRadius="51px" bg="neutral.5" p="16px 49px">
        <BsGeoAlt />
        <span>{placeAddress}</span>
      </HStack>
    </PremiseAttributesLayout>
  );
}
