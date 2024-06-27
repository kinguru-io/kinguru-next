import { getTranslations } from "next-intl/server";
import { ResetForm } from "./form";
import { resetPassword } from "@/lib/actions";

export default async function Page() {
  const t = await getTranslations("auth.reset_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <ResetForm resetPassword={resetPassword} />
      <p>{t("helper")}</p>
    </>
  );
}
