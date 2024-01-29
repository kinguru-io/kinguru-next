import { DefaultSession, DefaultUser } from "next-auth";
import { Speaker, UserRole } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: UserRole;
    speaker?: Speaker | null;
    stripeCustomerId?: string | null;
  }
  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/adapters" {
  interface AdapterOrganization extends AdapterUser {
    foundationDate: Date;
    requisitesUrl: string;
    aboutCompany: string;
    activitySphere: Array<string>;
    logotype?: string;
    password: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {}
}
