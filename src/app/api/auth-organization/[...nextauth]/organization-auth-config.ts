import { PrismaAdapter } from "@/server/adapters/auth-organization-prisma";
import prisma from "@/server/prisma";
import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name : { label : "name", required: true},
        foundationDate : { label : "foundationDate", required: true},
        requisitesUrl : { label : "requisitesUrl", required: true},
        aboutCompany : { label : "aboutCompany", required: true},
        activitySphere : { label : "activitySphere", required: true},
        logotype : { label : "logotype", type: "file", required: true},
      },
      async authorize (credentials) {
        return null
      } 
    })
  ],
  adapter: PrismaAdapter(prisma),
}