"use client";

import Image from "next/image";
import { useState, type ComponentProps } from "react";
import { Marker } from "react-map-gl";
import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { HStack, InlineBox, Stack } from "~/styled-system/jsx";

const markerButtonStyles = css({
  display: "flex",
  colorPalette: "dark",
  bgColor: "colorPalette",
  color: "colorPalette.text",
  borderRadius: "full",
  fontSize: "3xl",
  padding: "3",
  boxShadow: "0px 4px 25px {colors.colorPalette}",
  marginBlockStart: "3",
  marginInline: "auto",
  transition: { base: "colors", _motionReduce: "none" },
  _expanded: { colorPalette: "primary" },
});

export function LocationMarker({
  children,
  anchor = "bottom",
  ...props
}: ComponentProps<typeof Marker> & {
  children?: React.ReactNode;
}) {
  const [shown, setShownState] = useState(false);

  return (
    <Marker anchor={anchor} {...props}>
      {shown && children}
      <button
        className={markerButtonStyles}
        onClick={() => setShownState((prev) => !prev)}
        aria-expanded={shown}
      >
        <Icon name="common/location-star" />
      </button>
    </Marker>
  );
}

export function LocationCard({
  name,
  address,
  image,
}: {
  name: string;
  address: string;
  image: string;
}) {
  return (
    <HStack
      gap="3"
      padding="3"
      bgColor="light"
      maxWidth="80"
      borderRadius="sm"
      fontFamily="noto"
      animation={{ base: "fade-in", _motionReduce: "none" }}
      sm={{ maxWidth: "breakpoint-sm" }}
    >
      <InlineBox width="16" height="16" flexShrink="0">
        <Image
          src={image}
          alt={name}
          width="64"
          height="64"
          sizes="128px"
          style={{ height: "100%" }}
        />
      </InlineBox>
      <Stack gap="1" color="secondary" fontSize="xs" lineHeight="1.25">
        <span
          className={css({
            fontSize: "md",
            fontWeight: "bold",
            color: "dark",
          })}
        >
          {name}
        </span>
        <address>{address}</address>
      </Stack>
    </HStack>
  );
}
