"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/auth";
import prisma from "@/server/prisma.ts";

export async function deleteLikeAction(eventId: string) {
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

  revalidatePath("/[locale]/events/[slug]", "page");
}

export type DeleteLikeAction = typeof deleteLikeAction;
