import { useTranslations } from "next-intl";
import { SignupForm } from "./form";

export default function Page() {
  const t = useTranslations("auth.signup_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <SignupForm />
    </>
  );
}
