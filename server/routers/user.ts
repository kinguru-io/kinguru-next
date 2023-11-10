import { User } from "@prisma/client";
import { publicProcedure, t } from "../trpc";

const profileProgressMap: Record<keyof User, number> = {
  country: 5,
  city: 5,
  birthdate: 5,
  phoneNumber: 5,
  instagram: 5,
  telegram: 5,
  facebook: 5,
  vk: 5,
  interests: 10,
  company: 10,
  position: 10,
  description: 20,
  name: 0,
  image: 0,
  stripeCustomerId: 0,
  createdAt: 0,
  email: 0,
  id: 0,
  emailVerified: 0,
  role: 0,
  confirmed: 0,
  firstname: 0,
  gender: 0,
  lastname: 0,
  linkedin: 0,
  updatedAt: 0,
  website: 0,
};

export const userRouter = t.router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user?.id) {
      return null;
    }
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  profileCompleteness: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) {
      return null;
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) return 0;

    return (Object.keys(user) as (keyof User)[]).reduce(
      (completeness, key: keyof User) => {
        if (user[key]) completeness += profileProgressMap[key];
        return completeness;
      },
      0,
    );
  }),
});
