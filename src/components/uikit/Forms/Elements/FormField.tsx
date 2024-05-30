import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { ZodSchema } from "zod";
import { ErrorField, Input, InputPassword } from "@/components/uikit";
import { getOptionalFields } from "@/utils/getOptionalFieldsFromSchema";
import { InputVariant } from "~/styled-system/recipes";

interface FormFieldProps {
  name: string;
  customName?: string;
  type: string;
  options?: { text: string }[];
  schema: ZodSchema<any>;
  variant: InputVariant;
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
  }: FormFieldProps): JSX.Element => {
    const {
      register,
      formState: { errors },
    } = useFormContext<T>();

    // @ts-expect-error
    const t = useTranslations(translationsKey);

    const fieldName = customName || name;

    const getError = () => {
      if (customName) {
        const [mainKey, indexStr, secondName] = fieldName.split(".");
        const index = parseInt(indexStr);
        // @ts-expect-error
        return errors?.[mainKey]?.[index]?.[secondName];
      }
      return errors?.[fieldName];
    };

    const error = getError();

    const optionalFields = getOptionalFields(schema);
    const markRequiredField = optionalFields.includes(fieldName) ? "" : "*";
    // @ts-expect-error
    const placeholder = `${t(name)}${markRequiredField}`;

    const commonProps = {
      placeholder,
      // @ts-expect-error
      ...register(fieldName),
      "data-invalid": error,
    };

    if (variant) {
      // @ts-expect-error
      commonProps.variant = "outline";
    }

    let field;
    switch (type) {
      case "text":
        field = <Input type={type} {...commonProps} />;
        break;
      case "number":
      case "email":
        field = <Input type={type} inputMode="numeric" {...commonProps} />;
        break;
      case "password":
        field = <InputPassword {...commonProps} />;
        break;
      // Add more cases as needed
      default:
        field = null;
    }

    return (
      <div style={{ width: "100%" }}>
        {field}
        <ErrorField error={error} />
      </div>
    );
  },
);
