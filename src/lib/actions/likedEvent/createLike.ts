"use server";
import { getSession } from "@/auth";

export async function createLikeEvent(eventId: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (session) {
    const likedEvent = await prisma.userLikedEvents.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });
    if (!likedEvent) {
      await prisma.userLikedEvents.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          event: {
            connect: {
              id: eventId,
            },
          },
        },
      });
    }
  }
}
