import { Queue, Worker } from "bullmq";

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

const worker = new Worker(
  PRISMA_QUEUE,
  async (job) => {
    console.log("RUN");
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
