import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { SigninForm } from "./form";
import { adapterOptions } from "@/lib/nextauth";
import { redirect } from "@/navigation.ts";

export default async function Page() {
  const t = await getTranslations("auth.signin_form");
  const session = await getServerSession(adapterOptions);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <h1>{t("heading_org")}</h1>
      <SigninForm />
    </>
  );
}
