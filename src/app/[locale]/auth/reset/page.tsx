import { useTranslations } from "next-intl";
import { ResetForm } from "./form";

export default function Page() {
  const t = useTranslations("auth.reset_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <ResetForm />
    </>
  );
}
