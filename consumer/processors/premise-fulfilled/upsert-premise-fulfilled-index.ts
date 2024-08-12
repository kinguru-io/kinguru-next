import type { Client } from "@elastic/elasticsearch";
import type { SearchBoxCore } from "@mapbox/search-js-core";
import type { PrismaClient } from "@prisma/client";
import type { Logger } from "kafkajs";
import { prepareClosedHours } from "./prepare-closed-hours";
import { prepareDocumentLocation } from "./prepare-document-location";

export async function upsertPremiseFulfilledIndex({
  id,
  index,
  prisma,
  esClient,
  logger,
  searchBox,
}: {
  id: string;
  index: string;
  prisma: PrismaClient;
  esClient: Client;
  logger: Logger;
  searchBox: SearchBoxCore;
}) {
  const premise = await prisma.premise.findUnique({
    where: { id },
    include: {
      information: { select: { locale: true, description: true } },
      openHours: { orderBy: { price: "asc" } },
      venue: {
        select: {
          name: true,
          information: { select: { locale: true, description: true } },
          locationMapboxId: true,
        },
      },
    },
  });

  if (!premise) {
    logger.error(`no Premise record exists with id: ${id}`);
    return;
  }

  const { venue, openHours, information, ...restPremise } = premise;
  const location = await prepareDocumentLocation({
    mapboxId: venue.locationMapboxId,
    searchBox,
  });
  const closedHours = prepareClosedHours({ openHours });

  await esClient.index({
    index,
    id: restPremise.id,
    document: {
      ...restPremise,
      ...location,
      description: getPlainDescription(information),
      minPrice: openHours.at(0)?.price,
      maxPrice: openHours.at(-1)?.price,
      closedHours,
      "venue.name": venue.name,
      "venue.description": getPlainDescription(venue.information),
      booked_slots: { name: "premise" },
    },
  });
}

function getPlainDescription(
  list: Array<{ locale: string; description: string }>,
) {
  return list
    .reduce((str, { description }) => {
      str += `${description} `;
      return str;
    }, "")
    .trimEnd();
}
