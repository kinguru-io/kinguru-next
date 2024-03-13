"use server";

import { getSession } from "@/auth";

export async function deleteLikeEvent(eventId: string) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!session && !userId) return;

  await prisma.userLikedEvents.deleteMany({
    where: {
      eventId: eventId,
      userId: userId,
    },
  });
}
