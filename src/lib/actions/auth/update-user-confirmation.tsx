import type { User } from "next-auth";
import { getStripe } from "@/lib/shared/stripe";

export async function updateUserConfirmation({
  id,
  role,
  email,
  name,
}: Pick<User, "id" | "role" | "email" | "name">) {
  const stripe = getStripe();

  const customer =
    role === "user"
      ? await stripe.customers.create({ email: email || "", name: name || "" })
      : null;

  return prisma.user.update({
    where: { id },
    data: {
      emailVerified: new Date(),
      confirmed: true,
      stripeCustomerId: customer?.id || null,
    },
  });
}
