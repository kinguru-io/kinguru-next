import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { TabInnerSection } from "@/components/profile/profile-premise";
import { Textarea, Input, ErrorField } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { getError } from "@/utils/forms/errors";
import { HStack } from "~/styled-system/jsx";

export default function MainInformation({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  const formFieldPath = "mainInformation";

  const legendLabel = isEditing
    ? "fields.name_and_description_editing"
    : "fields.name_and_description";

  return (
    <>
      <TabInnerSection>
        <h3>{t(legendLabel)}</h3>
        <div>
          <Input
            placeholder={t("fields.name_placeholder")}
            readOnly={isEditing}
            hidden={isEditing}
            data-invalid={getError(errors, `${formFieldPath}.name`)}
            {...register(`${formFieldPath}.name`)}
          />
          <ErrorField error={errors.mainInformation?.name} />
        </div>
        <div>
          <Textarea
            placeholder={t("fields.description_placeholder")}
            rows={9}
            data-invalid={getError(errors, `${formFieldPath}.description`)}
            {...register(`${formFieldPath}.description`)}
          />
          <ErrorField error={errors.mainInformation?.description} />
        </div>
      </TabInnerSection>
      <TabInnerSection>
        <h3>{t("fields.address")}</h3>
        <p>{t("fields.address_tip")}</p>
        <HStack
          justifyContent="space-between"
          css={{ "& > div": { flexBasis: "38%" } }}
        >
          <div>
            <Input
              placeholder={t("fields.room_placeholder")}
              data-invalid={getError(errors, `${formFieldPath}.room`)}
              {...register(`${formFieldPath}.room`)}
            />
            <ErrorField error={errors.mainInformation?.room} />
          </div>
          <div>
            <Input
              placeholder={t("fields.floor_placeholder")}
              data-invalid={getError(errors, `${formFieldPath}.floor`)}
              {...register(`${formFieldPath}.floor`)}
            />
            <ErrorField error={errors.mainInformation?.floor} />
          </div>
        </HStack>
      </TabInnerSection>
    </>
  );
}
