import type { Premise, Venue } from "@prisma/client";
import Image from "next/image";
import { Tag } from "@/components/uikit";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { AspectRatio, Float, InlineBox, Stack } from "~/styled-system/jsx";

export function VenueCardView({
  venue,
  noPremiseLabel,
  noPremiseLabelShort,
  addressSlot,
}: {
  venue: Venue & { premises: Premise[] };
  noPremiseLabel: string;
  noPremiseLabelShort: string;
  addressSlot: React.ReactNode;
}) {
  const isInactive = venue.premises.length === 0;

  return (
    <Stack
      css={{
        gap: "4",
        position: "relative",
        overflow: "hidden",
        borderRadius: "md",
        _focusWithin: { boxShadow: "focus" },
      }}
    >
      <Link
        className={css({
          marginBlockStart: "calc(-1lh - {spacing.4})", // hiding by pushing out of the wrapper. 1lh + gap 16px (spacing.4)
          _before: {
            content: "''",
            zIndex: "1", // to be clickable over the image
            position: "absolute",
            inset: 0,
          },
        })}
        href={`/profile/venues/${venue.id}`}
      >
        {venue.name}
      </Link>
      <AspectRatio
        ratio={16 / 9}
        css={{
          borderRadius: "md",
          overflow: "hidden",
          _disabled: { opacity: "0.5" },
        }}
        data-disabled={isInactive || undefined}
      >
        <Image src={venue.image} width={425} height={240} alt="" />
      </AspectRatio>
      <Stack gap="1">
        <InlineBox css={{ fontSize: "xl", fontWeight: "bold" }}>
          {venue.name}
        </InlineBox>
        <address className={css({ fontSize: "xs", color: "secondary" })}>
          {addressSlot}
        </address>
      </Stack>
      {isInactive && (
        <>
          <InlineBox color="danger" fontSize="sm">
            {noPremiseLabel}
          </InlineBox>
          <Float placement="top-start" translate="none" offset="3">
            <Tag colorPalette="danger" variant="solid" fontSize="xs">
              {noPremiseLabelShort}
            </Tag>
          </Float>
        </>
      )}
    </Stack>
  );
}
