import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { verifyEmail } from "@/app/[locale]/verify/verify-email";
import { SpinnerIcon } from "@/components/uikit";
import { Link, redirect } from "@/navigation";
import { Center } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default function VerifyEmailPage({
  searchParams: { token },
}: {
  searchParams: { token?: string };
}) {
  const t = useTranslations("verification");

  if (!token) return redirect("/");

  return (
    <Center css={{ height: "full", flexDirection: "column", gap: "4" }}>
      <Suspense
        fallback={
          <>
            <span>{t("in_progress")}</span>
            <SpinnerIcon />
          </>
        }
      >
        <EmailCheck token={token} />
      </Suspense>
    </Center>
  );
}

async function EmailCheck({ token }: { token: string }) {
  const t = await getTranslations("verification");
  const { message } = await verifyEmail(token);

  // TODO add email input to resend?

  return (
    <>
      <span>{message}</span>
      <Link className={button({ colorPalette: "primary" })} href="/">
        {t("main_page_link")}
      </Link>
      <Link
        className={button({ colorPalette: "secondary" })}
        href="/profile/edit"
      >
        {t("profile_page_link")}
      </Link>
    </>
  );
}
