"use server";
import { getSession } from "@/auth";
import prisma from "@/server/prisma.ts";

export async function isLikedAction(eventId: string) {
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

export type IsLikedAction = typeof isLikedAction;
