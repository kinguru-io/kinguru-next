"use server";
import { getSession } from "@/auth";

export async function createLikeEvent(eventId: string) {
  const session = await getSession();
  if (!session || !session.user) return;

  await prisma.userLikedEvents.upsert({
    where: {
      userId_eventId: {
        eventId,
        userId: session.user.id,
      },
    },
    update: {},
    create: {
      eventId,
      userId: session.user.id,
    },
  });
}
