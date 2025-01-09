import { transporter } from "@/lib/email";
import { logger } from "@/lib/logger";
import {
  renderBookingConfirmedEmail,
  renderBookingEmail,
  type BookingConfirmedEmailProps,
  type BookingEmailProps,
} from "~/emails";

const bookingEmailLogger = logger.child({ name: "sendBookingEmail" });

export async function sendBookingEmail({
  email,
  ...mailProps
}: { email: string } & BookingEmailProps) {
  try {
    await transporter.sendMail({
      to: email,
      subject: `${mailProps.t("booking.reservation_at_label")} ${mailProps.name} | Eventify`,
      text: await renderBookingEmail(mailProps, true),
      html: await renderBookingEmail(mailProps),
    });
  } catch (e) {
    bookingEmailLogger.error(e);
  }
}

export async function sendBookingConfirmationEmail({
  email,
  ...mailProps
}: { email: string } & BookingConfirmedEmailProps) {
  try {
    await transporter.sendMail({
      to: email,
      subject: `${mailProps.t("booking_confirmed.preview")} [${mailProps.name}] | Eventify`,
      text: await renderBookingConfirmedEmail(mailProps, true),
      html: await renderBookingConfirmedEmail(mailProps),
    });
  } catch (e) {
    bookingEmailLogger.error(e);
  }
}
