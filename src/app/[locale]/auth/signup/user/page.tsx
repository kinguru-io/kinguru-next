import { useTranslations } from "next-intl";
import { UserSignUpForm } from "./form";
import { BackToSignIn } from "../../_widgets/back-to-signin";
import { userSignUp } from "@/lib/actions/auth/user-signup";

export default function UserSignUpPage() {
  const t = useTranslations("auth");

  return (
    <>
      <BackToSignIn label={t("sign_in_heading")} />
      <h1>{t("signup_form.heading_user")}</h1>
      <UserSignUpForm signUp={userSignUp} />
    </>
  );
}
