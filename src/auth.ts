import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { AdapterOrganization } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter, PrismaOrganizationAdapter } from "@/server/adapters";
import prisma from "@/server/prisma";

export const organizationAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { lable: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        const organization = await prisma.organization.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (organization) {
          const isCorrectPassword = await bcrypt.compare(
            credentials?.password || "",
            organization.password,
          );

          return isCorrectPassword ? organization : null;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaOrganizationAdapter(prisma),
  pages: {
    signIn: "/en/login",
  },
  callbacks: {
    session({ session, user }) {
      const org = user as AdapterOrganization;

      if (org) {
        session.organization = {
          id: org.id,
          name: org.name || "",
          foundationDate: org.foundationDate,
          requisitesUrl: org.requisitesUrl,
          aboutCompany: org.aboutCompany,
          activitySphere: org.activitySphere,
          logotype: org.logotype || "",
          email: org.email,
          emailVerified: org.emailVerified,
          password: org.password,
        };
      }

      return session;
    },
  },
};

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session?.user) {
        session.user.role = user.role;
        session.user.id = user.id;
        session.user.speaker = user.speaker;
        session.user.stripeCustomerId = user.stripeCustomerId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
};
