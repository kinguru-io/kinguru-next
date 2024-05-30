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
  schema: ZodSchema;
  translationsKey: string;
  customFieldName?: (field: FieldConfig) => string | undefined;
  variant?: InputVariant["variant"];
}

export function BaseForm<T>(props: BaseFormProps): JSX.Element {
  const { config } = props;

  return (
    <>
      {config.map((_field) => (
        // @ts-ignore
        <FormField<T>
          key={`${_field.name}_${_field.type}`}
          name={_field.name}
          type={_field.type}
          customName={
            props?.customFieldName ? props.customFieldName(_field) : undefined
          }
          schema={props.schema} // explicitly pass schema
          translationsKey={props.translationsKey} // explicitly pass translationsKey
          variant={props.variant} // explicitly pass variant
        />
      ))}
    </>
  );
}
