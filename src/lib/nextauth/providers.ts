import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
// import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Argon2id } from "oslo/password";
import { signinFormSchema } from "@/lib/validations";
import prisma from "@/server/prisma.ts";

export const providers = (adapter: Adapter) => [
  // GitHubProvider({
  //   clientId: process.env.GITHUB_ID as string,
  //   clientSecret: process.env.GITHUB_SECRET as string,
  // }),
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "") || 0,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    httpOptions: {
      timeout: 15000,
    },
  }),
  CredentialsProvider({
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const creds = signinFormSchema.parse(credentials);

      const user = await adapter.getUserByEmail?.(creds.email);
      if (!user) {
        return null;
      }

      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
          type: "credentials",
        },
        select: {
          providerAccountId: true,
        },
      });

      if (!account) {
        return null;
      }

      const validPassword = await new Argon2id().verify(
        account.providerAccountId,
        creds.password,
      );
      if (validPassword) return user;

      return null;
    },
  }),
];
