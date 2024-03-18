"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/auth";
import prisma from "@/server/prisma.ts";

export async function createLikeAction(eventId: string) {
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

  revalidatePath("/[locale]/events/[slug]", "page");
}

export type CreateLikeAction = typeof createLikeAction;
