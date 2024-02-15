import { useTranslations } from "next-intl";
import { SigninForm } from "./form";
import { signIn } from "@/lib/actions";

export default function Page() {
  const t = useTranslations("auth.signin_form");

  return (
    <>
      <h1>{t("heading")}</h1>
      <SigninForm signIn={signIn} />
    </>
  );
}
