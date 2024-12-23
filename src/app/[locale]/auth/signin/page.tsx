import { getProviders } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import { SignInForm } from "./_sign-in-form/form";
import { SignInProvidersForm } from "./sign-in-providers-form";
import { revalidateAll } from "@/lib/actions";
import { InlineBox } from "~/styled-system/jsx";

export default async function SignInUser() {
  const t = await getTranslations("auth");
  const providers = Object.values((await getProviders()) || {}).filter(
    ({ name }) => !["Credentials", "Email"].includes(name),
  );

  return (
    <>
      <h1>{t("sign_in_heading")}</h1>
      <SignInForm revalidateAll={revalidateAll} />
      {providers.length > 0 && (
        <>
          <InlineBox
            css={{ textAlign: "center", paddingBlock: "1", color: "secondary" }}
          >
            {t("alternative_sign_in_label")}
          </InlineBox>
          <SignInProvidersForm
            providers={Object.values(providers).filter(
              ({ name }) => !["Credentials", "Email"].includes(name),
            )}
          />
        </>
      )}
    </>
  );
}
