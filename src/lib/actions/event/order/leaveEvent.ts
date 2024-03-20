"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/auth";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

export async function leaveEventAction(eventId: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect(`/auth/signin`);
  }

  await prisma.usersOnEvent.delete({
    where: {
      userId_eventId: { userId, eventId },
    },
  });

  revalidatePath("/[locale]/events/[slug]", "page");
}

export type LeaveEventAction = typeof leaveEventAction;
