import { getTranslations } from "next-intl/server";
import { getStripe } from "@/lib/shared/stripe";
import prisma from "@/server/prisma";

export async function verifyEmail(token: string) {
  const t = await getTranslations("verification");
  const account = await prisma.account.findUnique({
    where: { emailToken: token || "" },
    include: { user: true },
  });

  if (!account) {
    return { ok: false, message: t("bad_token") };
  }

  const { name, email, confirmed, role } = account.user;

  if (confirmed) {
    return { ok: true, message: t("email_verified") };
  }

  const stripe = getStripe();

  const customer =
    role === "user"
      ? await stripe.customers.create({ email, name: name || "" })
      : null;

  await prisma.user.update({
    where: { id: account.userId },
    data: {
      emailVerified: new Date(),
      confirmed: true,
      stripeCustomerId: customer?.id || null,
    },
  });

  return { ok: true, message: t("email_verified") };
}
