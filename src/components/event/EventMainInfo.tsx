"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import calendarIcon from "~/public/img/calendar.svg";
import markerIcon from "~/public/img/location.svg";
import timeIcon from "~/public/img/time.svg";
import { Flex } from "~/styled-system/jsx";

type EventMainInfoProps = {
  starts: Date;
  mapboxId: string;
};

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function EventMainInfo({ starts, mapboxId }: EventMainInfoProps) {
  const [placeAddress, setPlaceAddress] = useState("");
  const { retrieve } = useSearchBoxCore({ accessToken });

  useEffect(() => {
    retrieve({ mapbox_id: mapboxId }, (data) => {
      const { address } = data.features[0].properties;
      setPlaceAddress(address);
    });
  }, [mapboxId]);

  const mainInfo = [
    {
      iconSrc: calendarIcon.src,
      text: starts.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      altText: "Calendar Icon",
    },
    {
      iconSrc: timeIcon.src,
      text: starts.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      altText: "Time Icon",
    },
    {
      iconSrc: markerIcon.src,
      text: placeAddress,
      altText: "Location Icon",
    },
  ];

  return (
    <Flex direction="column" gap="20px" maxW="360px">
      <h3>Основная информация:</h3>
      <Flex gap="5px" direction="column">
        {mainInfo.map(({ iconSrc, text, altText }) => (
          <Flex gap="15px" align="center" key={altText}>
            <Image src={iconSrc} alt={altText} width={25} height={25} />
            <span>{text}</span>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
