import { z } from "zod";
import { publicProcedure, t } from "../trpc";

export const speakerRouter = t.router({
  bestSpeakers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.speaker.findMany({
      take: 3,
      include: {
        user: true,
      },
      orderBy: {
        followers: {
          _count: "desc",
        },
      },
    });
  }),
  isFollowing: publicProcedure
    .input(
      z.object({
        speakerId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input: { speakerId } }) => {
      if (!ctx.session?.user?.id) {
        return false;
      }
      return ctx.prisma.speakerFollower.findUnique({
        where: {
          speakerId_userId: {
            speakerId,
            userId: ctx.session!.user!.id,
          },
        },
      });
    }),
  followSpeaker: publicProcedure
    .input(
      z.object({
        speakerId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input: { speakerId } }) => {
      return ctx.prisma.speakerFollower.upsert({
        where: {
          speakerId_userId: {
            speakerId,
            userId: ctx.session!.user!.id,
          },
        },
        update: {
          speakerId,
          userId: ctx.session!.user!.id,
        },
        create: {
          speakerId,
          userId: ctx.session!.user!.id,
        },
      });
    }),
  unfollowSpeaker: publicProcedure
    .input(
      z.object({
        speakerId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input: { speakerId } }) => {
      return ctx.prisma.speakerFollower.delete({
        where: {
          speakerId_userId: {
            speakerId,
            userId: ctx.session!.user!.id,
          },
        },
      });
    }),
  speakerFollowers: publicProcedure
    .input(
      z.object({
        speakerId: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input: { speakerId } }) => {
      return ctx.prisma.speaker.findUnique({
        where: {
          id: speakerId,
        },
        include: {
          _count: {
            select: {
              followers: true,
            },
          },
        },
      });
    }),
});
