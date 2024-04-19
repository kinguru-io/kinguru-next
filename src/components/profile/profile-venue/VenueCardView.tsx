"use client";

import type { Premise, Venue } from "@prisma/client";
import Image from "next/image";
import { useSearchBoxResponse } from "@/components/common/maps/MapboxResponseProvider";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeading,
  CardInner,
} from "@/components/uikit";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { AspectRatio, Circle, HStack } from "~/styled-system/jsx";

export function VenueCardView({
  venue,
  noPremiseLabel,
}: {
  venue: Venue & { premises: Premise[] };
  noPremiseLabel: string;
}) {
  const locationInfo = useSearchBoxResponse();
  const address = locationInfo && locationInfo.properties;

  return (
    <Card variant="profile-venue" data-interactive>
      <Link
        className={css({
          _before: {
            content: "''",
            position: "absolute",
            inset: 0,
          },
        })}
        href="#"
      />
      <AspectRatio ratio={16 / 9}>
        <Image src={venue.image} width={310} height={174} alt="" />
      </AspectRatio>
      <CardInner bgColor="neutral.4">
        <CardHeading lineClamp="3">
          <h4>{venue.name}</h4>
        </CardHeading>
        <CardBody>
          <address>
            {address ? address.full_address || address.place_formatted : "..."}
          </address>
        </CardBody>
        <CardFooter>
          {venue.premises.length === 0 && (
            <HStack gap="5px" color="danger" textStyle="body.extra.3">
              <Circle
                size="1.8em"
                color="neutral.5"
                bgColor="danger"
                aria-hidden
              >
                !
              </Circle>
              {noPremiseLabel}
            </HStack>
          )}
        </CardFooter>
      </CardInner>
    </Card>
  );
}
