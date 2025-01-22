import { useTranslations } from "next-intl";
import formConfig from "./company-signup-form-config.json";
import { BaseForm, Button } from "@/components/uikit";
import { signupFormSchema, type SignupFormInput } from "@/lib/validations";
import { css, cx } from "~/styled-system/css";
import { Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";

export function CompanySignupFormInner({
  isPending,
  fieldSetClassName,
  actionSlot,
  actionSlotClassName,
}: {
  isPending: boolean;
  fieldSetClassName?: string;
  actionSlot?: React.ReactNode;
  actionSlotClassName?: string;
}) {
  const t = useTranslations("auth.signup_form");

  const submitButtonNode = (
    <Button
      type="submit"
      isLoading={isPending}
      className={css({ justifyContent: "center" })}
    >
      {t("submit")}
    </Button>
  );

  return (
    <Stack gap="4">
      <fieldset
        className={cx(stack({ gap: "2" }), fieldSetClassName)}
        disabled={isPending}
      >
        <BaseForm<SignupFormInput>
          config={formConfig.main}
          schema={signupFormSchema}
          translationsKey="auth.signup_form"
        />
      </fieldset>
      {actionSlot ? (
        <div className={cx(actionSlotClassName)}>
          {actionSlot}
          {submitButtonNode}
        </div>
      ) : (
        submitButtonNode
      )}
    </Stack>
  );
}
