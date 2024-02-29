import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { SignupForm } from "./form";
import { signUp } from "@/lib/actions";
import { adapterOptions } from "@/lib/nextauth";
import { redirect } from "@/navigation.ts";

export default async function Page() {
  const t = await getTranslations("auth.signup_form");
  const session = await getServerSession(adapterOptions);

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
