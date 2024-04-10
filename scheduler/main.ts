import { PrismaClient } from "@prisma/client";
import { Queue, Worker } from "bullmq";
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from "dotenv";
import { removeSlots } from "./jobs/remove-pending-slots.job";

dotenv.config();

const PRISMA_QUEUE = {
  queueName: "PRISMA",
  prismaConnect: "connect_to_prisma",
  removePendingSlots: "remove_pending_slots",
} as const;

const connection = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
} as const;

const prisma = new PrismaClient();
const prismaQueue = new Queue(PRISMA_QUEUE.queueName, { connection });

// cleanup old if exist
await removeRepeatableJobs(prismaQueue);

await prismaQueue.add(
  PRISMA_QUEUE.prismaConnect,
  {},
  { removeOnComplete: true },
);
await prismaQueue.add(
  PRISMA_QUEUE.removePendingSlots,
  {},
  { repeat: { pattern: "*/5 * * * *" } }, // at every 5 minute
);

const worker = new Worker(
  PRISMA_QUEUE.queueName,
  async (job) => {
    console.log(
      `${job.name} | ${new Date(job.processedOn || Date.now()).toISOString()}`,
    );

    try {
      switch (job.name) {
        case PRISMA_QUEUE.prismaConnect: {
          await prisma.$connect();

          console.log("connected\n");

          break;
        }
        case PRISMA_QUEUE.removePendingSlots: {
          const count = await removeSlots(prisma);

          console.log(
            count > 0
              ? `removed ${count} pending PremiseSlot records\n`
              : "nothing to clean\n",
          );

          break;
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(JSON.stringify(e) + "\n");
        return;
      }

      console.log("something went wrong\n");
    }
  },
  { connection },
);

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}, closing server...`);

  await removeRepeatableJobs(prismaQueue);
  await prismaQueue.disconnect();
  await worker.close();
  await prisma.$disconnect();

  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

async function removeRepeatableJobs(queue: Queue) {
  for (const repeatableJob of await queue.getRepeatableJobs()) {
    const result = await prismaQueue.removeRepeatableByKey(repeatableJob.key);

    if (result) {
      console.log(`[${repeatableJob.key}] | removed`);
    }
  }
}
