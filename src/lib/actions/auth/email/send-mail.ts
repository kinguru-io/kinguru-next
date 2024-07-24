import { getLocale } from "next-intl/server";
import { transporter } from "@/lib/email";
import { logger } from "@/lib/logger";
import { renderVerificationEmail } from "~/emails/verification-email";

const verificationEmailLogger = logger.child({ name: "sendVerificationEmail" });

export async function sendVerificationEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const locale = await getLocale();

  const verificationURL = new URL(`${process.env.SITE_URL}/${locale}/verify`);
  verificationURL.searchParams.set("token", token);

  const linkHref = verificationURL.toString();

  try {
    const mailResult = await transporter.sendMail({
      to: email,
      subject: "Email verification | Eventify",
      text: `For verification visit:\n${linkHref}\n\n`,
      html: await renderVerificationEmail({ linkHref }),
    });

    if (mailResult.rejected) {
      verificationEmailLogger.error(mailResult.response);

      return { ok: false, message: mailResult.response };
    }
  } catch (e) {
    verificationEmailLogger.error(e);

    return { ok: false, message: "" };
  }

  return { ok: true, message: "" };
}
