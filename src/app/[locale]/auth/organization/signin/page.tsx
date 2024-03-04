import { getTranslations } from "next-intl/server";
import { SigninForm } from "./form";
import { getSession } from "@/auth.ts";
import { redirect } from "@/navigation.ts";

export default async function Page() {
  const t = await getTranslations("auth.signin_form");
  const session = await getSession();

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
