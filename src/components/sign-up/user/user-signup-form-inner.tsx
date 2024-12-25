import { useTranslations } from "next-intl";
import config from "./user-signup-form-config.json";
import { BaseForm, Button } from "@/components/uikit";
import {
  userSignupFormSchema,
  type UserSignupFormInput,
} from "@/lib/validations";
import { stack } from "~/styled-system/patterns";

export function UserSignupFormInner({ isPending }: { isPending: boolean }) {
  const t = useTranslations("auth.signup_form");

  return (
    <div className={stack({ gap: "4" })}>
      <fieldset className={stack({ gap: "2" })} disabled={isPending}>
        <BaseForm<UserSignupFormInput>
          config={config.main}
          schema={userSignupFormSchema}
          translationsKey="auth.signup_form"
        />
      </fieldset>
      <Button type="submit" isLoading={isPending} contentCentered>
        {t("submit")}
      </Button>
    </div>
  );
}
