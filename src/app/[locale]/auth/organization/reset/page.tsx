import { getTranslations } from "next-intl/server";
import { ResetForm } from "./form";
import { getSession } from "@/auth.ts";
import { resetPassword } from "@/lib/actions";
import { redirect } from "@/navigation.ts";

export default async function Page() {
  const t = await getTranslations("auth.reset_form");
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <h1>{t("heading")}</h1>
      <ResetForm resetPassword={resetPassword} />
    </>
  );
}
