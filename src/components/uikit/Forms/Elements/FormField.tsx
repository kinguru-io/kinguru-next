import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { ZodSchema } from "zod";
import { CountrySelect } from "@/components/common/form/country-select";
import {
  ErrorField,
  Input,
  InputPassword,
  Textarea,
  Select,
} from "@/components/uikit";
import { getOptionalFields } from "@/utils/getOptionalFieldsFromSchema";
import { Box } from "~/styled-system/jsx";
import { InputVariant } from "~/styled-system/recipes";

type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "country-select"
  | "textarea";

interface FormFieldProps {
  name: string;
  customName?: string;
  type: FieldType;
  options?: { text: string }[];
  schema: ZodSchema<any>;
  variant?: InputVariant["variant"];
  translationsKey?: string;
}

export const FormField = memo(
  <T extends FieldValues>({
    name,
    customName,
    type,
    schema,
    translationsKey,
    variant,
    options,
  }: FormFieldProps): JSX.Element => {
    const {
      register,
      formState: { errors },
    } = useFormContext<T>();

    // @ts-ignore
    const t = useTranslations(translationsKey) as (key: string) => string;

    const fieldName = customName || name;

    const getError = () => {
      if (customName) {
        const [mainKey, indexStr, secondName] = fieldName.split(".");
        const index = parseInt(indexStr, 10);
        if (!isNaN(index)) {
          // @ts-ignore
          return errors?.[mainKey]?.[index]?.[secondName];
        }
        return errors?.[fieldName];
      }
      return errors?.[fieldName];
    };

    const error = getError();

    const optionalFields = getOptionalFields(schema);
    const markRequiredField = optionalFields.includes(fieldName) ? "" : "*";
    // @ts-ignore
    const placeholder = `${t(name)}${markRequiredField}`;

    const commonProps = {
      placeholder,
      // @ts-ignore
      ...register(fieldName),
      "data-invalid": error ? true : undefined,
    };

    if (variant) {
      // @ts-ignore
      commonProps.variant = variant;
    }

    let field = null;
    switch (type) {
      case "text":
      case "number":
      case "email":
        field = <Input type={type} {...commonProps} />;
        break;
      case "password":
        field = <InputPassword {...commonProps} />;
        break;
      case "country-select":
        field = <CountrySelect {...commonProps} />;
        break;
      case "textarea":
        field = <Textarea rows={9} {...commonProps} />;
        break;
      case "select":
        field = (
          <Select {...commonProps}>
            {options?.map((option, idx) => (
              <option key={idx} value={option.text}>
                {t(option.text)}
              </option>
            ))}
          </Select>
        );
        break;
      default:
        field = <Input type="text" {...commonProps} />; // Default to text if type is unknown
    }

    return (
      <Box width="full">
        {field}
        <ErrorField error={error} />
      </Box>
    );
  },
);
