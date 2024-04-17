import type { Premise, Venue } from "@prisma/client";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ErrorIcon } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { getSession } from "@/auth";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeading,
  CardInner,
} from "@/components/uikit";
import { ProfileSectionLayout } from "@/layout/page";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { AspectRatio, GridItem, HStack } from "~/styled-system/jsx";

export default async function VenuesPage() {
  const t = await getTranslations("profile.venues");
  const session = await getSession();
  const organizationId = session?.user?.organizations.at(0)?.id;
  const venues = organizationId
    ? await prisma.venue.findMany({
        where: { organizationId },
        orderBy: { updatedAt: "desc" },
        include: { premises: true },
      })
    : [];

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <GridItem
        gridColumn="1 / -1"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(auto-fit, minmax(310px, 1fr))"
      >
        {venues.map((venue) => (
          <VenueCardView
            key={venue.id}
            venue={venue}
            noPremiseLabel={t("no_premises")}
          />
        ))}
        <AddVenueLink />
      </GridItem>
    </ProfileSectionLayout>
  );
}

function VenueCardView({
  venue,
  noPremiseLabel,
}: {
  venue: Venue & { premises: Premise[] };
  noPremiseLabel: string;
}) {
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
      <CardInner>
        <CardHeading lineClamp="3">
          <h4>{venue.name}</h4>
        </CardHeading>
        <CardBody>
          <p>{venue.organizationId}</p>
        </CardBody>
        <CardFooter>
          {venue.premises.length === 0 && (
            <HStack gap="5px" color="danger" textStyle="body.extra.3">
              <ErrorIcon className={css({ flexShrink: "0" })} />
              {noPremiseLabel}
            </HStack>
          )}
        </CardFooter>
      </CardInner>
    </Card>
  );
}

function AddVenueLink() {
  return (
    <Link
      className={css({
        layerStyle: "dashedWrapper",
        display: "grid",
        placeItems: "center",
        maxWidth: "310px",
        minHeight: "330px",
      })}
      href="/profile/venues/add"
    >
      <RxCross1
        className={css({
          color: "primary",
          rotate: "45deg",
          fontSize: "10em",
        })}
      />
    </Link>
  );
}
