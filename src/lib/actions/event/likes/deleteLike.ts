"use server";

import { getSession } from "@/auth";

export async function deleteLikeEvent(eventId: string) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!session || !userId) return;

  await prisma.userLikedEvents.delete({
    where: {
      userId_eventId: {
        userId: userId,
        eventId: eventId,
      },
    },
  });
}
