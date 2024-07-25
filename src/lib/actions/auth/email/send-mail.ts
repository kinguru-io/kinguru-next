"use server";

import { differenceInMinutes } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { transporter } from "@/lib/email";
import { logger } from "@/lib/logger";
import { renderVerificationEmail } from "~/emails/verification-email";

const verificationEmailLogger = logger.child({ name: "sendVerificationEmail" });

export async function sendVerificationEmail({
  email,
  token,
}: {
  email: string;
  token?: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations("verification");

  const verificationURL = new URL(`${process.env.SITE_URL}/${locale}/verify`);

  const tokenBlob = await obtainToken(token);

  if (!tokenBlob.ok) return tokenBlob;

  verificationURL.searchParams.set("token", tokenBlob.token);

  const linkHref = verificationURL.toString();

  try {
    const mailResult = await transporter.sendMail({
      to: email,
      subject: "Email verification | Eventify",
      text: `For verification visit:\n${linkHref}\n\n`,
      html: await renderVerificationEmail({ linkHref }),
    });

    const failed = mailResult.rejected
      .concat(mailResult.pending)
      .filter(Boolean);

    if (failed.length > 0) {
      verificationEmailLogger.error(mailResult);

      return { ok: false, message: failed.join(", ") };
    } else {
      await prisma.user.update({
        where: { email },
        data: { emailSentAt: new Date() },
      });
    }
  } catch (e) {
    verificationEmailLogger.error(e);

    return { ok: false, message: t("unknown_error") };
  }

  return { ok: true, message: t("email_was_sent") };
}

async function obtainToken(
  token?: string,
): Promise<{ ok: true; token: string } | { ok: false; message: string }> {
  if (typeof token === "string" && token.length > 0) {
    return { ok: true, token };
  }

  const session = await getSession();
  const t = await getTranslations("verification");
  const account = await prisma.account.findFirst({
    where: { userId: session?.user?.id || "", type: "credentials" },
    include: { user: { select: { emailSentAt: true } } },
  });

  if (!account || !account.emailToken) {
    return { ok: false, message: t("unknown_error") };
  }

  // * not sure if this case is even possible
  if (!account.user.emailSentAt) {
    return { ok: true, token: account.emailToken };
  }

  const now = new Date();
  const minutesFromLastSent = differenceInMinutes(
    now,
    account.user.emailSentAt,
  );

  if (minutesFromLastSent <= 5) {
    const locale = await getLocale();
    const formatter = new Intl.RelativeTimeFormat(locale, { style: "short" });
    return {
      ok: false,
      message: t("too_many_attempts", {
        minutes: formatter.format(5 - minutesFromLastSent, "minutes"),
      }),
    };
  }

  return { ok: true, token: account.emailToken };
}
