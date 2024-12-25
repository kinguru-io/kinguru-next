"use server";

import { differenceInMinutes } from "date-fns";
import { getLocale, getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { transporter } from "@/lib/email";
import { logger } from "@/lib/logger";
import { renderCodeVerificationEmail, renderVerificationEmail } from "~/emails";

const verificationEmailLogger = logger.child({ name: "sendVerificationEmail" });

export async function sendVerificationEmail({
  email,
  token,
  isCode,
}: {
  email: string;
  token?: string;
  isCode?: boolean;
}) {
  const [locale, t, mailT] = await Promise.all([
    getLocale(),
    getTranslations("verification"),
    getTranslations("emails"),
  ]);
  const verificationURL = new URL(`${process.env.SITE_URL}/${locale}/verify`);
  const tokenBlob = await obtainToken(token);

  if (!tokenBlob.ok) return tokenBlob;

  if (!isCode) {
    verificationURL.searchParams.set("token", tokenBlob.token);
  }

  const linkHref = verificationURL.toString();

  const emailPromise = isCode
    ? renderCodeVerificationEmail({ code: tokenBlob.token, t: mailT })
    : renderVerificationEmail({ linkHref, t: mailT });
  const textEmailPromise = isCode
    ? renderCodeVerificationEmail({ code: tokenBlob.token, t: mailT }, true)
    : renderVerificationEmail({ linkHref, t: mailT }, true);

  const subject = isCode
    ? mailT("verify_code.heading")
    : mailT("verify.heading");

  try {
    const mailResult = await transporter.sendMail({
      to: email,
      subject: `${subject} | Eventify`,
      html: await emailPromise,
      text: await textEmailPromise,
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
