import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { SubSection } from "@/components/common/cards/sub-section";
import { ErrorField, Textarea } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { getError } from "@/utils/forms/errors";

export function Rules() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  return (
    <SubSection>
      <h2 className="title">{t("fields.rules")}</h2>
      <p className="helper">{t("fields.rules_tip")}</p>
      <div>
        <Textarea
          placeholder={t("fields.rules_placeholder")}
          rows={12}
          data-invalid={getError(errors, "rules.rules")}
          {...register("rules.rules")}
        />
        <ErrorField error={errors?.rules?.rules} />
      </div>
    </SubSection>
  );
}
