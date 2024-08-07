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
  extraProps?: Record<PropertyKey, string | number | undefined>;
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
            <Flex
              key={`${field.name}_${index}`}
              css={{
                gap: "2",
                flexWrap: "wrap",
                alignItems: "flex-start",
                "& > *": {
                  flexBasis: field.row.length > 2 ? "34" : "44",
                  flexGrow: "1",
                },
              }}
            >
              {field.row.map(
                // @ts-ignore
                (rowField) => (
                  // @ts-ignore
                  <FormField<T>
                    key={`${rowField.name}_${rowField.type}`}
                    name={rowField.name}
                    type={rowField.type}
                    options={rowField.options}
                    extraProps={rowField.extraProps}
                    customName={
                      props.customFieldName
                        ? props.customFieldName(rowField)
                        : undefined
                    }
                    schema={props.schema}
                    translationsKey={props.translationsKey}
                    variant={props.variant}
                  />
                ),
              )}
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
            extraProps={field.extraProps}
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
