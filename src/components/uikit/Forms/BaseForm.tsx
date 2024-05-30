"use client";

import { ZodSchema } from "zod";
import { FormField } from "./Elements/FormField";
import { InputVariant } from "~/styled-system/recipes";

// Types for the config prop
interface FieldConfig {
  name: string;
  type: string;
}

// Props for the BaseForm component
interface BaseFormProps {
  config: FieldConfig[];
  schema: ZodSchema<any>;
  customFieldName?: (field: FieldConfig) => string;
  translationsKey: string;
  variant?: InputVariant["variant"];
}

export function BaseForm<T>({
  config,
  customFieldName,
  schema,
  translationsKey,
  variant,
}: BaseFormProps): JSX.Element {
  return (
    <>
      {config.map((field: FieldConfig) => (
        <FormField<T>
          key={`${field.name}_${field.type}`}
          customName={customFieldName && customFieldName(field)}
          schema={schema}
          translationsKey={translationsKey}
          variant={variant}
          {...field}
        />
      ))}
    </>
  );
}
