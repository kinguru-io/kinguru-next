"use server";

import { revalidateTag } from "next/cache";
import { getSession } from "@/auth";

export async function joinEvent(eventId: string) {
  revalidateTag("eventJoin");
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
