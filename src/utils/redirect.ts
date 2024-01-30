import { NextApiRequest, NextApiResponse } from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import prisma from "@/server/prisma.ts";

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
