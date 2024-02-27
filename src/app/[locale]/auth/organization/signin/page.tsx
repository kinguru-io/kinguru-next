import { useTranslations } from "next-intl";
import { SigninForm } from "./form";

export default function Page() {
  const t = useTranslations("auth.signin_form");

  return (
    <>
      <h1>{t("heading_org")}</h1>
      <SigninForm />
    </>
  );
}
