import { DefaultSession, DefaultUser } from "next-auth";
import { Organization, Speaker, UserRole } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: UserRole;
    speaker?: Speaker | null;
    stripeCustomerId?: string | null;
  }
  interface Session extends DefaultSession {
    user?: User;
    organization?: Organization;
  }
}

declare module "next-auth/adapters" {
  interface AdapterOrganization extends AdapterUser {
    foundationDate: Date;
    requisitesUrl: string;
    aboutCompany: string;
    activitySphere: Array<string>;
    logotype?: string | null;
    password: string;
  }
  interface AdapterAccount extends Account {
    userId?: string;
    organizationId?: string;
  }
  interface AdapterSession {
    sessionToken: string;
    userId?: string;
    expires: Date;
    organizationId?: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT {}
}
