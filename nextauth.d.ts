import { DefaultSession, DefaultUser } from "next-auth";
import { Speaker, UserRole } from "@prisma/client";

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
declare module "next-auth/jwt" {
  interface JWT {}
}
