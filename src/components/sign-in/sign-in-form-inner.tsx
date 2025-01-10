import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import formConfig from "./sign-in-form-config.json";
import { BaseForm, Button } from "@/components/uikit";
import { signinFormSchema, type SigninFormInput } from "@/lib/validations";
import { Link } from "@/navigation";
import { HStack, Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export function SigninFormInner({
  isCompany,
  hideRegister,
}: {
  isCompany?: boolean;
  hideRegister?: boolean;
}) {
  const t = useTranslations("auth");
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const href = `/auth/signup/${isCompany ? "company" : "user"}`;

  return (
    <Stack gap="4">
      <fieldset className={stack({ gap: "2" })} disabled={isSubmitting}>
        <BaseForm<SigninFormInput>
          config={formConfig.main}
          schema={signinFormSchema}
          translationsKey="auth.signin_form"
        />
      </fieldset>
      <HStack
        css={{
          gap: "2",
          flexWrap: "wrap-reverse",
          "& > .button": {
            flexBasis: "44",
            flexGrow: "1",
          },
        }}
      >
        {!hideRegister && (
          <Link
            href={href}
            className={button({
              colorPalette: "secondary",
              contentCentered: true,
            })}
          >
            {t("sign_up_label")}
          </Link>
        )}
        <Button contentCentered type="submit" isLoading={isSubmitting}>
          {t("sign_in_label")}
        </Button>
      </HStack>
    </Stack>
  );
}
