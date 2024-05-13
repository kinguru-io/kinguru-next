import { getProviders } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import { SigninForm } from "./form";
import { getSession } from "@/auth.ts";
import { redirect } from "@/navigation.ts";

export default async function Page({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  const t = await getTranslations("auth.signin_form");
  const session = await getSession();
  const providers = await getProviders();

  if (session || !providers) {
    return redirect("/");
  }

  return (
    <>
      <h1>{t("heading")}</h1>
      <SigninForm
        providers={Object.values(providers).filter(
          ({ name }) => name !== "Credentials",
        )}
        callbackUrl={callbackUrl}
      />
    </>
  );
}
