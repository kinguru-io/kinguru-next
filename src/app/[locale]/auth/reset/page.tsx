import { getTranslations } from "next-intl/server";
import { ResetForm } from "./form";
import { BackToSignIn } from "../_widgets/back-to-signin";

export default async function Page() {
  const t = await getTranslations("auth");

  return (
    <>
      <BackToSignIn label={t("sign_in_heading")} />
      <h1>{t("reset_form.heading")}</h1>
      <ResetForm />
      <p>{t("reset_form.helper")}</p>
    </>
  );
}
