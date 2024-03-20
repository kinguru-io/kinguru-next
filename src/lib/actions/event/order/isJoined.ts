"use server";

import { getSession } from "@/auth";
import prisma from "@/server/prisma.ts";

export async function isJoinedAction(eventId: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return false;
  }

  const userOnEvent = await prisma.usersOnEvent.findUnique({
    where: {
      userId_eventId: {
        userId,
        eventId,
      },
    },
  });

  return !!userOnEvent;
}

export type IsJoinedAction = typeof isJoinedAction;
