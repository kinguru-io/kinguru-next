import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { verifyEmail } from "./verify-email";
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

  if (!token) return redirect("/");

  return (
    <Center css={{ height: "full" }}>
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
  const { message, ok } = await verifyEmail(token);

  // TODO add email input to resend?

  return (
    <VStack gap="4" paddingBlock="6">
      <VStack gap="4" textAlign="center" maxWidth="md" fontSize="sm">
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
          fontSize: "sm",
          color: "secondary",
          _hoverOrFocusVisible: { textDecoration: "underline" },
        })}
        href="/profile/edit"
      >
        {t("profile_page_link")}
      </Link>
    </VStack>
  );
}
