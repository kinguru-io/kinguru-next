import { PrismaClient } from "@prisma/client";
import { Adapter, AdapterUser } from "next-auth/adapters";

export function PrismaAdapter(p: PrismaClient) : Adapter{
  return {
    createUser: async (data : any) : Promise<AdapterUser> => {
      return p.organization.create({
        data: {
          name: data.name!,
          foundationDate: data.foundationDate,
          requisitesUrl: data.requisitesUrl,
          aboutCompany: data.aboutCompany,
          activitySphere: data.activitySphere,
          logotype: data.logotype,
          email: data.email,
          emailVerified: data.emailVerified,
        },
      })}
  }
}