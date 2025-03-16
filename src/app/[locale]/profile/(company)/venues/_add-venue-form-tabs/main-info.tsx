import { useLocale, useTranslations } from "next-intl";
import { get, useFormContext } from "react-hook-form";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemToggle,
  ErrorField,
  Input,
  Textarea,
} from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { locales } from "@/navigation";
import { getError } from "@/utils/forms/errors";
import { css } from "~/styled-system/css";
import { Box, Stack } from "~/styled-system/jsx";

export function MainInfoGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  const formFieldPath = "mainInfo";

  return (
    <Stack gap="2">
      <Box width="full">
        <Input
          placeholder={t("fields.name_placeholder")}
          data-invalid={getError(errors, `${formFieldPath}.name`)}
          {...register(`${formFieldPath}.name`)}
        />
        <ErrorField error={errors?.mainInfo?.name} />
      </Box>
      {/* <Box width="full">
        <Textarea
          placeholder={t("fields.description_placeholder")}
          data-invalid={getError(errors, `${formFieldPath}.description`)}
          {...register(`${formFieldPath}.description`)}
        />
        <ErrorField error={errors?.mainInfo?.description} />
      </Box> */}
      <DescriptionFields />
    </Stack>
  );
}

function DescriptionFields() {
  const t = useTranslations("profile.venues.add");
  const primaryLocale = useLocale();
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();

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
            {...register(`mainInfo.information.${idx}.locale`, {
              value: locale,
            })}
          />
          <Textarea
            placeholder={`${t("fields.description_placeholder")} (${locale})`}
            data-invalid={get(
              errors,
              `mainInfo.information.${idx}.description`,
            )}
            {...register(`mainInfo.information.${idx}.description`)}
          />
          <ErrorField
            error={get(errors, `mainInfo.information.${idx}.description`)}
          />
        </AccordionItemContent>
      </AccordionItem>
    </Box>
  ));
}
