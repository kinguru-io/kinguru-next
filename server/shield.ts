import { rule, shield, and } from "trpc-shield";
import { Context } from "./context";

export const isAuthenticated = rule<Context>()(async (ctx) => {
  return ctx.session?.user !== undefined;
});

export const isSpeaker = rule<Context>()(async (ctx) => {
  if (!ctx.session?.user?.id) {
    return false;
  }

  const { _count: count } = await ctx.prisma.speaker.aggregate({
    where: {
      userId: ctx.session.user.id,
    },
    _count: true,
  });

  return count > 0;
});

export const isAdmin = rule<Context>()(async (ctx) => {
  return ctx.session?.user?.role === "admin";
});

export const permissions = shield<Context>({
  query: {},
  mutation: {
    attendTheEvent: isAuthenticated,
    createEvent: and(isAuthenticated, isSpeaker),
    followSpeaker: isAuthenticated,
    unfollowSpeaker: isAuthenticated,
    sendEventComment: isAuthenticated,
    cancelEventRegistration: isAuthenticated,
  },
});
