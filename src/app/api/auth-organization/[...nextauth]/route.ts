import NextAuth from "next-auth";
import { organizationAuthOptions } from "@/auth.ts";

const handler = NextAuth(organizationAuthOptions);

export { handler as GET, handler as POST };
