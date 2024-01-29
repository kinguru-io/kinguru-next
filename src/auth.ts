import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter, PrismaOrganizationAdapter } from "@/server/adapters";
import prisma from "@/server/prisma";

export const organizationAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "custom-signup",
      credentials: {
        name: { label: "name", required: true },
        foundationDate: { label: "foundationDate", required: true },
        requisitesUrl: { label: "requisitesUrl", required: true },
        aboutCompany: { label: "aboutCompany", required: true },
        activitySphere: { label: "activitySphere", required: true },
        logotype: { label: "logotype", type: "file", required: true },
      },
      async authorize() {
        return null;
      },
    }),
  ],
  adapter: PrismaOrganizationAdapter(prisma),
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
