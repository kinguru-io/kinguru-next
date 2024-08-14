import { useLocale, useTranslations } from "next-intl";
import { get, useFormContext } from "react-hook-form";
import { SubSection } from "@/components/common/cards/sub-section";
import {
  Textarea,
  Input,
  ErrorField,
  AccordionItem,
  AccordionItemToggle,
  AccordionItemContent,
} from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { locales } from "@/navigation";
import { getError } from "@/utils/forms/errors";
import { css } from "~/styled-system/css";
import { Box, Flex, Stack } from "~/styled-system/jsx";

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
          <DescriptionFields />
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

function DescriptionFields() {
  const t = useTranslations("profile.premises.add");
  const primaryLocale = useLocale();
  const {
    register,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  const orderedLocales = [primaryLocale].concat(
    locales.filter((l) => l !== primaryLocale),
  );

  return orderedLocales.map((locale, idx) => (
    <Box width="full" key={locale}>
      <AccordionItem>
        <AccordionItemToggle
          css={{ fontSize: "sm", fontWeight: "bold" }}
          checkboxProps={{ defaultChecked: idx === 0 }}
        >
          {t("fields.description_placeholder")} ({locale.toUpperCase()})
        </AccordionItemToggle>
        <AccordionItemContent className={css({ paddingBlock: "2" })}>
          <Input
            type="text"
            hidden
            readOnly
            {...register(`mainInformation.information.${idx}.locale`, {
              value: locale,
            })}
          />
          <Textarea
            placeholder={`${t("fields.description_placeholder")} (${locale})`}
            data-invalid={get(
              errors,
              `mainInformation.information.${idx}.description`,
            )}
            {...register(`mainInformation.information.${idx}.description`)}
          />
          <ErrorField
            error={get(
              errors,
              `mainInformation.information.${idx}.description`,
            )}
          />
        </AccordionItemContent>
      </AccordionItem>
    </Box>
  ));
}
