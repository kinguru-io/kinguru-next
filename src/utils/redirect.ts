import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].ts";
import prisma from "@/server/prisma.ts";
import { profileProgressMap } from "@/server/routers/user.ts";

export const redirect = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const authRedirect = {
    redirect: {
      destination: `/api/auth/signin?callbackUrl=${encodeURIComponent(
        req.url || "",
      )}`,
      permanent: false,
    },
  };
  return {
    auth() {
      return session ? {} : authRedirect;
    },
    async profileCompleteness() {
      if (!session?.user) return authRedirect;

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      });

      if (!user) return authRedirect;

      const completenessPercentage = (
        Object.keys(user) as (keyof User)[]
      ).reduce((completeness, key: keyof User) => {
        if (user[key]) completeness += profileProgressMap[key];
        return completeness;
      }, 0);

      if (completenessPercentage < 10) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }

      return {};
    },
    async speaker() {
      if (!session?.user) return authRedirect;
      const { _count } = await prisma.speaker.aggregate({
        where: {
          userId: session.user.id,
        },
        _count: true,
      });
      return _count === 0
        ? {
            redirect: {
              destination: "/dashboard",
              permanent: false,
            },
          }
        : {};
    },
  };
};
