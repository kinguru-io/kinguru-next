import { getTranslations } from "next-intl/server";
import { SignupForm } from "./form";
import { getSession } from "@/auth.ts";
import { signUp } from "@/lib/actions";
import { redirect } from "@/navigation.ts";

export default async function Page() {
  const t = await getTranslations("auth.signup_form");
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <h1>{t("heading")}</h1>
      <SignupForm signUp={signUp} />
    </>
  );
}
