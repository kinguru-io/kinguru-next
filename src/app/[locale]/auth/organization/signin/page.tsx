import { getTranslations } from "next-intl/server";
import { SigninForm } from "./form";
import { getSession } from "@/auth.ts";
import { revalidateAll } from "@/lib/actions";
import { redirect } from "@/navigation.ts";

export default async function Page({
  searchParams: { callbackUrl },
}: {
  searchParams: { callbackUrl?: string };
}) {
  const t = await getTranslations("auth.signin_form");
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <h1>{t("heading_org")}</h1>
      <SigninForm callbackUrl={callbackUrl} revalidateAll={revalidateAll} />
    </>
  );
}
