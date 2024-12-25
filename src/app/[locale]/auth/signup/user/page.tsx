import { useTranslations } from "next-intl";
import { UserSignUpForm } from "./form";
import { ArrowIcon } from "@/components/uikit";
import { userSignUp } from "@/lib/actions/auth/user-signup";

import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { button } from "~/styled-system/recipes";

const backToSignInLinkStyles = cx(
  button({ colorPalette: "secondary", rounded: false }),
  css({ alignSelf: "flex-start", gap: "1", padding: "3" }),
);

export default function UserSignUpPage() {
  const t = useTranslations("auth");

  return (
    <>
      <Link href="/auth/signin" className={backToSignInLinkStyles}>
        <ArrowIcon />
        {t("sign_in_heading")}
      </Link>
      <h1>{t("signup_form.heading_user")}</h1>
      <UserSignUpForm signUp={userSignUp} />
    </>
  );
}
