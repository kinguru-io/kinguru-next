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
          // hiding by pushing out of the wrapper
          fontSize: "1px",
          lineHeight: "1px",
          marginBlockStart: "-1px",
          _before: {
            zIndex: "1", // to be clickable over the image
            content: "''",
            position: "absolute",
            inset: 0,
          },
        })}
        href={`/profile/venues/${venue.id}`}
      >
        {venue.name}
      </Link>
      <AspectRatio ratio={16 / 9}>
        <Image src={venue.image} width={310} height={174} alt="" />
      </AspectRatio>
      <CardInner bgColor="secondary.lighter">
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
              <Circle size="1.8em" color="light" bgColor="danger" aria-hidden>
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
