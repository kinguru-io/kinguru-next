import { Client } from "@elastic/elasticsearch";
import { ResponseError } from "@elastic/transport/lib/errors";
// ! do not forget to uncomment when using the mapbox service
// import mapbox, { type SearchBoxSuggestion } from "@mapbox/search-js-core";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { Kafka } from "kafkajs";
import { groupBy } from "../src/lib/shared/utils/array";
import { DAYS_OF_WEEK_ORDERED } from "../src/lib/shared/utils/datetime";

dotenv.config();

const esApiKey = process.env.ES_CLIENT_API_KEY;
// ! do not forget to uncomment when using the mapbox service
// const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const premiseFulfilledIndex =
  process.env.ES_INDEX_PREMISE_FULFILLED || "kinguru.public.premise_fulfilled";

const premiseTopicRegex = /^.*\.public\.Premise$/m;

const prisma = new PrismaClient();
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER || ""],
  connectionTimeout: 3000,
});
const esClient = new Client({
  node: process.env.ES_CLIENT_NODE,
  ...(esApiKey && { auth: { apiKey: esApiKey } }),
});
// ! do not forget to uncomment when using the mapbox service
// const searchBox = new mapbox.SearchBoxCore({
//   accessToken: mapboxAccessToken,
// });

async function init() {
  await prisma.$connect();

  const consumer = kafka.consumer({ groupId: "premise_fulfill" });

  await consumer.connect();
  await consumer.subscribe({
    topic: premiseTopicRegex,
    fromBeginning: true,
  });

  try {
    await esClient.indices.get({
      index: premiseFulfilledIndex,
    });
  } catch (e) {
    if (e instanceof ResponseError) {
      if (e.body?.error.type === "index_not_found_exception") {
        await esClient.indices.create({
          index: premiseFulfilledIndex,
        });
      }
    }
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.key === null) {
        console.log(`[${topic}]: PART:${partition}:`, "empty key");
        return;
      }

      const messageKey = message.key.toString();
      console.log(`[${topic}]: PART:${partition}:`, messageKey);

      // only care about Premise records for now
      if (!premiseTopicRegex.test(topic)) {
        return;
      }

      const {
        payload: { id: premiseId },
      } = JSON.parse(messageKey) as { payload: { id: string } };

      // `value === null` means Premise record was deleted
      if (message.value === null) {
        await esClient.delete({ index: premiseFulfilledIndex, id: premiseId });
        return;
      }

      const premise = await prisma.premise.findUnique({
        where: { id: premiseId },
        include: {
          venue: {
            select: { name: true, description: true, locationMapboxId: true },
          },
          openHours: {
            orderBy: { openTime: "asc" },
            select: { day: true, openTime: true, price: true },
          },
        },
      });

      if (!premise) {
        console.log(
          `[${topic}]: PART:${partition}:`,
          `no Premise record exists with id: ${premiseId}`,
        );
        return;
      }

      const { venue, openHours, ...restPremise } = premise;

      const aggregatedPrices = openHours.reduce(
        (borders, { price }) => {
          if (
            borders.minPrice === undefined ||
            borders.maxPrice === undefined
          ) {
            return { minPrice: price, maxPrice: price };
          }

          if (borders.minPrice > price) {
            borders.minPrice = price;
          }

          if (borders.maxPrice < price) {
            borders.maxPrice = price;
          }

          return borders;
        },
        {} as { minPrice?: number; maxPrice?: number },
      );

      const groupedOpenHours = groupBy(openHours, ({ day }) => day);
      const plainOpenHours = DAYS_OF_WEEK_ORDERED.map((day) => {
        const openHour = groupedOpenHours[day];
        // if a `day` key exists, there is at least one item in the array
        // the first item is the very beginning of the day since the response is originally sorted by `openTime` in the ASC order
        return openHour ? openHour[0].openTime : null;
      });

      const location = await prepareIndexLocation(venue.locationMapboxId);

      await esClient.index({
        index: premiseFulfilledIndex,
        id: restPremise.id,
        body: {
          ...restPremise,
          ...aggregatedPrices,
          ...location,
          openHours: plainOpenHours,
          "venue.name": venue.name,
          "venue.description": venue.description,
        },
      });
    },
  });
}

void init();

async function prepareIndexLocation(_mapboxId: string) {
  return {
    "location.countryCode": "PL",
    "location.city": "Warsaw",
    "location.timeZone": "Europe/Warsaw",
    "location.latitude": 52.237049,
    "location.longitude": 21.017532,
  };

  // ! do not forget to uncomment when using the mapbox service
  //   const mapboxResponse = await searchBox.retrieve(
  //     {
  //       mapbox_id: mapboxId,
  //     } as SearchBoxSuggestion,
  //     {
  //       sessionToken: "test-123",
  //     },
  //   );
  //   const locationProperties = mapboxResponse.features.at(0)?.properties;
  //   const locationContext = locationProperties?.context || {};
  //   const longitude = locationProperties?.coordinates.longitude;
  //   const latitude = locationProperties?.coordinates.latitude;

  //   const tileQueryInstance = await fetch(
  //     `https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${longitude},${latitude}.json?access_token=${mapboxAccessToken}`,
  //   );
  //   const responseJson: { features: Array<{ properties: { TZID: string } }> } =
  //     await tileQueryInstance.json();

  //   return {
  //     "location.countryCode": locationContext.country?.country_code,
  //     "location.city": locationContext.place?.name,
  //     "location.timeZone": responseJson.features[0].properties.TZID,
  //     "location.longitude": longitude,
  //     "location.latitude": latitude,
  //   };
}