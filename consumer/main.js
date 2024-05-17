import { Client } from "@elastic/elasticsearch";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { Kafka } from "kafkajs";

dotenv.config();

const premiseFulfilledIndex = process.env.ES_INDEX_PREMISE_FULFILLED || 'kinguru.public.premise_fulfilled';
const premiseTopicRegex = /.*\.public\.Premise/;

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
  connectionTimeout: 3000,
});

const prisma = new PrismaClient();

const client = new Client({
  node: "http://localhost:9200",
  // auth: {
  //   apiKey: {
  //     // API key ID and secret
  //     id: "foo",
  //     api_key: "bar",
  //   },
  // },
});

async function init() {
  await prisma.$connect();

  const consumer = kafka.consumer({ groupId: "premise_fulfill" });

  await consumer.connect();
  await consumer.subscribe({
    topic: premiseTopicRegex,
    fromBeginning: true,
  });

  try {
    await client.indices.get({
      index: premiseFulfilledIndex,
    });
  } catch (e) {
    if (e.meta.body?.error.type === "index_not_found_exception") {
      await client.indices.create({
        index: premiseFulfilledIndex,
      });
    }
  }

  console.log(await prisma.premise.findFirst())

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(`[${topic}]: PART:${partition}:`, message.value?.toString());
      const { key } = JSON.parse(message.value.toString());

      await client.index({
        index: premiseFulfilledIndex,
        id: key,
        body: { hello: "world" },
      });
    },
  });
}

void init();
