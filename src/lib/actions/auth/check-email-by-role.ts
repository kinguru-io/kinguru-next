"use server";

import prisma from "@/server/prisma";

export async function checkEmailByRole(
  email: string,
  isCompany: boolean | undefined,
) {
  const user = await prisma.user.findUnique({
    where: {
      email,
      role: { in: [isCompany ? "organization" : "user", "admin"] },
    },
  });

  return user !== null;
}
