import { NextApiRequest, NextApiResponse } from "next/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth].ts";
import prisma from "@/server/prisma.ts";
import { calculateCompleteness } from "@/utils/profileCompleteness.ts";

const makeRedirectObject = (destination: string) => ({
  redirect: {
    destination,
    permanent: false,
  },
});

export const redirect = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const authRedirect = makeRedirectObject(
    `/api/auth/signin?callbackUrl=${encodeURIComponent(req.url || "")}`,
  );
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

      const completenessPercentage = calculateCompleteness(user);

      if (completenessPercentage < 10) {
        return makeRedirectObject("/dashboard");
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
      return _count === 0 ? makeRedirectObject("/dashboard") : {};
    },
  };
};
