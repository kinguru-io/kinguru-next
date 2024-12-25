"use server";

import { sendVerificationEmail } from "./send-mail";
import { getSession } from "@/auth";
import { randomNumbers } from "@/lib/shared/utils";

export async function resendCodeMail() {
  const session = await getSession();

  if (!session || !session.user || !session.user.email) return;

  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);

  const [_, request] = await prisma.$transaction([
    prisma.verificationRequest.deleteMany({
      where: { identifier: session.user.email },
    }),
    prisma.verificationRequest.create({
      data: {
        identifier: session.user.email,
        token: randomNumbers(6),
        expires: date,
      },
    }),
  ]);

  await sendVerificationEmail({
    email: request.identifier,
    token: request.token,
    isCode: true,
  });
}
