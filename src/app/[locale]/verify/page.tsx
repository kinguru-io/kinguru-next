import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { MailResendScreen } from "./mail-resend-screen";
import { verifyEmail } from "./verify-email";
import { getSession } from "@/auth";
import { Icon, SpinnerIcon } from "@/components/uikit";
import { Link, redirect } from "@/navigation";
import { css } from "~/styled-system/css";
import { Center, VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default function VerifyEmailPage({
  searchParams: { token },
}: {
  searchParams: { token?: string };
}) {
  const t = useTranslations("verification");

  return (
    <Center
      css={{
        height: "full",
        gap: "4",
        paddingBlock: "6",
        paddingInline: "4",
        flexDirection: "column",
        fontSize: "sm",
      }}
    >
      <Suspense
        fallback={
          <>
            <span>{t("in_progress")}</span>
            <SpinnerIcon />
          </>
        }
      >
        {token ? <EmailCheck token={token} /> : <NoVerification />}
      </Suspense>
    </Center>
  );
}

async function EmailCheck({ token }: { token: string }) {
  const t = await getTranslations("verification");
  const { message, ok } = await verifyEmail(token);

  return (
    <>
      <VStack gap="4" textAlign="center" maxWidth="md">
        <Icon
          className={css({
            padding: "3",
            borderRadius: "full",
            colorPalette: ok ? "success" : "danger",
            color: "colorPalette.text",
            bgColor: "colorPalette",
            fontWeight: "bold",
            fontSize: "3xl",
          })}
          name={ok ? "action/tick-double" : "action/cross"}
        />
        {message}
      </VStack>
      <Link className={button()} href="/">
        {t("main_page_link")}
      </Link>
      <Link
        className={css({
          color: "secondary",
          _hoverOrFocusVisible: { textDecoration: "underline" },
        })}
        href="/profile/edit"
      >
        {t("profile_page_link")}
      </Link>
    </>
  );
}

async function NoVerification() {
  const session = await getSession();
  const email = session?.user?.email;

  if (!session || session.user?.confirmed || !email) return redirect("/");

  return <MailResendScreen email={email} />;
}
