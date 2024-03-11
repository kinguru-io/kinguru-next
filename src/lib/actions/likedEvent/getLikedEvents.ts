"use server";
import { getSession } from "@/auth";

export async function getLikedEvent() {
  const session = await getSession();
  if (!session || !session.user) return [];
  return prisma.userLikedEvents.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      eventId: true,
    },
  });
}
