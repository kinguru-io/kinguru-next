import moment from "moment/moment";
import { z } from "zod";
import { publicProcedure, t } from "../trpc";

export const eventRouter = t.router({
  createEvent: publicProcedure
    .input(
      z.object({
        topic: z.string(),
        description: z.string().min(40).max(2048),
        tags: z.array(z.string()).optional(),
        price: z.number().min(20),
        poster: z.string().url(),
        date: z.string(),
        time: z.string(),
        placeId: z.string(),
        guests: z.number().min(3),
      }),
    )
    .mutation(
      async ({
        ctx,
        input: { topic, description, placeId, date, time, poster, price, tags },
      }) => {
        if (!ctx.session?.user?.id) {
          throw new Error("KR1001");
        }

        return ctx.prisma.event.create({
          data: {
            topic,
            description,
            initiatorId: ctx.session.user.id,
            placeId,
            starts: moment(`${date} ${time}`, "yyyy-MM-DD HH:mm").toDate(),
            poster,
            price,
            tags,
          },
        });
      },
    ),
  getEventDetails: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: input.eventId,
        },
        include: {
          initiator: true,
          place: true,
          speakersOnEvent: {
            include: {
              speaker: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
      return {
        ...event,
        takenPlace: moment(event?.starts).isBefore(),
      };
    }),
  getEventSpeakers: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findUnique({
        where: {
          id: input.eventId,
        },
        include: {
          speakersOnEvent: {
            include: {
              speaker: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    }),
  getEventComments: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input: { eventId, limit, cursor } }) => {
      const items = await ctx.prisma.eventComment.findMany({
        skip: cursor ? 1 : 0,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: { eventId },
        cursor: cursor ? { id: cursor } : undefined,
        include: { user: true },
      });
      return {
        items,
        nextCursor: items.length > 0 ? items[items.length - 1].id : undefined,
      };
    }),
  getEventPlace: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input: { eventId } }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: eventId },
        include: {
          place: {
            include: {
              organization: true,
              owner: true,
              resources: true,
            },
          },
        },
      });
      return event?.place;
    }),
  sendEventComment: publicProcedure
    .input(
      z.object({
        message: z.string(),
        rating: z.number(),
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { eventId, message, rating } }) => {
      if (!ctx.session?.user?.id) {
        throw new Error("KR1001");
      }
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (moment(event?.starts).isBefore()) {
        throw new Error("outdated event");
      }

      return ctx.prisma.eventComment.create({
        data: {
          eventId,
          userId: ctx.session?.user?.id,
          message,
          rating,
        },
      });
    }),
  upcoming: publicProcedure
    .input(
      z
        .object({
          limit: z.number().gt(0),
        })
        .default({ limit: 3 }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event
        .findMany({
          where: {
            starts: {
              gt: new Date(),
            },
            status: "active",
          },
          orderBy: {
            starts: "asc",
          },
          include: {
            place: true,
            initiator: true,
          },
          take: input.limit,
        })
        .then((items) =>
          items.map((item) =>
            Object.assign(
              {
                takenPlace: moment(item.starts).isBefore(),
              },
              item,
            ),
          ),
        );
    }),
  recent: publicProcedure
    .input(
      z
        .object({
          limit: z.number().gt(0),
        })
        .default({ limit: 3 }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event
        .findMany({
          where: {
            starts: {
              lt: new Date(),
            },
            status: "active",
          },
          orderBy: {
            starts: "desc",
          },
          include: {
            place: true,
            initiator: true,
          },
          take: input.limit,
        })
        .then((items) =>
          items.map((item) =>
            Object.assign(
              {
                takenPlace: moment(item.starts).isBefore(),
              },
              item,
            ),
          ),
        );
    }),
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input: { cursor, limit } }) => {
      const items = await ctx.prisma.event.findMany({
        skip: cursor ? 1 : 0,
        take: limit,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        include: {
          place: true,
          initiator: true,
        },
      });

      return {
        items: items.map((item) =>
          Object.assign(
            {
              takenPlace: moment(item.starts).isBefore(),
            },
            item,
          ),
        ),
        nextCursor: items.length > 0 ? items[items.length - 1].id : undefined,
      };
    }),
  usersOnEvent: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input: { eventId, cursor, limit } }) => {
      const items = await ctx.prisma.usersOnEvent.findMany({
        skip: cursor ? 1 : 0,
        take: limit,
        where: {
          eventId,
        },
        orderBy: {
          joinedAt: "desc",
        },
        cursor: cursor
          ? {
              userId_eventId: {
                userId: cursor,
                eventId,
              },
            }
          : undefined,
        include: {
          user: true,
        },
      });

      return {
        items,
        nextCursor:
          items.length > 0 ? items[items.length - 1].userId : undefined,
      };
    }),
  attendTheEvent: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { eventId } }) => {
      if (!ctx.session?.user?.id) {
        throw new Error("KR1001");
      }
      const alreadyAttend = await ctx.prisma.usersOnEvent.findUnique({
        where: {
          userId_eventId: {
            eventId,
            userId: ctx.session?.user?.id,
          },
        },
      });

      if (alreadyAttend) {
        return alreadyAttend;
      }

      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (moment(event?.starts).isBefore()) {
        throw new Error("outdated event");
      }

      return ctx.prisma.usersOnEvent.create({
        data: {
          eventId,
          userId: ctx.session?.user?.id,
        },
      });
    }),
  cancelEventRegistration: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { eventId } }) => {
      if (!ctx.session?.user?.id) {
        throw new Error("KR1001");
      }

      const present = await ctx.prisma.usersOnEvent.findUnique({
        where: {
          userId_eventId: {
            eventId,
            userId: ctx.session?.user?.id,
          },
        },
      });

      if (!present) return {};

      return ctx.prisma.usersOnEvent.delete({
        where: {
          userId_eventId: {
            eventId,
            userId: ctx.session?.user?.id,
          },
        },
      });
    }),
  isPresentOnEvent: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input: { eventId } }) => {
      if (!ctx.session?.user?.id) {
        return false;
      }

      const userOnEvent = await ctx.prisma.usersOnEvent.findUnique({
        where: {
          userId_eventId: {
            eventId,
            userId: ctx.session?.user?.id,
          },
        },
      });

      return userOnEvent != null;
    }),
  canJoinTheEvent: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      }),
    )
    .query(async ({ ctx, input: { eventId } }) => {
      if (!ctx.session?.user?.id) {
        throw new Error("KR1001");
      }

      const userOnEvent = await ctx.prisma.usersOnEvent.findUnique({
        where: {
          userId_eventId: {
            eventId,
            userId: ctx.session?.user?.id,
          },
        },
      });

      if (userOnEvent != null) {
        return null;
      }

      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      return moment(event?.starts).isAfter();
    }),
});
