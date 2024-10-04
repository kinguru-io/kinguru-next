import { Prisma, PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    // @ts-expect-error no types provided in next-auth@4.24.8
    createUser: async (data) => {
      const { id: stripeCustomerId } = await stripe.customers.create({
        email: data.email!,
        name: data.name!,
      });

      return p.user.create({
        data: {
          name: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
          image: data.image,
          stripeCustomerId,
          confirmed: data.confirmed,
        },
        select: {
          id: true,
          email: true,
          emailVerified: true,
          stripeCustomerId: true,
          speaker: true,
          organizations: true,
          confirmed: true,
        },
      });
    },
    getUser: (id) =>
      p.user.findUnique({
        where: { id },
        include: { organizations: true, speaker: true },
      }),
    getUserByEmail: (email) =>
      p.user.findUnique({
        where: { email },
        include: { organizations: true, speaker: true },
      }),
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: {
          user: {
            include: {
              organizations: true,
              speaker: true,
            },
          },
        },
      });
      if (!account) return null;
      if (!account.user.stripeCustomerId) {
        const { id: stripeCustomerId } = await stripe.customers.create({
          email: account.user.email,
          name: account.user.name || "",
        });
        return p.user.update({
          where: { id: account.user.id },
          data: {
            stripeCustomerId,
          },
          include: {
            organizations: true,
            speaker: true,
          },
        });
      }
      return account.user;
    },
    updateUser: ({ id, ...data }) => {
      const { speaker, organizations, ...user } = data;
      return p.user.update({
        where: { id },
        data: user,
        include: { organizations: true, speaker: true },
      });
    },
    deleteUser: (id) =>
      p.user.delete({
        where: { id },
        include: { organizations: true, speaker: true },
      }),
    // @ts-expect-error no types provided in next-auth@4.24.8
    linkAccount: async (account) => {
      const user = await p.user.findUnique({
        where: { id: account.userId },
        select: { confirmed: true },
      });

      if (user && !user.confirmed && account.type === "oauth") {
        await p.user.update({
          where: { id: account.userId },
          data: { confirmed: true, emailVerified: new Date() },
        });
      }

      return p.account.create({
        data: {
          userId: account.userId,
          providerAccountId: account.providerAccountId,
          provider: account.provider,
          type: account.type,
        },
        select: {
          userId: true,
          providerAccountId: true,
          provider: true,
          type: true,
        },
      });
    },
    // @ts-expect-error no types provided in next-auth@4.24.8
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
        select: {
          userId: true,
          providerAccountId: true,
          provider: true,
          type: true,
        },
      }),
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: { include: { organizations: true, speaker: true } } },
      });
      if (!userAndSession) return null;
      const { user, ...session } = userAndSession;
      return { user, session };
    },
    createSession: (data) => p.session.create({ data }),
    updateSession: (data) =>
      p.session.update({ where: { sessionToken: data.sessionToken }, data }),
    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
    createVerificationToken: (data) => p.verificationRequest.create({ data }),
    async useVerificationToken(identifier_token) {
      try {
        return await p.verificationRequest.delete({
          where: { identifier_token },
        });
      } catch (error) {
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null;
        throw error;
      }
    },
  };
}
