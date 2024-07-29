import { useTranslations } from "next-intl";
import React, { memo } from "react";
import {
  FieldValues,
  get,
  useFormContext,
  type RegisterOptions,
} from "react-hook-form";
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
  extraProps?: Record<PropertyKey, string | number | undefined>;
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
    extraProps,
  }: FormFieldProps): JSX.Element => {
    const {
      register,
      formState: { errors },
    } = useFormContext<T>();

    // @ts-ignore
    const t = useTranslations(translationsKey) as (key: string) => string;

    const fieldName = customName || name;
    const error = get(errors, fieldName);
    const optionalFields = getOptionalFields(schema);
    const markRequiredField = optionalFields.includes(fieldName) ? "" : "*";
    const placeholder = `${t(name)}${markRequiredField}`;

    // TODO Refactor. Temporary solution
    const { _mask, ...restExtraProps } = extraProps || {};
    const registerOptions = isMaskKey(_mask)
      ? registerOptionsMap[_mask]
      : undefined;

    const commonProps = {
      placeholder,
      ...restExtraProps,
      // @ts-ignore
      ...register(fieldName, registerOptions),
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

function makePhoneNumber({ target }: React.ChangeEvent<HTMLInputElement>) {
  target.value = `+${target.value.replace(/\D/g, "")}`;
}

function makeIBAN({ target }: React.ChangeEvent<HTMLInputElement>) {
  const newValue = target.value
    .replace(/\s/g, "")
    .replace(/[a-z0-9]{4}/gi, (x) => `${x} `)
    .toUpperCase()
    .trimEnd();
  target.value = newValue;
}

const registerOptionsMap: Record<"iban" | "phone", RegisterOptions> = {
  iban: { onBlur: makeIBAN },
  phone: { onChange: makePhoneNumber },
};

function isMaskKey(
  key: string | number | undefined,
): key is keyof typeof registerOptionsMap {
  return !!key && key in registerOptionsMap;
}
