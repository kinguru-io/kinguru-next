"use server";
import { getSession } from "@/auth";

export async function isLikedEvent(eventId: string) {
  const session = await getSession();
  if (!session || !session.user) return false;

  const event = await prisma.userLikedEvents.findUnique({
    where: {
      userId_eventId: {
        userId: session.user.id,
        eventId: eventId,
      },
    },
  });

  return !!event;
}
