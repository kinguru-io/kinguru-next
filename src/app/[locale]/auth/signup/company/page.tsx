import { getTranslations } from "next-intl/server";
import { SignupForm } from "./form";
import { signUp } from "@/lib/actions";

export default async function SignUpCompanyPage() {
  const t = await getTranslations("auth.signup_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <SignupForm signUp={signUp} />
    </>
  );
}
