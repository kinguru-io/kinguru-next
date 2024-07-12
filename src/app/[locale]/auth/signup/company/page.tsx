import { useTranslations } from "next-intl";
import { CompanySignUpForm } from "./form";
import { companySignUp } from "@/lib/actions";

export default function CompanySignUpPage() {
  const t = useTranslations("auth.signup_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <CompanySignUpForm signUp={companySignUp} />
    </>
  );
}
