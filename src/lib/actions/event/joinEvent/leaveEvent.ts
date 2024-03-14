"use server";

import { getSession } from "@/auth";

export async function leaveEvent(eventId: string) {
  const session = await getSession();

  if (!session || !session.user?.id) {
    throw new Error("BAD_REQUEST");
  }

  await prisma.usersOnEvent.delete({
    where: {
      userId_eventId: {
        userId: session.user.id,
        eventId: eventId,
      },
    },
  });
}
