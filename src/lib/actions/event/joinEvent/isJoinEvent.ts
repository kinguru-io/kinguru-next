"use server";

import { getSession } from "@/auth";

export async function isJoinEvent(eventId: string) {
  const session = await getSession();

  if (!session || !session.user?.id) {
    return false;
  }

  const userOnEvent = await prisma.usersOnEvent.findUnique({
    where: {
      userId_eventId: {
        userId: session.user.id,
        eventId: eventId,
      },
    },
  });

  return !!userOnEvent;
}
