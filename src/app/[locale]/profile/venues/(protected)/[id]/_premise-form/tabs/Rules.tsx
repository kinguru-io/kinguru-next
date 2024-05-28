import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { TabInnerSection } from "@/components/profile/profile-premise";
import { ErrorField, Textarea } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";

export default function Rules() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  return (
    <TabInnerSection>
      <h3>{t("fields.rules")}</h3>
      <p className="subheading">{t("fields.rules_tip")}</p>
      <div>
        <Textarea
          placeholder={t("fields.rules_placeholder")}
          rows={12}
          {...register("rules.rules")}
        />
        <ErrorField error={errors?.rules?.rules} />
      </div>
    </TabInnerSection>
  );
}
