"use server";

import { getSession } from "@/auth";

export async function joinEvent(eventId: string) {
  const session = await getSession();

  if (!session || !session.user?.id) {
    throw new Error("BAD_REQUEST");
  }

  await prisma.usersOnEvent.create({
    data: {
      eventId: eventId,
      userId: session.user.id,
    },
  });
}
