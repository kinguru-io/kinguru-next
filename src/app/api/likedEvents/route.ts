import { getSession } from "@/auth";

export async function POST(req: Request) {
  const session = await getSession();
  const userId = session?.user?.id;
  const { eventId } = await req.json();
  try {
    if (userId) {
      const likedEvent = await prisma.userLikedEvents.findFirst({
        where: {
          userId: userId,
          eventId: eventId,
        },
      });
      if (likedEvent) {
        await prisma.userLikedEvents.delete({
          where: {
            id: likedEvent.id,
          },
        });
      } else {
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
      return new Response(null, {
        status: 200,
      });
    }
    return new Response(null, {
      status: 403,
    });
  } catch (err) {
    return new Response(JSON.stringify({ err: err }), {
      status: 400,
    });
  }
}

export async function GET() {
  const session = await getSession();
  try {
    if (session) {
      return new Response(
        JSON.stringify(
          await prisma.userLikedEvents.findMany({
            where: {
              userId: session.user?.id,
            },
            select: {
              eventId: true,
            },
          }),
        ),
        {
          status: 200,
        },
      );
    }
    return new Response(JSON.stringify([]), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ err: err }), {
      status: 400,
    });
  }
}
