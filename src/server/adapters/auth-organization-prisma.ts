import { Prisma, PrismaClient } from "@prisma/client";
import { Adapter, AdapterOrganization } from "next-auth/adapters";

export function PrismaOrganizationAdapter(p: PrismaClient): Adapter {
  return {
    createUser: async (data: any): Promise<AdapterOrganization> => {
      return p.organization.create({
        data: {
          name: data.name,
          foundationDate: data.foundationDate,
          requisitesUrl: data.requisitesUrl,
          aboutCompany: data.aboutCompany,
          activitySphere: data.activitySphere,
          logotype: data.logotype,
          email: data.email,
          emailVerified: data.emailVerified,
          password: data.password,
        },
      });
    },
    getUser: (id) => p.organization.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.organization.findUnique({ where: { email } }),
    getUserByAccount: async (provider_providerAccountId) => {
      const account = await p.organizationAccount.findUnique({
        where: { provider_providerAccountId },
        include: { organization: true },
      });

      if (!account) return null;
      return account.organization;
    },
    updateUser: ({ id, ...data }: any) => {
      return p.organization.update({
        where: { id },
        data: data,
      });
    },
    deleteUser: (id) => p.organization.delete({ where: { id } }),
    linkAccount: (data: any) =>
      p.organizationAccount.create({
        data: {
          organizationId: data.organizationId,
          providerAccountId: data.providerAccountId,
          provider: data.provider,
          type: data.type,
        },
        select: {
          organizationId: true,
          providerAccountId: true,
          provider: true,
          type: true,
        },
      }),
    unlinkAccount: (provider_providerAccountId) =>
      p.organizationAccount.delete({
        where: { provider_providerAccountId },
        select: {
          organizationId: true,
          providerAccountId: true,
          provider: true,
          type: true,
        },
      }),
    getSessionAndUser: async (sessionToken) => {
      const organizationAndSession = await p.organizationSession.findUnique({
        where: { sessionToken },
        include: { organization: true },
      });
      if (!organizationAndSession) return null;
      const { organization, ...session } = organizationAndSession;
      return { session, user: organization };
    },
    createSession: (data) =>
      p.organizationSession.create({
        data: {
          sessionToken: data.sessionToken,
          organizationId: data.userId,
          expires: data.expires,
        },
      }),
    updateSession: (data) =>
      p.organizationSession.update({
        where: { sessionToken: data.sessionToken },
        data: {
          sessionToken: data.sessionToken,
          organizationId: data.userId,
          expires: data.expires,
        },
      }),
    deleteSession: (sessionToken) =>
      p.organizationSession.delete({ where: { sessionToken } }),
    createVerificationToken: (data) =>
      p.organizationVerificationToken.create({ data }),
    useVerificationToken: async (identifier_token) => {
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
