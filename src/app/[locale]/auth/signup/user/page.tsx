import { useTranslations } from "next-intl";
import { UserSignUpForm } from "./form";
import { userSignUp } from "@/lib/actions/auth/user-signup";

export default function UserSignUpPage() {
  const t = useTranslations("auth.signup_form");

  return (
    <>
      <h1>{t("heading_user")}</h1>
      <UserSignUpForm signUp={userSignUp} />
    </>
  );
}
