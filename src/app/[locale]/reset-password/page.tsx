import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { ChangePasswordForm } from "@/components/reset-password";
import { Icon, SpinnerIcon } from "@/components/uikit";
import { checkResetToken } from "@/lib/actions/auth/reset";
import { Link, redirect } from "@/navigation";
import { css } from "~/styled-system/css";
import { Center, VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default function ResetPasswordPage({
  searchParams: { token },
}: {
  searchParams: { token?: string };
}) {
  const t = useTranslations("verification");

  if (!token) {
    return redirect("/auth/reset");
  }

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
        <ResetPasswordEntry token={token} />
      </Suspense>
    </Center>
  );
}

async function ResetPasswordEntry({ token }: { token: string }) {
  const t = useTranslations("reset_process");
  const { message, ok } = await checkResetToken(token);

  if (!ok) {
    return (
      <>
        <VStack gap="4" textAlign="center" maxWidth="md">
          <Icon
            className={css({
              padding: "3",
              borderRadius: "full",
              colorPalette: "danger",
              color: "colorPalette.text",
              bgColor: "colorPalette",
              fontWeight: "bold",
              fontSize: "3xl",
            })}
            name="action/cross"
          />
          {message}
        </VStack>
        <Link className={button()} href="/auth/reset">
          {t("request_again")}
        </Link>
      </>
    );
  }

  return <ChangePasswordForm token={token} />;
}
