import {
  BookingType,
  type PrismaClient,
  TicketIntentStatus,
} from "@prisma/client";
import { subHours, subMinutes } from "date-fns";

export async function removeSlots(prisma: PrismaClient) {
  const { count } = await prisma.premiseSlot.deleteMany({
    where: {
      OR: [
        // removes slots with pending payment for 10 minutes
        {
          status: TicketIntentStatus.progress,
          type: BookingType.via_website,
          createdAt: {
            lte: subMinutes(new Date(), 10),
          },
        },
        // removes slots that have not been confirmed in 24 hours
        {
          type: BookingType.needs_confirmation,
          createdAt: {
            lte: subHours(new Date(), 24),
          },
        },
      ],
    },
  });

  return count;
}
