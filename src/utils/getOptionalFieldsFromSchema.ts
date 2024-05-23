import { z } from "zod";

// Function to determine if a field is optional
function isFieldOptional(schema: z.ZodTypeAny): boolean {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
    return true;
  }
  if (schema instanceof z.ZodEffects || schema instanceof z.ZodArray) {
    return isFieldOptional(schema._def.schema);
  }
  if (schema instanceof z.ZodDefault) {
    return isFieldOptional(schema._def.innerType);
  }
  return false;
}

// Function to get the shape from the zfd.formData schema
function getShapeFromSchema(schema: z.ZodTypeAny) {
  const zodObject = schema._def?.schema;
  if (zodObject instanceof z.ZodObject) {
    return zodObject.shape;
  }
  if (zodObject instanceof z.ZodArray) {
    return zodObject;
  }
  if (
    zodObject._def &&
    zodObject._def.schema &&
    zodObject._def.schema instanceof z.ZodObject
  ) {
    return zodObject._def.schema.shape;
  }
  throw new Error("Provided schema is not a ZodObject");
}

// Function to get all optional fields from a schema
export function getOptionalFields(schema: z.ZodTypeAny): string[] {
  const shape = getShapeFromSchema(schema);
  const optionalFields: string[] = [];

  Object.entries(shape).forEach(([key, value]) => {
    if (isFieldOptional(value)) {
      optionalFields.push(key);
    }
  });

  return optionalFields;
}
