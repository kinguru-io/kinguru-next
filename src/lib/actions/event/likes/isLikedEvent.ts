"use server";
import { getSession } from "@/auth";

export async function isLikedEvent(eventId: string) {
  const session = await getSession();
  if (!session || !session.user) return false;

  const count = await prisma.userLikedEvents.aggregate({
    where: {
      userId: session.user.id,
      eventId: eventId,
    },
    _count: {
      eventId: true,
    },
  });

  return count._count.eventId > 0;
}
