"use client";

import { ZodSchema } from "zod";
import { FormField } from "./Elements/FormField";
import { Flex } from "~/styled-system/jsx";
import { InputVariant } from "~/styled-system/recipes";

// Types for the config prop
interface FieldConfig {
  name?: string;
  type?: string;
  options?: { text: string }[];
  row?: FieldConfig[];
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
      {config.map((field, index) => {
        if (field.row) {
          return (
            <Flex key={index} gap={4}>
              {field.row.map((rowField) => (
                // @ts-ignore
                <FormField<T>
                  key={`${rowField.name}_${rowField.type}`}
                  name={rowField.name}
                  type={rowField.type}
                  options={rowField.options}
                  customName={
                    props.customFieldName
                      ? props.customFieldName(rowField)
                      : undefined
                  }
                  schema={props.schema}
                  translationsKey={props.translationsKey}
                  variant={props.variant}
                />
              ))}
            </Flex>
          );
        }

        return (
          // @ts-ignore
          <FormField<T>
            key={`${field.name}_${field.type}`}
            name={field.name}
            type={field.type}
            options={field.options}
            customName={
              props.customFieldName ? props.customFieldName(field) : undefined
            }
            schema={props.schema}
            translationsKey={props.translationsKey}
            variant={props.variant}
          />
        );
      })}
    </>
  );
}
