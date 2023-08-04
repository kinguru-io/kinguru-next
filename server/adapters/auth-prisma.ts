import { Prisma, PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export function PrismaAdapter(p: PrismaClient): Adapter {
  return {
    createUser: (data) =>
      p.user.create({
        data: {
          name: data.name,
          email: data.email,
          emailVerified: data.emailVerified,
          image: data.image,
        },
        select: {
          id: true,
          email: true,
          emailVerified: true,
        },
      }),
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      });
      return account?.user ?? null;
    },
    updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
    deleteUser: (id) => p.user.delete({ where: { id } }),
    linkAccount: (data) =>
      p.account.create({
        data: {
          userId: data.userId,
          providerAccountId: data.providerAccountId,
          provider: data.provider,
          type: data.type,
        },
        select: {
          userId: true,
          providerAccountId: true,
          provider: true,
          type: true,
        },
      }),
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
        include: { user: true },
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
