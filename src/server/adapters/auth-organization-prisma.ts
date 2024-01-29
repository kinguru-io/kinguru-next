import { PrismaClient } from "@prisma/client";
import { Adapter, AdapterOrganization } from "next-auth/adapters";

export function PrismaOrganizationAdapter(p: PrismaClient): Adapter {
  return {
    createUser: async (data: any): Promise<AdapterOrganization> => {
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
      });
    },
  };
}
