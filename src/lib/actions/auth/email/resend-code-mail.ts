"use server";

import { sendVerificationEmail } from "./send-mail";
import { verificationRequestPostfix } from "../config";
import { getSession } from "@/auth";
import { randomNumbers } from "@/lib/shared/utils";

export async function resendCodeMail() {
  const session = await getSession();

  if (!session || !session.user || !session.user.email) return;

  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);

  const identifier = `${session.user.email}${verificationRequestPostfix.emailVerification}`;

  const [_, request] = await prisma.$transaction([
    prisma.verificationRequest.deleteMany({
      where: { identifier },
    }),
    prisma.verificationRequest.create({
      data: {
        identifier,
        token: randomNumbers(6),
        expires: date,
      },
    }),
  ]);

  await sendVerificationEmail({
    email: session.user.email,
    token: request.token,
    isCode: true,
  });
}
