import { getProviders } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import { SignInProvidersForm } from "./sign-in-providers-form";
import { SignInForm } from "../_sign-in-form/form";
import { revalidateAll } from "@/lib/actions";
import { redirect } from "@/navigation";
import { InlineBox } from "~/styled-system/jsx";

export default async function SignInUser() {
  const t = await getTranslations("auth");
  const providers = await getProviders();

  if (!providers) {
    return redirect("/");
  }

  return (
    <>
      <SignInForm revalidateAll={revalidateAll} />
      <InlineBox textAlign="center" paddingBlock="1" color="secondary">
        {t("alternative_sign_in_label")}
      </InlineBox>
      <SignInProvidersForm
        providers={Object.values(providers).filter(
          ({ name }) => !["Credentials", "Email"].includes(name),
        )}
      />
    </>
  );
}
