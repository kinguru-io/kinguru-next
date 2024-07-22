import { Client } from "@elastic/elasticsearch";
import { ElasticsearchClientError } from "@elastic/transport/lib/errors.js";
import mapbox from "@mapbox/search-js-core";
import { PrismaClient } from "@prisma/client";

import * as dotenv from "dotenv";
import { Kafka } from "kafkajs";
import { upsertPremiseFulfilledIndex } from "./processors/premise-fulfilled";

dotenv.config();

const esApiKey = process.env.ES_CLIENT_API_KEY;
const premiseFulfilledIndex =
  process.env.ES_INDEX_PREMISE_FULFILLED || "kinguru.public.premise_fulfilled";

const premiseTopic =
  process.env.KAFKA_TOPIC_PREMISE || "kinguru.public.Premise";
const premiseSlotTopic =
  process.env.KAFKA_TOPIC_PREMISESLOT || "kinguru.public.PremiseSlot";

const prisma = new PrismaClient();
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "",
  brokers: [process.env.KAFKA_BROKER || ""],
  connectionTimeout: 3000,
});
const consumer = kafka.consumer({
  groupId: process.env.KAFKA_CONSUMER_GROUP_ID || "",
});
const logger = consumer.logger();
const esClient = new Client({
  node: process.env.ES_CLIENT_NODE,
  ...(esApiKey && { auth: { apiKey: esApiKey } }),
});

const searchBox = new mapbox.SearchBoxCore({
  accessToken: process.env.MAPBOX_TOKEN,
});

async function init() {
  await prisma.$connect();
  await consumer.connect();
  await consumer.subscribe({
    topics: [premiseTopic, premiseSlotTopic],
    fromBeginning: true,
  });

  try {
    const isPresent = await esClient.indices.exists({
      index: premiseFulfilledIndex,
    });

    // es index do not exist
    if (!isPresent) {
      await esClient.indices.create({
        index: premiseFulfilledIndex,
        body: {
          mappings: {
            properties: {
              booked_slots: {
                type: "join",
                eager_global_ordinals: true,
                relations: {
                  premise: "premise_slot",
                },
              },
            },
          },
        },
      });
    }
  } catch (e) {
    if (e instanceof ElasticsearchClientError) {
      logger.error(e.message);
    }
    logger.error(`Unknown error: ${JSON.stringify(e)}`);
  }

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (message.key === null) {
        logger.warn("Empty key. Processing skipped.");
        return;
      }

      const messageKey = message.key.toString();
      logger.info(messageKey);

      const {
        payload: { id },
      } = JSON.parse(messageKey) as { payload: { id: string } };

      // `value === null` means Premise record was deleted
      if (message.value === null) {
        try {
          await esClient.delete({
            index: premiseFulfilledIndex,
            id,
          });
        } catch (e) {
          if (e instanceof ElasticsearchClientError) {
            logger.error(e.message);
          }
        }
        return;
      }

      if (topic === premiseTopic) {
        await upsertPremiseFulfilledIndex({
          id,
          index: premiseFulfilledIndex,
          prisma,
          esClient,
          logger,
          searchBox,
        });
      }

      if (topic === premiseSlotTopic) {
        const premiseSlot = await prisma.premiseSlot.findUnique({
          where: { id },
          select: {
            id: true,
            premiseId: true,
            userId: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        });

        if (!premiseSlot) {
          logger.error(`no PremiseSlot record exists with id: ${id}`);
          return;
        }

        const { premiseId, ...restSlot } = premiseSlot;

        await esClient.index({
          index: premiseFulfilledIndex,
          id,
          routing: premiseId,
          document: {
            ...restSlot,
            booked_slots: {
              name: "premise_slot",
              parent: premiseId,
            },
          },
        });
      }
    },
  });
}

void init();

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];
const quitPromises = [
  consumer.stop(),
  consumer.disconnect(),
  prisma.$disconnect(),
];

errorTypes.forEach((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`);
      console.error(e);

      await Promise.allSettled(quitPromises);

      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.forEach((type) => {
  process.once(type, async () => {
    console.log("\nExiting...");
    try {
      await Promise.allSettled(quitPromises);
    } finally {
      console.log("\nExited");
      process.kill(process.pid, type);
    }
  });
});
