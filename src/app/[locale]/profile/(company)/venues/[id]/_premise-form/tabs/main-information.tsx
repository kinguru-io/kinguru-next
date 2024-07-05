import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { SubSection } from "@/components/common/cards/sub-section";
import { Textarea, Input, ErrorField } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { getError } from "@/utils/forms/errors";
import { Flex, Stack } from "~/styled-system/jsx";

export function MainInformation({ editMode = false }: { editMode?: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();
  const t = useTranslations("profile.premises.add");

  const formFieldPath = "mainInformation";

  const legendLabel = editMode
    ? "fields.name_and_description_editing"
    : "fields.name_and_description";

  return (
    <>
      <SubSection>
        <h2 className="title">{t(legendLabel)}</h2>
        <Stack gap="2">
          <Input
            placeholder={t("fields.name_placeholder")}
            readOnly={editMode}
            hidden={editMode}
            data-invalid={getError(errors, `${formFieldPath}.name`)}
            {...register(`${formFieldPath}.name`)}
          />
          <ErrorField error={errors.mainInformation?.name} />
          <Textarea
            placeholder={t("fields.description_placeholder")}
            data-invalid={getError(errors, `${formFieldPath}.description`)}
            {...register(`${formFieldPath}.description`)}
          />
          <ErrorField error={errors.mainInformation?.description} />
        </Stack>
      </SubSection>
      <SubSection>
        <h2 className="title">{t("fields.address")}</h2>
        <p className="helper">{t("fields.address_tip")}</p>
        <Flex
          css={{
            gap: "2",
            flexWrap: "wrap",
            "& > div": { flexGrow: "1", flexBasis: "60" },
          }}
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
        </Flex>
      </SubSection>
    </>
  );
}
