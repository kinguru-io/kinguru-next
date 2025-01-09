"use server";

import { revalidatePath } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { sendBookingConfirmationEmail } from "./email";

async function revalidateMyBookings() {
  revalidatePath("/[locale]/profile/mybookings", "page");
}

export async function confirmBooking(id: string) {
  const t = await getTranslations("profile.my_bookings");
  const { count } = await prisma.premiseSlot.updateMany({
    where: { paymentIntentId: id },
    data: {
      type: "ready_for_payment",
    },
  });

  if (count === 0) {
    await revalidateMyBookings();

    return {
      ok: false,
      message: t("unknown_error"),
    };
  }

  const slots = await prisma.premiseSlot.findMany({
    where: { paymentIntentId: id },
    include: { user: true, premise: true },
  });

  const requests = [];

  // free slots
  if (slots.every(({ amount }) => amount === 0)) {
    requests.push(
      prisma.premiseSlot.updateMany({
        where: { paymentIntentId: id },
        data: {
          type: "via_website",
          status: "succeed",
        },
      }),
    );
  }

  const user = slots.at(0)?.user;
  const premise = slots.at(0)?.premise;

  if (!user || !premise) {
    await revalidateMyBookings();

    return {
      ok: false,
      message: t("unknown_error"),
    };
  }

  requests.push(
    sendBookingConfirmationEmail({
      email: user.email,
      name: premise.name,
      t: await getTranslations("emails"),
      locale: await getLocale(),
    }),
  );

  await Promise.all(requests);
  await revalidateMyBookings();

  return {
    ok: true,
    message: t("confirmed"),
  };
}
