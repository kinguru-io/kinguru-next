import { useTranslations } from "next-intl";
import { ResetForm } from "./form";
import { resetPassword } from "@/lib/actions";

export default function Page() {
  const t = useTranslations("auth.reset_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <ResetForm resetPassword={resetPassword} />
    </>
  );
}
