import { Queue, Worker } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

const PRISMA_QUEUE = "PRISMA";
const CRON_EXPRESSION = {
  EVERY_FIVE_MINUTES: "*/5 * * * *",
  EVERY_TEN_SECONDS: "0/10 * * ? * *",
};

const prismaQueue = new Queue(PRISMA_QUEUE);

await prismaQueue.add(
  "remove_pending_slots",
  {},
  { repeat: { pattern: CRON_EXPRESSION.EVERY_TEN_SECONDS } },
);

new Worker(
  PRISMA_QUEUE,
  async (job) => {
    console.log(job.queueName);
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || ""),
    },
  },
);
