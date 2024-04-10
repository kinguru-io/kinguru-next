import { type PrismaClient, TicketIntentStatus } from "@prisma/client";
import { subMinutes } from "date-fns";

export async function removeSlots(prisma: PrismaClient) {
  const { count } = await prisma.premiseSlot.deleteMany({
    where: {
      status: TicketIntentStatus.progress,
      createdAt: {
        lte: subMinutes(new Date(), 10),
      },
    },
  });

  return count;
}
