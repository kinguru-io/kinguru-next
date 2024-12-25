import { transporter } from "@/lib/email";
import { logger } from "@/lib/logger";
import { renderBookingEmail, type BookingEmailProps } from "~/emails";

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
