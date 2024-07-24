import { DefaultSession, DefaultUser } from "next-auth";
import { Organization, Speaker, UserRole } from "@prisma/client";

declare module "next-auth" {
  interface User extends DefaultUser {
    role?: UserRole;
    speaker: Speaker | null;
    organizations: Organization[];
    stripeCustomerId: string | null;
    confirmed: boolean
  }
  interface Session extends DefaultSession {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {}
}
